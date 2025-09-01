"use client";

import { Hash } from "lucide-react";
import NextImage, { type ImageProps } from "next/image";
import { useMDXComponent } from "next-contentlayer2/hooks";
import { Link } from "next-view-transitions";
import React from "react";
import slugify from "slugify";
import { cn } from "@/lib/utils";

export const components = {
	h1: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => {
		const text = React.Children.toArray(props.children)
			.filter((child) => typeof child === "string") // Sadece stringleri al
			.join("")
			.trim();

		const slugifiedId = slugify(text, {
			lower: true,
			strict: true,
			remove: /[*+~.()'"!:@]/g,
		});

		if (!text) {
			return null;
		}

		return (
			<div className="mb-4">
				<h1
					className={cn(
						"font-lora text-pretty scroll-mt-24 scroll-pt-24 h1 text-brand-600 dark:text-brand-500 font-medium mt-8 group flex whitespace-pre-wrap",
						className,
					)}
					id={slugifiedId}
				>
					<Link
						href={`#${slugifiedId}`}
						className="relative border-none lg:-ml-2 lg:pl-2 flex items-center"
						aria-label="Anchor"
					>
						<span className="absolute -ml-7 opacity-0 group-hover:opacity-100 hidden lg:flex size-5 items-center justify-center rounded-sm text-brand-600 dark:text-brand-300 shadow-xs border border-offgray-200/60 dark:border-offgray-600/20 dark:bg-offgray-900/30">
							<Hash />
						</span>
						<span className="inline-flex items-center [&>code]:text-[clamp(1.5rem,_1.2rem_+_1vw,_1.7rem)] [&>code]:[line-height:_1.25]">
							{text}
						</span>
					</Link>
				</h1>
			</div>
		);
	},
	h2: ({ className, children }: React.HTMLAttributes<HTMLHeadingElement>) => {
		const text = React.Children.toArray(children)
			.filter((child) => typeof child === "string") // Sadece stringleri al
			.join("")
			.trim();

		const slugifiedId = slugify(text, {
			lower: true,
			strict: true,
			remove: /[*+~.()'"!:@]/g,
		});
		if (!text) {
			return null;
		}

		return (
			<h2
				className={cn(
					"font-lora text-pretty scroll-mt-24 scroll-pt-24 h2 text-brand-600 dark:text-brand-500 font-medium mt-8 mb-4 group flex whitespace-pre-wrap",
					className,
				)}
				id={slugifiedId}
			>
				<Link
					href={`#${slugifiedId}`}
					className="relative border-none lg:-ml-2 lg:pl-2 flex items-center"
					aria-label="Anchor"
				>
					<span className="absolute -ml-7 opacity-0 group-hover:opacity-100 hidden lg:flex size-5 items-center justify-center rounded-sm text-brand-600 dark:text-brand-300 shadow-xs border border-offgray-200/60 dark:border-offgray-600/20 dark:bg-offgray-900/30">
						<Hash />
					</span>
					<span className="inline-flex items-center">{text}</span>
				</Link>
			</h2>
		);
	},
	h3: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => {
		const text = React.Children.toArray(props.children)
			.filter((child) => typeof child === "string") // Sadece stringleri al
			.join("")
			.trim();

		if (!text) {
			return null;
		}

		const slugifiedId = slugify(text, {
			lower: true,
			strict: true,
			remove: /[*+~.()'"!:@]/g,
		});

		return (
			<h3
				className={cn(
					"cursor-pointer font-heading mt-8 scroll-m-20 scroll-pt-20 text-xl font-semibold tracking-tight border-b grid-border-color mb-2 pb-1.5 [&>code]:text-xl [&>code]:line-height-1.25 hover:text-brand-600 dark:hover:text-brand-300",
					className,
				)}
				{...props}
				id={slugifiedId}
			>
				<Link
					className="relative border-none lg:-ml-2 lg:pl-2 flex items-center"
					href={`#${slugifiedId}`}
				>
					{text}
				</Link>
			</h3>
		);
	},
	h4: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
		<h4
			className={cn(
				"font-heading mt-8 scroll-m-20 scroll-pt-20 text-lg font-semibold tracking-tight",
				className,
			)}
			{...props}
		/>
	),
	h5: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
		<h5
			className={cn(
				"mt-8 scroll-m-20 scroll-pt-20 text-lg font-semibold tracking-tight",
				className,
			)}
			{...props}
		/>
	),
	h6: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
		<h6
			className={cn(
				"mt-8 scroll-m-20 scroll-pt-20 text-base font-semibold tracking-tight",
				className,
			)}
			{...props}
		/>
	),
	a: ({ className, ...props }: React.ComponentProps<typeof Link>) => {
		const isExternal =
			typeof props.href === "string" ? props.href.startsWith("http") : false;
		const classNames = cn(
			"inline text-brand-600 dark:text-brand-300 underline decoration-brand-200/20 hover:decoration-brand-600/80 dark:decoration-brand-600/20 dark:hover:decoration-brand-700/80",
			className,
		);

		if (isExternal) {
			return (
				<a
					className={classNames}
					rel="noopener noreferrer"
					target="_blank"
					{...(props as React.HTMLAttributes<HTMLAnchorElement>)}
				/>
			);
		}

		return <Link className={classNames} {...props} />;
	},
	p: ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
		<p className={cn("leading-relaxed mb-4 w-full", className)} {...props} />
	),
	ul: ({ className, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
		<ul className={cn("my-6 ml-6 list-disc", className)} {...props} />
	),
	ol: ({ className, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
		<ol
			className={cn(
				"list-decimal list-outside ml-1.5 pl-5 *:pl-1 pb-2 marker:text-sm",
				className,
			)}
			{...props}
		/>
	),
	li: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
		<li
			className={cn(
				"mb-2 break-words [&>p]:mb-2 [&>ol]:pt-3 [&>ul]:pt-3",
				className,
			)}
			{...props}
		/>
	),
	blockquote: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
		<blockquote
			className={cn(
				"mt-6 border-l-2 border-brand-600 dark:border-brand-300 pl-6 italic font-lora tracking-wider",
				className,
			)}
			{...props}
		/>
	),
	table: ({ className, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
		<div className="my-6 w-full overflow-y-auto bg-white dark:bg-offgray-1000 sh-alt border border-brand-300/30 dark:border-brand-600/20">
			<table
				className={cn(
					"relative w-full overflow-hidden border-none text-sm",
					className,
				)}
				{...props}
			/>
		</div>
	),
	tr: ({ className, ...props }: React.HTMLAttributes<HTMLTableRowElement>) => (
		<tr
			className={cn(
				"last:border-b-none m-0 border-b grid-border-color",
				className,
			)}
			{...props}
		/>
	),
	thead: ({
		className,
		...props
	}: React.HTMLAttributes<HTMLTableSectionElement>) => (
		<thead
			className={cn(
				"dark:text-gray-200 border-y bg-offgray-200 dark:bg-brand-500/20 dark:border-offgray-300/20",
				className,
			)}
			{...props}
		/>
	),
	th: ({ className, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
		<th
			className={cn(
				"bg-brand-50 dark:bg-[#3d7df514] px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right not-last:border-r grid-border-color last:border-none!",
				className,
			)}
			{...props}
		/>
	),
	td: ({ className, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
		<td
			className={cn(
				"px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right not-last:border-r grid-border-color last:border-none!",
				className,
			)}
			{...props}
		/>
	),
	pre: ({ className, ...props }: React.HTMLAttributes<HTMLPreElement>) => (
		<pre
			className={cn(
				"p-4 bg-offgray-100 dark:bg-brand-900/30 overflow-x-auto",
				className,
			)}
			{...props}
		/>
	),
	code: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
		<code
			className={cn("font-mono text-xs p-0.5 overflow-x-auto", className)}
			{...props}
		/>
	),
	Link,
	img: ({ src, alt, ...props }: ImageProps) => {
		return (
			<div className="w-full rounded-sm overflow-clip mb-4">
				<NextImage
					src={src || "/placeholder.svg"}
					alt={alt || ""}
					width={props.width ?? 800}
					height={props.height ?? 450}
					quality={100}
					priority
					className={props.className}
					{...props}
				/>
				{alt && (
					<figcaption className="px-3 py-2.5 text-xs italic dark:text-gray-200 border-t border-borderAccent dark:bg-offgray-800/10 dark:border-offgray-300/20 text-offgray">
						{alt}
					</figcaption>
				)}
			</div>
		);
	},
	hr: ({ className, ...props }: React.HTMLAttributes<HTMLHRElement>) => (
		<hr className="h-px w-full border-0 bg-accent-blue/10 dark:bg-gray-500/15 my-10" />
	),
	Cards: ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
		<div
			className={cn("grid grid-cols-1 gap-4 md:grid-cols-2", className)}
			{...props}
		/>
	),
	Card: ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
		<div
			className={cn("rounded border border-gray-200 p-4", className)}
			{...props}
		/>
	),
	CardHeader: ({
		className,
		...props
	}: React.HTMLAttributes<HTMLDivElement>) => (
		<div className={cn("font-bold text-lg mb-2", className)} {...props} />
	),
	CardTitle: ({
		className,
		...props
	}: React.HTMLAttributes<HTMLHeadingElement>) => (
		<h2 className={cn("text-xl font-semibold", className)} {...props} />
	),
	CardContent: ({
		className,
		...props
	}: React.HTMLAttributes<HTMLDivElement>) => (
		<div className={cn("text-sm text-gray-700", className)} {...props} />
	),
};

export function Mdx({
	code,
}: Readonly<{
	code: string;
}>) {
	const Component = useMDXComponent(code);

	return (
		<div className="mdx size-full">
			<Component components={components} />
		</div>
	);
}
