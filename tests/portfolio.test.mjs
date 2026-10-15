import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import vm from 'node:vm';

const source = await readFile(new URL('../portfolio-data.js', import.meta.url), 'utf8');
const context = {window: {}, URLSearchParams};
vm.runInNewContext(source, context);
const portfolio = context.window.PetrovinaPortfolio;

test('cultivar search combines accent-insensitive names with technology filters', () => {
  assert.equal(portfolio.search('soja', 'inga', 'I2X')[0].name, 'TMG INGÁ I2X');
  assert.equal(portfolio.search('soja', 'inga', 'IPRO').length, 0);
  assert.equal(portfolio.search('soja', 'tmg inga').length, 1);
  assert.equal(portfolio.search('soja', 'inexistente').length, 0);
});

test('quote URLs retain only a cultivar belonging to the selected culture', () => {
  const url = new URL(portfolio.quoteUrl('soja', 'TMG INGÁ I2X'), 'https://example.test/');
  assert.equal(url.searchParams.get('cultura'), 'soja');
  assert.equal(url.searchParams.get('cultivar'), 'TMG INGÁ I2X');
  assert.equal(portfolio.quoteUrl('milho', 'TMG INGÁ I2X'), 'orcamento.html?cultura=milho');
  assert.equal(portfolio.quoteUrl('__proto__', '<script>'), 'orcamento.html');
  assert.equal(portfolio.selection('soja', '<script>'), null);
});

test('published regional cycle ranges agree with the detailed values', () => {
  for (const name of ['RAPTOR I2X','OLIMPO IPRO','TMG INGÁ I2X']) {
    const item = portfolio.selection('soja', name);
    const days = item.regions.map(([, days]) => days);
    assert.equal(item.cycle, `${Math.min(...days)}–${Math.max(...days)} dias`);
  }
});

test('catalog has unique cultivar names and official sources, without invented brachiaria entries', () => {
  assert.equal(portfolio.search('brachiaria').length, 0);
  for (const crop of Object.values(portfolio.cultures)) {
    assert.equal(new Set(crop.varieties.map(item => item.name)).size, crop.varieties.length);
    for (const item of crop.varieties) assert.equal(new URL(item.source).hostname, 'petrovinasementes.com.br');
  }
});
