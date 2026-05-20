import { createFileRoute } from "@tanstack/react-router";
import { useRenderCount as useRenderCount2 } from "@uidotdev/usehooks";
import { useEffect, useState } from "react";
import { BookView } from "#/components/BookView";
import { useRenderCount } from "#/hooks/useRenderCount";

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

function Counter() {
	const renderCount = useRenderCount("Counter");
	const renderCount2 = useRenderCount2();
	const [count, setCount] = useState(0);
	useEffect(() => {
		const interval = setInterval(() => {
			setCount((c) => c + 1);
		}, 1000);
		return () => clearInterval(interval);
	}, []);
	return (
		<div>
			Counter: {count}, RenderCount: {renderCount}, usehooks RenderCount:{" "}
			{renderCount2}
		</div>
	);
}
