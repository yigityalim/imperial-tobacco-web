import { redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { forceBypassOnboarding, getOnboardingStatus } from "@/lib/onboarding";
import { OnboardingClient } from "./client";

interface OnboardingPageProps {
	params: Promise<{
		locale: string;
	}>;
}

export async function generateMetadata({ params }: OnboardingPageProps) {
	const { locale } = await params;
	const t = await getTranslations({ locale, namespace: "onboarding" });

	return {
		title: t("meta.title"),
		description: t("meta.description"),
	};
}

export default async function OnboardingPage({ params }: OnboardingPageProps) {
	const { locale } = await params;
	const isBypassedInDev = await forceBypassOnboarding();

	if (isBypassedInDev) {
		console.log("🔧 DEV MODE: Redirecting from onboarding page to home");
		redirect(`/${locale}`);
	}

	const isCompleted = await getOnboardingStatus();

	if (isCompleted) {
		console.log("✅ Onboarding completed, redirecting to home");
		redirect(`/${locale}`);
	}

	const t = await getTranslations("onboarding");

	console.log("🎯 Rendering onboarding page");

	return (
		<div className="min-h-svh">
			<OnboardingClient
				currentLocale={locale}
				translations={{
					cancel: t("cancel"),
					selectLanguage: t("selectLanguage"),
					otherLanguages: t("otherLanguages"),
					continue: t("continue"),
					selectFirst: t("selectFirst"),
					languageSelected: t("languageSelected"),
					proceedWith: t("proceedWith"),
				}}
			/>
		</div>
	);
}
