"use client";

import type { Product } from "contentlayer/generated";
import { Filter, Search, SortAsc, SortDesc } from "lucide-react";
import { useMemo, useState } from "react";
import { ProductCard } from "@/components/catalog/product-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

interface ProductSearchProps {
	products: Product[];
	brands?: string[];
	categories?: string[];
}

export function ProductSearch({
	products,
	brands = [],
	categories = [],
}: ProductSearchProps) {
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedBrand, setSelectedBrand] = useState<string>("all");
	const [selectedCategory, setSelectedCategory] = useState<string>("all");
	const [sortBy, setSortBy] = useState<string>("name");
	const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

	const filteredAndSortedProducts = useMemo(() => {
		const filtered = products.filter((product) => {
			const matchesSearch =
				!searchTerm ||
				product.productName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
				product.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
				product.tags?.some((tag) =>
					tag.toLowerCase().includes(searchTerm.toLowerCase()),
				);

			const matchesBrand =
				selectedBrand === "all" ||
				product.brandName?.toLowerCase() === selectedBrand.toLowerCase();

			const matchesCategory =
				selectedCategory === "all" ||
				product.categoryName?.toLowerCase() === selectedCategory.toLowerCase();

			return (
				matchesSearch && matchesBrand && matchesCategory && product.published
			);
		});

		// Sıralama
		filtered.sort((a, b) => {
			let aValue, bValue;

			switch (sortBy) {
				case "price":
					aValue = a.price || 0;
					bValue = b.price || 0;
					break;
				case "name":
					aValue = a.productName?.toLowerCase() || "";
					bValue = b.productName?.toLowerCase() || "";
					return sortOrder === "asc"
						? aValue.localeCompare(bValue, "tr")
						: bValue.localeCompare(aValue, "tr");
				case "date":
					aValue = new Date(a.date).getTime();
					bValue = new Date(b.date).getTime();
					break;
				default:
					aValue = a.sortOrder || 0;
					bValue = b.sortOrder || 0;
			}

			if (typeof aValue === "number" && typeof bValue === "number") {
				return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
			}

			return 0;
		});

		return filtered;
	}, [
		products,
		searchTerm,
		selectedBrand,
		selectedCategory,
		sortBy,
		sortOrder,
	]);

	return (
		<div className="space-y-6">
			{/* Search and Filters */}
			<div className="bg-white p-6 rounded-lg border shadow-sm">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
					{/* Search */}
					<div className="relative lg:col-span-2">
						<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
						<Input
							placeholder="Ürün ara..."
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							className="pl-10"
						/>
					</div>

					{/* Brand Filter */}
					<Select value={selectedBrand} onValueChange={setSelectedBrand}>
						<SelectTrigger>
							<SelectValue placeholder="Marka" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="all">Tüm Markalar</SelectItem>
							{brands.map((brand) => (
								<SelectItem key={brand} value={brand.toLowerCase()}>
									{brand}
								</SelectItem>
							))}
						</SelectContent>
					</Select>

					{/* Category Filter */}
					<Select value={selectedCategory} onValueChange={setSelectedCategory}>
						<SelectTrigger>
							<SelectValue placeholder="Kategori" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="all">Tüm Kategoriler</SelectItem>
							{categories.map((category) => (
								<SelectItem key={category} value={category.toLowerCase()}>
									{category}
								</SelectItem>
							))}
						</SelectContent>
					</Select>

					{/* Sort */}
					<div className="flex gap-2">
						<Select value={sortBy} onValueChange={setSortBy}>
							<SelectTrigger className="flex-1">
								<SelectValue />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="name">İsim</SelectItem>
								<SelectItem value="price">Fiyat</SelectItem>
								<SelectItem value="date">Tarih</SelectItem>
								<SelectItem value="order">Sıralama</SelectItem>
							</SelectContent>
						</Select>

						<Button
							variant="outline"
							size="sm"
							onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
							className="px-3"
						>
							{sortOrder === "asc" ? (
								<SortAsc className="h-4 w-4" />
							) : (
								<SortDesc className="h-4 w-4" />
							)}
						</Button>
					</div>
				</div>
			</div>

			{/* Results */}
			<div>
				<div className="flex justify-between items-center mb-4">
					<h3 className="text-lg font-semibold text-gray-900">
						Ürünler ({filteredAndSortedProducts.length})
					</h3>
					{searchTerm && (
						<Button
							variant="outline"
							size="sm"
							onClick={() => {
								setSearchTerm("");
								setSelectedBrand("all");
								setSelectedCategory("all");
							}}
						>
							Filtreleri Temizle
						</Button>
					)}
				</div>

				{filteredAndSortedProducts.length > 0 ? (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{filteredAndSortedProducts.map((product) => (
							<ProductCard key={product._id} product={product} />
						))}
					</div>
				) : (
					<div className="text-center py-12">
						<div className="text-gray-400 mb-4">
							<Search className="h-12 w-12 mx-auto" />
						</div>
						<h3 className="text-lg font-medium text-gray-900 mb-2">
							Ürün bulunamadı
						</h3>
						<p className="text-gray-600">
							Arama kriterlerinizi değiştirmeyi deneyin
						</p>
					</div>
				)}
			</div>
		</div>
	);
}
