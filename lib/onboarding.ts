import { cookies } from 'next/headers';

const ONBOARDING_COOKIE_NAME = 'onboarding-completed';
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 yıl

// Development mode check - middleware ile aynı logic
const isDevelopment = process.env.NODE_ENV === 'development';
const FORCE_ONBOARDING_IN_DEV = process.env.FORCE_ONBOARDING === 'true';

export async function getOnboardingStatus(): Promise<boolean> {
    if (isDevelopment) {
        console.log("🔧 DEV MODE: Onboarding bypassed in server component");
        return false;
    }

    const cookieStore = await cookies();
    const onboardingCookie = cookieStore.get(ONBOARDING_COOKIE_NAME);
    const isCompleted = onboardingCookie?.value === 'true';

    console.log(`🍪 Cookie check: ${isCompleted ? 'completed' : 'not completed'}`);
    return isCompleted;
}

export async function setOnboardingCompleted(): Promise<void> {
    const cookieStore = await cookies();
    cookieStore.set({
        name: ONBOARDING_COOKIE_NAME,
        value: 'true',
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: COOKIE_MAX_AGE,
        path: '/'
    });

    console.log('✅ Onboarding status set to completed');
}

export async function clearOnboardingStatus(): Promise<void> {
    const cookieStore = await cookies();
    cookieStore.delete(ONBOARDING_COOKIE_NAME);
    console.log('🗑️ Onboarding status cleared');
}

// Development helper function
export async function forceBypassOnboarding(): Promise<boolean> {
    return isDevelopment && !FORCE_ONBOARDING_IN_DEV;
}