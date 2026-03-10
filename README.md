<h1 align="center">Vitrine Pro</h1>

<p align="center">
  <img alt="Next.js" src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white"/>
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white"/>
  <img alt="Tailwind CSS" src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white"/>
  <img alt="React" src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB"/>
</p>

## 💡 Sobre o Projeto

O **Vitrine Pro** é uma aplicação de e-commerce simulada, desenvolvida com foco implacável em **Performance (Core Web Vitals)**, **SEO Avançado** e **Experiência do Usuário (UX)** de alto nível.

Diferente de um clone tradicional, este projeto não foca apenas na elaboração da interface visual, mas sim em resolver problemas de arquitetura reais encontrados em grandes plataformas do mercado, utilizando as capacidades mais recentes do **Next.js** (App Router, React Server Components e Server Actions).

## 🚀 Diferenciais Técnicos e Arquitetura

- **Renderização Híbrida Inteligente:** Utilização de _Server-Side Rendering_ (SSR) e _Incremental Static Regeneration_ (ISR) para entrega otimizada de conteúdo e excelente indexabilidade. A vitrine e o catálogo baseiam-se numa malha pesada de cache com `revalidate: 3600`, que assume a **"falsidade tolerável"** do preço na homepage. O custo computacional de invocar o banco para usuários meramente navegando (Window Shoppers na base dos ~98% de visitantes sem intenção de compra) é cortado drasticamente, garantindo um _Time to First Byte_ (TTFB) impecável para SEO da Google e evitando a penalidade em latência.
- **Validação de Integridade "Double-Check":** Adoção de uma salvaguarda contra _Stale Data_ (dados obsoletos oriundos do cache/ISR). O preço é validado ativamente no servidor via _Server Actions_ no exato momento em que o produto é adicionado ao carrinho e revalidado de forma massiva ("Just-in-Time") no disparo do checkout. Isso previne transações defasadas decorrentes da janela estática no sistema ISR, alertando o cliente sobre mutações no preço durante o período ocioso e garantindo exatidão financeira **apenas** para o baixo percentual de clientes que convertem.
- **Micro-interações e Animações Fluidas:** Integração do `@formkit/auto-animate` para rearranjos de listas com _Zero-Config_. Lógica customizada com `ResizeObserver` para expansão dinâmica do _MegaMenu_. O uso da API JS (ao invés de transições CSS estritas como `grid-template-rows`) justifica-se pela arquitetura de **Slot Polimórfico**: a gaveta alterna organicamente entre o painel de Busca, Categorias da Loja ou o Carrinho (que sofre mutações brutas de altura durante navegação). O `ResizeObserver` orquestra as curvas de aceleração de forma contextual (lenta para expansões visuais pesadas, abrupta para exclusão imediata de itens da sacola).
- **Desempenho (Zero CLS):** Componentes críticos, como o alternador de tema (_Theme Toggle_), adotam _placeholders_ (20x20) perfeitamente dimensionados durante a renderização no lado do servidor, o que impede totalmente o _Cumulative Layout Shift_ na etapa de "hidratação" da página.
- **Resiliência Parcial e Error Boundaries:** Adoção estratégica de _Graceful Degradation_ nas bordas do aplicativo (Root Layout). Chamadas de dados falhas relativas à UI periférica (como itens do Menu) não propagam exceções, mas devolvem _fallbacks_ vazios, evitando que a falha ative um `error.tsx` raiz que destruiria a loja inteira. O padrão de _Fail-Fast_ severo através dos React Error Boundaries é preservado com pinça estritamente nas "Rotas Folha" (ex: a rota final do produto detalhado em `/products/[id]`), maximizando a mitigação do "Raio de Explosão" de sistemas de terceiros intermitentes.

## ✨ Principais Funcionalidades

### 🛍️ Experiência de Compra

- **Carrinho de Compras Global:** Gerenciamento centralizado por _Context API_, contando com persistência nativa via `localStorage`. Impede múltiplos cliques maliciosos (_rage clicks_) inativando e exibindo uma _UI_ de carregamento na hora da validação da compra.
- **Add to Cart Modular:** A chamada à ação nos _Cards_ de Produto aproveita de animação _CSS Grid_ (`grid-template-columns: 0fr → 1fr`), transformando de maneira suave de um disco para uma cápsula completa em eventos de _hover_.

