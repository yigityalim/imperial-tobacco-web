import { allBrands, allCategories, allProducts } from "contentlayer/generated";
import type { Metadata } from "next";
import { QrcodeGenerator } from "@/components/qrcode-generator";
import { ProductSearch } from "@/components/search/product-search";

export const metadata: Metadata = {
	title: "Tüm Ürünler | Tütün Ürün Kataloğu",
	description: "Tüm premium tütün ürünlerimizi inceleyin ve karşılaştırın",
};

export default function AllProductsPage() {
	const publishedProducts = allProducts
		.filter((product) => product.published)
		.sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));

	const brands = Array.from(
		new Set(
			allBrands.filter((b) => b.published).map((brand) => brand.brandName),
		),
	).filter(Boolean);

	const categories = Array.from(
		new Set(
			allCategories.filter((c) => c.published).map((cat) => cat.categoryName),
		),
	).filter(Boolean);

	return (
		<div className="container mx-auto px-4 py-8">
			<QrcodeGenerator />
			<div className="mb-8">
				<h1 className="text-4xl font-bold text-gray-900 mb-4">Tüm Ürünler</h1>
				<p className="text-xl text-gray-600">
					{publishedProducts.length} adet premium tütün ürünü
				</p>
			</div>

			<ProductSearch
				products={publishedProducts}
				brands={brands}
				categories={categories}
			/>
		</div>
	);
}
