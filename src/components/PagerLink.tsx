import { useTransition } from "react";
import { cn } from "#/lib/utils";

export function PagerLink({
	page,
	disabled,
	onNavigate,
	children,
}: {
	page: number;
	disabled: boolean;
	onNavigate: (page: number) => void;
	children: React.ReactNode;
}) {
	const [_, startTransition] = useTransition();
	const className = "px-3 py-1 rounded border border-gray-300";
	if (disabled) {
		return (
			<span className={cn("text-gray-400 cursor-not-allowed", className)}>
				{children}
			</span>
		);
	}
	return (
		<button
			type="button"
			onClick={() => {
				startTransition(() => {
					onNavigate(page);
				});
			}}
			className={cn("hover:bg-gray-100", className)}
		>
			{children}
		</button>
	);
}
