# Controle Financeiro Pessoal (Arquitetura Limpa Front-end)

Projeto refatorado com organização modular inspirada em **Clean Architecture**, separando interface, casos de uso, entidades e infraestrutura.

## Estrutura de pastas

```txt
.
├── index.html
├── src
│   ├── main.js
│   ├── entities
│   │   ├── schema.js
│   │   ├── state.js
│   │   └── tabs.js
│   ├── usecases
│   │   ├── alerts.js
│   │   ├── filters.js
│   │   ├── finance.js
│   │   └── reports.js
│   ├── infrastructure
│   │   ├── formatters.js
│   │   └── storage.js
│   └── interface
│       ├── app.js
│       └── modules
│           ├── alerts.js
│           ├── cartoes.js
│           ├── crud-module.js
│           ├── dividas.js
│           ├── filters.js
│           ├── gastos.js
│           ├── json-transfer.js
│           ├── modelo-planilha.js
│           ├── parcelamentos.js
│           ├── planejamento.js
│           ├── receitas.js
│           ├── relatorios.js
│           ├── reserva-metas.js
│           ├── tabs.js
│           ├── valores-receber.js
│           └── visao-geral.js
└── styles
    ├── base.css
    ├── layout.css
    └── modules
        ├── cartoes.css
        ├── dividas.css
        ├── gastos.css
        ├── modelo-planilha.css
        ├── parcelamentos.css
        ├── planejamento.css
        ├── receitas.css
        ├── relatorios.css
        ├── reserva-metas.css
        ├── valores-receber.css
        └── visao-geral.css
```

## Módulos funcionais
- Visão geral financeira
- Receitas
- Gastos
- Dívidas
- Valores a receber
- Parcelamentos
- Cartões
- Reserva e metas
- Planejamento
- Relatórios
- Modelo de planilha
- Exportar/Importar JSON

## Executar
1. Abra `index.html` no navegador, ou
2. Rode um servidor local:
   - `python3 -m http.server 4173`

## Observações
- Persistência em `localStorage`.
- Filtros globais por mês/ano/categoria/pessoa.
- Alertas de vencimentos e pendências.
