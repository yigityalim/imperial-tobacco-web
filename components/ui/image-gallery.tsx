"use client";

import type { GalleryImage } from "contentlayer/generated";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import {
	Dialog,
	DialogContent,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";

interface ImageGalleryProps {
	images: GalleryImage[];
}

export function ImageGallery({ images }: ImageGalleryProps) {
	const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

	const handleNext = () => {
		if (selectedIndex !== null && selectedIndex < images.length - 1) {
			setSelectedIndex(selectedIndex + 1);
		}
	};

	const handlePrev = () => {
		if (selectedIndex !== null && selectedIndex > 0) {
			setSelectedIndex(selectedIndex - 1);
		}
	};

	const currentImage = selectedIndex !== null ? images[selectedIndex] : null;

	useHotkeys("left", handlePrev);
	useHotkeys("right", handleNext);
	useHotkeys("esc", () => setSelectedIndex(null));

	return (
		<>
			<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
				{images.map((image, index) => (
					<button
						type="button"
						key={image.caption ?? index}
						className="relative aspect-square cursor-pointer overflow-hidden rounded-lg group"
						onClick={() => setSelectedIndex(index)}
					>
						<Image
							loading="lazy"
							width={300}
							height={300}
							src={image.thumbnail || image.src}
							alt={image.alt}
							className="w-full h-full object-cover transition-transform group-hover:scale-105"
						/>
					</button>
				))}
			</div>

			<Dialog
				open={selectedIndex !== null}
				onOpenChange={(open) => !open && setSelectedIndex(null)}
			>
				<DialogContent removeClose className="max-w-4xl p-0 overflow-hidden">
					<div className="relative">
						{currentImage && (
							<Image
								width={1920}
								height={1080}
								src={currentImage.src}
								alt={currentImage.alt}
								className="w-full h-auto max-h-[80vh] object-contain"
							/>
						)}

						{selectedIndex !== null && selectedIndex > 0 && (
							<button
								type="button"
								onClick={handlePrev}
								className="absolute left-4 top-1/2 -translate-y-1/2 bg-gray-800/20 backdrop-blur-md text-white rounded-full p-2 hover:bg-opacity-75 transition-colors"
							>
								<ChevronLeft size={24} />
							</button>
						)}

						{selectedIndex !== null && selectedIndex < images.length - 1 && (
							<button
								type="button"
								onClick={handleNext}
								className="absolute right-4 top-1/2 -translate-y-1/2 bg-gray-800/20 backdrop-blur-md text-white rounded-full p-2 hover:bg-opacity-75 transition-colors"
							>
								<ChevronRight size={24} />
							</button>
						)}

						{currentImage?.caption && (
							<DialogTitle
								removeStyles
								className="text-center text-gray-600 mt-4 p-4"
							>
								{currentImage.caption}
							</DialogTitle>
						)}
					</div>
				</DialogContent>
			</Dialog>
		</>
	);
}
