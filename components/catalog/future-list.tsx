import type { ProductFeature } from "contentlayer/generated";
import type { LucideIcon } from "lucide-react";
import * as Icons from "lucide-react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

interface FeatureListProps {
	features: ProductFeature[];
}

export function FeatureList({ features }: FeatureListProps) {
	const getIcon = (iconName: string): LucideIcon => {
		const Icon = (Icons as any)[iconName] || Icons.Star;
		return Icon;
	};

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
			{features.map((feature, index) => {
				const Icon = getIcon(feature.icon || "Star");

				return (
					<Card key={index} className="text-center">
						<CardHeader className="pb-3">
							<div className="flex justify-center mb-3">
								<div className="p-3 bg-blue-100 rounded-full">
									<Icon className="h-6 w-6 text-blue-600" />
								</div>
							</div>
							<CardTitle className="text-lg">{feature.title}</CardTitle>
						</CardHeader>
						<CardContent>
							<CardDescription className="text-sm">
								{feature.description}
							</CardDescription>
						</CardContent>
					</Card>
				);
			})}
		</div>
	);
}
