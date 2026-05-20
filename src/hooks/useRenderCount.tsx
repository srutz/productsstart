import { useDebugValue, useEffect, useRef } from "react";

export function useRenderCount(componentName?: string) {
	const count = useRef(0);
	count.current++;
	useDebugValue(`Render #${count.current}`);
	if (process.env.NODE_ENV === "development") {
		// eslint-disable-next-line react-hooks/rules-of-hooks
		// biome-ignore lint/correctness/useHookAtTopLevel: i hate biome
		useEffect(() => {
			console.log(`[${componentName ?? "Component"}] Render #${count.current}`);
		});
	}
	return count.current;
}
