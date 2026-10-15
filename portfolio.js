'use strict';

(() => {
  const dialog = document.querySelector('.catalog-dialog');
  if (!dialog) return;
  const portfolio = window.PetrovinaPortfolio;
  const content = dialog.querySelector('.dialog-content');
  const input = dialog.querySelector('[data-catalog-search]');
  const technology = dialog.querySelector('[data-catalog-technology]');
  const results = dialog.querySelector('[data-catalog-results]');
  const count = dialog.querySelector('[data-catalog-count]');
  const more = dialog.querySelector('[data-catalog-more]');
  let currentKey;
  let limit = 6;
  let restoring = false;
  let closing = false;
  let expanded = new Set();

  function element(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text) node.textContent = text;
    return node;
  }

  function save(open = dialog.open) {
    if (restoring || !currentKey) return;
    history.replaceState({...history.state, petrovinaCatalog: {
      key: currentKey, query: input.value, technology: technology.value,
      limit, scroll: content.scrollTop, expanded: [...expanded], open: open && !closing
    }}, '');
  }

  function renderVariety(item) {
    const card = element('article', 'cultivar-card');
    const heading = element('div', 'cultivar-heading');
    heading.append(element('h3', '', item.name));
    if (item.technology) heading.append(element('span', 'cultivar-technology', item.technology));
    card.append(heading);
    if (item.cycle || item.maturity) {
      const facts = element('dl', 'cultivar-facts');
      for (const [label, value] of [['Ciclo na ficha', item.cycle], ['Grupo de maturidade', item.maturity]]) {
        if (!value) continue;
        const fact = element('div');
        fact.append(element('dt', '', label), element('dd', '', value));
        facts.append(fact);
      }
      card.append(facts);
    }
    if (item.regions) {
      const detail = element('details', 'cultivar-regions');
      detail.open = expanded.has(item.name);
      detail.append(element('summary', '', 'Ciclo médio por região'));
      const list = element('dl');
      for (const [region, days] of item.regions) {
        const row = element('div');
        row.append(element('dt', '', region), element('dd', '', `${days} dias`));
        list.append(row);
      }
      detail.append(list);
      detail.addEventListener('toggle', () => {
        if (!detail.isConnected) return;
        if (detail.open) expanded.add(item.name);
        else expanded.delete(item.name);
        save();
      });
      card.append(detail);
    }
    const actions = element('div', 'cultivar-actions');
    const hasIndividualPage = item.source !== `https://petrovinasementes.com.br/${portfolio.getCulture(currentKey).path}`;
    const source = element('a', '', hasIndividualPage ? 'Ficha oficial' : 'Portfólio oficial');
    source.href = item.source;
    source.target = '_blank';
    source.rel = 'noopener';
    source.setAttribute('aria-label', `Consultar ${item.name} no site oficial`);
    const quote = element('a', '', 'Pedir orçamento');
    quote.href = portfolio.quoteUrl(currentKey, item.name);
    quote.setAttribute('aria-label', `Pedir orçamento de ${item.name}`);
    actions.append(source, quote);
    card.append(actions);
    return card;
  }

  function update() {
    const crop = portfolio.getCulture(currentKey);
    const matches = portfolio.search(currentKey, input.value, technology.value);
    results.replaceChildren();
    if (!crop.varieties.length) {
      const guidance = element('article', 'catalog-guidance');
      guidance.append(element('h3', '', 'Uma escolha que começa pelo seu campo.'), element('p', '', 'Pastagem ou cobertura? Converse com nosso time sobre o objetivo de uso, a região e as condições da sua área para conhecer as opções disponíveis.'));
      const link = element('a', 'text-link', 'Encontrar um especialista');
      link.href = 'equipe-comercial.html';
      guidance.append(link);
      results.append(guidance);
      count.textContent = 'Orientação para sua escolha';
    } else if (!matches.length) {
      const empty = element('div', 'catalog-empty');
      empty.append(element('h3', '', 'Nenhuma cultivar encontrada.'), element('p', '', 'Tente outro nome ou selecione todas as tecnologias.'));
      const reset = element('button', 'text-link', 'Limpar filtros');
      reset.type = 'button';
      reset.addEventListener('click', () => {input.value = ''; technology.value = ''; limit = 6; update(); input.focus();});
      empty.append(reset);
      results.append(empty);
      count.textContent = 'Nenhum resultado';
    } else {
      count.textContent = `${matches.length} ${matches.length === 1 ? 'cultivar encontrada' : 'cultivares encontradas'}${matches.length > limit ? ` · mostrando ${limit}` : ''}`;
      results.append(...matches.slice(0, limit).map(renderVariety));
    }
    more.hidden = matches.length <= limit;
    save();
  }

  function render(key) {
    const crop = portfolio.getCulture(key);
    const saved = history.state?.petrovinaCatalog;
    currentKey = key;
    closing = false;
    restoring = true;
    expanded = new Set(saved?.open && saved.key === key ? saved.expanded || [] : []);
    input.value = saved?.open && saved.key === key ? saved.query : '';
    limit = saved?.open && saved.key === key ? saved.limit : 6;
    technology.replaceChildren(new Option('Todas', ''));
    const technologies = [...new Set(crop.varieties.map(item => item.technology).filter(Boolean))].sort();
    technologies.forEach(value => technology.add(new Option(value, value)));
    technology.value = saved?.open && saved.key === key ? saved.technology : '';
    dialog.querySelector('.catalog-filters').hidden = !crop.varieties.length;
    dialog.querySelector('[data-technology-field]').hidden = technologies.length < 2;
    dialog.querySelector('[data-catalog-reference]').textContent = crop.reference;
    dialog.querySelector('.dialog-quote').href = portfolio.quoteUrl(key);
    update();
    restoring = false;
  }

  function opened() {
    const saved = history.state?.petrovinaCatalog;
    const scroll = saved?.open && saved.key === currentKey ? saved.scroll : 0;
    content.scrollTop = scroll;
    dialog.querySelector('h2').focus({preventScroll: true});
    save(true);
  }

  input.addEventListener('input', () => {limit = 6; update();});
  technology.addEventListener('change', () => {limit = 6; update();});
  more.addEventListener('click', () => {limit += 6; update();});
  content.addEventListener('scroll', () => {if (dialog.open) save(true);}, {passive: true});
  dialog.addEventListener('close', () => save(false));
  window.PetrovinaPortfolioView = {render, opened, closing: () => {closing = true; save(false);}};
})();
