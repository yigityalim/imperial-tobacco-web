"use client";

import type { Brand, Category, Post, Product } from "contentlayer/generated";
import { CategoryToc, type ContentDocument } from "@/components/category-toc";

interface ContentLayoutProps {
	document: ContentDocument;
	children: React.ReactNode;
	showToc?: boolean;
	tocPosition?: "fixed" | "sticky" | "relative";
}

export function ContentLayout({
	document,
	children,
	showToc = true,
	tocPosition = "fixed",
}: ContentLayoutProps) {
	return (
		<>
			{/* Table of Contents - conditionally rendered */}
			{showToc && <CategoryToc document={document} position={tocPosition} />}

			{/* Main content area - no container here since brand page has its own */}
			<main className="">{children}</main>
		</>
	);
}

// Specialized layouts for different content types
interface BrandLayoutProps {
	brand: Brand;
	children: React.ReactNode;
	showToc?: boolean;
	tocPosition?: "fixed" | "sticky" | "relative";
}

export function BrandLayout({ brand, children, ...props }: BrandLayoutProps) {
	return (
		<ContentLayout document={brand} {...props}>
			{children}
		</ContentLayout>
	);
}

interface CategoryLayoutProps {
	category: Category;
	children: React.ReactNode;
	showToc?: boolean;
	tocPosition?: "fixed" | "sticky" | "relative";
}

export function CategoryLayout({
	category,
	children,
	...props
}: CategoryLayoutProps) {
	return (
		<ContentLayout document={category} {...props}>
			<div className="h-[36px]" />
			<div className="max-w-4xl mx-auto">{children}</div>
		</ContentLayout>
	);
}

interface ProductLayoutProps {
	product: Product;
	children: React.ReactNode;
	showToc?: boolean;
	tocPosition?: "fixed" | "sticky" | "relative";
}

export function ProductLayout({
	product,
	children,
	...props
}: ProductLayoutProps) {
	return (
		<ContentLayout document={product} {...props}>
			<div className="max-w-4xl mx-auto">
				{/* Product header */}
				<header className="mb-8">
					<div className="mb-4 flex flex-wrap gap-2 text-sm">
						<span className="font-medium text-brand-600 dark:text-brand-300">
							{product.brandName}
						</span>
						<span className="text-muted-foreground">•</span>
						<span className="text-muted-foreground">
							{product.categoryName}
						</span>
					</div>
					<h1 className="text-4xl font-bold mb-4">{product.productName}</h1>
					{product.description && (
						<p className="text-lg text-muted-foreground mb-6">
							{product.description}
						</p>
					)}
					<div className="flex flex-wrap gap-4 text-sm">
						{product.price && (
							<span className="font-semibold text-brand-600 dark:text-brand-300">
								{product.price} {product.currency}
							</span>
						)}
						{product.sku && (
							<span className="text-muted-foreground">SKU: {product.sku}</span>
						)}
						{product.packSize && (
							<span className="text-muted-foreground">
								{product.packSize} adet
							</span>
						)}
						{!product.inStock && (
							<span className="text-red-500 font-medium">Stokta Yok</span>
						)}
					</div>
				</header>
				{children}
			</div>
		</ContentLayout>
	);
}

interface PostLayoutProps {
	post: Post;
	children: React.ReactNode;
	showToc?: boolean;
	tocPosition?: "fixed" | "sticky" | "relative";
}

export function PostLayout({ post, children, ...props }: PostLayoutProps) {
	return (
		<ContentLayout document={post} {...props}>
			<div className="max-w-4xl mx-auto">
				{/* Post header */}
				<header className="mb-8 text-center">
					<h1 className="text-4xl font-bold mb-4">{post.title}</h1>
					{post.description && (
						<p className="text-lg text-muted-foreground mb-6">
							{post.description}
						</p>
					)}
					<div className="flex justify-center items-center gap-4 text-sm text-muted-foreground">
						<time dateTime={post.date}>
							{new Date(post.date).toLocaleDateString("tr-TR", {
								year: "numeric",
								month: "long",
								day: "numeric",
							})}
						</time>
						{post.authors && post.authors.length > 0 && (
							<>
								<span>•</span>
								<span>
									{post.authors.map((author) => author.name).join(", ")}
								</span>
							</>
						)}
					</div>
				</header>
				{children}
			</div>
		</ContentLayout>
	);
}

// Export types
export type {
	ContentLayoutProps,
	BrandLayoutProps,
	CategoryLayoutProps,
	ProductLayoutProps,
	PostLayoutProps,
};
