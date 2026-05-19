import type { Product } from "../types";

const priceFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export function ProductThumb({ product }: { product: Product }) {
  const discountedPrice =
    product.price * (1 - product.discountPercentage / 100);

  return (
    <div className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow overflow-hidden flex flex-col w-48">
      <div className="relative">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-40 object-cover"
        />
        {product.discountPercentage > 0 && (
          <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full font-semibold">
            -{product.discountPercentage.toFixed(0)}%
          </div>
        )}
      </div>

      <div className="p-3 flex flex-col gap-1">
        <h3
          className="text-sm font-semibold text-zinc-900 line-clamp-2"
          title={product.title}
        >
          {product.title}
        </h3>

        <div className="flex items-center gap-1 text-xs text-zinc-500">
          <span className="text-yellow-400">★</span>
          <span>{product.rating.toFixed(1)}</span>
          <span>·</span>
          <span className="truncate">{product.category}</span>
        </div>

        <div className="flex items-baseline gap-2 mt-1">
          <span className="text-base font-bold text-green-600">
            {priceFormatter.format(discountedPrice)}
          </span>
          {product.discountPercentage > 0 && (
            <span className="text-xs text-zinc-400 line-through">
              {priceFormatter.format(product.price)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
