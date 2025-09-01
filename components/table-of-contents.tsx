"use client";

import { Link } from "next-view-transitions";
import * as React from "react";
import { useCallback } from "react";
import type { TableOfContents as TOC } from "@/lib/toc";
import { cn } from "@/lib/utils";

interface TocProps {
	toc: TOC;
	onValueChange: (value: string | undefined) => void;
}

export function TableOfContents({ toc, onValueChange }: Readonly<TocProps>) {
	const tocRef = React.useRef<HTMLDivElement>(null);
	const itemIds = React.useMemo(
		() =>
			toc.items
				? toc.items
						.flatMap((item) => [item.url, item?.items?.map((item) => item.url)])
						.flat()
						.filter(Boolean)
						.map((id) => id?.split("#")[1])
				: [],
		[toc],
	);

	const activeHeading = useActiveItem(itemIds as string[], tocRef);

	if (!toc?.items?.length) {
		return null;
	}

	return (
		<div
			ref={tocRef}
			className="relative w-full max-h-[700px] overflow-y-auto pr-2 scrollbar-hidden"
		>
			<Tree
				tree={toc}
				activeItem={activeHeading}
				onValueChange={onValueChange}
			/>
		</div>
	);
}

function useActiveItem(
	itemIds: string[],
	tocRef: React.RefObject<HTMLDivElement | null>,
) {
	const [activeId, setActiveId] = React.useState<string | null>(null);

	React.useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				for (const element of entries) {
					if (element.isIntersecting) {
						setActiveId(element.target.id);
					}
				}
			},
			{ rootMargin: "0% 0% -80% 0%" },
		);

		for (const id of itemIds) {
			const element = document.getElementById(id);
			if (element) {
				observer.observe(element);
			}
		}

		return () => {
			for (const id of itemIds) {
				const element = document.getElementById(id);
				if (element) {
					observer.unobserve(element);
				}
			}
		};
	}, [itemIds]);

	React.useEffect(() => {
		if (activeId && tocRef.current) {
			const activeElement = tocRef.current.querySelector(
				`.toc-link[href="#${activeId}"]`,
			);
			activeElement?.scrollIntoView({
				behavior: "smooth",
				block: "nearest",
				inline: "nearest",
			});
		}
	}, [activeId, tocRef]);

	return activeId;
}

interface TreeProps {
	tree: TOC;
	level?: number;
	activeItem?: string | null;
	onValueChange: (value: string | undefined) => void;
}

function Tree({ tree, level = 1, activeItem, onValueChange }: TreeProps) {
	const scroll = useCallback<(id: string, url: string) => void>(
		async (id, url) => {
			const element = document.getElementById(id);
			if (element) {
				// Header yüksekliğini al
				const header = document.querySelector(".header");
				const headerHeight = header ? header.clientHeight : 100; // Eğer bulunamazsa varsayılan bir değer kullan

				// Sayfanın kaydırma pozisyonunu hesapla
				const rect = element.getBoundingClientRect();
				const scrollTop =
					window.pageYOffset || document.documentElement.scrollTop;
				const absoluteTop = rect.top + scrollTop - headerHeight - 20; // 20px ekstra boşluk bırak

				// Sayfayı yumuşak şekilde kaydır
				window.scrollTo({
					top: absoluteTop,
					behavior: "smooth",
				});

				// URL'yi güncelle
				window.history.pushState(null, "", url);

				// Accordion'u kapat
				onValueChange("");
			}
		},
		[onValueChange],
	);

	return tree?.items?.length && level < 3 ? (
		<ul className="mt-2 space-y-2">
			{tree.items.map((item, index) => {
				return (
					<li key={`${index}-${item.url.split("#")[1]}`}>
						<Link
							href={item.url}
							onClick={async (e) => {
								onValueChange("");
							}}
							className={cn(
								"toc-link inline transition-colors duration-300 text-sm",
								item.url === `#${activeItem}`
									? "font-medium text-brand-600 underline dark:text-brand-300 decoration-accent-brand/20 hover:decoration-accent-brand/80 dark:decoration-brand-300/20 dark:hover:decoration-brand-400/80"
									: "text-offgray-700 hover:text-accent-brand dark:hover:text-brand-300",
							)}
						>
							{item.title}
						</Link>
						{item.items?.length ? (
							<ul
								className={cn(
									"ml-[7px] pl-4 mt-1 space-y-1 border-l border-offgray-100 dark:border-offgray-600/20",
								)}
							>
								<Tree
									tree={{ items: item.items }}
									level={level + 1}
									activeItem={activeItem}
									onValueChange={onValueChange}
								/>
							</ul>
						) : null}
					</li>
				);
			})}
		</ul>
	) : null;
}
