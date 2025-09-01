"use client";

import {
	Building2,
	ChevronDown,
	Grid3X3,
	Home,
	Package,
	Search,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

export function MainNavigation() {
	const pathname = usePathname();

	const navigationItems = [
		{
			title: "Ana Sayfa",
			href: "/",
			icon: Home,
		},
		{
			title: "Markalar",
			href: "/brands",
			icon: Building2,
			description: "Premium tütün markalarımız",
		},
		{
			title: "Kategoriler",
			href: "/categories",
			icon: Grid3X3,
			description: "Ürün kategorilerimiz",
			submenu: [
				{ title: "Selected Leaf", href: "/categories/davidoff-selected-leaf" },
				{ title: "Slims", href: "/categories/davidoff-slims" },
				{ title: "Superslims", href: "/categories/davidoff-superslims" },
			],
		},
		{
			title: "Tüm Ürünler",
			href: "/products",
			icon: Package,
			description: "Tüm ürün kataloğu",
		},
		{
			title: "Arama",
			href: "/search",
			icon: Search,
			description: "Ürün arama ve filtreleme",
		},
	];

	return (
		<NavigationMenu className="max-w-full">
			<NavigationMenuList className="flex-wrap gap-1">
				{navigationItems.map((item) => (
					<NavigationMenuItem key={item.href}>
						{item.submenu ? (
							<>
								<NavigationMenuTrigger
									className={cn(
										navigationMenuTriggerStyle(),
										pathname.startsWith("/categories") &&
											"bg-accent text-accent-foreground",
									)}
								>
									<item.icon className="h-4 w-4 mr-2" />
									{item.title}
								</NavigationMenuTrigger>
								<NavigationMenuContent>
									<div className="grid gap-3 p-6 w-[400px]">
										<div className="row-span-3">
											<NavigationMenuLink asChild>
												<Link
													href={item.href}
													className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
												>
													<item.icon className="h-6 w-6" />
													<div className="mb-2 mt-4 text-lg font-medium">
														{item.title}
													</div>
													<p className="text-sm leading-tight text-muted-foreground">
														{item.description}
													</p>
												</Link>
											</NavigationMenuLink>
										</div>
										<div className="space-y-3">
											{item.submenu.map((subItem) => (
												<NavigationMenuLink key={subItem.href} asChild>
													<Link
														href={subItem.href}
														className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
													>
														<div className="text-sm font-medium leading-none">
															{subItem.title}
														</div>
													</Link>
												</NavigationMenuLink>
											))}
										</div>
									</div>
								</NavigationMenuContent>
							</>
						) : (
							<Link href={item.href} legacyBehavior passHref>
								<NavigationMenuLink
									className={cn(
										navigationMenuTriggerStyle(),
										pathname === item.href &&
											"bg-accent text-accent-foreground",
									)}
								>
									<item.icon className="h-4 w-4 mr-2" />
									{item.title}
								</NavigationMenuLink>
							</Link>
						)}
					</NavigationMenuItem>
				))}
			</NavigationMenuList>
		</NavigationMenu>
	);
}
