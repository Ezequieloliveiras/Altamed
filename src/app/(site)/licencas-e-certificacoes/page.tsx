import type { Metadata } from "next";
import { InstitutionalDocumentGrid } from "@/components/institutional/InstitutionalDocumentGrid";
import { getInstitutionalDocuments } from "@/sanity/fetch";

function formatLongDate(value?: string) {
  if (!value) return null;

  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return null;

  return new Intl.DateTimeFormat("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

function getLatestUpdatedAt(values: { updatedAt?: string }[]) {
  return values
    .map((item) => item.updatedAt)
    .filter((value): value is string => Boolean(value))
    .sort((a, b) => b.localeCompare(a))[0];
}

export const metadata: Metadata = {
  title: "Licenças e Certificações",
  description:
    "Consulte licenças, autorizações, certificados e documentos institucionais da Altamed.",
};

export const revalidate = 60;

export default async function LicensesAndCertificationsPage() {
  const documents = await getInstitutionalDocuments();
  const latestUpdatedAt = documents?.length
    ? formatLongDate(getLatestUpdatedAt(documents))
    : null;

  return (
    <section className="section container license-page">
      <header className="license-heading">
        <p className="license-kicker">Links e Downloads</p>
        <h1>Autorizações e Licenciamentos</h1>
        <p className="license-intro">
          Consulte autorizações, licenças, certificados e documentos oficiais da
          Altamed.
        </p>
        <div className="license-heading-meta">
          {latestUpdatedAt ? (
            <span>Última atualização: {latestUpdatedAt}</span>
          ) : null}
          {documents?.length ? (
            <span>
              {documents.length}{" "}
              {documents.length === 1
                ? "documento disponível"
                : "documentos disponíveis"}
            </span>
          ) : null}
        </div>
      </header>

      {documents?.length ? (
        <InstitutionalDocumentGrid documents={documents} />
      ) : (
        <div className="license-empty">
          <span className="license-empty-icon" aria-hidden="true" />
          <h2>Nenhum documento disponível</h2>
          <p>
            Os documentos institucionais serão disponibilizados aqui assim que
            estiverem disponíveis.
          </p>
        </div>
      )}
    </section>
  );
}
