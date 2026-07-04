-- =====================================================
-- CONFIGURAÇÃO DO BANCO DE DADOS — Essência
-- Copie TODO este arquivo e cole no SQL Editor do Supabase
-- (Painel Supabase → SQL Editor → New query → colar → Run)
-- =====================================================

-- 1) Tabela de produtos
create table products (
  id bigint generated always as identity primary key,
  name text not null,
  color text,
  category text not null check (category in ('feminino', 'masculino')),
  sub text,
  price numeric(10,2) not null default 0,
  img_f text,
  img_t text,
  sizes text[] default '{}',
  in_stock boolean default true,
  stock integer default 0,
  created_at timestamptz default now()
);

-- 2) Ativa a segurança em nível de linha (obrigatório no Supabase)
alter table products enable row level security;

-- 3) Qualquer visitante do site pode LER os produtos (necessário pra loja funcionar)
create policy "Produtos são públicos para leitura"
  on products for select
  using (true);

-- 4) Só usuários LOGADOS (você, no painel admin) podem criar/editar/excluir
create policy "Somente admin pode inserir produtos"
  on products for insert
  to authenticated
  with check (true);

create policy "Somente admin pode editar produtos"
  on products for update
  to authenticated
  using (true);

create policy "Somente admin pode excluir produtos"
  on products for delete
  to authenticated
  using (true);

-- =====================================================
-- Depois de rodar este script, siga também os passos
-- de STORAGE (bucket de imagens) e AUTH (criar seu login)
-- descritos no arquivo GUIA-SUPABASE.md
-- =====================================================
