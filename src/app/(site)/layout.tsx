import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "../globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppFloatingButton } from "@/components/WhatsAppFloatingButton";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});
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
      <body className={manrope.variable}>
        <Header />
        <main>{children}</main>
        <Footer />
        <WhatsAppFloatingButton />
      </body>
    </html>
  );
}
