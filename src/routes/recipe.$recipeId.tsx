import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { z } from "zod";
import { useRecipe } from "#/hooks/useRecipe";
import { cn } from "#/lib/utils";
import { RecipePanel } from "../components/RecipePanel";

const paramsSchema = z.object({
	recipeId: z.coerce.number().int().nonnegative(),
});

export const Route = createFileRoute("/recipe/$recipeId")({
	params: {
		parse: (raw) => paramsSchema.parse(raw),
		stringify: ({ recipeId }) => ({ recipeId: recipeId.toString() }),
	},
	component: RouteComponent,
});

// eslint-disable-next-line react-refresh/only-export-components
function RouteComponent() {
	const { recipeId } = Route.useParams();
	const { data: recipe } = useRecipe(recipeId);
	const navigate = useNavigate();
	if (!recipe) return false;
	return (
		<div className="flex flex-col gap-4 overflow-y-auto">
			<div className="py-2 self-center flex items-center gap-4">
				<button
					type="button"
					disabled={recipeId <= 1}
					onClick={() => {
						navigate({
							to: "/recipe/$recipeId",
							params: { recipeId: recipeId - 1 },
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
					disabled={recipeId >= 50}
					onClick={() => {
						navigate({
							to: "/recipe/$recipeId",
							params: { recipeId: recipeId + 1 },
						});
					}}
					className={cn(
						"hover:bg-gray-100 px-3 py-1 rounded border border-gray-300 disabled:hover:bg-transparent disabled:cursor-not-allowed disabled:text-gray-400",
					)}
				>
					Next
				</button>
			</div>
			<RecipePanel recipe={recipe}></RecipePanel>
		</div>
	);
}
