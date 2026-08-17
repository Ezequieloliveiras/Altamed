import type { InstitutionalDocument } from "@/sanity/types";

function formatDate(value?: string) {
  if (!value) return null;

  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return null;

  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);
}

function buildDownloadUrl(document: InstitutionalDocument) {
  if (!document.pdfUrl) return null;

  const fallbackName = `${document.title || "documento"}.pdf`;
  const filename = document.pdfOriginalFilename || fallbackName;
  const normalizedFilename = filename.toLowerCase().endsWith(".pdf")
    ? filename
    : `${filename}.pdf`;
  const safeFilename = normalizedFilename.replace(/[\\/:*?"<>|]+/g, "-");
  const separator = document.pdfUrl.includes("?") ? "&" : "?";

  return `${document.pdfUrl}${separator}dl=${encodeURIComponent(safeFilename)}`;
}

function buildDocumentTitle(document: InstitutionalDocument) {
  const title = document.title.trim();
  const acronym = document.acronym?.trim();

  if (!acronym || title.toLowerCase().startsWith(acronym.toLowerCase())) {
    return title;
  }

  return `${acronym} - ${title}`;
}

function FileCheckIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="M14 2H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7z" />
      <path d="M14 2v5h5" />
      <path d="m9 15 2 2 4-5" />
    </svg>
  );
}

function ExternalLinkIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="M14 3h7v7" />
      <path d="M10 14 21 3" />
      <path d="M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <path d="M7 10l5 5 5-5" />
      <path d="M12 15V3" />
    </svg>
  );
}

export function InstitutionalDocumentCard({
  document,
}: {
  document: InstitutionalDocument;
}) {
  const updatedAt = formatDate(document.updatedAt);
  const downloadUrl = buildDownloadUrl(document);
  const documentTitle = buildDocumentTitle(document);

  return (
    <article className="license-card">
      <div className="license-document-icon">
        <FileCheckIcon />
      </div>

      <div className="license-card-content">
        <div className="license-card-meta">
          <span>{document.category}</span>
          {document.acronym ? <span>{document.acronym}</span> : null}
        </div>
        <h2>{documentTitle}</h2>
        {document.description ? <p>{document.description}</p> : null}
        {updatedAt ? (
          <p className="license-date">Atualizado em {updatedAt}</p>
        ) : null}
      </div>

      {document.pdfUrl ? (
        <div
          className="license-actions"
          aria-label={`Ações para ${document.title}`}
        >
          <a
            className="license-action license-action-secondary"
            href={document.pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <ExternalLinkIcon />
            <span>Visualizar</span>
          </a>
          {downloadUrl ? (
            <a
              className="license-action license-action-primary"
              href={downloadUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <DownloadIcon />
              <span>Baixar PDF</span>
            </a>
          ) : null}
        </div>
      ) : (
        <p className="license-unavailable">Arquivo indisponível.</p>
      )}
    </article>
  );
}
