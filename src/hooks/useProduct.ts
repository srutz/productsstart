import { useSuspenseQuery } from "@tanstack/react-query";
import type { Product } from "./types";

export async function getProduct(id: number): Promise<Product> {
	const response = await fetch(`https://dummyjson.com/products/${id}`);
	if (!response.ok) {
		throw new Error(
			`Failed to fetch product with id ${id}: ${response.statusText}`,
		);
	}
	return response.json();
}

export function useProduct(id: number) {
	return useSuspenseQuery({
		queryKey: ["product", id],
		queryFn: () => getProduct(id),
		staleTime: 5 * 60 * 1_000,
	});
}
