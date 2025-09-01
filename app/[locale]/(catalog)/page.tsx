import { allBrands, allCategories, allProducts } from "contentlayer/generated";
import {
	ArrowRight,
	Award,
	Building2,
	Grid3X3,
	Package,
	Star,
	TrendingUp,
} from "lucide-react";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { BrandCard } from "@/components/brand-card";
import { CategoryCard } from "@/components/catalog/category-card";
import { ProductCard } from "@/components/catalog/product-card";
import { QrcodeGenerator } from "@/components/qrcode-generator";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";

export const metadata: Metadata = {
	title: "Tütün Ürün Kataloğu | Premium Tütün Markaları",
	description:
		"Davidoff ve diğer premium tütün markalarının resmi ürün kataloğu. Kaliteli tütün ürünlerini keşfedin.",
	openGraph: {
		title: "Tütün Ürün Kataloğu",
		description: "Premium tütün markalarının resmi distribütörü",
		images: ["/og-image.jpg"],
	},
};

export default async function Home() {
	const t = await getTranslations("pages.home");

	const publishedBrands = allBrands
		.filter((brand) => brand.published)
		.slice(0, 3);
	const publishedCategories = allCategories
		.filter((category) => category.published)
		.slice(0, 6);
	const featuredProducts = allProducts
		.filter((product) => product.published && product.featured)
		.slice(0, 6);
	const newProducts = allProducts
		.filter((product) => product.published && product.newProduct)
		.slice(0, 4);

	// İstatistikler
	const stats = {
		totalBrands: allBrands.filter((b) => b.published).length,
		totalCategories: allCategories.filter((c) => c.published).length,
		totalProducts: allProducts.filter((p) => p.published).length,
		inStockProducts: allProducts.filter((p) => p.published && p.inStock).length,
	};

	return (
		<div className="min-h-screen">
			{/* Hero Section */}
			<section className="relative">
				<div className="absolute inset-0 bg-foreground" />
				<div className="relative container mx-auto px-4 py-24 lg:py-32">
					<div className="max-w-4xl mx-auto text-center">
						<Badge
							variant="outline"
							className="mb-6 text-white border-white/30"
						>
							<Award className="h-4 w-4 mr-2" />
							{t("hero.badge")}
						</Badge>

						<h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
							{t("hero.title1")}
							<span className="text-brand-500 block">{t("hero.title2")}</span>
						</h1>

						<p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
							{t("hero.description")}
						</p>

						<div className="flex flex-col sm:flex-row gap-4 justify-center">
							<Button
								size="lg"
								asChild
								className="text-lg px-8 text-white"
								variant="secondary"
							>
								<Link href="/brands">
									<Building2 className="h-5 w-5 mr-2" />
									{t("hero.exploreBrands")}
								</Link>
							</Button>

							<Button size="lg" variant="outline" asChild>
								<Link href="/products">
									<Package className="h-5 w-5 mr-2" />
									{t("hero.allProducts")}
								</Link>
							</Button>
						</div>
					</div>
				</div>
			</section>

			{/* Stats Section */}
			<section className="py-16 bg-white border-b">
				<div className="container mx-auto px-4">
					<div className="grid grid-cols-2 md:grid-cols-4 gap-8">
						<div className="text-center">
							<div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
								{stats.totalBrands}
							</div>
							<div className="text-gray-600">{t("stats.brands")}</div>
						</div>
						<div className="text-center">
							<div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
								{stats.totalCategories}
							</div>
							<div className="text-gray-600">{t("stats.categories")}</div>
						</div>
						<div className="text-center">
							<div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
								{stats.totalProducts}
							</div>
							<div className="text-gray-600">{t("stats.products")}</div>
						</div>
						<div className="text-center">
							<div className="text-3xl md:text-4xl font-bold text-green-600 mb-2">
								{stats.inStockProducts}
							</div>
							<div className="text-gray-600">{t("stats.inStock")}</div>
						</div>
					</div>
				</div>
			</section>

			{/* Featured Brands Section */}
			<section className="py-16 bg-gray-50">
				<div className="container mx-auto px-4">
					<div className="text-center mb-12">
						<h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
							{t("brands.title")}
						</h2>
						<p className="text-xl text-gray-600 max-w-2xl mx-auto">
							{t("brands.description")}
						</p>
					</div>

					{publishedBrands.length > 0 && (
						<div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
							{publishedBrands.map((brand) => (
								<BrandCard key={brand._id} brand={brand} />
							))}
						</div>
					)}

					<div className="text-center">
						<Button size="lg" variant="outline" asChild>
							<Link href="/brands">
								{t("brands.viewAll")}
								<ArrowRight className="h-4 w-4 ml-2" />
							</Link>
						</Button>
					</div>
				</div>
			</section>

			{/* Product Categories Section */}
			<section className="py-16 bg-white">
				<div className="container mx-auto px-4">
					<div className="text-center mb-12">
						<h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
							{t("categories.title")}
						</h2>
						<p className="text-xl text-gray-600 max-w-2xl mx-auto">
							{t("categories.description")}
						</p>
					</div>

					{publishedCategories.length > 0 && (
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
							{publishedCategories.map((category) => (
								<CategoryCard key={category._id} category={category} />
							))}
						</div>
					)}

					<div className="text-center">
						<Button size="lg" variant="outline" asChild>
							<Link href="/categories">
								<Grid3X3 className="h-4 w-4 mr-2" />
								{t("categories.viewAll")}
							</Link>
						</Button>
					</div>
				</div>
			</section>

			{/* Featured Products Section */}
			{featuredProducts.length > 0 && (
				<section className="py-16 bg-gray-50">
					<div className="container mx-auto px-4">
						<div className="text-center mb-12">
							<div className="flex items-center justify-center gap-2 mb-4">
								<Star className="h-6 w-6 text-yellow-500" />
								<h2 className="text-3xl md:text-4xl font-bold text-gray-900">
									{t("featuredProducts.title")}
								</h2>
							</div>
							<p className="text-xl text-gray-600 max-w-2xl mx-auto">
								{t("featuredProducts.description")}
							</p>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
							{featuredProducts.map((product) => (
								<ProductCard key={product._id} product={product} />
							))}
						</div>

						<div className="text-center">
							<Button size="lg" variant="outline" asChild>
								<Link href="/products">
									{t("featuredProducts.viewAll")}
									<ArrowRight className="h-4 w-4 ml-2" />
								</Link>
							</Button>
						</div>
					</div>
				</section>
			)}

			{/* New Products Section */}
			{newProducts.length > 0 && (
				<section className="py-16 bg-white">
					<div className="container mx-auto px-4">
						<div className="text-center mb-12">
							<div className="flex items-center justify-center gap-2 mb-4">
								<TrendingUp className="h-6 w-6 text-green-500" />
								<h2 className="text-3xl md:text-4xl font-bold text-gray-900">
									{t("newProducts.title")}
								</h2>
							</div>
							<p className="text-xl text-gray-600 max-w-2xl mx-auto">
								{t("newProducts.description")}
							</p>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
							{newProducts.map((product) => (
								<ProductCard key={product._id} product={product} />
							))}
						</div>
					</div>
				</section>
			)}

			{/* CTA Section */}
			<section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
				<div className="container mx-auto px-4 text-center">
					<h2 className="text-3xl md:text-4xl font-bold mb-4">
						{t("cta.title")}
					</h2>
					<p className="text-xl mb-8 max-w-2xl mx-auto text-blue-100">
						{t("cta.description")}
					</p>
					<div className="flex flex-col sm:flex-row gap-4 justify-center">
						<Button size="lg" variant="secondary" asChild>
							<Link href="/search">
								<Package className="h-5 w-5 mr-2" />
								{t("cta.search")}
							</Link>
						</Button>
						<Button
							size="lg"
							variant="outline"
							asChild
							className="border-white/30 text-white hover:bg-white/10"
						>
							<Link href="/contact">{t("cta.contact")}</Link>
						</Button>
					</div>
				</div>
			</section>
		</div>
	);
}
