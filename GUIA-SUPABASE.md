# Guia de Configuração — Supabase (Essência)

Siga esses passos uma única vez. Depois disso, o painel administrativo e o site já funcionam sozinhos.

## 1. Criar a conta e o projeto

1. Acesse **https://supabase.com** e crie uma conta gratuita (dá pra usar login do Google).
2. Clique em **New Project**.
3. Dê um nome (ex: `essencia-loja`), crie uma senha para o banco (guarde essa senha em local seguro) e escolha uma região próxima (ex: São Paulo/South America).
4. Aguarde alguns segundos até o projeto ficar pronto.

## 2. Criar a tabela de produtos

1. No menu lateral, clique em **SQL Editor**.
2. Clique em **New query**.
3. Abra o arquivo `supabase-setup.sql` (que está junto com este guia), copie todo o conteúdo e cole no editor.
4. Clique em **Run** (ou Ctrl+Enter).
5. Deve aparecer "Success. No rows returned" — pronto, a tabela `products` foi criada.

## 3. Criar o bucket de imagens

1. No menu lateral, clique em **Storage**.
2. Clique em **New bucket**.
3. Nome do bucket: `produtos` (exatamente assim, tudo minúsculo).
4. Marque a opção **Public bucket** (assim as imagens aparecem no site sem precisar de login).
5. Clique em **Create bucket**.

### Permitir que só você envie imagens (opcional, recomendado)

1. Ainda em Storage, clique no bucket `produtos` → aba **Policies**.
2. Clique em **New policy** → **For full customization** (ou "Create a policy from scratch").
3. Crie uma policy de **INSERT** para o `bucket_id = 'produtos'`, com "Target roles" = `authenticated`. Isso garante que só usuários logados (você) podem subir arquivos.

## 4. Criar seu login de administrador

1. No menu lateral, clique em **Authentication** → **Users**.
2. Clique em **Add user** → **Create new user**.
3. Preencha com o e-mail e a senha que você (ou seu cliente) vai usar para entrar no painel.
4. Marque **Auto Confirm User** para não precisar confirmar por e-mail.
5. Clique em **Create user**.

> Quer dar acesso a mais de uma pessoa (ex: você e o cliente)? Repita esse passo criando outro usuário com outro e-mail.

## 5. Pegar as chaves de conexão

1. No menu lateral, clique em **Project Settings** (ícone de engrenagem) → **API**.
2. Copie o valor de **Project URL**.
3. Copie o valor de **anon public** (na seção "Project API keys").
4. Abra o arquivo `config.js` (na raiz do projeto) e cole os dois valores:

```js
const SUPABASE_URL = 'cole a Project URL aqui';
const SUPABASE_ANON_KEY = 'cole a anon public key aqui';
```

5. Salve o arquivo.

## 6. Cadastrar os produtos que já existem no site (importação em lote)

Já preparei o arquivo **`importar-produtos.sql`** com os seus 58 produtos atuais, prontos para importar de uma vez — não precisa cadastrar um por um.

1. No Supabase, vá em **SQL Editor** → **New query**.
2. Abra o arquivo `importar-produtos.sql`, copie todo o conteúdo e cole no editor.
3. Clique em **Run**.
4. Pronto — os 58 produtos aparecem na tabela `products` e já vão aparecer no site.

⚠️ **Atenção:** esse arquivo faz os produtos apontarem para os caminhos de imagem antigos (ex: `imagens/sutia-sophie-vermelhoF.jpeg`). Isso só funciona se você subir a pasta `imagens/` junto com o site na hospedagem (veja a seção sobre a pasta `imagens/` no `README.md`). Se no futuro você editar algum desses produtos pelo painel e trocar a foto, aí sim ela passa a ficar guardada no Supabase Storage.

Se preferir cadastrar do zero pelo painel em vez de rodar esse SQL, também pode — nesse caso, é só pular este passo.

## 7. Testar tudo

1. Abra o `admin/index.html` no navegador (ou publique o site e acesse `seusite.com/admin`).
2. Entre com o e-mail/senha criados no passo 4.
3. Cadastre um produto de teste.
4. Abra o `index.html` do site — o produto deve aparecer automaticamente.

Pronto! A partir daqui, qualquer alteração feita no painel aparece no site na hora, sem precisar subir arquivo nenhum de novo.
