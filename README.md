# Calculador de Estoque

Aplicacao web simples para preencher quantidades de produtos, acompanhar totais e gerar um relatorio de estoque em PDF.

O projeto foi feito com React + Vite, sem backend. A lista de produtos e as quantidades ficam salvas no navegador usando `localStorage`.

## Funcionalidades

- Lista de produtos com quantidades editaveis
- Interface adaptada para mobile
- Scroll interno na lista de produtos, evitando rolagem da pagina inteira
- Gestao de produtos em modal
- Adicionar, renomear e remover produtos
- Ordenacao alfabetica ao adicionar novos produtos
- Resumo com produtos cadastrados, produtos preenchidos e quantidade total
- Relatorio textual na tela
- Geracao de relatorio em PDF
- Persistencia local via `localStorage`

## Tecnologias

- React
- TypeScript
- Vite
- Fluent UI Components
- Griffel
- TanStack React Table
- jsPDF
- Vitest
- Testing Library
- Oxlint
- GitHub Actions

## Requisitos

- Node.js 22 ou superior
- npm

## Como Rodar

Instale as dependencias:

```bash
npm install
```

Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

Abra:

```text
http://localhost:5173/
```

## Scripts

Rodar em desenvolvimento:

```bash
npm run dev
```

Rodar lint:

```bash
npm run lint
```

Rodar testes:

```bash
npm test
```

Rodar testes em modo watch:

```bash
npm run test:watch
```

Gerar build de producao:

```bash
npm run build
```

Visualizar build local:

```bash
npm run preview
```

## Estrutura

```text
src/
  components/
    InventoryHeader.tsx
    InventorySummary.tsx
    InventoryTable.tsx
    MobileProductList.tsx
    ProductManagerDialog.tsx
    ReportPanel.tsx
  data/
    defaultProducts.ts
  hooks/
    useInventoryReport.ts
    useProducts.ts
    useQuantities.ts
  utils/
    reportPdf.ts
  types.ts
```

## Persistencia dos Dados

O app nao usa banco de dados nem API.

Os dados sao salvos no `localStorage` do navegador:

- produtos cadastrados
- quantidades preenchidas

Isso significa que os dados permanecem no mesmo navegador/dispositivo, mas nao sao sincronizados entre celulares, computadores ou navegadores diferentes.

## Relatorio PDF

O botao **PDF** gera um arquivo `relatorio-estoque.pdf` diretamente no navegador usando `jsPDF`.

O relatorio contem:

- data e hora de geracao
- quantidade de produtos preenchidos
- quantidade total
- lista dos produtos com quantidade maior que zero

## Testes

Os testes usam Vitest + Testing Library.

Atualmente cobrem:

- ordenacao e parse de produtos
- hook de produtos
- hook de quantidades
- geracao do relatorio
- interacoes principais do modal de produtos

Para executar:

```bash
npm test
```

## CI/CD

O projeto possui workflows em `.github/workflows`.

### CI

Arquivo:

```text
.github/workflows/ci.yml
```

Executa em pushes para `main` e pull requests:

```bash
npm ci
npm run lint
npm run build
npm test
```

### Deploy

Arquivo:

```text
.github/workflows/deploy.yml
```

Publica o build em GitHub Pages a partir da branch `main`.

O deploy usa:

```bash
BASE_PATH=/calculador-estoque/ npm run build
```

Isso garante que os assets sejam gerados com o caminho correto para GitHub Pages.

## Observacoes

- O app foi pensado principalmente para uso mobile.
- Por nao ter backend, nao existe login, sincronizacao ou compartilhamento automatico de dados.
- Para habilitar o deploy, o GitHub Pages precisa estar configurado para usar GitHub Actions como fonte de publicacao.
