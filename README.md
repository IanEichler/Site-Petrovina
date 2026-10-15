# Site Petrovina

Site institucional em HTML, CSS e JavaScript, com identidade visual própria,
tipografia local, páginas responsivas e imagens armazenadas no projeto.

## Publicar na Vercel

Importe o repositório `IanEichler/Site-Petrovina` na Vercel e utilize a raiz
do repositório como **Root Directory**. A configuração está em `vercel.json`:

| Configuração | Valor |
| --- | --- |
| Framework Preset | Other |
| Node.js | 24.x |
| Install Command | `npm ci --ignore-scripts` |
| Build Command | `npm run build` |
| Output Directory | `dist` |
| Variáveis de ambiente | Nenhuma obrigatória |

Não é necessário configurar um servidor Node.js na hospedagem. O build copia
somente HTML, CSS, JavaScript e `media/` para `dist/`. A Vercel publica essa
pasta, incluindo a página de erro `404.html`.

As URLs `.html` são preservadas para manter os links e a navegação do site.
Após a importação e conexão do GitHub à Vercel, os próximos pushes seguem o
fluxo de publicação do projeto configurado na sua conta.

## Desenvolvimento local

Requer Node.js 24. Não há dependências de terceiros para instalar.

```sh
npm run dev
```

Abra <http://localhost:4173/>. No Windows, também é possível usar `Iniciar.cmd`.

Para gerar os arquivos de publicação:

```sh
npm ci --ignore-scripts
npm run build
```

## Conteúdo

- Página inicial e apresentação PrimePro Eco.
- Orçamento online com seleção de cultura e acesso ao portal comercial.
- Commodities com carregamento do painel público de soja.
- Central de negócios e soluções.
- Petrovina Prime, distribuição, carga térmica, Freereplant, equipe comercial,
  Seed Prime e crédito próprio.
- Menu responsivo, cabeçalho compacto e arredondado desde a abertura, detalhes das culturas
  e perguntas frequentes.

## Serviços externos e referências

Valores, disponibilidade e identificação para a cotação continuam no portal
oficial da Petrovina. O site não coleta CPF nem gera preços simulados.

O painel de commodities é incorporado do relatório público disponibilizado
pela Nexar Agro, com dados do IMEA. Datas e atualização dependem da fonte.
Consultor virtual, blog, portal do cliente, newsletter e mapas usam seus
destinos externos e precisam de internet.

Os metadados `noindex,nofollow` da versão de apresentação foram mantidos.
Consulte `CREDITOS.txt` para a origem de imagens e conteúdo. As marcas e os
materiais institucionais pertencem aos respectivos titulares.

## Estrutura

- `*.html`: páginas do site.
- `style.css`, `primepro.css`, `business.css`: identidade e layouts.
- `app.js`, `business.js`: interações no navegador.
- `media/`: imagens, logotipo e fonte.
- `scripts/build.mjs`: geração da pasta pública `dist/`.
- `vercel.json`: configuração de publicação.
- `server.cjs`: servidor exclusivo do desenvolvimento local.
