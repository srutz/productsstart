import { useQueryClient } from "@tanstack/react-query";
import { getProduct } from "./useProduct";

export function useWarmupProducts() {
	const client = useQueryClient();
	return (from: number, to: number) => {
		for (let id = from; id <= to; id++) {
			client
				.ensureQueryData({
					queryKey: ["product", id],
					queryFn: () => getProduct(id),
					staleTime: 60 * 60 * 1_000,
				})
				.then((product) => {
					console.log(`Warmup: Product ${product.id} - ${product.title}`);
					new Image().src = product.thumbnail;
					for (const imgUrl of product.images) {
						new Image().src = imgUrl;
					}
				});
		}
	};
}
