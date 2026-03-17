export function renderModeloPlanilha() {
  const el = document.getElementById("modelo");
  el.innerHTML = `
    <div class="module-card">
      <h3>Modelo profissional (abas recomendadas)</h3>
      <ul>
        <li>01_VisaoGeral</li><li>02_Receitas</li><li>03_Gastos</li><li>04_Dividas</li><li>05_ValoresAReceber</li>
        <li>06_Parcelamentos</li><li>07_Cartoes</li><li>08_Metas</li><li>09_Planejamento</li><li>10_Relatorios</li>
      </ul>
      <p><strong>Indicadores principais:</strong> taxa de poupança, saldo líquido mensal, % gastos essenciais, índice de inadimplência e % conclusão de metas.</p>
      <p><strong>Automações úteis:</strong> validação por listas, formatação condicional para atrasos, soma por mês via SOMASES/QUERY, dashboard com tabela dinâmica.</p>
      <p><strong>Módulos extras sugeridos:</strong> projeção de aposentadoria, simulador de amortização, acompanhamento de patrimônio e diário financeiro comportamental.</p>
    </div>
  `;
}
