import { getTranslations } from "next-intl/server";

export default async function NotFoundPage() {
	const t = await getTranslations("error");
	return <h1>{t("pageNotFound")}</h1>;
}
