import type { MetadataRoute } from "next";
import { getPathname } from "@/i18n/navigation";
import { locales } from "@/i18n/routing";

const host = "https://acme.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const alternateUrls: Record<string, string> = {};

    for (const locale of locales) {
        const localizedPath = await getPathname({ locale, href: "/" });
        alternateUrls[locale] = host + localizedPath;
    }

    return [
        {
            url: host,
            lastModified: new Date(),
            alternates: {
                languages: alternateUrls,
            },
        },
    ];
}
