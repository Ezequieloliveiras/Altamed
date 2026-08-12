import Link from "next/link";

type CatalogTab = "products" | "technical";

const tabs: { href: string; label: string; value: CatalogTab }[] = [
  { href: "/produtos", label: "Produtos", value: "products" },
  { href: "/catalogos", label: "Catálogos Técnicos", value: "technical" },
];

export function CatalogNavigation({ active }: { active: CatalogTab }) {
  return (
    <nav className="catalog-tabs" aria-label="Navegação do catálogo">
      {tabs.map((tab) => (
        <Link
          aria-current={active === tab.value ? "page" : undefined}
          href={tab.href}
          key={tab.href}
        >
          {tab.label}
        </Link>
      ))}
    </nav>
  );
}
