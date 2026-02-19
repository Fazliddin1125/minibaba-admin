import { Star } from "lucide-react";
import { type Product } from "../../../store";



function ProductCard({ product }: { product: Product }) {



  return (
    <div className="flex items-center gap-3 p-3 border rounded-xl hover:bg-accent transition-colors duration-150 group cursor-pointer">
      {/* Image */}
      <div className="w-14 h-14 rounded-md overflow-hidden bg-secondary shrink-0">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              "https://placehold.co/56x56/f3f4f6/9ca3af?text=📦";
          }}
        />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-foreground truncate leading-snug">
          {product.name}
        </p>
        <div className="flex items-center gap-1 mt-0.5">
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          <span className="text-xs text-foreground">
            {product.rating.toFixed(1)}{" "}
            <span className="text-muted-foreground opacity-70">({product.reviewCount} ta sharx)</span>
          </span>
        </div>
        <p className="text-xs font-semibold text-primary mt-0.5">
          {product.sold.toLocaleString()} ta sotilgan
        </p>
      </div>
    </div>
  );
}

export default ProductCard;