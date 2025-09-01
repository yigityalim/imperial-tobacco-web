// Contentlayer tarafından oluşturulan Brand tipini import edin
import type { Brand } from "contentlayer/generated";
import Image from "next/image";
import Link from "next/link";
import React from "react";

// Marka kartı bileşeni
export const BrandCard = ({ brand }: { brand: Brand }) => {
	return (
		<Link href={brand.slug} passHref>
			<div className="flex flex-col items-center justify-center p-6 bg-white border border-gray-200 rounded-lg shadow-sm transition-all duration-300 hover:shadow-lg hover:border-davidoff-brand-color/50 cursor-pointer">
				{/* Marka Logosu */}
				<div className="relative w-24 h-24 mb-4">
					<Image
						src={brand.logo}
						alt={`${brand.brandName} Logosu`}
						layout="fill"
						objectFit="contain"
						quality={100}
					/>
				</div>

				{/* Marka Adı ve Detayları */}
				<div className="text-center">
					<h2 className="text-xl font-bold text-gray-900">{brand.title}</h2>

					{/* Açıklama */}
					{brand.description && (
						<p className="mt-2 text-sm text-gray-500 line-clamp-3">
							{brand.description}
						</p>
					)}

					{/* Kuruluş Yılı */}
					{brand.foundedYear && (
						<p className="mt-1 text-xs text-gray-400">
							Kuruluş Yılı: {brand.foundedYear}
						</p>
					)}
				</div>
			</div>
		</Link>
	);
};
