import {
    getFormatter as getF,
    getMessages as getM,
    getNow,
    getTranslations as getT,
} from "next-intl/server";
import { type Locale, type Messages, routing } from "./routing";

type MessagesFromNamespace<T, Path extends string> =
    Path extends `${infer Key}.${infer Rest}`
    ? Key extends keyof T
    ? T[Key] extends object
    ? MessagesFromNamespace<T[Key], Rest>
    : never
    : never
    : Path extends keyof T
    ? T[Path]
    : never;

type KeysOf<T> = T extends object ? Extract<keyof T, string> : never;

export async function getTranslations<
    TNamespace extends keyof Messages,
    TValue = MessagesFromNamespace<Messages, TNamespace>
>(
    namespace: TNamespace,
    locale?: Locale
) {
    return await getT({ namespace, locale });
}

getTranslations("meta").then((t) => t("opengraph.title")); // Type-safe with namespace

// Server-side messages
export async function getMessages(locale?: Locale) {
    return await getM(locale ? { locale } : undefined);
}

// Server-side formatter
export async function getFormatter(locale?: Locale) {
    return await getF(locale ? { locale } : undefined);
}

// Server-side current time
export function getCurrentTime() {
    return getNow();
}

// Type-safe translation helper for metadata
export async function getMetaTranslations(locale?: Locale) {
    const t = await getTranslations("meta", locale);

    return {
        title: t("title"),
        description: t("description"),
        keywords: t("keywords"),
    };
}

// Generate static params for locale routes
export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}
