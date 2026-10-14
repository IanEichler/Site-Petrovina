const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const { spawn } = require('node:child_process');
const root = __dirname;
const port = Number(process.env.PORT || 4173);
const types = {'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.json':'application/json; charset=utf-8','.webp':'image/webp','.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.gif':'image/gif','.svg':'image/svg+xml','.woff2':'font/woff2','.woff':'font/woff','.ttf':'font/ttf','.eot':'application/vnd.ms-fontobject','.ico':'image/x-icon'};
const server = http.createServer((request, response) => {
  let pathname;
  try { pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname); }
  catch { response.writeHead(400); response.end('Requisicao invalida'); return; }
  const filename = path.resolve(root, '.' + (pathname === '/' ? '/index.html' : pathname));
  if (!filename.startsWith(root + path.sep)) { response.writeHead(403); response.end('Acesso negado'); return; }
  fs.stat(filename, (error, stat) => {
    if (error || !stat.isFile()) { response.writeHead(404); response.end('Arquivo nao encontrado'); return; }
    response.writeHead(200, {'Content-Type': types[path.extname(filename).toLowerCase()] || 'application/octet-stream','Content-Length':stat.size,'Cache-Control':'no-cache','X-Content-Type-Options':'nosniff'});
    if (request.method === 'HEAD') response.end();
    else fs.createReadStream(filename).pipe(response);
  });
});
function openBrowser() {
  const url = `http://localhost:${port}/`;
  if (process.platform === 'win32') spawn('powershell.exe', ['-NoProfile', '-Command', `Start-Process '${url}'`], {detached:true, stdio:'ignore', windowsHide:true}).unref();
}
server.on('error', error => {
  if (error.code === 'EADDRINUSE') {
    console.log(`A porta ${port} ja esta em uso. Abra http://localhost:${port}/ ou escolha outra porta com PORT.`);
    if (process.argv.includes('--open')) openBrowser();
  } else console.error(error.message);
  process.exitCode = 1;
});
server.listen(port, '127.0.0.1', () => {
  console.log(`Petrovina Sementes: http://localhost:${port}/`);
  console.log(`Arquivos: ${root}`);
  if (process.argv.includes('--open')) openBrowser();
});
