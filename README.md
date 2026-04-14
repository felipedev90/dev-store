# DevStore | E-commerce Next.js

> E-commerce de periféricos e acessórios tech construído com Next.js 15 (App Router), TypeScript e Tailwind CSS. Foco em performance, SEO técnico e boas práticas de engenharia frontend.

**Live:** [dev-store-zeta.vercel.app](https://dev-store-zeta.vercel.app)

---

## Sobre o Projeto

DevStore é um e-commerce completo que demonstra na prática o uso de diferentes estratégias de renderização do Next.js (SSG, SSR, ISR), gerenciamento de estado global com Zustand, testes automatizados e pipeline CI/CD. Cada decisão técnica foi tomada com uma justificativa clara, da escolha de Zustand sobre Context API até o uso de ISR nas páginas de produto.

---

## Lighthouse Scores

<p align="center">
  <img src="/public/images/lighthouse/lighthouse.png" alt="Lighthouse Scores" />
</p>

| Performance | Accessibility | Best Practices | SEO |
| :---------: | :-----------: | :------------: | :-: |
|     98      |      96       |      100       | 100 |

---

## Tech Stack

| Categoria     | Tecnologia                                 |
| ------------- | ------------------------------------------ |
| Framework     | Next.js 15 (App Router)                    |
| Linguagem     | TypeScript                                 |
| Estilização   | Tailwind CSS                               |
| Estado Global | Zustand (com persistência no localStorage) |
| Testes        | Vitest + React Testing Library             |
| CI/CD         | GitHub Actions                             |
| Deploy        | Vercel                                     |
| Ícones        | Lucide React                               |
| API Externa   | ViaCEP (autopreenchimento de endereço)     |

---

## Funcionalidades

### Catálogo e Produtos

- Listagem com filtros por categoria, busca por texto e ordenação (preço, avaliação, data)
- Filtros combinam entre si via URLSearchParams -> categoria + ordenação persistem na URL
- Páginas de produto geradas estaticamente com `generateStaticParams` e ISR
- Galeria de imagens com carousel e thumbnails clicáveis
- Rating com estrelas e meias estrelas, badge de desconto, preço riscado
- Empty state quando busca não retorna resultados

### Carrinho de Compras

- Sidebar lateral com overlay - Abre em qualquer página sem perder contexto
- Adicionar, remover e alterar quantidade com confirmação antes de excluir
- Subtotal por item e total do carrinho em tempo real
- Estado persiste no localStorage (Zustand + middleware persist)
- Contador de itens no ícone do header
- Bloqueio de scroll do body quando sidebar está aberto

### Sistema de Favoritos

- Store Zustand independente com persistência no localStorage
- Toggle de coração com estado visual (preenchido/vazio) na página de produto
- Página dedicada listando todos os produtos favoritados
- Ações de adicionar ao carrinho e remover direto da página de favoritos
- Contador no ícone do header

### Checkout

- Formulário responsivo com CSS Grid (`col-span`)
- Máscaras de input para telefone e CEP com regex
- Autopreenchimento de endereço via API do ViaCEP (custom hook `useCep`)
- Foco automático no campo número após buscar CEP
- Feedback visual de loading durante busca do CEP
- Simulação de processamento com skeleton loading na página de sucesso

### Home Page

- Hero banner com imagem de fundo, overlay e CTA
- Barra de benefícios (frete grátis, compra segura, parcelamento)
- Carousel de logos de parceiros com animação CSS infinita
- Cards de categoria com overlay e link direto pro catálogo filtrado
- Produtos em destaque ordenados por score (rating × reviewCount)
- Seção About Us com branding da loja
- Newsletter com checkbox de política de privacidade

### SEO Técnico

- Metadata dinâmica com `generateMetadata` em cada página
- JSON-LD (Schema.org Product) nas páginas de produto
- Sitemap XML gerado dinamicamente via TypeScript
- robots.txt configurado (bloqueia /checkout e /cart)

### Qualidade e DX

- 30+ testes automatizados (unitários, integração e componentes)
- Pipeline CI: lint → type check → testes → build
- Husky + lint-staged para qualidade no pré-commit
- Error boundary global e página 404 personalizada
- Skeleton loading em estados de carregamento

---

## Estratégias de Renderização

| Página                       | Estratégia       | Justificativa                                                          |
| ---------------------------- | ---------------- | ---------------------------------------------------------------------- |
| Home (`/`)                   | SSG              | Conteúdo estável. HTML estático no CDN, TTFB quase zero.               |
| Catálogo (`/products`)       | SSR              | Depende de searchParams (filtros na URL). Cada request gera HTML novo. |
| Produto (`/products/[slug]`) | SSG + ISR        | Pré-gerado no build com `generateStaticParams`. Revalida sem redeploy. |
| Carrinho / Favoritos         | Client Component | 100% interativo. Depende de estado global (Zustand + localStorage).    |
| Checkout                     | Client Component | Formulário interativo com validação e API externa em tempo real.       |

---

## Arquitetura

```
src/
├── app/                     # Rotas (Next.js App Router)
│   ├── products/            # Catálogo (SSR) e [slug] detalhe (SSG+ISR)
│   ├── favorites/           # Página de favoritos
│   ├── checkout/            # Formulário + página de sucesso
│   ├── sitemap.ts           # Sitemap XML dinâmico
│   └── robots.ts            # Configuração de crawlers
├── components/
│   ├── ui/                  # Design system (Button, Skeleton, Badge)
│   ├── layout/              # Header, Footer, Container
│   ├── product/             # ProductCard, ProductGrid, ProductFilters, ProductGallery
│   ├── cart/                # CartSidebar, CartIcon, AddToCartButton
│   ├── favorites/           # FavoriteButton, FavoriteIcon
│   └── home/                # HeroBanner, LogoSlider, Newsletter, AboutUs
├── hooks/                   # Custom hooks (useCep)
├── stores/                  # Zustand (cart-store, favorite-store)
├── lib/                     # Utils, constantes, acesso a dados
├── data/                    # JSON mockado (products, categories)
└── types/                   # TypeScript interfaces
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

**Cobertura inclui:**

- **Utils:** formatPrice, getDiscountPercentage, cn, formatCep, formatPhone
- **Cart Store:** addItem, addItem duplicado, removeItem, updateQuantity, clearCart, getTotalItems, getTotalPrice
- **Favorite Store:** addItem, removeItem, isFavorite
- **Componentes:** ProductCard (renderização, badge condicional, href), AddToCartButton (clique, estado disabled)

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

1. **Install** - `npm ci`
2. **Lint** - ESLint
3. **Type Check** - `tsc --noEmit`
4. **Tests** - Vitest
5. **Build** - `npm run build`

---

## Autor

**Felipe Augusto** — Desenvolvedor Frontend

- [LinkedIn](https://www.linkedin.com/in/felipesilva90/)
- [GitHub](https://github.com/felipedev90)
- [Portfólio](https://felipe-silva90-portfolio.vercel.app/)
