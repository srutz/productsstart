import { createFileRoute } from "@tanstack/react-router";
import { BookView } from "#/components/BookView";

export const Route = createFileRoute("/about")({
	component: About,
});

function About() {
	return (
		<main className="p-4">
			<BookView />
		</main>
	);
}
