export default function LoadingLicensesAndCertifications() {
  return (
    <section className="section container license-page">
      <header className="license-heading">
        <p className="license-kicker">Links e Downloads</p>
        <h1>Autorizações e Licenciamentos</h1>
        <p className="license-intro">
          Consulte autorizações, licenças, certificados e documentos oficiais da
          Altamed.
        </p>
      </header>

      <div className="license-grid" aria-hidden="true">
        <div className="license-skeleton" />
        <div className="license-skeleton" />
        <div className="license-skeleton" />
      </div>
    </section>
  );
}
