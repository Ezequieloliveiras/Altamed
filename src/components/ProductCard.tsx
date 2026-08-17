import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/image";
import type { Product } from "@/sanity/types";
export function ProductCard({ product }: { product: Product }) {
  const image = product.images?.[0];
  let src: string | undefined;
  try {
    src = image?.asset ? urlFor(image).width(640).fit("max").url() : undefined;
  } catch {
    /* placeholder */
  }
  return (
    <article className="card">
      <Link className="card-link" href={`/produtos/${product.slug}`}>
        <div className="card-image">
          {src ? (
            <Image
              src={src}
              alt={image?.alt?.trim() || product.name || "Imagem do produto"}
              fill
              sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw"
              style={{
                objectFit: "contain",
                objectPosition: "center",
                padding: "20px",
              }}
            />
          ) : (
            <span>Imagem indisponível</span>
          )}
        </div>
        <div className="card-body">
          <p className="eyebrow">{product.category?.name || "Produto"}</p>
          <h3>{product.name}</h3>
          <p>
            {product.shortDescription ||
              "Consulte as informações técnicas deste produto."}
          </p>
        </div>
      </Link>
    </article>
  );
}
