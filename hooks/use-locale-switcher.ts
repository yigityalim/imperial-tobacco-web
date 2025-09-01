"use client";

import { useLocale } from "next-intl";
import { useState, useTransition } from "react";
import { usePathname, useRouter } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";

export const useLocaleSwitcher = () => {
    const [isPending, startTransition] = useTransition();
    const [isChanging, setIsChanging] = useState(false);
    const router = useRouter();
    const pathname = usePathname();
    const currentLocale = useLocale() as Locale;

    const switchLocale = (locale: Locale) => {
        if (locale === currentLocale || isPending) return;

        setIsChanging(true);
        startTransition(() => {
            router.replace(pathname, { locale });
            // Reset state after a brief delay
            setTimeout(() => setIsChanging(false), 500);
        });
    };

    return {
        currentLocale,
        switchLocale,
        isPending: isPending || isChanging,
        isChanging,
    };
};
