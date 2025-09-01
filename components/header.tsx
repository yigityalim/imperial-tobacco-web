"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { Link } from "next-view-transitions";
import { DesktopNav } from "@/components/desktop-nav";
import { MobileNav } from "@/components/mobile-nav";
import { cn } from "@/lib/utils";

export function Header(): React.JSX.Element {
	const pathname = usePathname();
	return (
		<div
			className={cn(
				"header backdrop-blur-md dark:backdrop-blur-xl fixed h-(--header-height) z-50 bg-nav-color top-0 w-full flex items-center justify-between px-4 lg:px-6 mb-6 py-2 border-b border-brand-500/50 dark:border-brand-600/20",
				pathname.startsWith("/category") && "border-b-transparent",
			)}
		>
			{/* Mobile Navigation */}
			<div className="md:hidden">
				<MobileNav />
			</div>

			{/* Logo - centered on mobile, left-aligned on desktop */}
			<div className="flex-1 md:flex-none flex justify-center md:justify-start">
				<Link href="/" className="">
					<Image
						src="/brand-logo.png"
						alt="brand-logo"
						width={80}
						height={80}
						priority
						quality={100}
					/>
				</Link>
			</div>

			{/* Desktop Navigation */}
			<div className="hidden md:flex flex-1 justify-center">
				<DesktopNav locale="en" />
			</div>

			{/* Right side actions placeholder */}
			<div className="hidden md:flex items-center gap-2">
				{/* TODO: Add search, user menu, theme switcher, etc. */}
			</div>
		</div>
	);
}
