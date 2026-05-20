import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({ component: App });

function App() {
	return (
		<main className="p-4" id="main1">
			Home
			<div id="main2">Hello World1</div>
			<div id="main3">Hello World2</div>
		</main>
	);
}
