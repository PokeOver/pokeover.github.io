// Contador do site: página aberta e cliques nos botões principais, por visitante anônimo (id aleatório no navegador).
// Abrir uma vez com ?eu=1 marca este navegador como do dono (as visitas dele ficam fora das contas).
// De onde veio: o site anterior (Discord, Google...) ou ?ref=nome no link de divulgação.
(() => {
  const SB = 'https://zkxvxzjukpzcudittziw.supabase.co', CHAVE = 'sb_publishable_2tJ-FHSqkDzPS3LCjbVgSg_BSkw38n6';
  let id = 'sem', eu = false;
  try {
    id = localStorage.getItem('po-v') || '';
    if (!id) { id = Math.random().toString(36).slice(2) + Date.now().toString(36); localStorage.setItem('po-v', id); }
    if (/[?&]eu=1\b/.test(location.search)) localStorage.setItem('po-eu', '1');
    eu = localStorage.getItem('po-eu') === '1';
  } catch {}
  const pagina = (location.pathname.split('/').pop() || 'index').replace(/\.html$/, '') || 'index';
  let origem = new URLSearchParams(location.search).get('ref') || '';
  try { const h = new URL(document.referrer).hostname; if (h && h !== location.hostname) origem = origem || h; } catch {}
  window.contar = evento => {
    try {
      fetch(`${SB}/rest/v1/rpc/pokeover_visita`, {
        method: 'POST', keepalive: true, headers: { apikey: CHAVE, 'Content-Type': 'application/json' },
        body: JSON.stringify({ p_visitante: id, p_pagina: pagina, p_evento: evento, p_origem: origem, p_eu: eu }),
      }).catch(() => {});
    } catch {}
  };
  contar('abriu' + (location.hash ? ' ' + location.hash : ''));
  document.addEventListener('click', e => {
    const a = e.target.closest && e.target.closest('a.cta, [data-contar]');
    if (a) contar(a.dataset.contar || 'clicou: ' + a.textContent.trim().replace(/\s+/g, ' ').slice(0, 40));
  });
})();
