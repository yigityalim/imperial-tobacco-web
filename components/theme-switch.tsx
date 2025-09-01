"use client";

import { Moon, Sun } from "lucide-react";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export function ThemeButton(): React.JSX.Element {
	const [mounted, setMounted] = useState(false);
	const { theme, setTheme } = useTheme();
	const t = useTranslations("theme");

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		return (
			<Button
				variant="ghost"
				size="sm"
				className="h-8 w-full justify-start gap-2 text-sm font-medium"
				disabled
			>
				<div className="size-4" />
				<span>{t("appearance")}</span>
			</Button>
		);
	}

	const isDark = theme === "dark";

	return (
		<Button
			variant="outline"
			size="sm"
			className="h-8 w-full justify-start gap-2 text-sm font-medium hover:bg-accent"
			onClick={() => setTheme(isDark ? "light" : "dark")}
		>
			{isDark ? <Moon className="size-4" /> : <Sun className="size-4" />}
			<span>{t("appearance")}</span>
			<div className="ml-auto text-xs">{isDark ? t("dark") : t("light")}</div>
		</Button>
	);
}
