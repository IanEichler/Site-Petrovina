import { cp, mkdir, readdir, rm, stat } from 'node:fs/promises';
import { basename, dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(fileURLToPath(new URL('../', import.meta.url)));
const output = resolve(root, 'dist');

// Rebuild only the project's own generated output directory.
if (dirname(output) !== root || basename(output) !== 'dist') {
  throw new Error('Diretório de saída inválido.');
}

const entries = await readdir(root, { withFileTypes: true });
const publicFiles = entries
  .filter(entry => entry.isFile() && /\.(html|css|js)$/.test(entry.name))
  .map(entry => entry.name);

if (!publicFiles.includes('index.html')) throw new Error('index.html não encontrado.');
if (!(await stat(join(root, 'media'))).isDirectory()) throw new Error('Pasta media não encontrada.');

await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
await Promise.all(publicFiles.map(name => cp(join(root, name), join(output, name))));
await cp(join(root, 'media'), join(output, 'media'), { recursive: true });

const pages = publicFiles.filter(name => name.endsWith('.html')).length;
console.log(`Build concluído: ${pages} páginas e arquivos estáticos em dist/.`);
console.log('Servidor local, documentação e configurações não fazem parte da saída pública.');
