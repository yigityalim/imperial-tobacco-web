"use client";

import { NextIntlClientProvider } from "next-intl";
import { ThemeProvider, type ThemeProviderProps } from "next-themes";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import type { Locale } from "@/i18n/routing";

interface ProviderProps extends ThemeProviderProps {}

export function Providers({
	children,
	locale,
	messages,
}: Readonly<
	ProviderProps & { locale: Locale; messages: Record<string, string> }
>): React.JSX.Element {
	return (
		<NextIntlClientProvider locale={locale} messages={messages}>
			<NuqsAdapter>
				<ThemeProvider
					enableSystem
					enableColorScheme
					attribute="class"
					defaultTheme="system"
					storageKey="theme"
					disableTransitionOnChange
				>
					{children}
				</ThemeProvider>
			</NuqsAdapter>
		</NextIntlClientProvider>
	);
}
