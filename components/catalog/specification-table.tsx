import type { ProductSpec } from "contentlayer/generated";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

interface SpecificationTableProps {
	specifications: ProductSpec[];
}

export function SpecificationTable({
	specifications,
}: SpecificationTableProps) {
	return (
		<div className="border rounded-lg overflow-hidden">
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead className="w-1/3">Özellik</TableHead>
						<TableHead>Değer</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{specifications.map((spec, index) => (
						<TableRow key={index}>
							<TableCell className="font-medium">{spec.name}</TableCell>
							<TableCell>{spec.value}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
}
