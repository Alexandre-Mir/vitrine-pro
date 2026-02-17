# Vitrine Pro

Este projeto foi desenvolvido com o objetivo de demonstrar competências em **Next.js**, **SEO Avançado** e arquitetura de **E-commerce**, atendendo às demandas técnicas observadas em grandes players do mercado.

## 🎯 Conceito do Projeto

O **Vitrine Pro** é uma loja virtual simulada cujo foco principal é a **performance (Core Web Vitals)**, a **indexabilidade (SEO)** e uma **experiência de usuário (UX)** fluida e moderna.

Diferente de um clone de e-commerce tradicional, este projeto prioriza a arquitetura de renderização híbrida e as melhores práticas de desenvolvimento web moderno:

- **Arquitetura de Renderização:** Uso estratégico do **App Router** do Next.js para implementar Server-Side Rendering (SSR) e Static Site Generation (SSG), garantindo entrega rápida de conteúdo.
- **Gerenciamento de Estado Global:** Implementação de Context API para gerenciar o carrinho de compras de forma eficiente em toda a aplicação.
- **Server Actions:** Validação de preços e lógica de negócios segura executada no servidor.

## 🚀 Diferenciais Técnicos

- **Core:** Next.js 16 (App Router) com React Server Components.
- **Estilização:** Tailwind CSS v4 (Design System utilitário e responsivo).
- **Dados:** Consumo de API externa (FakeStoreAPI) simulando integração real.
- **Carrinho Inteligente:** Validação de preço no servidor antes de adicionar ao carrinho (`server action`), garantindo integridade dos dados.
- **UI Responsiva:** Mega Menu dinâmico com visualização rápida do carrinho e navegação por categorias.

## ✨ Funcionalidades Recentes

- **Global Cart Context:** Gerenciamento de estado do carrinho acessível em toda a aplicação.
- **Mega Menu Interativo:** Navegação expandida com visualização direta dos itens do carrinho e cálculo de total em tempo real.
- **Validação Server-Side:** Proteção contra diverciência de preços ao adicionar itens ao carrinho.
- **Newsletter:** Componente de inscrição com feedback visual de status (loading/success).

## �️ Estratégia de Integridade de Dados (Carrinho)

Este projeto implementa uma salvaguarda robusta contra dados obsoletos (_stale data_) oriundos da estratégia de ISR (Incremental Static Regeneration).

### O Desafio

Com o ISR, uma página de produto pode exibir um preço em "cache" por até 1 hora, enquanto o preço real na API já mudou. Isso cria o risco de o usuário adicionar um item com valor incorreto ao carrinho.

### A Solução: Validação "Just-in-Time"

Implementamos uma verificação obrigatória no momento da ação de compra (`AddToCart`):

1.  **Server Action (`validateCartItem`)**: Ao clicar em "Comprar", uma requisição server-side busca o dado fresco na API original (bypassing cache), comparando-o com o valor exibido na tela.
2.  **Bloqueio Consciente (vs. Optimistic UI)**: Optamos deliberadamente por **não usar UI Otimista** nesta transação financeira.
    - _Motivo:_ Evitar a frustração do "preço que muda sozinho" no carrinho. A latência da validação é um trade-off aceitável em troca da garantia de que **o preço no carrinho é sempre o preço real**.
3.  **Prevenção de Rage Clicks**: O botão entra em estado `disabled` + `loading` ("Verificando...") durante a validação, impedindo múltiplos cliques acidentais ou ansiosos que duplicariam itens.
4.  **Tratamento de Falhas**: Erros de rede ou API não falham silenciosamente. O usuário recebe feedback visual e o sistema reseta para permitir uma nova tentativa, sem prender a UI em um estado inválido.

## �🛠️ Stack Tecnológica

O projeto utiliza as tecnologias mais recentes e estáveis do ecossistema React:

- **[Next.js 16](https://nextjs.org/)** - Framework React para produção.
- **[TypeScript](https://www.typescriptlang.org/)** - Superset JavaScript para tipagem estática e segurança.
- **[Tailwind CSS v4](https://tailwindcss.com/)** - Framework CSS Utility-First.
- **[Lucide React](https://lucide.dev/)** - Biblioteca de ícones consistente e leve.
- **[Zustand / Context API](https://react.dev/reference/react/createContext)** - Gerenciamento de estado (Context API nativa utilizada).

## 📂 Estrutura do Projeto

```bash
src/
├── app/                 # App Router
│   ├── actions/         # Server Actions (validações, mutações)
│   ├── components/      # Componentes de UI (Header, MegaMenu, etc.)
│   ├── products/        # Páginas de produtos ([id])
│   ├── layout.tsx       # Layout raiz
│   ├── page.tsx         # Home page
│   └── globals.css      # Estilos globais e tokens
├── context/             # Contextos React (CartContext)
├── services/            # Lógica de consumo da API (fetch wrappers)
├── types/               # Definições de Tipos TypeScript
└── utils/               # Funções utilitárias (formatação, etc.)
```

## 📅 Próximos Passos

O roadmap de desenvolvimento inclui as seguintes melhorias estratégicas:

1. **Revisar o estilo Tailwind & UX**
   - [x] Acelerar o carregamento de imagens (LCP otimizado com importação estática)
   - [x] Corrigir "zona morta" abaixo do header (ajuste de altura)
   - [x] Substituir placeholders do MegaMenu por produtos reais (Parallel Data Fetching)
   - [x] Persistir itens do carrinho no refresh (localStorage + Mounted Check)
   - [ ] Suavizar animação de fechamento do MegaMenu (CSS Grid transition)
   - [ ] No ProductCard, ao "hover" o botão deve se expandir para informar "adicionar ao carrinho"
   - [ ] Repensar a localização e UX do alternador de tema (claro/escuro).
   - [ ] No MegaMenu Shop, ajustar o layout para destacar apenas 1 produto principal ao invés de 3 apertados.

1. **Funcionalidade de Busca (Search):**
   - Evoluir o input de busca no menu (atualmente visual) para filtrar produtos em tempo real.
   - Implementar redirecionamento para uma página de resultados (`/search?q=...`) com SSR.
   - Só pesquisar quando o usuário clicar para enviar ou Enter
   - Mostrar produtos abaixo da barra de pesquisa, no MegaMenu, com o limite de 3 produtos.
   - Ao enviar a pesquisa, o megamenu deve fechar

1. **Página de Checkout:**
   - Criar a rota de finalização de compra.
   - Desenvolver o resumo do pedido e formulário simulado de pagamento e entrega.

1. **Filtros e Ordenação Avançados:**
   - Implementar filtros por faixa de preço e avaliação nas páginas de Categoria e Home.
   - Adicionar ordenação (Menor Preço, Maior Preço, Mais Vendidos) para empoderar a navegação do usuário.

1. Criar pagina sobre
   Cria pagina contato

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
   ```

3. Execute o servidor de desenvolvimento:

   ```bash
   npm run dev
   ```

4. Acesse [http://localhost:3000](http://localhost:3000) no seu navegador.

## 🤝 Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir Issues ou enviar Pull Requests.

## 📝 Licença

Este projeto é desenvolvido para fins de portfólio e estudo.
