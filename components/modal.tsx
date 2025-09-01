"use client";

import type { DialogProps } from "@radix-ui/react-dialog";
import React from "react";
import { useMediaQuery } from "usehooks-ts";
import { Spinner } from "@/components/spinner";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/ui/drawer";
import { cn } from "@/lib/utils";

export interface ModalProps extends DialogProps {
	header:
		| string
		| ((
				titleComponent: typeof DialogTitle,
				descriptionComponent: typeof DialogDescription,
		  ) => React.ReactNode);
	content: React.ReactNode;
	trigger?: React.ReactNode;
	contentClassName?: string;
	close: React.ReactNode;
	isOpen?: boolean;
	setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

export function Modal({
	content,
	header,
	trigger,
	close,
	contentClassName,
	isOpen,
	setOpen,
	...props
}: Readonly<ModalProps>) {
	const [mounted, setMounted] = React.useState(false);
	const isMobile = useMediaQuery("(max-width: 768px)");

	React.useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted)
		return (
			<Button
				className="w-full md:w-fit inline-flex items-center justify-center"
				size="sm"
				disabled
			>
				<Spinner />
				<span className="md:inline-flex items-center justify-start">
					Bu sayfanın QR Kodunu oluşturun
				</span>
			</Button>
		);

	const renderHeader = () => {
		if (typeof header === "string") {
			return (
				<>
					<DialogTitle>{header}</DialogTitle>
					<DialogDescription className="sr-only">{header}</DialogDescription>
				</>
			);
		}
		return header(DialogTitle, DialogDescription);
	};

	const renderTrigger = () => {
		if (typeof trigger === "string") {
			return <Button className="w-full!">{trigger}</Button>;
		}
		return trigger;
	};

	if (isMobile) {
		return (
			<Drawer
				{...props}
				shouldScaleBackground={false}
				open={isOpen ?? undefined}
				onOpenChange={setOpen ?? undefined}
			>
				<DrawerTrigger asChild>{renderTrigger()}</DrawerTrigger>
				<DrawerContent className={cn("overflow-hidden", contentClassName)}>
					<DrawerHeader>
						{typeof header === "string" ? (
							<>
								<DrawerTitle>{header}</DrawerTitle>
								<DrawerDescription className="sr-only">
									{header}
								</DrawerDescription>
							</>
						) : (
							header(DrawerTitle, DrawerDescription)
						)}
					</DrawerHeader>
					{content}
					<DrawerFooter>
						<DrawerClose>{close}</DrawerClose>
					</DrawerFooter>
				</DrawerContent>
			</Drawer>
		);
	}

	return (
		<Dialog
			{...props}
			open={isOpen ?? undefined}
			onOpenChange={setOpen ?? undefined}
		>
			<DialogTrigger asChild>{renderTrigger()}</DialogTrigger>
			<DialogContent className={cn("overflow-hidden p-0", contentClassName)}>
				{renderHeader()}
				{content}
			</DialogContent>
		</Dialog>
	);
}
