"use client";

import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import type * as React from "react";

import { cn } from "@/lib/utils";

function Accordion({
	className,
	...props
}: React.ComponentProps<typeof AccordionPrimitive.Root>) {
	return (
		<AccordionPrimitive.Root
			data-slot="accordion"
			className={cn("w-full", className)}
			{...props}
		/>
	);
}

function AccordionItem({
	className,
	...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
	return (
		<AccordionPrimitive.Item
			data-slot="accordion-item"
			className={cn(
				"w-full border-b border-brand-300/50 dark:border-brand-500/10",
				className,
			)}
			{...props}
		/>
	);
}

function AccordionTrigger({
	className,
	children,
	removeIcon,
	...props
}: React.ComponentProps<
	typeof AccordionPrimitive.Trigger & { removeIcon?: boolean }
>) {
	return (
		<AccordionPrimitive.Trigger
			data-slot="accordion-trigger"
			className={cn(
				"w-full flex flex-1 items-center justify-between py-2 text-sm font-medium transition-all duration-300 text-left [&[data-state=open]>svg]:rotate-180",
				className,
			)}
			{...props}
		>
			{children}
			{!removeIcon && (
				<ChevronDown className="shrink-0 icon-base transition-transform ml-2 duration-200" />
			)}
		</AccordionPrimitive.Trigger>
	);
}

function AccordionContent({
	className,
	children,
	...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
	return (
		<AccordionPrimitive.Content
			data-slot="accordion-content"
			className="overflow-hidden text-sm data-[state=closed]:animate-slideUp data-[state=open]:animate-slideDown data-[state=closed]:animate-blurOpen data-[state=open]:animate-blurClose"
			{...props}
		>
			<div className={cn("pt-0 pb-4", className)}>{children}</div>
		</AccordionPrimitive.Content>
	);
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