### 🔍 Busca Robusta (Live Search)

- **Preview em Tempo Real:** Listagem dos _matches_ exatos exibidos de modo reativo diretamente no topo, simplificando a jornada e promovendo uma redução substancial em cliques.
- **Debounce & Controle de Concorrência:** Disparo de chamadas atrasadas por 350ms em prol de uma maior economia de banda na API. Inclui aniquilamento de requisições caducas por meio da instância do `AbortController`.
- **URL atuando como SSoT:** O estado textual mapeia inequivocamente os `searchParams` na URL, fortalecendo as capacidades de integração e de compartilhamento natural pelo usuário, preservando coerência de acesso e retornos.

### 🧭 Navegação Ergonômica

- **Mega Menu Inovador:** Contém áreas de apelo heroico _(Poster Cards)_. A infraestrutura reativa com monitoramento do `usePathname` confere transições com fechamento orgânico sem persistir o visual se a rota sofrer mutação.
- **Header Contextualizado:** Se remodela morfologicamente em momento de procura ou análise do carrinho, mudando do escopo direcional para evidenciar fortemente a finalização do processo do cliente.

## 🛠️ Stack Tecnológica

| Tecnologia          | Função no Projeto                                                            |
| :------------------ | :--------------------------------------------------------------------------- |
| **Next.js 16**      | Framework _Fullstack_ (Base sólida de Roteamento Misto)                      |
| **TypeScript**      | Rigor absoluto de restrições por tipagem estática                            |
| **Tailwind CSS v4** | Utilidades pragmáticas contendo regras sob demanda e responsividade integral |
| **Context API**     | Distribuição arquitetada de micro-estados operacionais                       |
| **FakeStoreAPI**    | Mocking e ingestão simulada da loja online                                   |
| **Lucide React**    | Sintaxe leve de construção padronizada para ícones de alta resolução         |
| **Auto-Animate**    | Coreografia e animação em reações na inserção/remoção de nós                 |

## 📂 Estrutura do Projeto

```bash
src/
├── app/                 # Organização de rotas (App Router), CSS globais
│   ├── actions/         # Lógicas seguradas executadas em nó servido (Server Actions)
│   ├── components/      # Compartilhamento global de UI (Header, ThemeToggle...)
│   ├── products/        # Segregação de mapeamento dinâmico via slug ([id])
├── context/             # Regras de negócios do cliente consumidas por contextos (Cart)
├── services/            # Pontes de obtenção atômica em endpoints (Data Fetching wrappers)
├── types/               # Repositório sintático de tipagens (Interfaces TS)
└── utils/               # Formatação monetária (Intl.NumberFormat) e constantes literais
```

## 📅 Roadmap de Desenvolvimento

Evoluções arquitetônicas alocadas nas próximas _Sprints_:

- [ ] **Integração de Rota de Checkout:** Criação de _landing page_ autônoma centralizando faturas e dados simulados de logística.
- [ ] **Captação com Filtros Superiores:** Facetas reativas para recortes detalhados de preços ou redefinições por ordenação global (Promoção/Popular).
- [ ] **Presença e Institucionalidade:** Lançamento das sessões dedicadas a apresentação corporativa e atendimento direto (Rotas `/sobre` e `/contato`).
- [ ] **Refatoração no Shop Menu:** Lapidação responsiva do empilhamento hierárquico nos desdobramentos navegacionais estendidos.

## ⚡ Como Rodar o Aplicação Em Seu Ambiente

### Pré-requisitos Fundamentais

- **Node.js** (Versão = 18.x LTS ou estendida)
- Git para captação dos binários e commits

### Guia Rápido de Iniciação

1. Inicie realizando o clone do projeto de origem:

```bash
git clone <url-do-repositorio>
cd vitrine-pro
```

2. Dispare a extração e instalação da árvore de dependências no pacote correspondente:

```bash
npm install
```

3. Excite o tempo de compilação em desenvolvimento para a visualização servida:

```bash
npm run dev
```

4. Efetue a inspeção do _bundle_ rodando local em [http://localhost:3000](http://localhost:3000).

---

> Desenvolvido priorizando as melhores práticas mercadológicas. Orientado de base ao topo para o consumo primário da experiência robusta em comércio eletrônico.
