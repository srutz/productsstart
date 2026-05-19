import { cn } from "../lib/utils";
import type { Product } from "../types";

const priceFormatter = new Intl.NumberFormat("en-US", {
	style: "currency",
	currency: "USD",
});

export function ProductPanel({ product }: { product: Product }) {
	const discountedPrice = product.price * (1 - product.discountPercentage / 100);

	return (
		<div className="my-8 mx-4 bg-white rounded-2xl shadow-2xl overflow-y-auto">
			{/* Product Images Section */}
			<div className="grid md:grid-cols-2 gap-2">
				{/* Main Image */}
				<div className="relative">
					<img
						src={product.thumbnail}
						alt={product.title}
						className="w-full h-96 object-cover"
					/>
					{product.discountPercentage > 0 && (
						<div className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-full font-bold shadow-lg">
							-{product.discountPercentage.toFixed(1)}%
						</div>
					)}
					{product.stock < 10 && (
						<div className="absolute top-4 left-4 bg-orange-500 text-white px-4 py-2 rounded-full font-semibold shadow-lg">
							Only {product.stock} left!
						</div>
					)}
				</div>

				{/* Product Details */}
				<div className="px-8 py-2 flex flex-col">
					{/* Category & Brand */}
					<div className="flex gap-2 mb-4">
						<span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
							{product.category}
						</span>
						<span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold">
							{product.brand}
						</span>
					</div>

					{/* Title */}
					<h1 className="text-4xl font-bold text-zinc-900 mb-4">{product.title}</h1>

					{/* Rating */}
					<div className="flex items-center gap-2 mb-4">
						<div className="flex text-yellow-400" data-testid="rating-stars">
							{[...Array(5)].map((_, i) => (
								<span key={i}>{i < Math.floor(product.rating) ? "★" : "☆"}</span>
							))}
						</div>
						<span className="text-zinc-600 font-medium">
							{product.rating.toFixed(1)} ({product.reviews.length} reviews)
						</span>
					</div>

					{/* Description */}
					<p className="text-zinc-700 text-lg mb-6 leading-relaxed">
						{product.description}
					</p>

					{/* Price */}
					<div className="mb-6">
						<div className="flex items-baseline gap-3">
							<span className="text-5xl font-bold text-green-600">
								{priceFormatter.format(discountedPrice)}
							</span>
							{product.discountPercentage > 0 && (
								<span className="text-2xl text-zinc-400 line-through">
									{priceFormatter.format(product.price)}
								</span>
							)}
						</div>
						<p className="text-sm text-zinc-500 mt-2">
							{product.shippingInformation}
						</p>
					</div>

					{/* Tags */}
					<div className="flex flex-wrap gap-2 mb-6">
						{product.tags.map((tag, idx) => (
							<span
								key={idx}
								className="px-2 py-1 bg-zinc-100 text-zinc-600 rounded text-sm"
							>
								#{tag}
							</span>
						))}
					</div>

					{/* Stock Status */}
					<div className="mb-6">
						<div
							className={cn(
								"inline-block px-4 py-2 rounded-lg font-semibold",
								product.availabilityStatus === "In Stock"
									? "bg-green-100 text-green-700"
									: "bg-red-100 text-red-700",
							)}
						>
							{product.availabilityStatus}
						</div>
					</div>
				</div>
			</div>

			{/* Additional Info Tabs */}
			<div className="border-t border-zinc-200">
				<div className="grid md:grid-cols-3 gap-6 p-8">
					<div>
						<h3 className="font-bold text-zinc-900 mb-2 flex items-center gap-2">
							📦 Product Details
						</h3>
						<ul className="text-sm text-zinc-600 space-y-1">
							<li>SKU: {product.sku}</li>
							<li>Weight: {product.weight}g</li>
							<li>
								Dimensions: {product.dimensions.width} × {product.dimensions.height} ×{" "}
								{product.dimensions.depth} cm
							</li>
							<li>Min Order: {product.minimumOrderQuantity}</li>
						</ul>
					</div>

					<div>
						<h3 className="font-bold text-zinc-900 mb-2 flex items-center gap-2">
							🛡️ Warranty & Returns
						</h3>
						<ul className="text-sm text-zinc-600 space-y-1">
							<li>{product.warrantyInformation}</li>
							<li>{product.returnPolicy}</li>
						</ul>
					</div>

					<div>
						<h3 className="font-bold text-zinc-900 mb-2 flex items-center gap-2">
							💬 Latest Review
						</h3>
						{product.reviews[0] && (
							<div className="text-sm">
								<div className="flex text-yellow-400 mb-1">
									{[...Array(5)].map((_, i) => (
										<span key={i}>{i < product.reviews[0].rating ? "★" : "☆"}</span>
									))}
								</div>
								<p className="text-zinc-600 italic">"{product.reviews[0].comment}"</p>
								<p className="text-zinc-500 mt-1">
									— {product.reviews[0].reviewerName}
								</p>
							</div>
						)}
					</div>
				</div>
			</div>

			{/* Image Gallery */}
			{product.images.length > 1 && (
				<div className="border-t border-zinc-200 p-8">
					<h3 className="font-bold text-zinc-900 mb-4 text-xl">More Images</h3>
					<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
						{product.images.map((img, idx) => (
							<img
								key={idx}
								src={img}
								alt={`${product.title} ${idx + 1}`}
								className="w-full h-48 object-cover rounded-lg shadow-md hover:shadow-xl transition-shadow cursor-pointer"
							/>
						))}
					</div>
				</div>
			)}
		</div>
	);
}
