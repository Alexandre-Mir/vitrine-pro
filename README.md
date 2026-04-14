<h1 align="center">🛒 Vitrine Pro</h1>

<p align="center">
  A high-performance simulated e-commerce platform built with Next.js 16, React 19, and Tailwind CSS v4, demonstrating modern frontend architecture and SEO optimization.
</p>

<p align="center">
  <img alt="Next.js" src="https://img.shields.io/badge/Next.js_16-000000?style=for-the-badge&logo=next.js&logoColor=white"/>
  <img alt="React" src="https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB"/>
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white"/>
  <img alt="Tailwind CSS" src="https://img.shields.io/badge/Tailwind_CSS_v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white"/>
</p>

<p align="center">
  <a href="https://vitrine-pro.vercel.app">
    <img alt="Deploy" src="https://img.shields.io/badge/Vercel-Live_Demo-000?style=flat-square&logo=vercel"/>
  </a>
  <a href="#-português">
    <img alt="PT-BR" src="https://img.shields.io/badge/Leia_em-Português-2196F3?style=flat-square"/>
  </a>
</p>

---

## 📸 Preview

![Homepage](./docs/screenshots/homepage.png)
![Checkout](./docs/screenshots/checkout.png)

---

## 📌 About the Project

**Vitrine Pro** is a fully functional e-commerce storefront designed to showcase expertise in **modern frontend architecture**, **performance optimization**, and **advanced data fetching strategies**.

Instead of a simple responsive UI clone, this project solves real-world e-commerce challenges such as intelligent caching mechanisms, server-side data validation, payload limits, and high-conversion accessible forms.

---

## 🧠 Technical Decisions

This project avoids over-engineering while utilizing the latest capabilities of Next.js to provide an exceptional user and developer experience.

### Why Next.js 16 App Router?
**Goal:** Balance optimal SEO performance with fresh data.  
Using the App Router enables a hybrid rendering approach. Product catalog pages leverage **SSR (Server-Side Rendering)** combined with **ISR (Incremental Static Regeneration)**. This ensures that the initial HTML is pre-rendered for search engine crawlers and users experience a fast TTFB (Time to First Byte), while keeping stock availability and pricing updated in the background without sacrificing performance.

### Why Server Actions?
**Goal:** Secure data processing without the overhead of standalone API routes.  
Server Actions are used for real-time search processing and shopping cart validation. For example, before proceeding to checkout, a Server Action validates the batch of cart items directly on the server. This guarantees that prices haven't been tampered with on the client-side while entirely bypassing the need to create, type, and maintain dedicated API endpoints.

### Why Context API + `localStorage` with Debounce?
**Goal:** Lightweight global state without the boilerplate of Redux or Zustand.  
For the specific scope of this project, the shopping cart only requires a simple, persistent global state. By utilizing the native **Context API**, we avoid unnecessary external dependencies. To prevent performance bottlenecks from continuous IO operations, cart state updates to `localStorage` are wrapped in a **custom `useDebounce` hook**, significantly reducing the write frequency during rapid user interactions.

---

## ⚙️ Features

- **Hybrid Rendering (SSR + ISR):** SEO-optimized content delivery with smart cache revalidation.
- **Real-time Server Search:** Live search powered by Server Actions with debouncing and race-condition control.
- **State URL Synchronization:** Search parameters reflect directly into the URL `searchParams`, establishing a Single Source of Truth to allow link sharing.
- **Dynamic Mega Menu:** Responsive advanced navigation utilizing `ResizeObserver` for dynamic transitions.
- **Secure Cart & Checkout Verification:** Double-check price validation logic triggered upon adding units and during batch checkout.
- **Smart Address Auto-Fill:** Integration with the ViaCEP API directly auto-completes address details upon entering the postal code.
- **Resiliency & Error Handling:** Implementation of `FallbackImage` for missing assets without layout shifts (Zero CLS) and strategic `ErrorBoundaries` for graceful degradation.

---

## 🛠️ Tech Stack

| Technology | Version | Description |
|:---|:---|:---|
| **Next.js** | `16.1.4` | Fullstack Framework (App Router, RSC, Server Actions) |
| **React** | `19.2.3` | UI Library with React Compiler enabled |
| **TypeScript** | `^5.x` | Static typing |
| **Tailwind CSS** | `^4.x` | Utility-first styling and responsive design |
| **Context API** | - | Native global state management |
| **FakeStoreAPI** | - | External mocked inventory API |
| **ViaCEP API** | - | Brazilian postal code data auto-completion |

---

## 🚀 How to Run Locally

### Prerequisites
- **Node.js** 18+ 
- **Git**

### Installation

```bash
# Clone the repository
git clone https://github.com/Alexandre-Mir/vitrine-pro.git

# Enter the directory
cd vitrine-pro

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

<br/>

<h2 id="-português">🇧🇷 Português</h2>

## 📌 Sobre o Projeto

O **Vitrine Pro** é uma loja virtual funcional, construída para demonstrar domínio em **arquitetura frontend moderna**, **otimização de performance** e **estratégias de obtenção de dados**. 

Ele vai além de um clone visual, resolvendo problemas reais de e-commerce, como cache inteligente, validação de dados no servidor e formulários focados em conversão.

---

## 🧠 Decisões Técnicas

### Por que Next.js 16 App Router?
**Objetivo**: Equilibrar performance com dados frescos.  
O projeto renderiza a vitrine com **SSR + ISR**, o que garante um HTML imediato para SEO e uma performance impressionante de TTFB, enquanto revalida estoques e preços nos bastidores sem prejudicar a experiência do usuário. 

### Por que Server Actions?
**Objetivo**: Processamento de busca e validação de carrinho no servidor sem criar API Routes.  
O carrinho e a busca são validados em tempo real no servidor via Server Actions. Ao finalizar a compra, os preços no carrinho do cliente são checados novamente pela fonte de dados no servidor, prevenindo fraudes no cliente e economizando a criação das tradicionais rotas em `/api`.

### Por que Context API + debounce no localStorage?
**Objetivo**: Estado global leve sem Redux para este escopo.  
Para evitar depender de bibliotecas externas complexas num estado simples, o projeto usa a Context API do React. Toda alteração no carrinho enviada para o `localStorage` é processada com um mecanismo de *debounce* para não travar o *main thread* do navegador com IO contínuo durante ações super rápidas do usuário.

---

## ⚙️ Funcionalidades

- **Renderização Híbrida (SSR + ISR):** Caching inteligente de catálogo.
- **Busca em tempo real:** Processada via servidor com de-duplicação de chamadas.
- **SSoT na URL:** Filtros e pesquisa injetados diretamente na URL (`searchParams`).
- **Mega Menu Dinâmico:** Layout otimizado responsivo.
- **Checkout Seguro:** Dupla validação do carrinho em lote antes da compra.
- **Autopreenchimento Inteligente:** Consumo da ViaCEP API com auto-focus pós-preenchimento.
- **Experiência sem quebras (Graceful Fallback):** Image skeletons e Error Boundaries instalados em rotas chave.

---

## 🛠️ Tecnologias

- **Next.js 16.1.4** (App Router, Server Actions)
- **React 19.2.3**
- **TypeScript** ~5
- **Tailwind CSS v4**
- **Context API**
- **ViaCEP & FakeStore API**

---

## 🚀 Como Rodar Localmente

```bash
git clone https://github.com/Alexandre-Mir/vitrine-pro.git
cd vitrine-pro
npm install
npm run dev
```
Acesse `http://localhost:3000` no seu navegador.
