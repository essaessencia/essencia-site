# Essência — Site + Painel Administrativo

## O que mudou no seu site

- **`index.html`**: só ganhou 2 linhas novas (carregando a biblioteca do Supabase e o `config.js`) antes do `script.js`. Todo o resto — layout, carrinho, modal, WhatsApp — está intocado.
- **`script.js`**: a lista fixa de produtos foi trocada por uma busca no banco de dados (Supabase). Toda a lógica de carrinho, filtros, modal de tamanho e envio pelo WhatsApp continua **exatamente igual** (comparei linha a linha).
- **`config.js`** (novo): onde você cola as duas chaves do seu projeto Supabase.
- **`admin/`** (novo): o painel administrativo, separado do site.

## ⚠️ Importante: sua pasta `imagens/`

Seu site original usa a pasta `imagens/` para o banner (`banner-oficial.jpeg`) e para as fotos dos produtos. Copie essa pasta pra dentro deste projeto, no mesmo lugar de antes (junto do `index.html`), senão o banner do topo não vai aparecer.

As fotos dos **produtos**, a partir de agora, não vêm mais dessa pasta — elas ficam guardadas no Supabase e são enviadas pelo painel admin (isso permite trocar a foto de um produto sem subir arquivo nenhum no site). Você pode reaproveitar as mesmas fotos que já tem: ao cadastrar cada produto no painel, é só selecionar o arquivo da pasta `imagens/` no seu computador.

## Passo a passo

1. Leia e siga o **`GUIA-SUPABASE.md`** — é o passo a passo completo (criar conta, criar tabela, criar seu login, pegar as chaves).
2. Cole as chaves no `config.js`.
3. Copie sua pasta `imagens/` pra dentro deste projeto.
4. Abra `admin/index.html` e cadastre seus produtos.
5. Abra `index.html` e confira se está tudo certo.
6. Suba os arquivos (`index.html`, `css/`, `script.js`, `config.js`, `admin/`, `imagens/`) pra hospedagem que você escolher.

## Estrutura de pastas

```
essencia-site/
├── index.html          → site da loja (praticamente igual ao original)
├── config.js            → suas chaves do Supabase (preencher)
├── script.js             → lógica do site (produtos agora vêm do banco)
├── css/
│   └── style.css        → seu CSS original, sem alterações
├── admin/                → painel administrativo (novo)
│   ├── index.html
│   ├── admin.css
│   └── admin.js
├── supabase-setup.sql     → script para criar a tabela de produtos
├── importar-produtos.sql  → seus 58 produtos atuais, prontos pra importar de uma vez
└── GUIA-SUPABASE.md       → passo a passo de configuração
```

## Sobre a hospedagem

Como agora o site conversa direto com o Supabase pelo navegador, ele continua sendo um site 100% estático — funciona em **qualquer** hospedagem (Hostinger, Netlify, GitHub Pages, Vercel, etc.), sem precisar de servidor Node ou PHP. Quando decidir onde hospedar, é só subir a pasta inteira.
