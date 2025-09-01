import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export function getBaseUrl() {
    if (typeof window !== "undefined") {
        return window.location.origin;
    }

    if (process.env.NODE_ENV === "development") {
        return "http://localhost:3000";
    }

    if (process.env.VERCEL_URL) {
        return `https://${process.env.VERCEL_URL}`;
    }

    return "https://nextjs-gallery-neon.vercel.app";
}

export function filterProductsByBrand<T extends { brandName?: string; published?: boolean }>(products: T[], brandName: string) {
    return products.filter(product =>
        product.brandName?.toLowerCase() === brandName.toLowerCase() &&
        product.published
    );
}

export function filterProductsByCategory<T extends { categoryName?: string; published?: boolean }>(products: T[], categoryName: string) {
    return products.filter(product =>
        product.categoryName?.toLowerCase() === categoryName.toLowerCase() &&
        product.published
    );
}

export function sortProductsByPrice<T extends { price?: number }>(products: T[], order: 'asc' | 'desc' = 'asc') {
    return products.sort((a, b) => {
        const priceA = a.price || 0;
        const priceB = b.price || 0;
        return order === 'asc' ? priceA - priceB : priceB - priceA;
    });
}

export function sortProductsByName<T extends { productName?: string }>(products: T[], order: 'asc' | 'desc' = 'asc') {
    return products.sort((a, b) => {
        const nameA = a.productName?.toLowerCase() || '';
        const nameB = b.productName?.toLowerCase() || '';
        return order === 'asc'
            ? nameA.localeCompare(nameB, 'tr')
            : nameB.localeCompare(nameA, 'tr');
    });
}

export function sortProductsBySortOrder<T extends { sortOrder?: number }>(products: T[]) {
    return products.sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));
}