import { createServer } from "node:http";
import { config } from "./config.mjs";
import { openDb } from "./db.mjs";
import { submitContact } from "./api.mjs";

const MAX_BODY_BYTES = 10_000;

function readJsonBody(req) {
  return new Promise((resolve, reject) => {
    let size = 0;
    const chunks = [];
    req.on("data", (chunk) => {
      size += chunk.length;
      if (size > MAX_BODY_BYTES) {
        reject(Object.assign(new Error("body_too_large"), { statusCode: 413 }));
        req.destroy();
        return;
      }
      chunks.push(chunk);
    });
    req.on("end", () => {
      try {
        resolve(
          chunks.length
            ? JSON.parse(Buffer.concat(chunks).toString("utf8"))
            : {},
        );
      } catch {
        reject(Object.assign(new Error("invalid_json"), { statusCode: 400 }));
      }
    });
    req.on("error", reject);
  });
}

// Unauthenticated public endpoint: a crude per-IP rate limit is cheap
// insurance against a form-spam script, not a defence against a determined
// attacker. Mirrors tikanmaanhuoltoasema/server/index.mjs exactly.
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 10;
const hits = new Map();
function rateLimited(ip) {
  const now = Date.now();
  const windowStart = now - RATE_LIMIT_WINDOW_MS;
  const recent = (hits.get(ip) ?? []).filter((t) => t > windowStart);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > RATE_LIMIT_MAX;
}

function send(res, status, body) {
  const json = JSON.stringify(body);
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Content-Length": Buffer.byteLength(json),
  });
  res.end(json);
}

export function createApp(db) {
  return async function handler(req, res) {
    const url = new URL(req.url, "http://internal");
    const ip = req.socket.remoteAddress || "unknown";

    try {
      if (req.method === "POST" && url.pathname === "/api/contact") {
        if (rateLimited(ip)) return send(res, 429, { error: "rate_limited" });
        const requestBody = await readJsonBody(req);
        const { status, body } = await submitContact(db, requestBody);
        return send(res, status, body);
      }

      if (req.method === "GET" && url.pathname === "/api/contact/health") {
        return send(res, 200, { ok: true });
      }

      return send(res, 404, { error: "not_found" });
    } catch (err) {
      console.error("contact API error:", err);
      return send(res, err.statusCode || 500, { error: "internal_error" });
    }
  };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const db = openDb(config.dbPath);
  const server = createServer(createApp(db));
  server.listen(config.port, "127.0.0.1", () => {
    console.log(
      `contact API listening on 127.0.0.1:${config.port}, db: ${config.dbPath}`,
    );
  });
  for (const sig of ["SIGINT", "SIGTERM"]) {
    process.on(sig, () => {
      server.close(() => process.exit(0));
    });
  }
}
