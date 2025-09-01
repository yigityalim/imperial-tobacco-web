import type { Category } from "contentlayer/generated";
import Link from "next/link";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

interface CategoryCardProps {
	category: Category;
}

export function CategoryCard({ category }: CategoryCardProps) {
	return (
		<Link href={category.slug}>
			<Card className="hover:shadow-lg transition-shadow duration-200">
				{category.cover && (
					<div className="relative h-48 overflow-hidden rounded-t-lg">
						<img
							src={category.cover}
							alt={category.categoryName}
							className="w-full h-full object-cover"
						/>
					</div>
				)}
				<CardHeader>
					<CardTitle>{category.categoryName}</CardTitle>
					{category.targetAudience && (
						<p className="text-sm text-gray-500">
							Hedef: {category.targetAudience}
						</p>
					)}
				</CardHeader>
				<CardContent>
					<CardDescription>{category.description}</CardDescription>
					{category.priceRange && (
						<div className="mt-3">
							<span className="text-sm font-medium text-gray-700">
								Fiyat: {category.priceRange}
							</span>
						</div>
					)}
				</CardContent>
			</Card>
		</Link>
	);
}
