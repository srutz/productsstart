import { Link } from "@tanstack/react-router";
import { LuRocket } from "react-icons/lu";

export function Menubar() {
	return (
		<nav className="bg-zinc-800 text-white p-4 flex items-center gap-4">
			<LuRocket size={33}></LuRocket>
			<Link to="/">Home</Link>
			<Link to="/products">Products</Link>
			<Link to="/recipes">Recipes</Link>
			<Link to="/imprint">Imprint</Link>
			<Link to="/about">About</Link>
			<Link to="/product/$productId" params={{ productId: 4 }}>
				Lipstick
			</Link>
		</nav>
	);
}
