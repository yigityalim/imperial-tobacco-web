import { allProducts } from "contentlayer/generated";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { FeatureList } from "@/components/catalog/feature-list";
import { SpecificationTable } from "@/components/catalog/specification-table";
import { Mdx } from "@/components/mdx-components";
import { Badge } from "@/components/ui/badge";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { ImageGallery } from "@/components/ui/image-gallery";

interface ProductPageProps {
	params: Promise<{
		slug: string[];
	}>;
}

export async function generateMetadata({
	params,
}: ProductPageProps): Promise<Metadata> {
	const slug = (await params).slug.join("/");
	const product = allProducts.find((p) => p.slugAsParams === slug);

	if (!product) {
		return {};
	}

	return {
		title: `${product.productName} | ${product.categoryName} | ${product.brandName}`,
		description: product.description,
		openGraph: {
			title: `${product.productName} - ${product.brandName}`,
			description: product.description,
			images: product.cover ? [product.cover] : [],
		},
	};
}

export async function generateStaticParams() {
	return allProducts.map((product) => ({
		slug: product.slugAsParams.split("/"),
	}));
}

export default async function ProductPage({ params }: ProductPageProps) {
	const slug = (await params).slug.join("/");
	const product = allProducts.find((p) => p.slugAsParams === slug);

	if (!product || !product.published) {
		notFound();
	}

	return (
		<div className="container mx-auto px-4 py-8">
			<Breadcrumb items={product.breadcrumb} />

			{/* Product Header */}
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
				<div>
					{product.cover && (
						<div className="relative aspect-square rounded-lg overflow-hidden mb-4">
							<Image
								width={500}
								height={500}
								src={product.cover}
								alt={product.productName}
								className="w-full h-full object-cover"
							/>
						</div>
					)}
				</div>

				<div>
					<div className="mb-4">
						<h1 className="text-3xl font-bold text-gray-900 mb-2">
							{product.productName}
						</h1>
						<p className="text-lg text-gray-600">
							{product.brandName} • {product.categoryName}
						</p>
						{product.description && (
							<p className="text-gray-700 mt-2">{product.description}</p>
						)}
					</div>

					{/* Badges 
					<div className="flex flex-wrap gap-2 mb-6">
						{product.featured && <Badge variant="secondary">Öne Çıkan</Badge>}
						{product.newProduct && <Badge variant="outline">Yeni Ürün</Badge>}
						{!product.inStock && (
							<Badge variant="destructive">Stokta Yok</Badge>
						)}
						{product.inStock && <Badge variant="default">Stokta Var</Badge>}
					</div>*/}

					{/* Price 
					{product.price && (
						<div className="mb-6 p-4 bg-gray-50 rounded-lg">
							<div className="text-2xl font-bold text-gray-900">
								{product.price.toFixed(2)} {product.currency}
							</div>
							<p className="text-sm text-gray-600">
								{product.packSize} adetlik paket
							</p>
						</div>
					)}*/}

					{/* Key Specifications */}
					<div className="space-y-3 mb-6">
						{product.filterColor && (
							<div className="flex justify-between">
								<span className="font-medium text-gray-900">Filtre Rengi:</span>
								<span className="text-gray-600">{product.filterColor}</span>
							</div>
						)}
						{product.nicotineLevel && (
							<div className="flex justify-between">
								<span className="font-medium text-gray-900">Nikotin:</span>
								<span className="text-gray-600">{product.nicotineLevel}</span>
							</div>
						)}
						{product.tarLevel && (
							<div className="flex justify-between">
								<span className="font-medium text-gray-900">Katran:</span>
								<span className="text-gray-600">{product.tarLevel}</span>
							</div>
						)}
						{product.packSize && (
							<div className="flex justify-between">
								<span className="font-medium text-gray-900">Paket Boyutu:</span>
								<span className="text-gray-600">{product.packSize} adet</span>
							</div>
						)}
					</div>

					{/* SKU */}
					{product.sku && (
						<div className="text-sm text-gray-500">
							Ürün Kodu: {product.sku}
						</div>
					)}
				</div>
			</div>

			{/* Features */}
			{product.features && product.features.length > 0 && (
				<div className="mb-12">
					<h2 className="text-2xl font-bold text-gray-900 mb-6">Özellikler</h2>
					<FeatureList features={product.features} />
				</div>
			)}

			{/* Specifications */}
			{product.specifications && product.specifications.length > 0 && (
				<div className="mb-12">
					<h2 className="text-2xl font-bold text-gray-900 mb-6">
						Teknik Özellikler
					</h2>
					<SpecificationTable specifications={product.specifications} />
				</div>
			)}

			{/* Gallery
			{product.gallery && product.gallery.length > 0 && (
				<div className="mb-12">
					<h2 className="text-2xl font-bold text-gray-900 mb-6">
						Ürün Galerisi
					</h2>
					<ImageGallery images={product.gallery} />
				</div>
			)} */}

			{/* Product Content */}
			<div className="mb-12 prose prose-lg max-w-none">
				<Mdx code={product.body.code} />
			</div>

			{/* Tags */}
			{product.tags && product.tags.length > 0 && (
				<div className="mb-12">
					<h3 className="text-lg font-semibold text-gray-900 mb-3">
						Etiketler
					</h3>
					<div className="flex flex-wrap gap-2">
						{product.tags.map((tag) => (
							<Badge key={tag} variant="outline" className="text-sm">
								{tag}
							</Badge>
						))}
					</div>
				</div>
			)}
		</div>
	);
}
