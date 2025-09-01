import type { Brand } from "contentlayer/generated";
import Link from "next/link";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

interface BrandCardProps {
	brand: Brand;
}

export function BrandCard({ brand }: BrandCardProps) {
	return (
		<Link href={brand.slug}>
			<Card className="hover:shadow-lg transition-shadow duration-200">
				<CardHeader>
					<div className="flex items-center gap-4">
						{brand.logo && (
							<img
								src={brand.logo}
								alt={`${brand.brandName} logo`}
								className="h-12 w-auto"
							/>
						)}
						<div>
							<CardTitle>{brand.brandName}</CardTitle>
							{brand.foundedYear && (
								<p className="text-sm text-gray-500">
									Kuruluş: {brand.foundedYear}
								</p>
							)}
						</div>
					</div>
				</CardHeader>
				<CardContent>
					<CardDescription>{brand.description}</CardDescription>
					{brand.categories && brand.categories.length > 0 && (
						<div className="mt-3">
							<p className="text-sm font-medium text-gray-700">Kategoriler:</p>
							<div className="flex flex-wrap gap-1 mt-1">
								{brand.categories.slice(0, 3).map((category) => (
									<span
										key={category}
										className="text-xs bg-gray-100 px-2 py-1 rounded"
									>
										{category}
									</span>
								))}
								{brand.categories.length > 3 && (
									<span className="text-xs text-gray-500">
										+{brand.categories.length - 3} daha
									</span>
								)}
							</div>
						</div>
					)}
				</CardContent>
			</Card>
		</Link>
	);
}
