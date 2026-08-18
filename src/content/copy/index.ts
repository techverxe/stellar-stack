import type { Locale } from "@/content/i18n";
import type { Copy } from "./types";
import { fi } from "./fi";
import { sv } from "./sv";
import { en } from "./en";

const dictionaries: Record<Locale, Copy> = { fi, sv, en };

export function getCopy(locale: Locale): Copy {
  return dictionaries[locale];
}

export type { Copy } from "./types";
