import type { MetadataRoute } from "next";
import { site, serviceIds, industryIds, projects } from "@/content/site";
import {
  locales,
  localeTags,
  sectionKeys,
  type SectionKey,
  path,
} from "@/content/i18n";

/**
 * Every URL is emitted once per locale with a full `alternates.languages` map,
 * which is what tells search engines the three versions are translations of
 * each other rather than duplicate content.
 */
export const dynamic = "force-static";

function alternates(section?: SectionKey, slug?: string) {
  const languages: Record<string, string> = {};
  for (const l of locales) {
    languages[localeTags[l]] = `${site.url}${path(l, section, slug)}`;
  }
  return { languages };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];
  const lastModified = new Date("2026-08-18");

  for (const locale of locales) {
    entries.push({
      url: `${site.url}${path(locale)}`,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
      alternates: alternates(),
    });

    for (const section of sectionKeys) {
      entries.push({
        url: `${site.url}${path(locale, section)}`,
        lastModified,
        changeFrequency: "monthly",
        priority: section === "privacy" ? 0.2 : 0.8,
        alternates: alternates(section),
      });
    }

    for (const slug of serviceIds) {
      entries.push({
        url: `${site.url}${path(locale, "services", slug)}`,
        lastModified,
        changeFrequency: "monthly",
        priority: 0.7,
        alternates: alternates("services", slug),
      });
    }

    for (const slug of industryIds) {
      entries.push({
        url: `${site.url}${path(locale, "industries", slug)}`,
        lastModified,
        changeFrequency: "monthly",
        priority: 0.7,
        alternates: alternates("industries", slug),
      });
    }

    for (const project of projects) {
      entries.push({
        url: `${site.url}${path(locale, "work", project.id)}`,
        lastModified,
        changeFrequency: "monthly",
        priority: 0.6,
        alternates: alternates("work", project.id),
      });
    }
  }

  return entries;
}
