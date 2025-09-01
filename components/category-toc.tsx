"use client";

import type { Brand, Category, Post, Product } from "contentlayer/generated";
import { BookOpen } from "lucide-react";
import * as React from "react";
import useDimensions from "use-element-dimensions";
import { TableOfContents } from "@/components/table-of-contents";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";

type ContentDocument = Brand | Category | Product | Post;

// Helper function to determine the type of document
function getDocumentType(doc: ContentDocument): string {
	if ("brandName" in doc && "categoryName" in doc && "productName" in doc) {
		return "product";
	}
	if ("brandName" in doc && "categoryName" in doc && !("productName" in doc)) {
		return "category";
	}
	if ("brandName" in doc && !("categoryName" in doc)) {
		return "brand";
	}
	return "post";
}

// Helper function to get appropriate label based on document type
function getTocLabel(doc: ContentDocument): string {
	const docType = getDocumentType(doc);

	switch (docType) {
		case "brand":
			return `${doc.title} - İçindekiler`;
		case "category":
			return `${(doc as Category).categoryName} - Bu Kategoride Neler Var?`;
		case "product":
			return `${(doc as Product).productName} - Ürün Detayları`;
		case "post":
		default:
			return "Bu Yazıda Neler Var?";
	}
}

interface CategoryTocProps {
	document: ContentDocument;
	className?: string;
	position?: "fixed" | "sticky" | "relative";
}

export function CategoryToc({
	document,
	className = "",
	position = "fixed",
}: Readonly<CategoryTocProps>) {
	const [isOpen, setIsOpen] = React.useState<string | undefined>(undefined);
	const [{ height }, triggerRef] = useDimensions();

	React.useEffect(() => {
		if (height) {
			window.document.documentElement.style.setProperty(
				"--toc-height",
				`${height}px`,
			);
		}
	}, [height]);

	// Check if document exists first
	if (!document) {
		return null;
	}

	// Don't show TOC if it's disabled in the document or there are no contents
	if (document.toc === false || !document.tableOfContents?.items?.length) {
		return null;
	}

	const positionClasses = {
		fixed: "fixed top-(--header-height) inset-x-0 z-50",
		sticky: "sticky top-(--header-height) z-40",
		relative: "relative",
	};

	return (
		<div
			className={`w-full mx-auto backdrop-blur-md dark:backdrop-blur-xl flex items-center justify-center bg-nav-color ${positionClasses[position]} ${className}`}
		>
			<Accordion
				type="single"
				collapsible
				value={isOpen}
				onValueChange={setIsOpen}
			>
				<AccordionItem value="item-1">
					<AccordionTrigger className="px-4" ref={triggerRef}>
						<div className="flex items-center">
							<BookOpen className="mr-2 size-4 icon-base" />
							<span className="text-sm font-medium">
								{getTocLabel(document)}
							</span>
						</div>
					</AccordionTrigger>
					<AccordionContent className="px-4">
						<TableOfContents
							onValueChange={setIsOpen}
							toc={document.tableOfContents}
						/>
					</AccordionContent>
				</AccordionItem>
			</Accordion>
		</div>
	);
}

// Specialized components for different document types with better naming
export function BrandToc({
	brand,
	...props
}: { brand: Brand } & Omit<CategoryTocProps, "document">) {
	return <CategoryToc document={brand} {...props} />;
}

export function ProductToc({
	product,
	...props
}: { product: Product } & Omit<CategoryTocProps, "document">) {
	return <CategoryToc document={product} {...props} />;
}

export function PostToc({
	post,
	...props
}: { post: Post } & Omit<CategoryTocProps, "document">) {
	return <CategoryToc document={post} {...props} />;
}

export function ContentToc({
	category,
	...props
}: { category: Category } & Omit<CategoryTocProps, "document">) {
	return <CategoryToc document={category} {...props} />;
}

// Export types for external use
export type { ContentDocument, CategoryTocProps };
