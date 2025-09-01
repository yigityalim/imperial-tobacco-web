import { Footer } from "@/components/footer";
import { Header } from "@/components/header";

export default async function AppLayout({
	children,
}: Readonly<React.PropsWithChildren>) {
	return (
		<>
			<Header />
			<div className="h-(--header-height)" />
			{children}
			<Footer />
		</>
	);
}
