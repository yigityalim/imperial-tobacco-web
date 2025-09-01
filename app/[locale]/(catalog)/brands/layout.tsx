import type React from "react";

export default function CategoryLayout({
	children,
}: Readonly<React.PropsWithChildren>) {
	return (
		<>
			<div className="h-(--toc-height)" />
			{children}
		</>
	);
}
