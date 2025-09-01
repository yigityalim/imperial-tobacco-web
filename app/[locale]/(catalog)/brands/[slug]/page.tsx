import { allBrands, allCategories } from "contentlayer/generated";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { CategoryCard } from "@/components/catalog/category-card";
import { BrandLayout } from "@/components/content-layout";
import { Mdx } from "@/components/mdx-components";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { ImageGallery } from "@/components/ui/image-gallery";

interface BrandPageProps {
	params: Promise<{
		slug: string;
	}>;
}

export async function generateMetadata({
	params,
}: BrandPageProps): Promise<Metadata> {
	const brand = allBrands.find(
		async (b) => b.slugAsParams === (await params).slug,
	);

	if (!brand) {
		return {};
	}

	return {
		title: `${brand.brandName} | Tütün Ürün Kataloğu`,
		description: brand.description,
		openGraph: {
			title: brand.brandName,
			description: brand.description,
			images: brand.logo ? [brand.logo] : [],
		},
	};
}

export async function generateStaticParams() {
	return allBrands.map((brand) => ({
		slug: brand.slugAsParams,
	}));
}

export default async function BrandPage({ params }: BrandPageProps) {
	const { slug } = await params;

	const brand = allBrands.find((b) => b.slugAsParams === slug);

	if (!brand || !brand.published) {
		notFound();
	}

	// Bu markanın kategorilerini bul
	const brandCategories = allCategories.filter(
		(category) =>
			category.brandName?.toLowerCase() === brand.brandName.toLowerCase() &&
			category.published,
	);

	return (
		<BrandLayout brand={brand} showToc={true} tocPosition="fixed">
			<div className="container mx-auto px-4 py-8">
				<Breadcrumb items={brand.breadcrumb} />

				{/* Brand Header */}
				<div className="mb-12">
					<div className="flex flex-col items-center gap-6 mb-6">
						{brand.logo && (
							<Image
								height={1080}
								width={1920}
								src={brand.logo}
								alt={`${brand.brandName} logo`}
								className="h-32 w-auto"
							/>
						)}
						<div>
							<h1 className="text-4xl font-bold text-gray-900">
								{brand.brandName}
							</h1>
							<p className="text-xl text-gray-600 mt-2">{brand.description}</p>
						</div>
					</div>

					{/* Brand Info */}
					<div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6 bg-gray-50 rounded-lg">
						<h1 className="text-2xl font-bold text-gray-900">
							Pratik Bilgiler
						</h1>
						{brand.foundedYear && (
							<div>
								<h3 className="font-semibold text-gray-900">Kuruluş Yılı</h3>
								<p className="text-gray-600">{brand.foundedYear}</p>
							</div>
						)}
						{brand.headquarters && (
							<div>
								<h3 className="font-semibold text-gray-900">Merkez</h3>
								<p className="text-gray-600">{brand.headquarters}</p>
							</div>
						)}
						{brand.website && (
							<div>
								<h3 className="font-semibold text-gray-900">Website</h3>
								<a
									href={brand.website}
									target="_blank"
									rel="noopener noreferrer"
									className="text-blue-600 hover:underline"
								>
									Siteyi Ziyaret Et
								</a>
							</div>
						)}
					</div>
				</div>

				{/* Gallery */}
				{brand.gallery && brand.gallery.length > 0 && (
					<div className="mb-12">
						<h2 className="text-2xl font-bold text-gray-900 mb-6">Galeri</h2>
						<ImageGallery images={brand.gallery} />
					</div>
				)}

				{/* Brand Content */}
				<div className="mb-12 prose prose-lg max-w-none">
					<Mdx code={brand.body.code} />
				</div>

				{/* Categories */}
				{brandCategories.length > 0 && (
					<div className="mb-12">
						<h2 className="text-2xl font-bold text-gray-900 mb-6">
							Ürün Kategorileri
						</h2>
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
							{brandCategories.map((category) => (
								<CategoryCard key={category._id} category={category} />
							))}
						</div>
					</div>
				)}
			</div>
		</BrandLayout>
	);
}
