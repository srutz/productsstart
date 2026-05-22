import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import type { ProductsRequest } from "./types";

export const PAGE_SIZE = 30;

export async function getProducts({ page }: { page: number }) {
	const response = await fetch(
		`https://dummyjson.com/products?limit=${PAGE_SIZE}&skip=${(page - 1) * PAGE_SIZE}`,
	);
	if (!response.ok) {
		throw new Error(
			`Failed to fetch products for page ${page}: ${response.statusText}`,
		);
	}
	return response.json() as Promise<ProductsRequest>;
}

export function useProducts({ page }: { page: number }) {
	return useSuspenseQuery({
		queryKey: ["products", page],
		queryFn: () => getProducts({ page }),
		staleTime: 5 * 60 * 1000, // 5 minutes,
	});
}
