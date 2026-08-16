import { Reveal } from "@/components/Reveal";
import type { InstitutionalDocument } from "@/sanity/types";
import { InstitutionalDocumentCard } from "./InstitutionalDocumentCard";

export function InstitutionalDocumentGrid({
  documents,
}: {
  documents: InstitutionalDocument[];
}) {
  return (
    <div className="license-grid">
      {documents.map((document, index) => (
        <Reveal key={document._id} delay={index * 70}>
          <InstitutionalDocumentCard document={document} />
        </Reveal>
      ))}
    </div>
  );
}
