"use client";

import Link from "next/link";
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { getDesktopMenuItems } from "@/lib/menu";

export function DesktopNav({ locale }: { locale: string }) {
	const menu = getDesktopMenuItems();
	return (
		<NavigationMenu>
			<NavigationMenuList>
				{menu.map((item) => {
					if (item.children && item.children.length > 0) {
						return (
							<NavigationMenuItem key={item.id}>
								<NavigationMenuTrigger className="text-sm font-medium">
									{item.name}
								</NavigationMenuTrigger>
								<NavigationMenuContent>
									<div className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
										{item.children.map((child) => (
											<NavigationMenuLink key={child.id} asChild>
												<Link
													href={child.href}
													className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
												>
													<div className="text-sm font-medium leading-none">
														{child.name}
													</div>
													{child.description && (
														<p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
															{child.description}
														</p>
													)}
												</Link>
											</NavigationMenuLink>
										))}
									</div>
								</NavigationMenuContent>
							</NavigationMenuItem>
						);
					}

					return (
						<NavigationMenuItem key={item.id}>
							<NavigationMenuLink asChild>
								<Link
									href={item.href}
									className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
								>
									{item.name}
								</Link>
							</NavigationMenuLink>
						</NavigationMenuItem>
					);
				})}
			</NavigationMenuList>
		</NavigationMenu>
	);
}
