"use client";

import { Download, Share } from "lucide-react";
import { usePathname } from "next/navigation";
import { QRCodeCanvas } from "qrcode.react";
import React, { useRef } from "react";
import { toast } from "sonner";
import { create } from "zustand";
import { Modal } from "@/components/modal";
import { Button } from "@/components/ui/button";
import { getBaseUrl } from "@/lib/utils";

export type QRDrawerStore = {
	isOpen: boolean;
	openDrawer: () => void;
	closeDrawer: () => void;
	toggleDrawer: () => void;
};

export const useQRDrawerStore = create<QRDrawerStore>()((set) => ({
	isOpen: false,
	openDrawer: () => set({ isOpen: true }),
	closeDrawer: () => set({ isOpen: false }),
	toggleDrawer: () => set((state) => ({ isOpen: !state.isOpen })),
}));

export function QrcodeGenerator() {
	const qrContainerRef = useRef<HTMLDivElement>(null);
	const pathname = usePathname();

	const url = `${getBaseUrl()}${pathname}`;

	const handleDownloadDirect = () => {
		const svgElement = qrContainerRef.current?.querySelector("svg");
		if (!svgElement) return;

		const svgData = new XMLSerializer().serializeToString(svgElement);
		const svgBlob = new Blob([svgData], {
			type: "image/svg+xml;charset=utf-8",
		});
		const svgUrl = URL.createObjectURL(svgBlob);

		const img = new Image();
		img.onload = () => {
			const canvas = document.createElement("canvas");
			const pixelRatio = window.devicePixelRatio || 1;
			canvas.width = img.width * pixelRatio;
			canvas.height = img.height * pixelRatio;

			const ctx = canvas.getContext("2d");
			if (!ctx) return;

			ctx.fillStyle = "#FFFFFF";
			ctx.fillRect(0, 0, canvas.width, canvas.height);
			ctx.scale(pixelRatio, pixelRatio);
			ctx.drawImage(img, 0, 0, img.width, img.height);

			const pngUrl = canvas.toDataURL("image/png");
			const downloadLink = document.createElement("a");
			downloadLink.href = pngUrl;
			downloadLink.download = "qr-code.png";
			document.body.appendChild(downloadLink);
			downloadLink.click();
			document.body.removeChild(downloadLink);

			URL.revokeObjectURL(svgUrl);
		};

		img.onerror = () => {
			console.error("QR kodu yüklenemedi");
			URL.revokeObjectURL(svgUrl);
		};

		img.src = svgUrl;

		const promise = new Promise<{ name: string }>((resolve) => {
			setTimeout(() => {
				resolve({ name: "QR Kod" });
			}, 1000);
		});

		toast.promise(promise, {
			loading: "İndiriliyor...",
			success: (data: { name: string }) => `${data.name} indirildi.`,
			error: "İndirme hatası",
		});
	};

	const handleShare = async () => {
		if (!navigator.share) {
			if (navigator.clipboard) {
				await navigator.clipboard.writeText(url);
				toast("QR kodu kopyalandı.");
			}
			return;
		}

		try {
			await navigator.share({
				title: "QR Kod",
				text: "QR Kodum",
				url: url,
			});
		} catch (error) {
			console.error("Paylaşım hatası:", error);
		}
	};

	return (
		<Modal
			open={useQRDrawerStore((state) => state.isOpen)}
			setOpen={useQRDrawerStore((state) => state.toggleDrawer)}
			trigger={
				<Button size="sm" variant="outline" className="w-full mb-4">
					<Share className="size-[16px]" />
					<span className="md:inline-flex items-center justify-start">
						Bu sayfanın QR Kodunu oluşturun
					</span>
				</Button>
			}
			header={(Title, Description) => (
				<>
					<Title>QR Kodu Oluşturucu</Title>
					<Description className="sr-only">
						Bu modül ile QR kodu oluşturabilirsiniz. QR kodu indirme ve paylaşma
						seçenekleri mevcuttur.
					</Description>
				</>
			)}
			content={
				<div className="p-4">
					<div
						ref={qrContainerRef}
						data-qr-container
						className="relative flex flex-col items-center justify-center bg-white rounded-lg aspect-square"
					>
						<QRCodeCanvas
							value={url}
							size={256}
							bgColor={"#ffffff"}
							fgColor={"#000000"}
						/>
						<div className="animate-bg-slide [z-index:1] bg-[size:100px] bg-[url(/brand-logo.png)] select-none pointer-events-none absolute inset-0 opacity-5 dark:opacity-10  bg-repeat" />
					</div>
					<p className="text-sm text-gray-500 text-center my-4">
						QR Kodu indirmek için "İndir" butonunu kullanın veya "Paylaş"
						butonunu kullanarak oluşturulan QR Kodu paylaşın.
					</p>
					<div className="flex justify-center gap-4 mt-4">
						<Button
							onClick={handleDownloadDirect}
							className="flex items-center gap-2"
						>
							<Download className="size-4" />
							İndir
						</Button>

						<Button onClick={handleShare} className="flex items-center gap-2">
							<Share className="size-4" />
							Paylaş
						</Button>
					</div>
				</div>
			}
			close="Kapat"
		/>
	);
}
