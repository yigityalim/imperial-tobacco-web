'use server';

import { setOnboardingCompleted } from '@/lib/onboarding';

export async function completeOnboarding(): Promise<void> {
    try {
        await setOnboardingCompleted();
    } catch (error) {
        console.error('Error setting onboarding cookie:', error);
        throw new Error('Failed to complete onboarding');
    }
}