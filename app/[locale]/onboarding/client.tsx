"use client";

import { ArrowLeft } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import {
	LANGUAGES,
	type Locale,
	otherLocales,
	primaryLocales,
} from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { completeOnboarding } from "./actions";

interface OnboardingClientProps {
	currentLocale: string;
	translations: {
		selectLanguage: string;
		otherLanguages: string;
		continue: string;
		selectFirst: string;
		cancel: string;
		languageSelected: string;
		proceedWith: string;
	};
}

// Dil-specific translations for buttons
const BUTTON_TRANSLATIONS = {
	tr: { cancel: "Geri Dön", continue: "İlerle" },
	en: { cancel: "Go Back", continue: "Continue" },
	de: { cancel: "Zurück", continue: "Weiter" },
	es: { cancel: "Volver", continue: "Continuar" },
	fr: { cancel: "Retour", continue: "Continuer" },
	it: { cancel: "Indietro", continue: "Continua" },
	ru: { cancel: "Назад", continue: "Продолжить" },
	ro: { cancel: "Înapoi", continue: "Continuă" },
	bg: { cancel: "Назад", continue: "Продължи" },
	el: { cancel: "Πίσω", continue: "Συνέχεια" },
	hu: { cancel: "Vissza", continue: "Tovább" },
	az: { cancel: "Geri", continue: "Davam et" },
} as const;

