# CategoryToc Component - Universal Table of Contents

Bu component, tüm ContentLayer MDX dosya türleri (Brand, Category, Product, Post) için kullanılabilen evrensel bir Table of Contents (İçindekiler) komponentidir.

## Özellikler

- ✅ **Tüm MDX türleri desteklenir**: Brand, Category, Product, Post
- ✅ **Akıllı label sistemi**: Her doküman tipine göre uygun başlık
- ✅ **Esnek pozisyonlama**: Fixed, sticky veya relative
- ✅ **Conditional rendering**: TOC kapalıysa veya içerik yoksa gösterilmez
- ✅ **TypeScript desteği**: Full type safety
- ✅ **Özelleştirilebilir**: Custom className ve props

## Kullanım

### 1. Temel Kullanım

```tsx
import { CategoryToc } from "@/components/category-toc";
import type { Brand } from "contentlayer/generated";

function BrandPage({ brand }: { brand: Brand }) {
  return (
    <>
      <CategoryToc document={brand} />
      <main>
        {/* Brand içeriği */}
        <MDXContent code={brand.body.code} />
      </main>
    </>
  );
}
```

### 2. Specialized Components

```tsx
import { BrandToc, ProductToc, CategoryToc, PostToc } from "@/components/category-toc";

// Brand için
<BrandToc brand={brandData} />

// Product için  
<ProductToc product={productData} />

// Category için
<ContentToc category={categoryData} />

// Post için
<PostToc post={postData} />
```

### 3. Content Layout ile Kullanım

```tsx
import { BrandLayout } from "@/components/content-layout";
import { MDXContent } from "@/components/mdx-components";

export default function BrandPage({ brand }: { brand: Brand }) {
  return (
    <BrandLayout brand={brand} showToc={true} tocPosition="fixed">
      <MDXContent code={brand.body.code} />
    </BrandLayout>
  );
}
```

### 4. Özelleştirme Seçenekleri

```tsx
<CategoryToc 
  document={document}
  position="sticky"        // fixed | sticky | relative
  className="custom-class" // Additional CSS classes
/>
```

## Component Props

### CategoryTocProps

```typescript
interface CategoryTocProps {
  document: ContentDocument;    // Brand | Category | Product | Post
  className?: string;          // Ek CSS class'ları
  position?: "fixed" | "sticky" | "relative"; // Pozisyon tipi
}
```

## Otomatik Label Sistemi

Component, doküman tipine göre otomatik olarak uygun başlıkları oluşturur:

- **Brand**: "Davidoff - İçindekiler"
- **Category**: "Selected Leaf - Bu Kategoride Neler Var?"
- **Product**: "Davidoff One - Ürün Detayları"
- **Post**: "Bu Yazıda Neler Var?"

## ContentLayer Uyumluluğu

Component, ContentLayer config'inizde tanımlanan şu fieldları kullanır:

```typescript
// Ortak fields
- title
- toc (boolean)
- tableOfContents (generated)

// Brand specific
- brandName

// Category specific  
- brandName
- categoryName

// Product specific
- brandName
- categoryName  
- productName
```

## Conditional Rendering

Component şu durumlarda hiçbir şey render etmez:

1. `document.toc === false` ise
2. `document.tableOfContents?.items?.length` boşsa
3. Doküman geçersizse

## Layout Components

Content Layout component'leri TOC ile birlikte kullanım için tasarlanmıştır:

- `BrandLayout` - Brand sayfaları için
- `CategoryLayout` - Category sayfaları için  
- `ProductLayout` - Product sayfaları için
- `PostLayout` - Post sayfaları için
- `ContentLayout` - Genel kullanım için

## Örnek Page Implementation

```tsx
// app/brands/[...slug]/page.tsx
import { allBrands } from "contentlayer/generated";
import { BrandLayout } from "@/components/content-layout";
import { MDXContent } from "@/components/mdx-components";

export default function BrandPage({ params }: { params: { slug: string[] } }) {
  const brand = allBrands.find(b => b.slugAsParams === params.slug.join("/"));
  
  if (!brand) notFound();

  return (
    <BrandLayout brand={brand}>
      <MDXContent code={brand.body.code} />
    </BrandLayout>
  );
}
```

## Responsive Design

Component, tüm ekran boyutlarında çalışacak şekilde tasarlanmıştır:

- **Mobile**: Accordion tam genişlik
- **Desktop**: Centered layout
- **Backdrop**: Blur effect ile modern görünüm

## Accessibility

- Keyboard navigation desteği
- Screen reader uyumlu
- Semantic HTML yapısı
- Proper ARIA attributes

## Performance

- Client-side rendering
- Lazy evaluation
- Minimal re-renders
- Optimized scroll handling
