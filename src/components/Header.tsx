"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const navItems = [
  { href: "/", label: "Início" },
  { href: "/produtos", label: "Produtos" },
  { href: "/quemsomos", label: "Quem Somos" },
  { href: "/licencas-e-certificacoes", label: "Licenças" },
  { href: "/contato", label: "Contato" },
];

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const updateHeader = () => setScrolled(window.scrollY > 8);
    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
    return () => window.removeEventListener("scroll", updateHeader);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <header className={`header ${scrolled ? "header-scrolled" : ""}`}>
      <div className="container nav header-inner">
        <Link className="brand" href="/">
          <Image
            src="/images/logoaltamed.svg"
            alt="Altamed — Produtos cirúrgicos e hospitalares"
            width={205}
            height={49}
            priority
          />
        </Link>
        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          aria-controls="primary-navigation"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>
        <nav
          className={`navigation ${menuOpen ? "navigation-open" : ""}`}
          id="primary-navigation"
          aria-label="Navegação principal"
        >
          {navItems.map((item) => {
            const active =
              item.href === "/"
                ? pathname === item.href
                : pathname.startsWith(item.href);

            return (
              <Link
                aria-current={active ? "page" : undefined}
                href={item.href}
                key={item.href}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <Link className="nav-cta header-cta" href="/contato">
          Fale conosco
        </Link>
      </div>
    </header>
  );
}
