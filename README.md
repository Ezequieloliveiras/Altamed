# Altamed — catálogo institucional

Site em Next.js com TypeScript e Sanity CMS. O catálogo público exibe somente produtos marcados como **Exibir produto no site** no Studio.

## Rodar localmente

1. Instale as dependências: `npm install`.
2. Copie `.env.example` para `.env.local` e preencha as variáveis.
3. Execute `npm run dev` e acesse `http://localhost:3000`.
4. A administração fica em `http://localhost:3000/studio`.

## Configurar o Sanity

Crie um projeto em [sanity.io/manage](https://www.sanity.io/manage). No painel do projeto, copie o **Project ID** (em _Settings > API_) para `NEXT_PUBLIC_SANITY_PROJECT_ID`. Use o nome do dataset criado, normalmente `production`, e uma data para `NEXT_PUBLIC_SANITY_API_VERSION`.

No primeiro acesso ao Studio, autentique-se com a conta autorizada no projeto Sanity. Em seguida, cadastre primeiro as categorias e depois os produtos. A primeira imagem do produto será usada como imagem principal. Produtos inativos nunca são consultados pelo site público.

`NEXT_PUBLIC_WHATSAPP` deve conter o telefone internacional somente com dígitos, por exemplo `5511999999999`. Se ele não estiver configurado, os botões direcionam à página de contato.

Nenhum token de escrita é utilizado pelo site público: toda edição e upload ocorre no Sanity Studio.

# Altamed
