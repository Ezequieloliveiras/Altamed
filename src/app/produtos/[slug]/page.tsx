import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductGallery } from "@/components/ProductGallery";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { getProductBySlug } from "@/sanity/fetch";
type Props = { params: Promise<{ slug: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await getProductBySlug((await params).slug);
  return product
    ? {
        title: product.name,
        description:
          product.shortDescription || `Informações sobre ${product.name}`,
        openGraph: {
          title: `${product.name} | Altamed`,
          description: product.shortDescription,
        },
      }
    : { title: "Produto não encontrado" };
}
export default async function ProductPage({ params }: Props) {
  const product = await getProductBySlug((await params).slug);
  if (!product) notFound();
  return (
    <section className="section container product-detail">
      <div>
        <ProductGallery images={product.images} name={product.name} />
      </div>
      <div className="product-copy">
        <p className="eyebrow">{product.category?.name || "Produto"}</p>
        <h1>{product.name}</h1>
        {product.code && <p className="reference">Código: {product.code}</p>}
        {product.brand && (
          <p>
            <strong>Marca:</strong> {product.brand}
          </p>
        )}
        <p className="description">
          {product.description || product.shortDescription}
        </p>
        <WhatsAppButton productName={product.name} />
      </div>
      {product.specifications?.length ? (
        <div className="specifications">
          <h2>Especificações técnicas</h2>
          <dl>
            {product.specifications.map((item, index) => (
              <div key={`${item.key}-${index}`}>
                <dt>{item.key}</dt>
                <dd>{item.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      ) : null}
    </section>
  );
}
