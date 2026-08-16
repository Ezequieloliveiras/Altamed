import { defineField, defineType } from "sanity";

export const institutionalDocument = defineType({
  name: "institutionalDocument",
  title: "Licenças e certificações",
  type: "document",
  groups: [
    { name: "basic", title: "Informações principais", default: true },
    { name: "files", title: "Arquivo" },
    { name: "visibility", title: "Exibição" },
  ],
  fields: [
    defineField({
      name: "titulo",
      title: "Título do documento",
      type: "string",
      group: "basic",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "sigla",
      title: "Sigla",
      description: "Exemplo: AFE, LF, AF, CBPFPM ou CRPJ.",
      type: "string",
      group: "basic",
    }),
    defineField({
      name: "categoria",
      title: "Órgão ou categoria",
      description: "Exemplo: ANVISA, Vigilância Sanitária, Prefeitura ou CREA.",
      type: "string",
      group: "basic",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "descricao",
      title: "Descrição curta",
      type: "text",
      rows: 3,
      group: "basic",
      validation: (Rule) => Rule.max(280),
    }),
    defineField({
      name: "arquivoPdf",
      title: "Arquivo PDF",
      type: "file",
      group: "files",
      options: { accept: "application/pdf" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "dataAtualizacao",
      title: "Data de atualização",
      type: "date",
      group: "basic",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "ordem",
      title: "Ordem de exibição",
      description: "Números menores aparecem primeiro.",
      type: "number",
      group: "visibility",
      initialValue: 0,
      validation: (Rule) => Rule.min(0),
    }),
    defineField({
      name: "ativo",
      title: "Exibir documento no site",
      description: "Desative esta opção para ocultar temporariamente o documento.",
      type: "boolean",
      group: "visibility",
      initialValue: true,
    }),
  ],
  orderings: [
    {
      title: "Ordem de exibição",
      name: "displayOrder",
      by: [
        { field: "ordem", direction: "asc" },
        { field: "titulo", direction: "asc" },
      ],
    },
    {
      title: "Atualização mais recente",
      name: "updatedAtDesc",
      by: [{ field: "dataAtualizacao", direction: "desc" }],
    },
    {
      title: "Título",
      name: "titleAsc",
      by: [{ field: "titulo", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "titulo",
      category: "categoria",
      acronym: "sigla",
      active: "ativo",
    },
    prepare({ title, category, acronym, active }) {
      const subtitle = [acronym, category, active === false ? "Inativo" : null]
        .filter(Boolean)
        .join(" | ");

      return { title, subtitle };
    },
  },
});
