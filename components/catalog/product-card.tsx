import type { Product } from "contentlayer/generated";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

interface ProductCardProps {
	product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
	return (
		<Link href={product.slug}>
			<Card className="hover:shadow-lg transition-shadow duration-200 pt-0">
				{product.cover && (
					<div className="relative h-64 overflow-hidden rounded-t-lg">
						<Image
							width={500}
							height={200}
							src={product.cover}
							alt={product.productName}
							className="w-full h-full object-cover object-center"
						/>
						<div className="absolute top-2 right-2 flex flex-col gap-1">
							{product.featured && (
								<Badge variant="secondary" className="text-xs text-white">
									Öne Çıkan
								</Badge>
							)}
							{product.newProduct && (
								<Badge variant="outline" className="text-xs">
									Yeni
								</Badge>
							)}
							{!product.inStock && (
								<Badge variant="destructive" className="text-xs">
									Stokta Yok
								</Badge>
							)}
						</div>
					</div>
				)}
				<CardHeader>
					<CardTitle className="text-lg">{product.productName}</CardTitle>
					<div className="flex justify-between items-center">
						{product.packSize && (
							<span className="text-sm text-gray-500">
								{product.packSize} adet
							</span>
						)}
					</div>
				</CardHeader>
				<CardContent>
					<CardDescription>{product.description}</CardDescription>
					<div className="mt-3 space-y-1">
						{product.filterColor && (
							<div className="flex justify-between text-sm">
								<span className="text-gray-600">Filtre:</span>
								<span className="font-medium">{product.filterColor}</span>
							</div>
						)}
						{product.nicotineLevel && (
							<div className="flex justify-between text-sm">
								<span className="text-gray-600">Nikotin:</span>
								<span className="font-medium">{product.nicotineLevel}</span>
							</div>
						)}
						{product.tarLevel && (
							<div className="flex justify-between text-sm">
								<span className="text-gray-600">Katran:</span>
								<span className="font-medium">{product.tarLevel}</span>
							</div>
						)}
					</div>
				</CardContent>
			</Card>
		</Link>
	);
}
