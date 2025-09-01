import { allBrands } from "contentlayer/generated";
import type { Metadata } from "next";
import { BrandCard } from "@/components/catalog/brand-card";

export const metadata: Metadata = {
	title: "Markalarımız | Tütün Ürün Kataloğu",
	description: "Premium tütün markalarımızı keşfedin",
};

export default function BrandsPage() {
	const publishedBrands = allBrands.filter((brand) => brand.published);

	return (
		<div className="container mx-auto px-4 py-8">
			<QrcodeGenerator />
			<div className="mb-8">
				<h1 className="text-4xl font-bold text-gray-900 mb-4">Markalarımız</h1>
				<p className="text-xl text-gray-600">
					Premium tütün markalarımızı ve ürün gamlarını keşfedin
				</p>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{publishedBrands.map((brand) => (
					<BrandCard key={brand._id} brand={brand} />
				))}
			</div>
		</div>
	);
}
