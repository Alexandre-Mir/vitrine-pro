# Vitrine Pro

Este projeto foi desenvolvido com o objetivo de demonstrar competências em **Next.js**, **SEO Avançado** e arquitetura de **E-commerce**, atendendo às demandas técnicas observadas em grandes players do mercado.

## 🎯 Conceito do Projeto

O **Vitrine Pro** é uma loja virtual simulada cujo foco principal é a **performance (Core Web Vitals)** e a **indexabilidade (SEO)**.

Diferente de um clone de e-commerce tradicional, este projeto prioriza a arquitetura de renderização e as melhores práticas de desenvolvimento web moderno:

- **Arquitetura de Renderização:** Uso estratégico do **App Router** do Next.js para implementar Server-Side Rendering (SSR) e Static Site Generation (SSG), garantindo que o conteúdo seja entregue de forma rápida e otimizada para os motores de busca.
- **Performance Web:** Foco em métricas essenciais como LCP, FID e CLS.
- **SEO Técnico:** Implementação de meta tags dinâmicas (`generateMetadata`), estrutura semântica correta e otimização de ativos.

## 🚀 Diferenciais Técnicos

- **Core:** Next.js 16 (App Router)
- **Estilização:** Tailwind CSS v4 (Design System utilitário e responsivo)
- **Dados:** Consumo de API externa (FakeStoreAPI) simulando um cenário real de integração.
- **Otimização de Imagens:** Uso do componente `next/image` para carregamento lazy, redimensionamento automático e formatos modernos (WebP/AVIF).
- **Acessibilidade:** Códigos estruturados seguindo diretrizes WCAG para garantir uma web inclusiva.

## �️ Stack Tecnológica

O projeto utiliza as tecnologias mais recentes e estáveis do ecossistema React:

- **[Next.js 16](https://nextjs.org/)** - Framework React para produção.
- **[TypeScript](https://www.typescriptlang.org/)** - Superset JavaScript para tipagem estática e segurança.
- **[Tailwind CSS v4](https://tailwindcss.com/)** - Framework CSS Utility-First.
- **[Lucide React](https://lucide.dev/)** - Biblioteca de ícones consistente e leve.
- **[Next Themes](https://github.com/pacocoursey/next-themes)** - Gerenciamento de temas (Dark/Light mode).

## 📂 Estrutura do Projeto

```bash
src/
├── app/                 # App Router (páginas, layouts, rotas dinâmicas)
│   ├── components/      # Componentes de UI (Header, ProductCard, etc.)
│   ├── products/        # Páginas de produtos ([id])
│   ├── services/        # Lógica de consumo da API (fetch wrappers)
│   ├── types/           # Definições de Tipos TypeScript
│   └── utils/           # Funções utilitárias (formatação, etc.)
```

## ⚡ Como Executar

Siga os passos abaixo para rodar o projeto localmente:

### Pré-requisitos

Certifique-se de ter o **Node.js** instalado em sua máquina.

### Instalação

1. Clone o repositório:

   ```bash
   git clone <url-do-repositorio>
   cd vitrine-pro
   ```

2. Instale as dependências:

   ```bash
   npm install
   # ou
   yarn install
   # ou
   pnpm install
   ```

3. Execute o servidor de desenvolvimento:

   ```bash
   npm run dev
   ```

4. Acesse [http://localhost:3000](http://localhost:3000) no seu navegador para ver o resultado.

## 🤝 Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir Issues ou enviar Pull Requests para melhorias no SEO, Performance ou Acessibilidade.

## 📝 Licença

Este projeto é desenvolvido para fins de portfólio e estudo.
