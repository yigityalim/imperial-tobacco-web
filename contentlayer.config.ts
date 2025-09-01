import {
    type ComputedFields,
    defineDocumentType,
    defineNestedType,
    type FieldDefs,
    makeSource,
} from "contentlayer2/source-files";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import rehypeUnwrapImages from "rehype-unwrap-images";
import remarkGfm from "remark-gfm";

import { getTableOfContents } from "./lib/toc";

const computedFields = {
    slug: {
        type: "string",
        resolve: (doc) => `/${doc._raw.flattenedPath}`.replace(/\/\d{2}-/g, "/").replace(/\d{2}-/g, ""),
    },
    slugAsParams: {
        type: "string",
        resolve: (doc) =>
            `${doc._raw.flattenedPath.split("/").slice(1).join("/")}`.replace(/\/\d{2}-/g, "/").replace(/\d{2}-/g, ""),
    },
    tableOfContents: {
        type: "json",
        resolve: async (post) => {
            return await getTableOfContents(post.body.raw);
        },
    },
    breadcrumb: {
        type: "json",
        resolve: (doc) => {
            const pathParts = doc._raw.flattenedPath.split("/");
            return pathParts.map((part, index) => ({
                label: part.replace(/^\d{2}-/, "").replace(/-/g, " "),
                href: `/${pathParts
                    .slice(0, index + 1)
                    .join("/")
                    .replace(/\/\d{2}-/g, "/")
                    .replace(/\d{2}-/g, "")}`,
            }));
        },
    },
} satisfies ComputedFields;

// Author nested type
const AuthorsProperties = defineNestedType(() => ({
    name: "AuthorsProperties",
    fields: {
        name: { type: "string" },
        role: { type: "string" },
        avatar: { type: "string" },
    },
}));

// Product specifications nested type
const ProductSpec = defineNestedType(() => ({
    name: "ProductSpec",
    fields: {
        name: { type: "string", required: true },
        value: { type: "string", required: true },
    },
}));

// Product features nested type
const ProductFeature = defineNestedType(() => ({
    name: "ProductFeature",
    fields: {
        title: { type: "string", required: true },
        description: { type: "string" },
        icon: { type: "string" }, // Icon name or path
    },
}));

// Gallery image nested type
const GalleryImage = defineNestedType(() => ({
    name: "GalleryImage",
    fields: {
        src: { type: "string", required: true },
        alt: { type: "string", required: true },
        caption: { type: "string" },
        thumbnail: { type: "string" },
    },
}));

const defaultFields = {
    title: {
        type: "string",
        required: true,
    },
    description: {
        type: "string",
    },
    date: {
        type: "date",
        required: true,
    },
    authors: {
        type: "list",
        of: AuthorsProperties,
        required: true,
    },
    published: {
        type: "boolean",
        default: true,
    },
    toc: {
        type: "boolean",
        default: true,
        required: false,
    },
} satisfies FieldDefs;

// Brand schema for brand pages (Davidoff vs)
export const Brand = defineDocumentType(() => ({
    name: "Brand",
    filePathPattern: "brands/**/*.mdx",
    contentType: "mdx",
    fields: {
        ...defaultFields,
        brandName: {
            type: "string",
            required: true,
        },
        logo: {
            type: "string",
            required: true,
        },
        foundedYear: {
            type: "number",
        },
        headquarters: {
            type: "string",
        },
        website: {
            type: "string",
        },
        gallery: {
            type: "list",
            of: GalleryImage,
        },
        categories: {
            type: "list",
            of: { type: "string" },
        },
    },
    computedFields,
}));

// Category schema (selected-leaf, slims, superslims vs)
export const Category = defineDocumentType(() => ({
    name: "Category",
    filePathPattern: "categories/**/*.mdx",
    contentType: "mdx",
    fields: {
        ...defaultFields,
        brandName: {
            type: "string",
            required: true,
        },
        categoryName: {
            type: "string",
            required: true,
        },
        cover: {
            type: "string",
        },
        gallery: {
            type: "list",
            of: GalleryImage,
        },
        features: {
            type: "list",
            of: ProductFeature,
        },
        targetAudience: {
            type: "string",
        },
        priceRange: {
            type: "string",
        },
    },
    computedFields,
}));

// Product schema (one, classic, gold vs)
export const Product = defineDocumentType(() => ({
    name: "Product",
    filePathPattern: "products/**/*.mdx",
    contentType: "mdx",
    fields: {
        ...defaultFields,
        brandName: {
            type: "string",
            required: true,
        },
        categoryName: {
            type: "string",
            required: true,
        },
        productName: {
            type: "string",
            required: true,
        },
        sku: {
            type: "string",
        },
        price: {
            type: "number",
        },
        currency: {
            type: "string",
            default: "TRY",
        },
        cover: {
            type: "string",
        },
        gallery: {
            type: "list",
            of: GalleryImage,
        },
        // Tütün ürünü özellikleri
        filterColor: {
            type: "string",
        },
        nicotineLevel: {
            type: "string",
        },
        tarLevel: {
            type: "string",
        },
        packSize: {
            type: "number",
            default: 20,
        },
        specifications: {
            type: "list",
            of: ProductSpec,
        },
        features: {
            type: "list",
            of: ProductFeature,
        },
        // Stok ve satış bilgileri
        inStock: {
            type: "boolean",
            default: true,
        },
        featured: {
            type: "boolean",
            default: false,
        },
        newProduct: {
            type: "boolean",
            default: false,
        },
        // SEO ve sorting
        tags: {
            type: "list",
            of: { type: "string" },
        },
        sortOrder: {
            type: "number",
            default: 0,
        },
    },
    computedFields,
}));

// Original Post schema (genel blog yazıları için)
export const Post = defineDocumentType(() => ({
    name: "Post",
    filePathPattern: "posts/**/*.mdx",
    contentType: "mdx",
    fields: {
        ...defaultFields,
        categories: {
            type: "list",
            of: { type: "string" },
        },
        cover: {
            type: "string",
        },
        tags: {
            type: "list",
            of: { type: "string" },
        },
    },
    computedFields,
}));

export default makeSource({
    contentDirPath: "./content",
    documentTypes: [Brand, Category, Product, Post],
    mdx: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
            rehypeSlug,
            rehypeUnwrapImages,
            [
                rehypeAutolinkHeadings,
                {
                    properties: {
                        className: ["subheading-anchor"],
                        ariaLabel: "Link to section",
                    },
                },
            ],
        ],
    },
});
