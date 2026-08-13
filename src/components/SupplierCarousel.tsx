import Image from "next/image";
import { urlFor } from "@/sanity/image";
import type { Supplier } from "@/sanity/types";

type SupplierWithSource = Supplier & { src: string };

function SupplierLogo({
  supplier,
  interactive = false,
}: {
  supplier: SupplierWithSource;
  interactive?: boolean;
}) {
  const logo = (
    <Image
      src={supplier.src}
      alt={interactive ? supplier.alt?.trim() || supplier.name : ""}
      width={400}
      height={160}
      sizes="(max-width: 760px) 150px, 200px"
    />
  );

  if (interactive && supplier.url) {
    return (
      <a
        className="supplier-logo"
        href={supplier.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Visitar site da ${supplier.name}`}
      >
        {logo}
      </a>
    );
  }

  return <span className="supplier-logo">{logo}</span>;
}

export function SupplierCarousel({ suppliers }: { suppliers: Supplier[] }) {
  const preparedSuppliers = suppliers.reduce<SupplierWithSource[]>(
    (items, supplier) => {
      try {
        if (supplier.logo?.asset) {
          items.push({
            ...supplier,
            src: urlFor(supplier.logo).width(600).fit("max").url(),
          });
        }
      } catch {
        // Ignore a logo inválida sem comprometer a seção inteira.
      }
      return items;
    },
    [],
  );

  if (!preparedSuppliers.length) return null;

  const repeatCount = Math.max(1, Math.ceil(6 / preparedSuppliers.length));
  const loopSuppliers = Array.from({ length: repeatCount }, () => preparedSuppliers).flat();

  return (
    <div className="supplier-ticker" aria-label="Fornecedores e parceiros Altamed">
      <div className="supplier-track">
        <div className="supplier-track-group">
          {loopSuppliers.map((supplier, index) => (
            <SupplierLogo
              key={`${supplier._id}-primary-${index}`}
              supplier={supplier}
              interactive={index < preparedSuppliers.length}
            />
          ))}
        </div>
        <div className="supplier-track-group" aria-hidden="true">
          {loopSuppliers.map((supplier, index) => (
            <SupplierLogo key={`${supplier._id}-duplicate-${index}`} supplier={supplier} />
          ))}
        </div>
      </div>
    </div>
  );
}
