import type { Product } from "@/sanity/types";
import { ProductCard } from "./ProductCard";
import { Reveal } from "./Reveal";
export function ProductGrid({ products }: { products: Product[] }) {
  return (
    <div className="product-grid featured-product-grid">
      {products.map((product, index) => (
        <Reveal key={product._id} delay={index * 80}>
          <ProductCard product={product} />
        </Reveal>
      ))}
    </div>
  );
}
