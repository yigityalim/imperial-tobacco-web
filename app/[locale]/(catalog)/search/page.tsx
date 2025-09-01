import { allBrands, allCategories, allProducts } from "contentlayer/generated";
import type { Metadata } from "next";
import { ProductSearch } from "@/components/search/product-search";

export const metadata: Metadata = {
	title: "Ürün Arama | Tütün Ürün Kataloğu",
	description: "Tüm tütün ürünlerimizi arayın ve filtreleyin",
};

export default function SearchPage() {
	const publishedProducts = allProducts.filter((product) => product.published);
	const brands = Array.from(
		new Set(allBrands.map((brand) => brand.brandName)),
	).filter(Boolean);
	const categories = Array.from(
		new Set(allCategories.map((cat) => cat.categoryName)),
	).filter(Boolean);

	return (
		<div className="container mx-auto px-4 py-8">
			<div className="mb-8">
				<h1 className="text-4xl font-bold text-gray-900 mb-4">Ürün Arama</h1>
				<p className="text-xl text-gray-600">
					Tüm ürünlerimizi arayın, filtreleyin ve karşılaştırın
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
