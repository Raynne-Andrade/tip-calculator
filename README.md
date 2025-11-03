# 💰 Tip Calculator - Documentação de Infraestrutura

Este documento serve como um guia de referência para a arquitetura, estrutura de código e procedimentos de desenvolvimento do projeto **Tip Calculator**.

## 🚀 Visão Geral do Projeto

O **Tip Calculator** é uma aplicação web desenvolvida com **Vue 3** e **TypeScript** que permite aos usuários calcular a gorjeta e o valor total por pessoa, com a funcionalidade adicional de conversão para Real Brasileiro (BRL) usando uma API de cotação de moedas.

| Característica | Detalhe |
| :--- | :--- |
| **Framework** | Vue 3 (Composition API com `<script setup>`) |
| **Linguagem** | TypeScript |
| **Build Tool** | Vite |
| **Estilização** | CSS (Sass) com metodologia BEM (com escopo em componentes) |
| **API Externa** | Awesome API (para cotação de moedas) |

## ⚙️ Estrutura de Diretórios

A estrutura do projeto segue as convenções modernas do Vue/Vite, com uma clara separação de responsabilidades.

```
src/
├── assets/             
├── components/         # Componentes reutilizáveis da UI
│   ├── icons/          # Componentes de ícones (Next.vue, Back.vue)
│   ├── CalculatorPanel.vue
│   ├── InputRange.vue
│   ├── ResultPanel.vue
│   └── Switch.vue
├── services/           # Lógica de negócio e comunicação com APIs
│   └── useCurrency.ts  # lógica de câmbio
├── types.ts            # Definições de tipos e interfaces globais
├── App.vue             # Componente raiz da aplicação
├── main.ts             # Ponto de entrada da aplicação (montagem do Vue)
└── style.css           # Estilos globais
```

## 🧩 Componentes Principais

| Componente | Responsabilidade | Props Principais | Emits Principais |
| :--- | :--- | :--- | :--- |
| **`App.vue`** | Componente raiz. Gerencia o estado global da aplicação, coordena a lógica de cálculo e a conversão de moeda. | N/A | N/A |
| **`CalculatorPanel.vue`** | Painel de entrada de dados. Coleta o valor da conta, porcentagem da gorjeta e número de pessoas. | `billAmount`, `tipPercentage`, `numberOfPeople`, `selectedCurrency` | `update:bill-amount`, `update:tip-percentage`, `update:number-of-people`, `update:currency` |
| **`ResultPanel.vue`** | Painel de exibição de resultados. Mostra os valores calculados e o resultado da conversão para BRL. | `tipAmount`, `totalAmount`, `perPersonAmount`, `conversionBRL` | N/A |
| **`InputRange.vue`** | Componente genérico para entrada de valores do tipo range. | `label`, `value`, `min`, `max`, `step` | `update:value` |
| **`Switch.vue`** | Componente para seleção da moeda (USD/EUR). | `selectedCurrency` | `update:currency` |

## 🛠️ Lógica de Negócio e Tipagem

### `src/services/useCurrency.ts`

Este arquivo implementa um **Composable** (um *hook* reativo do Vue) para isolar a lógica de busca da taxa de câmbio.

*   **Função:** `useCurrency(selectedCurrency: Ref<Currency>)`
*   **Retorno:** Um objeto reativo contendo:
    *   `exchangeRate`: `Ref<Rates | null>` - A taxa de câmbio atual.
    *   `conversionBRL`: `Ref<number | null>` - O valor convertido para BRL.
    *   `error`: `Ref<string | null>` - Mensagem de erro em caso de falha na API.
    *   `fetchExchangeRate`: `() => Promise<void>` - Função para forçar a busca da taxa.
*   **Mecanismo:** Utiliza a função `watch` do Vue para reagir automaticamente à mudança da `selectedCurrency` e buscar a nova cotação.

### `src/types.ts`

Este arquivo centraliza todas as definições de tipo da aplicação, garantindo consistência e segurança de tipo em todo o projeto.

| Tipo/Interface | Descrição | Uso Principal |
| :--- | :--- | :--- |
| `Currency` | Tipo literal para as moedas suportadas (`'USD' \| 'EUR'`). | `App.vue`, `Switch.vue`, `useCurrency.ts` |
| `Rates` | Interface para o objeto de taxas de câmbio (ex: `{ BRL: number }`). | `useCurrency.ts` |
| `ResultItem` | Interface para um item de resultado exibível. | `ResultPanel.vue` |
| `*Props` | Interfaces para as propriedades de cada componente (ex: `CalculatorPanelProps`). | `CalculatorPanel.vue`, `ResultPanel.vue`, etc. |

## 💻 Como Rodar o Projeto Localmente

### Pré-requisitos

*   [Node.js](https://nodejs.org/) (versão 18+)
*   [npm](https://www.npmjs.com/) (Gerenciador de pacotes recomendado)

### Instalação

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/Raynne-Andrade/tip-calculator.git
    cd tip-calculator
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    ```
    
3.  **Inicie o servidor de desenvolvimento:**
    ```bash
    npm run dev
    ```

O projeto estará acessível em `http://localhost:5173/`.
### Comandos de Build

| Comando | Descrição |
| :--- | :--- |
| `npm run dev` | Inicia o servidor de desenvolvimento. |




## 📄 Licença

Este projeto está licenciado sob a Licença MIT. Veja o arquivo `LICENSE` para mais detalhes.
