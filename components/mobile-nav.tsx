"use client";

import { X } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import { redirect } from "next/navigation";
import { Link } from "next-view-transitions";
import { ThemeButton } from "@/components/theme-switch";
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/ui/drawer";
import { getMenuItems } from "@/lib/menu";
import { clearOnboardingStatus } from "@/lib/onboarding";
import { useMenu } from "@/state/menu";

export function MobileNav() {
	const menuState = useMenu((state) => state.menuState);
	const setMenuState = useMenu((state) => state.setMenuState);
	return (
		<Drawer open={menuState} onOpenChange={setMenuState}>
			<DrawerTrigger className="absolute top-1/2 -translate-y-1/2 left-16">
				<svg
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					className="size-[24px] icon-base"
				>
					<title>Menü</title>
					<motion.line
						x1="4"
						x2="20"
						y1="6"
						y2="6"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
						animate={menuState ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
						transition={{ duration: 0.3 }}
					/>
					<motion.line
						x1="4"
						x2="20"
						y1="12"
						y2="12"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
						animate={menuState ? { opacity: 0 } : { opacity: 1 }}
						transition={{ duration: 0.3 }}
					/>
					<motion.line
						x1="4"
						x2="20"
						y1="18"
						y2="18"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
						animate={menuState ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
						transition={{ duration: 0.3 }}
					/>
				</svg>
			</DrawerTrigger>
			<DrawerContent>
				<DrawerHeader className="flex flex-col gap-2">
					<DrawerTitle className="pt-4">
						<Link href="/">
							<Image
								src="/brand-logo.png"
								alt="brand-logo"
								width={100}
								height={100}
								priority
								quality={100}
							/>
						</Link>
					</DrawerTitle>
					<DrawerDescription className="sr-only">Menü</DrawerDescription>
					<nav className="flex flex-col space-y-4 w-full items-start justify-start">
						{getMenuItems().map((item) => (
							<div key={item.id} className="w-full">
								{item.children && item.children.length > 0 ? (
									<details className="w-full">
										<summary className="flex items-center justify-between cursor-pointer p-2.5 rounded-sm text-sm text-offgray-600 dark:text-offgray-200 hover:bg-offgray-100/50 dark:hover:bg-offgray-500/10 transition-colors duration-75">
											{item.name}
											<svg
												className="w-4 h-4 transition-transform"
												xmlns="http://www.w3.org/2000/svg"
												viewBox="0 0 24 24"
												fill="none"
												stroke="currentColor"
												strokeWidth="2"
												strokeLinecap="round"
												strokeLinejoin="round"
											>
												<title>Toggle</title>
												<polyline points="6,9 12,15 18,9" />
											</svg>
										</summary>
										<div className="pl-4 mt-2 space-y-2">
											{item.children.map((child) => (
												<Link
													key={child.id}
													href={child.href}
													className="block p-2 rounded-sm text-sm text-offgray-500 dark:text-offgray-300 hover:bg-offgray-100/30 dark:hover:bg-offgray-500/5 transition-colors duration-75"
													onClick={() => setMenuState(false)}
												>
													{child.name}
												</Link>
											))}
										</div>
									</details>
								) : (
									<Link
										href={item.href}
										className="flex items-center justify-between gap-2 p-2.5 rounded-sm text-sm text-offgray-600 dark:text-offgray-200 hover:bg-offgray-100/50 dark:hover:bg-offgray-500/10 transition-colors duration-75"
										onClick={() => setMenuState(false)}
									>
										{item.name}
									</Link>
								)}
							</div>
						))}
					</nav>
				</DrawerHeader>
				<DrawerFooter>
					<ThemeButton />
					<DrawerClose>
						<X className="size-[14px] text-offgray-800 dark:text-offgray-300" />
					</DrawerClose>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	);
}
