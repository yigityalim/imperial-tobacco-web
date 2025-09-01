import { type NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

const ONBOARDING_COOKIE_NAME = "onboarding-completed";

// Environment check
const isDevelopment = process.env.NODE_ENV === "development";
const FORCE_ONBOARDING_IN_DEV = process.env.FORCE_ONBOARDING === "true";

function isOnboardingCompleted(request: NextRequest): boolean {
    return request.cookies.get(ONBOARDING_COOKIE_NAME)?.value === "true";
}

function isProtectedPath(pathname: string): boolean {
    return (
        !pathname.startsWith("/_next") &&
        !pathname.startsWith("/api") &&
        !pathname.includes(".") &&
        !pathname.includes("/onboarding")
    );
}

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // next-intl middleware'ini çağır (her zaman çalışmalı)
    const response = intlMiddleware(request);

    // DEV modunda onboarding kontrolünü tamamen atla
    if (isDevelopment && !FORCE_ONBOARDING_IN_DEV) {
        console.log(`🔧 DEV MODE: Onboarding kontrolü atlandı: ${pathname}`);
        return response;
    }

    // ✅ SADECE production (veya FORCE_ONBOARDING dev modda true iken) çalışır

    // Protected path kontrolü
    if (isProtectedPath(pathname)) {
        const isCompleted = isOnboardingCompleted(request);

        if (!isCompleted) {
            const locale = pathname.split("/")[1] || "tr";
            const onboardingUrl = new URL(`/${locale}/onboarding`, request.url);

            console.log(`🚀 Redirecting to onboarding: ${onboardingUrl.pathname}`);
            return NextResponse.redirect(onboardingUrl);
        }
    }

    // Onboarding sayfasına erişim kontrolü
    if (pathname.includes("/onboarding") && isOnboardingCompleted(request)) {
        const locale = pathname.split("/")[1] || "tr";
        const homeUrl = new URL(`/${locale}`, request.url);

        console.log(`✅ Onboarding completed, redirecting to: ${homeUrl.pathname}`);
        return NextResponse.redirect(homeUrl);
    }

    return response;
}

export const config = {
    matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
