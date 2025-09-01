import type { AbstractIntlMessages } from "next-intl";
import { defineRouting } from "next-intl/routing";

export const locales = [
    "tr",
    "en",
    "de",
    "es",
    "fr",
    "it",
    "ru",
    "ro",
    "bg",
    "el",
    "hu",
    "az",
] as const;
export const defaultLocale = "tr" as const;

export const primaryLocales: Locale[] = ["tr", "en", "el", "ro"];
export const otherLocales: Locale[] = locales.filter(
    (locale) => !primaryLocales.includes(locale)
);

export type Messages = typeof import("../messages/tr.json") // & AbstractIntlMessages;

declare global {
    interface IntlMessages extends Messages { }
}

export type Locale = (typeof locales)[number];
export type DefaultLocale = typeof defaultLocale;

export const routing = defineRouting({
    // A list of all locales that are supported
    locales,

    // Used when no locale matches
    defaultLocale,
});

export const LANGUAGES = {
    tr: {
        code: "tr",
        flag: "🇹🇷",
        key: "turkish",
        native: "Türkçe"
    },
    en: {
        code: "en",
        flag: "🇺🇸",
        key: "english",
        native: "English"
    },
    de: {
        code: "de",
        flag: "🇩🇪",
        key: "german",
        native: "Deutsch"
    },
    es: {
        code: "es",
        flag: "🇪🇸",
        key: "spanish",
        native: "Español"
    },
    fr: {
        code: "fr",
        flag: "🇫🇷",
        key: "french",
        native: "Français"
    },
    it: {
        code: "it",
        flag: "🇮🇹",
        key: "italian",
        native: "Italiano"
    },
    ru: {
        code: "ru",
        flag: "🇷🇺",
        key: "russian",
        native: "Русский"
    },
    ro: {
        code: "ro",
        flag: "🇷🇴",
        key: "romanian",
        native: "Română"
    },
    bg: {
        code: "bg",
        flag: "🇧🇬",
        key: "bulgarian",
        native: "Български"
    },
    el: {
        code: "el",
        flag: "🇬🇷",
        key: "greek",
        native: "Ελληνικά"
    },
    hu: {
        code: "hu",
        flag: "🇭🇺",
        key: "hungarian",
        native: "Magyar"
    },
    az: {
        code: "az",
        flag: "🇦🇿",
        key: "azerbaijani",
        native: "Azərbaycanca"
    }
} as {
        [key in Locale]: {
            code: key;
            flag: string;
            key: string;
            native: string;
        };
    }