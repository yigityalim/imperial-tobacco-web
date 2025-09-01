"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import type * as React from "react";
import { buttonVariants } from "@/components/ui/button";

import { cn } from "@/lib/utils";

function Dialog({
	...props
}: Readonly<React.ComponentProps<typeof DialogPrimitive.Root>>) {
	return <DialogPrimitive.Root data-slot="dialog" {...props} />;
}

function DialogTrigger({
	...props
}: React.ComponentProps<typeof DialogPrimitive.Trigger>) {
	return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />;
}

function DialogPortal({
	...props
}: Readonly<React.ComponentProps<typeof DialogPrimitive.Portal>>) {
	return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />;
}

function DialogClose({
	...props
}: React.ComponentProps<typeof DialogPrimitive.Close>) {
	return <DialogPrimitive.Close data-slot="dialog-close" {...props} />;
}

function DialogOverlay({
	className,
	...props
}: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
	return (
		<DialogPrimitive.Overlay
			className={cn(
				"z-40 fixed inset-0 bg-black/10 dark:bg-black/30 data-[state=open]:animate-dialogOverlayShow backdrop-blur-sm",
				className,
			)}
			{...props}
		/>
	);
}

function DialogContent({
	children,
	className,
	removeClose,
	...props
}: React.ComponentProps<
	typeof DialogPrimitive.Content & {
		removeClose?: boolean;
	}
>) {
	return (
		<DialogPortal>
			<DialogOverlay />
			<DialogPrimitive.Content
				className={cn(
					"z-50 fixed inset-0 m-auto h-fit w-[90vw] sm:min-w-[24rem] max-w-md bg-white dark:bg-[hsl(218,_13%,_9%)] shadow-lg dark:shadow-black/80 rounded-sm border border-offgray-200 dark:border-gray-600/20 focus:outline-hidden data-[state=open]:animate-scaleIn data-[state=closed]:animate-scaleOut",
					className,
				)}
				{...props}
			>
				{children}
				{!removeClose ? (
					<div className="p-2 border-t border-t-gray-200 dark:border-t-gray-600/20">
						<DialogClose className={buttonVariants()}>Kapat</DialogClose>
					</div>
				) : null}
			</DialogPrimitive.Content>
		</DialogPortal>
	);
}

function DialogFooter({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="dialog-footer"
			className={cn(
				"flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
				className,
			)}
			{...props}
		/>
	);
}

function DialogTitle({
	className,
	removeStyles,
	...props
}: React.ComponentProps<
	typeof DialogPrimitive.Title & {
		removeStyles?: boolean;
	}
>) {
	return (
		<DialogPrimitive.Title
			data-slot="dialog-title"
			className={cn(
				removeStyles
					? ""
					: "px-4 py-3 w-full text-brand-600 dark:text-brand-300 font-lora border-b grid-border-color",
				className,
			)}
			{...props}
		/>
	);
}

function DialogDescription({
	className,
	...props
}: React.ComponentProps<typeof DialogPrimitive.Description>) {
	return (
		<DialogPrimitive.Description
			data-slot="dialog-description"
			className={cn(
				"px-4 py-2.5 text-offgray-600 dark:text-offgray-300 text-sm",
				className,
			)}
			{...props}
		/>
	);
}

export {
	Dialog,
	DialogPortal,
	DialogOverlay,
	DialogTrigger,
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogTitle,
	DialogDescription,
};
