import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import type { Recipe } from "./types";

export async function getRecipe(id: number): Promise<Recipe> {
	const response = await fetch(`https://dummyjson.com/recipes/${id}`);
	if (!response.ok) {
		throw new Error(
			`Failed to fetch recipe with id ${id}: ${response.statusText}`,
		);
	}
	return response.json();
}

export function useRecipe(id: number) {
	return useQuery({
		queryKey: ["recipe", id],
		queryFn: () => getRecipe(id),
		staleTime: 5 * 60 * 1_000,
		placeholderData: (d) => d,
	});
}
