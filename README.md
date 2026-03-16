# Sistema Completo de Controle Financeiro Pessoal

Aplicativo web simples (HTML/CSS/JS) para uso diário com foco em organização, clareza e tomada de decisão.

## Como usar
1. Abra `index.html` no navegador.
2. Configure saldo inicial (total em conta e em dinheiro).
3. Cadastre receitas, gastos, dívidas, valores a receber, parcelamentos, cartões, metas e planejamento.
4. Use os filtros no topo por mês, ano, categoria e pessoa.

## Estrutura ideal de tabelas (modelo de planilha)

### 01_VisaoGeral
- Saldo Atual
- Total em Conta
- Total em Dinheiro
- Entradas do Mês
- Saídas do Mês
- Saldo Final
- Receita x Despesa
- Resumo Mensal / Anual

### 02_Receitas
- Data, Tipo, Categoria, Descrição, Forma de Recebimento, Valor, Observações

### 03_Gastos
- Data, Grupo (Fixo/Variável/Essencial/Não Essencial), Categoria, Subcategoria, Descrição, Valor, Forma de Pagamento, Status, Observações

### 04_Dividas
- Credor, Valor Total, Parcelas, Valor Parcela, Juros, Vencimento, Status, Histórico, Previsão de Quitação

### 05_ValoresAReceber
- Pessoa, Motivo, Valor Total, Pago, Falta Receber, Data Empréstimo, Data Prevista, Status, Observações

### 06_Parcelamentos
- Compra, Cartão, Valor Total, Nº Parcelas, Parcela Atual, Parcelas Restantes, Valor da Parcela, Término

### 07_Cartoes
- Nome, Limite Total, Limite Disponível, Fatura Atual, Melhor Dia, Vencimento, Gastos

### 08_Metas
- Tipo da Meta, Valor Alvo, Acumulado, Percentual, Prazo, Observações

### 09_Planejamento
- Área (Imprevistos / Planejamento Mensal / Assinaturas / Sazonais), Descrição, Valor Previsto, Data, Observações

### 10_Relatorios
- Gastos por categoria
- Receitas por origem
- Evolução de saldo mensal
- Maiores gastos
- Inadimplência
- Dívidas abertas
- Valores a receber

## Fórmulas úteis (Excel/Google Sheets)
- **Saldo final mês:** `=SaldoAtual + SOMASES(Receitas!F:F;Receitas!A:A;">="&DataInicial;Receitas!A:A;"<="&DataFinal) - SOMASES(Gastos!G:G;Gastos!A:A;">="&DataInicial;Gastos!A:A;"<="&DataFinal)`
- **Falta receber:** `=ValorTotal - Pago`
- **Percentual meta:** `=SEERRO(Acumulado/ValorAlvo;0)`
- **Parcelas restantes:** `=Parcelas - ParcelaAtual`
- **Inadimplência:** `=CONT.SES(Dividas!G:G;"Atrasada") + CONT.SES(AReceber!H:H;"Atrasado")`

## Indicadores principais (KPIs)
- Taxa de poupança mensal
- Relação Receita/Despesa
- % de gastos essenciais
- Índice de inadimplência
- Progresso de metas
- Comprometimento de renda com dívidas

## Módulos extras sugeridos
- Patrimônio (ativos x passivos)
- Simulador de amortização de dívidas
- Projeção de aposentadoria
- Diário financeiro comportamental
