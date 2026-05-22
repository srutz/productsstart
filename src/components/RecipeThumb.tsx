import type { Recipe } from "#/hooks/types";

export function RecipeThumb({ recipe }: { recipe: Recipe }) {
  const totalTime = recipe.prepTimeMinutes + recipe.cookTimeMinutes;

  return (
    <div className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow overflow-hidden flex flex-col w-48">
      <div className="relative">
        <img
          src={recipe.image}
          alt={recipe.name}
          className="w-full h-40 object-cover"
        />
        <div className="absolute top-2 right-2 bg-orange-500 text-white text-xs px-2 py-0.5 rounded-full font-semibold">
          {recipe.difficulty}
        </div>
      </div>

      <div className="p-3 flex flex-col gap-1">
        <h3
          className="text-sm font-semibold text-zinc-900 line-clamp-2"
          title={recipe.name}
        >
          {recipe.name}
        </h3>

        <div className="flex items-center gap-1 text-xs text-zinc-500">
          <span className="text-yellow-400">★</span>
          <span>{recipe.rating.toFixed(1)}</span>
          <span>·</span>
          <span className="truncate">{recipe.cuisine}</span>
        </div>

        <div className="flex items-baseline gap-2 mt-1 text-xs text-zinc-600">
          <span className="font-semibold text-zinc-900">{totalTime} min</span>
          <span>·</span>
          <span>{recipe.caloriesPerServing} kcal</span>
        </div>
      </div>
    </div>
  );
}
