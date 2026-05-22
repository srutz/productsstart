import type { Recipe } from "#/hooks/types";

export function RecipePanel({ recipe }: { recipe: Recipe }) {
	const totalTime = recipe.prepTimeMinutes + recipe.cookTimeMinutes;

	return (
		<div className="my-2 mx-4 bg-white rounded-2xl shadow-2xl overflow-y-auto">
			{/* Recipe Image Section */}
			<div className="grid md:grid-cols-2 gap-2">
				{/* Main Image */}
				<div className="relative">
					<img
						src={recipe.image}
						alt={recipe.name}
						className="w-full h-96 object-cover"
					/>
					<div className="absolute top-4 right-4 bg-orange-500 text-white px-4 py-2 rounded-full font-bold shadow-lg">
						{recipe.difficulty}
					</div>
					<div className="absolute top-4 left-4 bg-blue-500 text-white px-4 py-2 rounded-full font-semibold shadow-lg">
						{totalTime} min
					</div>
				</div>

				{/* Recipe Details */}
				<div className="px-8 py-2 flex flex-col">
					{/* Cuisine & Meal Type */}
					<div className="flex gap-2 mb-4 flex-wrap">
						<span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
							{recipe.cuisine}
						</span>
						{recipe.mealType.map((meal, idx) => (
							<span
								key={idx}
								className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold"
							>
								{meal}
							</span>
						))}
					</div>

					{/* Name */}
					<h1 className="text-4xl font-bold text-zinc-900 mb-4">{recipe.name}</h1>

					{/* Rating */}
					<div className="flex items-center gap-2 mb-4">
						<div className="flex text-yellow-400" data-testid="rating-stars">
							{[...Array(5)].map((_, i) => (
								<span key={i}>{i < Math.floor(recipe.rating) ? "★" : "☆"}</span>
							))}
						</div>
						<span className="text-zinc-600 font-medium">
							{recipe.rating.toFixed(1)} ({recipe.reviewCount} reviews)
						</span>
					</div>

					{/* Calories */}
					<div className="mb-6">
						<div className="flex items-baseline gap-3">
							<span className="text-5xl font-bold text-green-600">
								{recipe.caloriesPerServing}
							</span>
							<span className="text-2xl text-zinc-500">kcal / serving</span>
						</div>
						<p className="text-sm text-zinc-500 mt-2">
							Serves {recipe.servings}
						</p>
					</div>

					{/* Tags */}
					<div className="flex flex-wrap gap-2 mb-6">
						{recipe.tags.map((tag, idx) => (
							<span
								key={idx}
								className="px-2 py-1 bg-zinc-100 text-zinc-600 rounded text-sm"
							>
								#{tag}
							</span>
						))}
					</div>
				</div>
			</div>

			{/* Timing & Servings */}
			<div className="border-t border-zinc-200">
				<div className="grid md:grid-cols-3 gap-6 p-8">
					<div>
						<h3 className="font-bold text-zinc-900 mb-2 flex items-center gap-2">
							⏱️ Prep Time
						</h3>
						<p className="text-2xl font-semibold text-zinc-700">
							{recipe.prepTimeMinutes} min
						</p>
					</div>

					<div>
						<h3 className="font-bold text-zinc-900 mb-2 flex items-center gap-2">
							🔥 Cook Time
						</h3>
						<p className="text-2xl font-semibold text-zinc-700">
							{recipe.cookTimeMinutes} min
						</p>
					</div>

					<div>
						<h3 className="font-bold text-zinc-900 mb-2 flex items-center gap-2">
							🍽️ Servings
						</h3>
						<p className="text-2xl font-semibold text-zinc-700">
							{recipe.servings}
						</p>
					</div>
				</div>
			</div>

			{/* Ingredients */}
			<div className="border-t border-zinc-200 p-8">
				<h3 className="font-bold text-zinc-900 mb-4 text-xl flex items-center gap-2">
					🥕 Ingredients
				</h3>
				<ul className="grid md:grid-cols-2 gap-2 text-zinc-700">
					{recipe.ingredients.map((ingredient, idx) => (
						<li key={idx} className="flex items-start gap-2">
							<span className="text-green-600 mt-1">●</span>
							<span>{ingredient}</span>
						</li>
					))}
				</ul>
			</div>

			{/* Instructions */}
			<div className="border-t border-zinc-200 p-8">
				<h3 className="font-bold text-zinc-900 mb-4 text-xl flex items-center gap-2">
					📋 Instructions
				</h3>
				<ol className="space-y-3 text-zinc-700">
					{recipe.instructions.map((step, idx) => (
						<li key={idx} className="flex gap-3">
							<span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500 text-white font-bold flex items-center justify-center">
								{idx + 1}
							</span>
							<span className="pt-1">{step}</span>
						</li>
					))}
				</ol>
			</div>
		</div>
	);
}
