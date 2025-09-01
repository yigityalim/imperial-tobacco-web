"use client";

import { Check, Globe } from "lucide-react";
import { useTranslations } from "next-intl";
import { Modal } from "@/components/modal";
import { Button } from "@/components/ui/button";
import { useLocaleSwitcher } from "@/hooks/use-locale-switcher";
import { LANGUAGES } from "@/i18n/routing";
import { cn } from "@/lib/utils";

export function LanguageSwitcherModal(): React.JSX.Element {
	const t = useTranslations();
	const { currentLocale, switchLocale, isPending } = useLocaleSwitcher();

	const trigger = (
		<Button
			variant="ghost"
			size="sm"
			className="h-8 w-full justify-start gap-2 text-sm font-medium hover:bg-accent"
			disabled={isPending}
		>
			<Globe className="size-4" />
			<span>{t("common.language")}</span>
			<div className="ml-auto flex items-center gap-1">
				<span className="text-xs">{LANGUAGES[currentLocale].flag}</span>
			</div>
		</Button>
	);

	const content = (
		<div className="px-4 py-2">
			<div className="space-y-1">
				{Object.entries(LANGUAGES).map(([code, lang]) => {
					const isSelected = currentLocale === code;
					const locale = code as keyof typeof LANGUAGES;

					return (
						<Button
							key={code}
							variant={isSelected ? "default" : "ghost"}
							size="sm"
							className={cn(
								"w-full justify-start gap-3 h-10 relative",
								isSelected && "bg-primary text-primary-foreground",
								isPending && "opacity-50 cursor-not-allowed",
							)}
							onClick={() => switchLocale(locale)}
							disabled={isPending || isSelected}
						>
							<span className="text-lg">{lang.flag}</span>
							<span>{t(`common.${lang.key}` as any)}</span>
							{isSelected && <Check className="ml-auto size-4" />}
						</Button>
					);
				})}
			</div>
			{isPending && (
				<div className="mt-3 text-center">
					<p className="text-xs text-muted-foreground">{t("common.loading")}</p>
				</div>
			)}
		</div>
	);

	return (
		<Modal
			header={t("modal.selectLanguage")}
			content={content}
			trigger={trigger}
			close={
				<Button variant="outline" className="w-full">
					{t("common.close")}
				</Button>
			}
			contentClassName="max-w-sm"
		/>
	);
}