export function OnboardingClient({
	currentLocale,
	translations,
}: OnboardingClientProps) {
	const router = useRouter();
	const [selectedLocale, setSelectedLocale] = useState<Locale | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [showConfirmation, setShowConfirmation] = useState(false);

	const handleContinue = async () => {
		if (!selectedLocale || isLoading) return;

		setIsLoading(true);

		try {
			await completeOnboarding();
			router.push(`/${selectedLocale}`);
			router.refresh();
		} catch (error) {
			console.error("Error completing onboarding:", error);
			router.push(`/${currentLocale}`);
		} finally {
			setIsLoading(false);
		}
	};

	const selectLanguage = (locale: Locale) => {
		setSelectedLocale(locale);
		setShowConfirmation(true);
	};

	const handleCancel = () => {
		setSelectedLocale(null);
		setShowConfirmation(false);
		setIsOpen(false);
	};

	const buttonVariants = {
		idle: { scale: 1 },
		hover: {
			scale: 1.02,
			transition: {
				type: "spring",
				damping: 15,
				stiffness: 400,
			},
		},
		tap: { scale: 0.98 },
	};

	const containerVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				duration: 0.4,
				ease: "easeOut",
			},
		},
		exit: {
			opacity: 0,
			y: -20,
			transition: {
				duration: 0.3,
			},
		},
	};

	return (
		<div className="min-h-screen flex flex-col p-4">
			{/* Fixed Header - Logo */}
			<div className="flex-none pt-8">
				<motion.div
					className="text-center"
					initial={{ opacity: 0, scale: 0.8 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ duration: 0.5, delay: 0.2 }}
				>
					<div className="relative w-36 aspect-square mx-auto">
						<Image
							src="/brand-logo.png"
							alt="Brand Logo"
							fill
							className="object-contain"
							priority
						/>
					</div>
				</motion.div>
			</div>

			{/* Flexible Content */}
			<div className="flex-1 flex items-center justify-center">
				<div className="max-w-md w-full">
					<AnimatePresence mode="wait">
						{!showConfirmation ? (
							<motion.div
								key="selection"
								className="space-y-6"
								variants={containerVariants}
								initial="hidden"
								animate="visible"
								exit="exit"
							>
								{/* Title */}
								<motion.h2
									className="text-xl font-semibold text-gray-900 text-center"
									initial={{ opacity: 0, y: 10 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.5, delay: 0.4 }}
								>
									{translations.selectLanguage}
								</motion.h2>

								{/* Primary Languages */}
								<motion.div
									className="grid grid-cols-2 gap-3"
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.5, delay: 0.5 }}
								>
									{primaryLocales.map((locale) => (
										<motion.button
											key={locale}
											type="button"
											onClick={() => selectLanguage(locale)}
											variants={buttonVariants}
											initial="idle"
											whileHover="hover"
											whileTap="tap"
											className="p-4 rounded-xl border-2 border-gray-200 bg-white hover:border-gray-300 text-gray-700 transition-colors duration-200 flex items-center justify-center space-x-3"
										>
											<span className="text-2xl">{LANGUAGES[locale].flag}</span>
											<span className="font-medium text-sm">
												{LANGUAGES[locale].native}
											</span>
										</motion.button>
									))}
								</motion.div>

								{/* Other Languages Accordion */}
								<motion.div
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.5, delay: 0.6 }}
								>
									<Accordion
										type="single"
										collapsible
										className="w-full"
										value={isOpen ? "other-languages" : undefined}
										onValueChange={(value) => setIsOpen(!!value)}
									>
										<AccordionItem
											value="other-languages"
											className="border-none"
										>
											<AccordionTrigger
												removeIcon
												className="w-full p-4 rounded-xl border-2 border-dashed border-gray-300 bg-white hover:border-gray-400 hover:bg-gray-50 text-gray-600 transition-colors duration-200 flex items-center justify-center space-x-2 hover:no-underline [&[data-state=open]>div>svg]:rotate-45"
											>
												<div className="flex items-center space-x-2">
													<svg
														className="w-5 h-5 transition-transform duration-200"
														fill="none"
														stroke="currentColor"
														viewBox="0 0 24 24"
													>
														<title>Expand</title>
														<path
															strokeLinecap="round"
															strokeLinejoin="round"
															strokeWidth={2}
															d="M12 4v16m8-8H4"
														/>
													</svg>
													<span className="font-medium">
														{translations.otherLanguages}
													</span>
												</div>
											</AccordionTrigger>
											<AccordionContent className="pb-0">
												<div className="mt-3">
													<div className="max-h-48 overflow-y-auto scrollbar-hidden">
														<div className="space-y-3">
															{otherLocales.map((locale, index) => (
																<motion.button
																	key={locale}
																	type="button"
																	onClick={() => selectLanguage(locale)}
																	initial={{ opacity: 0, x: 20 }}
																	animate={{ opacity: 1, x: 0 }}
																	transition={{
																		delay: index * 0.05,
																		duration: 0.3,
																		ease: "easeOut",
																	}}
																	whileHover={{
																		scale: 1.01,
																		transition: { duration: 0.2 },
																	}}
																	whileTap={{ scale: 0.98 }}
																	className="w-full p-3 rounded-lg border-2 border-gray-200 bg-white hover:border-gray-300 text-gray-700 transition-colors duration-200 flex items-center space-x-3"
																>
																	<span className="text-xl">
																		{LANGUAGES[locale].flag}
																	</span>
																	<span className="font-medium text-left flex-1 text-sm">
																		{LANGUAGES[locale].native}
																	</span>
																</motion.button>
															))}
														</div>
													</div>
												</div>
											</AccordionContent>
										</AccordionItem>
									</Accordion>
								</motion.div>
							</motion.div>
						) : (
							<motion.div
								key="confirmation"
								className="space-y-8"
								variants={containerVariants}
								initial="hidden"
								animate="visible"
								exit="exit"
							>
								{/* Selected Language Display */}
								<motion.div
									className="text-center space-y-4"
									initial={{ opacity: 0, scale: 0.9 }}
									animate={{ opacity: 1, scale: 1 }}
									transition={{ duration: 0.4, delay: 0.1 }}
								>
									{/* Animated Success Circle */}
									<motion.div
										className="w-20 h-20 mx-auto bg-[#ac0534]/30 rounded-full flex items-center justify-center relative overflow-hidden"
										initial={{ scale: 0, rotate: -180 }}
										animate={{ scale: 1, rotate: 0 }}
										transition={{
											type: "spring",
											damping: 15,
											stiffness: 300,
											duration: 0.6,
											delay: 0.2,
										}}
									>
										{/* Background ripple effect */}
										<motion.div
											className="absolute inset-0 bg-[#ac0534]/20 rounded-full"
											initial={{ scale: 0, opacity: 1 }}
											animate={{ scale: [1, 1.5, 2], opacity: [0.8, 0.3, 0] }}
											transition={{
												duration: 1.2,
												delay: 0.8,
												ease: "easeOut",
											}}
										/>

										{/* Checkmark SVG with draw animation */}
										<motion.svg
											className="w-10 h-10 text-[#ac0534] relative z-10"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
											initial={{ opacity: 0 }}
											animate={{ opacity: 1 }}
											transition={{ delay: 0.5, duration: 0.2 }}
										>
											<title>Selected</title>
											{/* First stroke of checkmark */}
											<motion.path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={3}
												d="M5 13l4 4"
												initial={{ pathLength: 0, opacity: 0 }}
												animate={{ pathLength: 1, opacity: 1 }}
												transition={{
													duration: 0.3,
													delay: 0.7,
													ease: "easeInOut",
												}}
											/>
											{/* Second stroke of checkmark */}
											<motion.path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={3}
												d="M9 17l10-10"
												initial={{ pathLength: 0, opacity: 0 }}
												animate={{ pathLength: 1, opacity: 1 }}
												transition={{
													duration: 0.4,
													delay: 1.0,
													ease: "easeInOut",
												}}
											/>
										</motion.svg>

										{/* Success particles */}
										{[...Array(8)].map((_, i) => (
											<motion.div
												key={i}
												className="absolute w-1 h-1 bg-[#ac0534] rounded-full"
												style={{
													top: "50%",
													left: "50%",
													x: "-50%",
													y: "-50%",
												}}
												initial={{ scale: 0, x: 0, y: 0, opacity: 1 }}
												animate={{
													scale: [0, 1, 0],
													x: Math.cos((i * Math.PI * 2) / 8) * 40,
													y: Math.sin((i * Math.PI * 2) / 8) * 40,
													opacity: [0, 1, 0],
												}}
												transition={{
													duration: 0.8,
													delay: 1.2 + i * 0.1,
													ease: "easeOut",
												}}
											/>
										))}
									</motion.div>

									{/* Title with bounce effect */}
									<motion.h2
										className="text-xl font-semibold text-gray-900"
										initial={{ opacity: 0, y: 20 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{
											type: "spring",
											damping: 10,
											stiffness: 100,
											delay: 1.4,
										}}
									>
										{translations.languageSelected}
									</motion.h2>
								</motion.div>

								{/* Selected Language Card */}
								{selectedLocale && (
									<motion.div
										className={cn(
											"bg-[#ac0534]/20 border-2 border-[#ac0534] rounded-xl p-6",
										)}
										initial={{ opacity: 0, y: 20 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ duration: 0.4, delay: 0.2 }}
									>
										<div className="flex items-center justify-center space-x-4">
											<span className="text-4xl">
												{LANGUAGES[selectedLocale].flag}
											</span>
											<div className="text-center">
												<h3 className="text-lg font-semibold text-[#ac0534]">
													{LANGUAGES[selectedLocale].native}
												</h3>
											</div>
										</div>
									</motion.div>
								)}

								{/* Confirmation Text */}
								<motion.p
									className="text-center text-gray-600"
									initial={{ opacity: 0, y: 10 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.4, delay: 0.3 }}
								>
									{selectedLocale && (
										<>
											{/* Dynamic text based on selected language */}
											{(() => {
												const proceedTexts = {
													tr: "ile devam etmek istiyor musunuz?",
													en: "Do you want to proceed with",
													de: "Möchten Sie mit",
													es: "¿Quieres continuar con",
													fr: "Voulez-vous continuer avec",
													it: "Vuoi continuare con",
													ru: "Хотите продолжить с",
													ro: "Vrei să continui cu",
													bg: "Искате ли да продължите с",
													el: "Θέλετε να συνεχίσετε με",
													hu: "Szeretnéd folytatni a következővel:",
													az: "ilə davam etmək istəyirsiniz?",
												};

												const langName = LANGUAGES[selectedLocale].native;
												const proceedText = proceedTexts[selectedLocale];

												// Different word order for different languages
												if (
													selectedLocale === "tr" ||
													selectedLocale === "az"
												) {
													return `${langName} ${proceedText}`;
												} else if (selectedLocale === "hu") {
													return `${proceedText} ${langName}?`;
												} else {
													return `${proceedText} ${langName}?`;
												}
											})()}
										</>
									)}
								</motion.p>

								{/* Action Buttons */}
								<motion.div
									className="flex space-x-4"
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.4, delay: 0.4 }}
								>
									<motion.button
										type="button"
										onClick={handleCancel}
										variants={buttonVariants}
										initial="idle"
										whileHover="hover"
										whileTap="tap"
										disabled={isLoading}
										className="flex-1 py-4 px-6 rounded-xl bg-white border border-[#ac0534] text-[#ac0534] font-semibold transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
									>
										<ArrowLeft className="mr-2" />
										{selectedLocale
											? BUTTON_TRANSLATIONS[selectedLocale].cancel
											: translations.cancel}
									</motion.button>

									<motion.button
										type="button"
										onClick={handleContinue}
										variants={buttonVariants}
										initial="idle"
										whileHover="hover"
										whileTap="tap"
										disabled={isLoading}
										className="flex-1 py-4 px-6 rounded-xl bg-[#ac0534] text-white font-semibold transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
									>
										{isLoading ? (
											<>
												<svg
													className="w-5 h-5 animate-spin"
													fill="none"
													viewBox="0 0 24 24"
												>
													<title>Loading...</title>
													<circle
														className="opacity-25"
														cx="12"
														cy="12"
														r="10"
														stroke="currentColor"
														strokeWidth="4"
													/>
													<path
														className="opacity-75"
														fill="currentColor"
														d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
													/>
												</svg>
												<span>
													{selectedLocale
														? BUTTON_TRANSLATIONS[selectedLocale].continue
														: translations.continue}
												</span>
											</>
										) : (
											<>
												<span>
													{selectedLocale
														? BUTTON_TRANSLATIONS[selectedLocale].continue
														: translations.continue}
												</span>
												<svg
													className="w-5 h-5"
													fill="none"
													stroke="currentColor"
													viewBox="0 0 24 24"
												>
													<title>Proceed</title>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth={2}
														d="M13 7l5 5m0 0l-5 5m5-5H6"
													/>
												</svg>
											</>
										)}
									</motion.button>
								</motion.div>
							</motion.div>
						)}
					</AnimatePresence>
				</div>
			</div>
		</div>
	);
}
