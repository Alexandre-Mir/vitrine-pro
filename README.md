<h1 align="center">🛒 Vitrine Pro — E-commerce de Alta Performance</h1>

<p align="center">
  <em>Case Study: Como construir um e-commerce escalável, seguro e com alta performance de SEO utilizando Next.js 16.</em>
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
</p>

---

## ⏱️ O Projeto em 6 Segundos
- **Contexto:** Lojas virtuais baseadas em SPAs padrão sofrem com lenta renderização inicial e indexação falha em motores de busca, penalizando fortemente a taxa de conversão (ROI).
- **O Conflito:** Como garantir indexação imediata (SEO impecável) e segurança nas transações comerciais sem perder a interatividade super fluida no frontend e sem inchar o projeto com deploys pesados de backend?
- **O Impacto:** O **Vitrine Pro** resolve essa equação combinando **Next.js 16 (App Router)** em Renderização Híbrida (SSR + ISR) com validações fluídas via **Server Actions**. O resultado comercial: **Zero CLS**, navegação imediata, nota **97/100 em Acessibilidade (WCAG)** e uma interface hiperconvergente.

---

## ⏱️ Visão Geral em 60 Segundos

<p align="center">
  <img alt="Homepage preview" src="./docs/screenshots/homepage.png" width="48%">
  <img alt="Checkout preview" src="./docs/screenshots/checkout.png" width="48%">
</p>

### ⚡ Destaques da Solução
- **SEO & Velocidade:** Renderização de catálogos via SSR limitando requests bloqueantes, e validação no *background* com ISR.
- **Segurança Transacional:** Carrinho validado estritamente por *Server Actions* eliminando riscos de tampering no cliente.
- **SSoT de Navegação:** Estado de busca sincronizado à URL (`searchParams`), permitindo compartilhamento assíncrono de links de campanha.
- **Design Resiliente:** Integração dinâmica de `Error Boundaries`, prevenindo que a página caia por falhas localizadas (Graceful Degradation).
- **UX Adaptativa:** Automação do input do CEP utilizando a **ViaCEP API**.

### 🛠️ Stack Tecnológica Central
- **Next.js 16.1.4** (App Router, Server Actions, SSR)
- **React 19.2.3**
- **TypeScript 5**
- **Tailwind CSS v4**

---

## ⏱️ Mergulho Profundo (Deep Dive) em 6 Minutos

Em engenharia moderna de interfaces, mais importante do que dominar uma tecnologia é possuir **Integridade Decisória**: saber *por que* um recurso é utilizado e quais são os **trade-offs** envolvidos.

### 1. App Router vs. CSR (Client-Side Rendering) Clássico
**O Problema Comercial:** Um site renderizado puramente no React trava na *blank screen* enquanto computa os bundles JavaScript — matando Core Web Vitals (LCP) e destruindo a rentabilidade do e-commerce.
**A Solução & Trade-off:** Ao implementar o Next.js App Router (Híbrido SSR + CSR), o servidor assume a carga de entregar um HTML totalmente parseado no carregamento inicial.  
*Trade-off:* O desenvolvedor assume a maior carga cognitiva de separar a barreira entre Server Components e Client Components, mas o negócio ganha fôlego crucial nos rastreadores do Google.

### 2. Validação Direta: Server Actions vs. Rotas REST Genéricas
**O Problema de Risco:** Preços visíveis na dominação do DOM podem ser maquiados no console por usuários mal-intencionados.
**A Solução & Trade-off:** Ao invés de orquestrar complexos *endpoints* REST em pastas `/api`, o *Vitrine Pro* usa Server Actions instanciando lógicas confidenciais numa camada RPC segura, compartilhando *Types* do TypeScript do Backend pro Frontend (E2E Typing), eliminando payloads inflados.

### 3. Gerenciamento Leve: Context API + Debounce vs. Redux
**O Problema do Overengineering:** Lojas exigem um *state* global para o carrinho. Soluções de mercado pesadas engordariam o bundle.
**A Solução & Trade-off:** Uso da infraestrutura nativa Context API do React + `localStorage`.  
A escrita manual em disco/localStorage é *Synchronous*. Para prevenir travas na thread principal quanto o cliente adicionar muitos itens velozmente, criou-se um **Hook Wrapper de Debounce**. As gravações no Storage ocorrem apenas após o usuário pausar sua interação iterativa em frações de segundos. Resultado: alta fidelidade local + Zero congelamento de UI.

---

## 🚀 Como Validar Localmente

Certifique-se de possuir o [Node.js](https://nodejs.org/en/) instalado (versão 18.x ou superior).

```bash
# 1. Clone o projeto e entre no diretório clonado
git clone https://github.com/Alexandre-Mir/vitrine-pro.git
cd vitrine-pro

# 2. Instale as dependências
npm install

# 3. Levante o ambiente de desenvolvimento local
npm run dev
```

Abra seu navegador em [http://localhost:3000](http://localhost:3000).
