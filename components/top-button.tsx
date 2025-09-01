"use client";

import { ArrowUp } from "lucide-react";
import { AnimatePresence, motion, useScroll } from "motion/react";
import { useState } from "react";

export function ScrollTopButton(): React.JSX.Element {
	const { scrollYProgress } = useScroll();
	const [visible, setVisible] = useState(false);

	scrollYProgress.on("change", (v) => {
		setVisible(v > 0.1);
	});

	return (
		<AnimatePresence>
			{visible && (
				<motion.button
					initial={{ opacity: 0, scale: 0.95 }}
					animate={{ opacity: 1, scale: 1 }}
					exit={{ opacity: 0, scale: 0.95 }}
					whileHover={{ scale: 1.1 }}
					whileTap={{ scale: 0.9 }}
					transition={{
						type: "spring",
						stiffness: 500,
						damping: 30,
						mass: 0.2,
						restDelta: 0.01,
						restSpeed: 0.01,
					}}
					className="fixed bottom-6 right-6 z-100 p-2 rounded-md bg-background cursor-pointer sh-alt dark:bg-[hsl(218,_13%,_12%)]"
					onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
				>
					<ArrowUp size={14} />
				</motion.button>
			)}
		</AnimatePresence>
	);
}
