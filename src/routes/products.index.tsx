import { createFileRoute } from "@tanstack/react-router";
import { ProductsGrid } from "../components/ProductsGrid";

export const Route = createFileRoute("/products/")({
	component: RouteComponent,
});

// eslint-disable-next-line react-refresh/only-export-components
function RouteComponent() {
	return <ProductsGrid page={1} />;
}
