import { useQuery } from "@tanstack/react-query";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useMeasure } from "@uidotdev/usehooks";
import { useRef } from "react";

export function BookView() {
	const { data: lines = [] } = useQuery({
		queryKey: ["book1"],
		queryFn: async () => {
			console.time("fetching book");
			const res = await fetch("/pg2600.txt");
			const text = await res.text();
			const lines = text.split("\n");
			console.timeEnd("fetching book");
			return lines;
		},
		staleTime: Infinity,
	});

	const [containerRef, { height }] = useMeasure();
	const parentRef = useRef<HTMLDivElement>(null);

	const rowVirtualizer = useVirtualizer({
		count: lines.length,
		getScrollElement: () => parentRef.current,
		estimateSize: () => 35,
		measureElement: (el) => el.getBoundingClientRect().height,
		overscan: 5,
	});

	return (
		<div ref={containerRef} className="self-stretch grow">
			<div ref={parentRef} className="overflow-auto" style={{ height: 400 }}>
				<div
					style={{
						height: `${rowVirtualizer.getTotalSize()}px`,
						width: "100%",
						position: "relative",
					}}
				>
					{rowVirtualizer.getVirtualItems().map((virtualRow) => (
						<div
							key={virtualRow.index}
							data-index={virtualRow.index}
							ref={rowVirtualizer.measureElement}
							className={virtualRow.index % 2 ? "ListItemOdd" : "ListItemEven"}
							style={{
								position: "absolute",
								top: 0,
								left: 0,
								width: "100%",
								transform: `translateY(${virtualRow.start}px)`,
							}}
						>
							{lines[virtualRow.index]}
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
