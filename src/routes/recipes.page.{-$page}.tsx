import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { RecipesGrid } from "../components/RecipesGrid";

const paramsSchema = z.object({
	page: z.coerce
		.number()
		.int()
		.nonnegative()
		//.refine((n) => n % 2 === 0, { message: "page must be even" })
		.optional(),
});

export const Route = createFileRoute("/recipes/page/{-$page}")({
	params: {
		parse: (raw) => paramsSchema.parse(raw),
		stringify: ({ page }) => ({ page: page?.toString() }),
	},
	component: RouteComponent,
});

// eslint-disable-next-line react-refresh/only-export-components
function RouteComponent() {
	const { page = 1 } = Route.useParams();
	return <RecipesGrid page={page} />;
}
