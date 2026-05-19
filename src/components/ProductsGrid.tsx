import { useNavigate } from "@tanstack/react-router";
import type { Product } from "#/hooks/types";
import { PAGE_SIZE, useProducts } from "../hooks/useProducts";
import { Pager } from "./Pager";
import { ProductThumb } from "./ProductThumb";

export function ProductsGrid({ page }: { page: number }) {
	const { data: productsResponse } = useProducts({ page });
	const navigate = useNavigate();
	const handleProductClick = (product: Product) => {
		navigate({ to: "/product/$productId", params: { productId: product.id } });
	};
	const totalPages = Math.max(1, Math.ceil(productsResponse.total / PAGE_SIZE));
	return (
		<div className="grow flex flex-col gap-4 overflow-y-auto">
			<div className="grow flex flex-wrap justify-center gap-4 overflow-y-auto">
				{productsResponse.products.map((product) => (
					<button
						key={product.id}
						type="button"
						onClick={() => handleProductClick(product)}
					>
						<ProductThumb key={product.id} product={product}></ProductThumb>
					</button>
				))}
			</div>
			<Pager
				page={page}
				totalPages={totalPages}
				onNavigate={(p) =>
					navigate({ to: "/products/page/{-$page}", params: { page: p } })
				}
			/>
		</div>
	);
}
