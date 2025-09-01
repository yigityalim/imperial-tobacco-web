"use client";

import type * as React from "react";
import { Drawer as DrawerPrimitive } from "vaul";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Drawer = ({
	shouldScaleBackground = true,
	...props
}: React.ComponentProps<typeof DrawerPrimitive.Root>) => (
	<DrawerPrimitive.Root
		data-slot="drawer-root"
		shouldScaleBackground={shouldScaleBackground}
		setBackgroundColorOnScale={false}
		{...props}
	/>
);

const DrawerNested = (
	props: React.ComponentProps<typeof DrawerPrimitive.NestedRoot>,
) => <DrawerPrimitive.NestedRoot data-slot="drawer-nested-root" {...props} />;

const DrawerTrigger = DrawerPrimitive.Trigger;

const DrawerPortal = DrawerPrimitive.Portal;

const DrawerClose = ({
	className,
	removeStyles,
	...props
}: React.ComponentProps<typeof DrawerPrimitive.Close> & {
	removeStyles?: boolean;
}) => (
	<DrawerPrimitive.Close
		data-slot="drawer-close"
		className={cn(removeStyles ? "" : buttonVariants(), className)}
		{...props}
	/>
);

function DrawerOverlay({
	className,
	...props
}: React.ComponentProps<typeof DrawerPrimitive.Overlay>) {
	return (
		<DrawerPrimitive.Overlay
			data-slot="drawer-portal"
			className={cn(
				"fixed inset-0 z-202 bg-black/40 backdrop-blur-sm",
				className,
			)}
			{...props}
		/>
	);
}

function DrawerContent({
	className,
	children,
	z,
	direction,
	...props
}: React.ComponentProps<typeof DrawerPrimitive.Content> & {
	z?: number;
	direction?: React.ComponentProps<typeof Drawer>["direction"];
}) {
	return (
		<DrawerPortal>
			<DrawerOverlay
				style={{
					zIndex: z ? z - 1 : 202,
				}}
			/>
			<DrawerPrimitive.Content
				className={cn(
					"border-t-offgray-300 dark:border-t-offgray-950 fixed right-0 bottom-0 left-0 z-203 mt-24 flex flex-col rounded-t-[10px] border-t bg-white outline-none dark:bg-offgray-950 [hsl(218,_13%,_12%)]",
					className,
					{
						"right-0 bottom-0 left-0": direction === "bottom",
						"right-0 top-0 left-0": direction === "top",
						"right-2 top-2 bottom-2": direction === "right",
						"left-2 top-2 bottom-2": direction === "left",
					},
				)}
				style={{
					zIndex: z ?? 203,
				}}
				{...props}
			>
				{children}
			</DrawerPrimitive.Content>
		</DrawerPortal>
	);
}

const DrawerHeader = ({
	className,
	...props
}: React.HTMLAttributes<HTMLDivElement>) => (
	<div
		className={cn(
			"w-full flex gap-1.5 p-4 text-left border-b border-b-brand-500 items-center justify-between",
			className,
		)}
		{...props}
	/>
);

const DrawerFooter = ({
	className,
	...props
}: React.HTMLAttributes<HTMLDivElement>) => (
	<div
		className={cn(
			"mt-auto flex flex-col gap-4 p-4 border-t border-brand-50 dark:border-brand-500/5",
			className,
		)}
		{...props}
	/>
);

const DrawerTitle = ({
	className,
	...props
}: React.ComponentProps<typeof DrawerPrimitive.Title>) => (
	<DrawerPrimitive.Title
		className={cn("font-semibold tracking-tight", className)}
		{...props}
	/>
);

const DrawerDescription = ({
	className,
	...props
}: React.ComponentProps<typeof DrawerPrimitive.Description>) => (
	<DrawerPrimitive.Description
		className={cn("text-sm", className)}
		{...props}
	/>
);

export {
	Drawer,
	DrawerNested,
	DrawerPortal,
	DrawerOverlay,
	DrawerTrigger,
	DrawerClose,
	DrawerContent,
	DrawerHeader,
	DrawerFooter,
	DrawerTitle,
	DrawerDescription,
};
