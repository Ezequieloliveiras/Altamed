import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
export const metadata: Metadata = {
  title: { default: "Altamed | Soluções Cirúrgicas", template: "%s | Altamed" },
  description: "Equipamentos, instrumentais e materiais para a área cirúrgica.",
  openGraph: { type: "website", locale: "pt_BR", siteName: "Altamed" },
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
