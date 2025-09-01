import { allCategories, allProducts } from "contentlayer/generated";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { FeatureList } from "@/components/catalog/feature-list";
import { ProductCard } from "@/components/catalog/product-card";
import { CategoryLayout } from "@/components/content-layout";
import { Mdx } from "@/components/mdx-components";
import { QrcodeGenerator } from "@/components/qrcode-generator";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { ImageGallery } from "@/components/ui/image-gallery";

interface CategoryPageProps {
	params: Promise<{
		slug: string[];
	}>;
}

export async function generateMetadata({
	params,
}: CategoryPageProps): Promise<Metadata> {
	const slug = (await params).slug.join("/");
	const category = allCategories.find(
		(c) => c.slugAsParams.split("/")[1] === slug,
	);

	if (!category) {
		return {};
	}

	return {
		title: `${category.categoryName} | ${category.brandName}`,
		description: category.description,
		openGraph: {
			title: `${category.categoryName} - ${category.brandName}`,
			description: category.description,
			images: category.cover ? [category.cover] : [],
		},
	};
}

async function generateStaticParams() {
	return allCategories.map((category) => ({
		slug: category.slugAsParams.split("/")[1],
	}));
}

export default async function CategoryPage({ params }: CategoryPageProps) {
	const slug = (await params).slug.join("/");
	const category = allCategories.find((c) => c.slugAsParams === slug);

	console.log("ALL_CATEGORIES", allCategories);
	console.log("CATEGORY", category);

	if (!category || !category.published) {
		notFound();
	}

	// Bu kategorinin ürünlerini bul
	const categoryProducts = allProducts
		.filter(
			(product) =>
				product.brandName?.toLowerCase() ===
					category.brandName?.toLowerCase() &&
				product.categoryName?.toLowerCase() ===
					category.categoryName?.toLowerCase() &&
				product.published,
		)
		.sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));

	return (
		<CategoryLayout category={category} tocPosition="fixed">
			<QrcodeGenerator />
			<div className="container mx-auto px-4 py-8">
				{/*<Breadcrumb items={category.breadcrumb} /> */}

				{/* Category Header */}
				<div className="mb-12">
					<div className="mb-6">
						<h1 className="text-4xl font-bold text-gray-900 mb-2">
							{category.categoryName}
						</h1>
						<p className="text-lg text-gray-600">
							{category.brandName} • {category.description}
						</p>
					</div>

					{category.cover && (
						<div className="relative h-64 md:h-96 rounded-lg overflow-hidden mb-6">
							<Image
								width={500}
								height={300}
								src={category.cover}
								alt={category.categoryName}
								className="w-full h-full object-cover"
							/>
						</div>
					)}

					{/* Category Info */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-gray-50 rounded-lg">
						{category.targetAudience && (
							<div>
								<h3 className="font-semibold text-gray-900">Hedef Kitle</h3>
								<p className="text-gray-600">{category.targetAudience}</p>
							</div>
						)}
						{category.priceRange && (
							<div>
								<h3 className="font-semibold text-gray-900">Fiyat Aralığı</h3>
								<p className="text-gray-600">{category.priceRange}</p>
							</div>
						)}
					</div>
				</div>

				{/* Features */}
				{category.features && category.features.length > 0 && (
					<div className="mb-12">
						<h2 className="text-2xl font-bold text-gray-900 mb-6">
							Özellikler
						</h2>
						<FeatureList features={category.features} />
					</div>
				)}

				{/* Gallery */}
				{category.gallery && category.gallery.length > 0 && (
					<div className="mb-12">
						<h2 className="text-2xl font-bold text-gray-900 mb-6">Galeri</h2>
						<ImageGallery images={category.gallery} />
					</div>
				)}

				{/* Category Content */}
				<div className="mb-12 prose prose-lg max-w-none">
					<Mdx code={category.body.code} />
				</div>

				{/* Products */}
				{categoryProducts.length > 0 && (
					<div className="mb-12">
						<h2 className="text-2xl font-bold text-gray-900 mb-6">Ürünler</h2>
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
							{categoryProducts.map((product) => (
								<ProductCard key={product._id} product={product} />
							))}
						</div>
					</div>
				)}
			</div>
		</CategoryLayout>
	);
}
