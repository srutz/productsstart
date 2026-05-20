import { StartClient } from "@tanstack/react-start/client";
import { StrictMode, startTransition } from "react";
import { hydrateRoot } from "react-dom/client";

startTransition(() => {
	console.log("STARTING UP CLIENT");
	console.log("STARTING UP CLIENT");
	console.log("STARTING UP CLIENT");
	hydrateRoot(
		document,
		<StrictMode>
			<StartClient />
		</StrictMode>,
	);
});
