import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/imprint")({
	component: Imprint,
	staleTime: 1000 * 60 * 60, // 1 hour
});

function Imprint() {
	return (
		<main className="p-4">
			<h1 className="text-2xl font-bold mb-4">Imprint</h1>
			<p>
				This is the imprint page. You can put your company information, contact
				details, and legal disclaimers here.
			</p>
		</main>
	);
}
