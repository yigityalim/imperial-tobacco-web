import { allBrands, allCategories, allProducts } from "contentlayer/generated";

export type Menu = {
    id: string;
    name: string;
    description: string;
    href: string;
    children?: Menu[];
};

// Get all brands and create simplified brand menu structure (only brand names, no children)
const brandMenuItems = allBrands
    .filter((brand) => brand.published)
    .sort((a, b) => a.brandName.localeCompare(b.brandName))
    .map((brand) => ({
        id: `brand-${brand.brandName.toLowerCase().replace(/\s+/g, '-')}`,
        name: brand.brandName,
        description: brand.description || `${brand.brandName} markası`,
        href: brand.slug,
        // No children for mobile navigation simplicity
    }));

// Get detailed brand menu for desktop navigation (with categories and products)
const detailedBrandMenuItems = allBrands
    .filter((brand) => brand.published)
    .sort((a, b) => a.brandName.localeCompare(b.brandName))
    .map((brand) => {
        // Get categories for this brand
        const brandCategories = allCategories
            .filter((category) =>
                category.brandName === brand.brandName && category.published
            )
            .sort((a, b) => a.categoryName.localeCompare(b.categoryName))
            .map((category) => {
                // Get products for this category
                const categoryProducts = allProducts
                    .filter((product) =>
                        product.brandName === brand.brandName &&
                        product.categoryName === category.categoryName &&
                        product.published
                    )
                    .sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0))
                    .slice(0, 5) // Limit to 5 products per category for desktop menu
                    .map((product) => ({
                        id: `product-${product.sku || product.productName}`,
                        name: product.productName,
                        description: product.description || `${product.productName} - ${product.price ? `${product.price} ${product.currency}` : 'Premium Quality'}`,
                        href: product.slug,
                    }));

                return {
                    id: `category-${category.categoryName.toLowerCase().replace(/\s+/g, '-')}`,
                    name: category.categoryName,
                    description: category.description || `${category.categoryName} kategorisi`,
                    href: category.slug,
                    children: categoryProducts.length > 0 ? categoryProducts : undefined,
                };
            });

        return {
            id: `brand-${brand.brandName.toLowerCase().replace(/\s+/g, '-')}`,
            name: brand.brandName,
            description: brand.description || `${brand.brandName} markası`,
            href: brand.slug,
            children: brandCategories.length > 0 ? brandCategories : undefined,
        };
    });

// Create main menu structure (mobile - simplified)
export const menu = [
    {
        id: "brands",
        name: "Markalar",
        description: "Tüm premium markalarımız",
        href: "/brands",
        children: brandMenuItems,
    },
    {
        id: "categories",
        name: "Kategoriler",
        description: "Ürün kategorilerimiz",
        href: "/categories",
        children: allCategories
            .filter((category) => category.published)
            .sort((a, b) => a.categoryName.localeCompare(b.categoryName))
            .map((category) => ({
                id: `nav-category-${category.categoryName.toLowerCase().replace(/\s+/g, '-')}`,
                name: `${category.brandName} ${category.categoryName}`,
                description: category.description || `${category.categoryName} kategorisi`,
                href: category.slug,
            })),
    },
    {
        id: "products",
        name: "Ürünler",
        description: "Tüm ürünlerimiz",
        href: "/products",
        children: allProducts
            .filter((product) => product.published && product.featured)
            .sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0))
            .slice(0, 10) // Limit to 10 featured products in menu
            .map((product) => ({
                id: `nav-product-${product.sku || product.productName}`,
                name: `${product.brandName} ${product.productName}`,
                description: product.description || `${product.productName} - ${product.price ? `${product.price} ${product.currency}` : 'Premium Quality'}`,
                href: product.slug,
            })),
    },
] satisfies Menu[];

// Create desktop menu structure (detailed with nested items)
export const desktopMenu = [
    {
        id: "brands",
        name: "Markalar",
        description: "Tüm premium markalarımız",
        href: "/brands",
        children: detailedBrandMenuItems,
    },
    {
        id: "categories",
        name: "Kategoriler",
        description: "Ürün kategorilerimiz",
        href: "/categories",
        children: allCategories
            .filter((category) => category.published)
            .sort((a, b) => a.categoryName.localeCompare(b.categoryName))
            .map((category) => ({
                id: `nav-category-${category.categoryName.toLowerCase().replace(/\s+/g, '-')}`,
                name: `${category.brandName} ${category.categoryName}`,
                description: category.description || `${category.categoryName} kategorisi`,
                href: category.slug,
            })),
    },
    {
        id: "products",
        name: "Ürünler",
        description: "Tüm ürünlerimiz",
        href: "/products",
        children: allProducts
            .filter((product) => product.published && product.featured)
            .sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0))
            .slice(0, 8) // Limit to 8 featured products in desktop menu
            .map((product) => ({
                id: `nav-product-${product.sku || product.productName}`,
                name: `${product.brandName} ${product.productName}`,
                description: product.description || `${product.productName} - ${product.price ? `${product.price} ${product.currency}` : 'Premium Quality'}`,
                href: product.slug,
            })),
    },
] satisfies Menu[];

// Export menu items for navigation components
export const getMenuItems = () => menu; // Mobile menu - simplified
export const getDesktopMenuItems = () => desktopMenu; // Desktop menu - detailed

export type MenuItem = (typeof menu)[0];
export type DesktopMenuItem = (typeof desktopMenu)[0];