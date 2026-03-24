# DevStore — E-commerce Next.js

> E-commerce de periféricos e acessórios tech construído com Next.js 15 (App Router), TypeScript e Tailwind CSS. Foco em performance (Lighthouse 96+), SEO técnico e boas práticas de engenharia frontend.

**Live:** [dev-store-zeta.vercel.app](https://dev-store-zeta.vercel.app)

---

## Sobre o Projeto

DevStore é um e-commerce completo que demonstra na prática o uso de diferentes estratégias de renderização do Next.js (SSG, SSR, ISR), gerenciamento de estado global com Zustand, testes automatizados e pipeline CI/CD. O projeto foi construído com foco em explicabilidade, cada decisão técnica tem uma justificativa clara.

---

## Tech Stack

| Categoria | Tecnologia |
|---|---|
| Framework | Next.js 15 (App Router) |
| Linguagem | TypeScript |
| Estilização | Tailwind CSS |
| Estado Global | Zustand (com persistência no localStorage) |
| Testes | Vitest + React Testing Library |
| CI/CD | GitHub Actions |
| Deploy | Vercel |
| Ícones | Lucide React |
| API Externa | ViaCEP (autopreenchimento de endereço) |

---

## Funcionalidades

**Catálogo e Produtos**
- Listagem com filtros por categoria, busca por texto e ordenação (preço, avaliação, data)
- Filtros combinam entre si via URLSearchParams
- Páginas de produto geradas estaticamente com `generateStaticParams` e ISR
- Rating com estrelas e meias estrelas, badge de desconto, preço riscado

**Carrinho de Compras**
- Sidebar lateral com overlay, sem navegação de página
- Adicionar, remover, alterar quantidade com confirmação
- Subtotal por item e total do carrinho
- Estado persiste no localStorage (Zustand + middleware persist)
- Contador de itens no ícone do header

**Checkout**
- Formulário responsivo com CSS Grid (col-span)
- Máscaras de input para telefone e CEP (regex)
- Autopreenchimento de endereço via API do ViaCEP (custom hook `useCep`)
- Foco automático no campo número após buscar CEP
- Simulação de processamento com skeleton loading

**SEO Técnico**
- Metadata dinâmica com `generateMetadata` em cada página
- JSON-LD (Schema.org Product) nas páginas de produto
- Sitemap XML gerado automaticamente
- robots.txt configurado

**Qualidade**
- Testes unitários (utils, formatação, cálculos)
- Testes de integração (Zustand store)
- Testes de componentes (ProductCard, AddToCartButton)
- Pipeline CI: lint → type check → testes → build
- Error boundary e página 404 personalizada
- Skeleton loading em estados de carregamento

---

## Lighthouse Scores

| Performance | Accessibility | Best Practices | SEO |
|:-----------:|:------------:|:--------------:|:---:|
| 99 | 96 | 100 | 100 |

---

## Estratégias de Renderização

| Página | Estratégia | Justificativa |
|---|---|---|
| Home (`/`) | SSG + ISR | Conteúdo estável. HTML estático no CDN, TTFB quase zero. |
| Catálogo (`/products`) | SSR | Depende de searchParams (filtros na URL). Cada request gera HTML novo. |
| Produto (`/products/[slug]`) | SSG + ISR | Pré-gerado no build com `generateStaticParams`. Revalida sem redeploy. |
| Carrinho | Client Component | 100% interativo. Depende de estado local (Zustand + localStorage). |
| Checkout | Client Component | Formulário interativo com validação em tempo real. |

---

## Arquitetura

```
src/
├── app/                  # Rotas (Next.js App Router)
│   ├── products/         # Catálogo (SSR) e [slug] detalhe (SSG+ISR)
│   ├── cart/             # Página do carrinho
│   └── checkout/         # Formulário + página de sucesso
├── components/
│   ├── ui/               # Design system (Button, Skeleton, Badge)
│   ├── layout/           # Header, Footer, Container
│   ├── product/          # ProductCard, ProductGrid, ProductFilters
│   └── cart/             # CartSidebar, CartIcon, AddToCartButton
├── hooks/                # Custom hooks (useCep)
├── stores/               # Zustand (cart-store)
├── lib/                  # Utils, constantes, acesso a dados
├── data/                 # JSON mockado (products, categories)
└── types/                # TypeScript interfaces
```

---

## Testes

```bash
# Executar todos os testes
npm test

# Executar em modo watch
npm run test:watch

# Executar com cobertura
npm test -- --coverage
```

Cobertura inclui: funções utilitárias (formatPrice, getDiscountPercentage, cn, formatCep, formatPhone), store do Zustand (addItem, removeItem, updateQuantity, clearCart, getTotalItems, getTotalPrice) e componentes (ProductCard, AddToCartButton).

---

## Rodando Localmente

```bash
git clone https://github.com/felipedev90/dev-store.git
cd dev-store
npm install
npm run dev
```

Acesse `http://localhost:3000`

---

## CI/CD Pipeline

A cada push na `main` ou pull request, o GitHub Actions executa:

1. **Install** - `npm ci` (dependências exatas do lockfile)
2. **Lint** - ESLint
3. **Type Check** - `tsc --noEmit`
4. **Tests** - Vitest (unitários, integração e componentes)
5. **Build** - `npm run build` (garante que compila sem erros)

---

## Autor

**Felipe Augusto** - Desenvolvedor Frontend

- [LinkedIn](https://www.linkedin.com/in/felipesilva90/)
- [GitHub](https://github.com/felipedev90)
- [Portfólio](https://felipe-silva90-portfolio.vercel.app/)