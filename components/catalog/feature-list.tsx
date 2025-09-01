import {
	Award,
	Blend,
	Car,
	CircleDot,
	Clock,
	Droplet,
	Feather,
	Flame,
	Gauge,
	GitPullRequestArrow,
	Grid3X3,
	Leaf,
	Minimize2,
	Package,
	Ruler,
	ShieldCheck,
	Sparkles,
	Star,
	Tag,
	Zap,
} from "lucide-react";
import type React from "react";

// Özellik verileri için TypeScript tipi
export type FeatureProps = {
	title: string;
	description?: string;
	icon?: string;
};

// SVG ikonları için bir eşleme objesi
// Yeni ikon eklemek isterseniz buraya eklemeniz yeterli.
const iconMap: { [key: string]: React.ElementType } = {
	ShieldCheck,
	Star,
	Package,
	Zap,
	Minimize2,
	Grid3X3,
	Flame,
	Droplet,
	Leaf,
	Sparkles,
	Award,
	CircleDot,
	Gauge,
	Feather,
	GitPullRequestArrow,
	Blend,
	Ruler,
	Clock,
	Car,
	Tag,
};

// Ana bileşen
export const FeatureList = ({ features }: { features: FeatureProps[] }) => {
	return (
		<div className="flex flex-col space-y-8">
			{features.map((feature, index) => {
				const IconComponent = feature.icon ? iconMap[feature.icon] : null;
				return (
					<div key={index} className="flex items-start space-x-4">
						{IconComponent && (
							<div className="flex-shrink-0">
								<IconComponent
									className="h-6 w-6 text-davidoff-brand-color"
									aria-hidden="true"
								/>
							</div>
						)}
						<div>
							<h3 className="text-lg font-bold text-gray-900">
								{feature.title}
							</h3>
							{feature.description && (
								<p className="mt-1 text-sm text-gray-500">
									{feature.description}
								</p>
							)}
						</div>
					</div>
				);
			})}
		</div>
	);
};
