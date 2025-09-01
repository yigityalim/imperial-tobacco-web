"use client";
// react-scan react'den önce import edilmeli!
// biome-ignore assist/source/organizeImports: <explanation>
import { scan } from "react-scan";

import { useEffect } from "react";

export function ReactScan({ scan: _scan }: Readonly<{ scan: boolean }>) {
	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		scan({
			enabled: _scan,
		});
	}, []);

	return null;
}
