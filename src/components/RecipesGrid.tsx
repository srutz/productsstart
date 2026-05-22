import { useNavigate } from "@tanstack/react-router";
import type { Recipe } from "#/hooks/types";
import { PAGE_SIZE, useRecipes } from "../hooks/useRecipes";
import { Pager } from "./Pager";
import { RecipeThumb } from "./RecipeThumb";

export function RecipesGrid({ page }: { page: number }) {
	const { data: recipesResponse } = useRecipes({ page });
	const navigate = useNavigate();
	const handleRecipeClick = (recipe: Recipe) => {
		navigate({ to: "/recipe/$recipeId", params: { recipeId: recipe.id } });
	};
	const totalPages = Math.max(1, Math.ceil(recipesResponse.total / PAGE_SIZE));
	return (
		<div className="pt-4 grow flex flex-col gap-4 overflow-y-auto">
			<div className="grow flex flex-wrap justify-center gap-4 overflow-y-auto">
				{recipesResponse.recipes.map((recipe) => (
					<button
						key={recipe.id}
						type="button"
						onClick={() => handleRecipeClick(recipe)}
					>
						<RecipeThumb key={recipe.id} recipe={recipe}></RecipeThumb>
					</button>
				))}
			</div>
			<Pager
				page={page}
				totalPages={totalPages}
				onNavigate={(p) =>
					navigate({ to: "/recipes/page/{-$page}", params: { page: p } })
				}
			/>
		</div>
	);
}
