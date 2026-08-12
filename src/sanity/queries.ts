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
