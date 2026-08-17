export const productFields = `
  _id, "name": nome, "slug": slug.current, "code": codigo, "brand": marca,
  "shortDescription": descricaoCurta, "description": descricao,
  "images": imagens[]{asset, alt}, "specifications": especificacoes[]{key, value},
  "featured": destaque, "active": ativo, "order": ordem,
  "category": categoria->{_id, "name": nome, "slug": slug.current, "description": descricao}`;
export const activeProductsQuery = `*[_type == "product" && ativo == true] | order(ordem asc, nome asc) {${productFields}}`;
export const featuredProductsQuery = `*[_type == "product" && ativo == true && destaque == true] | order(ordem asc, nome asc)[0...6] {${productFields}}`;
export const productBySlugQuery = `*[_type == "product" && ativo == true && slug.current == $slug][0] {${productFields}}`;
export const categoriesQuery = `*[_type == "category"] | order(nome asc) {_id, "name": nome, "slug": slug.current, "description": descricao}`;
export const activeHomeHeroSlidesQuery = `*[_type == "homeHeroSlide" && ativo == true] | order(coalesce(ordem, 999999) asc, titulo asc) {
  _id,
  "title": titulo,
  eyebrow,
  "description": descricao,
  "desktopImage": imagemDesktop{asset, alt, crop, hotspot},
  "mobileImage": imagemMobile{asset, alt, crop, hotspot},
  "primaryButtonLabel": botaoPrincipalTexto,
  "primaryButtonHref": botaoPrincipalLink,
  "secondaryButtonLabel": botaoSecundarioTexto,
  "secondaryButtonHref": botaoSecundarioLink,
  "active": ativo,
  "order": ordem
}`;
export const activeSuppliersQuery = `*[_type == "supplier" && ativo == true] | order(coalesce(ordem, 999999) asc, nome asc) {
  _id,
  "name": nome,
  logo{asset},
  alt,
  url,
  "order": ordem,
  "active": ativo
}`;
export const productsByCategoryQuery = `*[_type == "product" && ativo == true && categoria->slug.current == $slug] | order(ordem asc, nome asc) {${productFields}}`;
export const activeTechnicalCatalogsQuery = `*[_type == "technicalCatalog" && ativo == true] | order(coalesce(ordem, 999999) asc, titulo asc) {
  _id,
  "title": titulo,
  "slug": slug.current,
  "specialty": especialidade,
  "description": descricao,
  "coverImage": capa{asset, alt},
  "pdfUrl": arquivoPdf.asset->url,
  "active": ativo,
  "order": ordem
}`;
export const activeInstitutionalDocumentsQuery = `*[_type == "institutionalDocument" && ativo == true] | order(coalesce(ordem, 999999) asc, titulo asc) {
  _id,
  "title": titulo,
  "acronym": sigla,
  "category": categoria,
  "description": descricao,
  "updatedAt": dataAtualizacao,
  "pdfUrl": arquivoPdf.asset->url,
  "pdfOriginalFilename": arquivoPdf.asset->originalFilename,
  "active": ativo,
  "order": ordem
}`;
export const aboutPageQuery = `*[_type == "aboutPage"][0] {
  title, eyebrow, heroTitle, heroDescription, heroImage{asset, alt, crop, hotspot},
  aboutTitle, aboutContent, aboutImage{asset, alt, crop, hotspot}, mission, vision, values,
  differentials[]{_key, title, description},
  "gallery": gallery[] | order(coalesce(order, 999999) asc){_key, image{asset, alt, crop, hotspot}, title, description, "order": order},
  stats[]{_key, value, label}, areas, ctaTitle, ctaDescription, ctaButtonLabel
}`;
