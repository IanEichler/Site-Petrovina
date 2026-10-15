import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import vm from 'node:vm';

const source = await readFile(new URL('../motion.js', import.meta.url), 'utf8');

for (const [name, reduced, hasObserver] of [
  ['reduced motion keeps the original content untouched', true, true],
  ['browsers without IntersectionObserver keep all content visible', false, false]
]) {
  test(name, () => {
    let domAccess = false;
    const window = {matchMedia: () => ({matches: reduced})};
    if (hasObserver) window.IntersectionObserver = class {};
    const context = vm.createContext({window});
    Object.defineProperty(context, 'document', {get() { domAccess = true; throw new Error('Content should remain untouched'); }});
    assert.doesNotThrow(() => vm.runInContext(source, context));
    assert.equal(domAccess, false);
  });
}
