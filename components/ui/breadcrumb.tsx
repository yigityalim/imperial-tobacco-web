import { ChevronRight, Home } from "lucide-react";
import Link from "next/link";

export interface BreadcrumbItem {
	label: string;
	href: string;
}

interface BreadcrumbProps {
	items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
	return (
		<nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
			<Link
				href="/"
				className="flex items-center hover:text-gray-900 transition-colors"
			>
				<Home className="h-4 w-4" />
			</Link>

			{items.map((item, index) => (
				<div key={index} className="flex items-center space-x-2">
					<ChevronRight className="h-4 w-4" />
					{index === items.length - 1 ? (
						<span className="font-medium text-gray-900 capitalize">
							{item.label}
						</span>
					) : (
						<Link
							href={item.href}
							className="hover:text-gray-900 transition-colors capitalize"
						>
							{item.label}
						</Link>
					)}
				</div>
			))}
		</nav>
	);
}
