import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { z } from "zod";
import { useProduct } from "#/hooks/useProduct";
import { cn } from "#/lib/utils";
import { ProductPanel } from "../components/ProductPanel";

const paramsSchema = z.object({
	productId: z.coerce.number().int().nonnegative(),
});

export const Route = createFileRoute("/product/$productId")({
	params: {
		parse: (raw) => paramsSchema.parse(raw),
		stringify: ({ productId }) => ({ productId: productId.toString() }),
	},
	component: RouteComponent,
});

// eslint-disable-next-line react-refresh/only-export-components
function RouteComponent() {
	const { productId } = Route.useParams();
	const { data: product } = useProduct(productId);
	const navigate = useNavigate();
	return (
		<div className="flex flex-col gap-4 overflow-y-auto">
			<div className="py-2 self-center flex items-center gap-4">
				<button
					type="button"
					disabled={productId <= 1}
					onClick={() => {
						navigate({
							to: "/product/$productId",
							params: { productId: productId - 1 },
						});
					}}
					className={cn(
						"hover:bg-gray-100 px-3 py-1 rounded border border-gray-300 disabled:hover:bg-transparent disabled:cursor-not-allowed disabled:text-gray-400",
					)}
				>
					Prev
				</button>
				<button
					type="button"
					disabled={productId >= 194}
					onClick={() => {
						navigate({
							to: "/product/$productId",
							params: { productId: productId + 1 },
						});
					}}
					className={cn(
						"hover:bg-gray-100 px-3 py-1 rounded border border-gray-300 disabled:hover:bg-transparent disabled:cursor-not-allowed disabled:text-gray-400",
					)}
				>
					Next
				</button>
			</div>
			<ProductPanel product={product}></ProductPanel>
		</div>
	);
}
