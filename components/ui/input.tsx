import { cva } from "class-variance-authority";
import type { LucideProps } from "lucide-react";
import type * as React from "react";
import { cn } from "@/lib/utils";

const inputVariants = cva(
	"font-lora block h-10 w-full rounded-sm border border-gray-300 bg-white py-2 pr-3 pl-9 italic shadow-xs outline-offset-2 placeholder:italic placeholder:opacity-90 sm:text-sm dark:border-gray-400/20 dark:bg-[hsl(218,_13%,_10%)] dark:text-white dark:shadow-black dark:placeholder:opacity-40 focus-within:outline-2 focus-within:outline-accent-blue dark:focus-within:outline-blue-300",
);

export interface InputProps
	extends React.InputHTMLAttributes<HTMLInputElement> {
	icon?: React.ComponentType<LucideProps>;
}

export function Input({
	className,
	type,
	icon: Icon,
	...props
}: Readonly<InputProps>) {
	if (Icon) {
		return (
			<label className="relative block w-full">
				<input
					type={type}
					className={cn(inputVariants(), "pl-9", className)}
					{...props}
				/>
				<span className="absolute inset-y-0 left-0 flex items-center pl-3">
					<Icon className="size-[14px] text-gray-200" />
				</span>
			</label>
		);
	}

	return (
		<input
			type={type}
			className={cn(inputVariants(), "pl-4", className)}
			{...props}
		/>
	);
}
