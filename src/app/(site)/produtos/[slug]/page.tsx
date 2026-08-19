import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductGallery } from "@/components/ProductGallery";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { getProductBySlug } from "@/sanity/fetch";
import { urlFor } from "@/sanity/image";
import type { Product } from "@/sanity/types";

const siteUrl = "https://www.altamedtecnologia.com.br";

type Props = { params: Promise<{ slug: string }> };

function getOpenGraphImage(product: Product) {
  const image = product.images?.find(
    (item) => item.asset?._ref || item.asset?.url,
  );

  if (!image) return undefined;

  try {
    return urlFor(image)
      .width(1200)
      .height(630)
      .fit("crop")
      .auto("format")
      .url();
  } catch {
    return undefined;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) return { title: "Produto não encontrado" };

  const canonical = `${siteUrl}/produtos/${slug}`;
  const description =
    product.shortDescription || `Informações sobre ${product.name}`;
  const openGraphImage = getOpenGraphImage(product);

  return {
    title: product.name,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      title: `${product.name} | Altamed`,
      description,
      url: canonical,
      type: "website",
      images: openGraphImage
        ? [{ url: openGraphImage, alt: product.name }]
        : undefined,
    },
  };
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
