-- =====================================================
-- IMPORTAÇÃO EM LOTE — Produtos existentes do site Essência
-- Gerado automaticamente a partir do script.js original
-- Rode isso DEPOIS de já ter criado a tabela (supabase-setup.sql)
-- =====================================================

-- IMPORTANTE: as fotos abaixo apontam para a pasta imagens/ do seu
-- site (ex: imagens/sutia-sophie-vermelhoF.jpeg). Isso funciona
-- normalmente, DESDE QUE você suba a pasta imagens/ junto com o
-- site na hospedagem. Se no futuro editar um produto pelo painel
-- admin e trocar a foto, aí sim ela passa a ficar no Supabase Storage.

insert into products (name, color, category, sub, price, img_f, img_t, sizes, in_stock, stock) values
  ('Sutiã Sophie', 'Vermelho', 'feminino', 'sutias', 59.99, 'imagens/sutia-sophie-vermelhoF.jpeg', 'imagens/sutia-sophie-vermelhoT.jpeg', '{"G/L"}', true, 1),
  ('Sutiã Sophie', 'Bege', 'feminino', 'sutias', 59.99, 'imagens/sutia-sophie-begeF.jpeg', 'imagens/sutia-sophie-begeT.jpeg', '{"G/L"}', true, 1),
  ('Sutiã Sophie', 'Preto', 'feminino', 'sutias', 59.99, 'imagens/sutia-sophie-pretoF.jpeg', NULL, '{"M/M"}', true, 1),
  ('Sutiã Inês', 'Vinho', 'feminino', 'sutias', 54.99, 'imagens/sutia-ines-vinhoF.jpeg', 'imagens/sutia-ines-vinhoT.jpeg', '{"P/S","M/M"}', true, 2),
  ('Sutiã Inês', 'Branco', 'feminino', 'sutias', 54.99, 'imagens/sutia-ines-brancoF.jpeg', 'imagens/sutia-ines-brancoT.jpeg', '{"P/S","M/M","G/L"}', false, 0),
  ('Sutiã Edite', 'Rosa Blush', 'feminino', 'sutias', 64.99, 'imagens/sutia-edite-rosaF.jpeg', 'imagens/sutia-edite-rosaT.jpeg', '{"M/M","GG/XL"}', true, 2),
  ('Sutiã Brasileirinha', 'Bege', 'feminino', 'sutias', 74.99, 'imagens/sutia-brasileirinha-begeF.jpeg', 'imagens/sutia-brasileirinha-begeT.jpeg', '{"G/L"}', true, 1),
  ('Sutiã Brasileirinha', 'Preto', 'feminino', 'sutias', 74.99, 'imagens/sutia-brasileirinha-pretoF.jpeg', 'imagens/sutia-brasileirinha-pretoT.jpeg', '{"P/S","M/M","G/L"}', false, 0),
  ('Sutiã Brasileirinha', 'Vermelho', 'feminino', 'sutias', 74.99, 'imagens/sutia-brasileirinha-vermelhaF.jpeg', NULL, '{"P/S","M/M","G/L"}', false, 0),
  ('Sutiã Susan', 'Preto', 'feminino', 'sutias', 54.99, 'imagens/soutien-susan-pretoF.jpeg', 'imagens/soutien-susan-pretoT.jpeg', '{"G/L"}', true, 1),
  ('Sutiã Susan', 'Vermelho', 'feminino', 'sutias', 54.99, 'imagens/soutien-susan-vermelhoF.jpeg', 'imagens/soutien-susan-vermelhoT.jpeg', '{"P/S","M/M","G/L"}', false, 0),
  ('Sutiã Cropped', 'Preto', 'feminino', 'sutias', 69.99, 'imagens/sutia-cropped-pretoF.jpeg', NULL, '{"G/L"}', true, 1),
  ('Top Control Sem Costura', 'Preto', 'feminino', 'sutias', 39.99, 'imagens/top-control-sem-costura-pretoF.jpeg', 'imagens/top-control-sem-costura-preto-T.jpeg', '{"M/M"}', true, 1),
  ('Top Control Sem Costura', 'Bege', 'feminino', 'sutias', 39.99, 'imagens/top-control-sem-costura-begeF.jpeg', 'imagens/top-control-sem-costura-bege-escuroT.jpeg', '{"P/S","M/M","G/L"}', false, 0),
  ('Top Control Sem Costura', 'Rosa', 'feminino', 'sutias', 39.99, 'imagens/top-control-sem-costura-rosaF.jpeg', 'imagens/top-control-sem-costura-rosaT.jpeg', '{"P/S","M/M","G/L"}', false, 0),
  ('Top Florência', 'Branco', 'feminino', 'sutias', 59.99, 'imagens/top-florencia-brancoF.jpeg', 'imagens/top-florencia-brancoT.jpeg', '{"P/S","M/M","G/L"}', false, 0),
  ('Top Florência', 'Cinza Gelo', 'feminino', 'sutias', 59.99, 'imagens/top-florencia-cinza-geloF.jpeg', NULL, '{"P/S","M/M","G/L"}', false, 0),
  ('Top Florência', 'Rosa', 'feminino', 'sutias', 59.99, 'imagens/top-florencia-rosaF.jpeg', NULL, '{"P/S","M/M","G/L"}', false, 0),
  ('Top Florência', 'Verde Menta', 'feminino', 'sutias', 59.99, 'imagens/top-florencia-verde-mentaF.jpeg', NULL, '{"P/S","G/L"}', true, 2),
  ('Tanga Fio Scarlett', 'Vinho', 'feminino', 'calcinhas', 24.99, 'imagens/tanga-fio-scarlett-vinhoF.jpeg', 'imagens/tanga-fio-scarlett-vinhoT.jpeg', '{"G/L"}', true, 3),
  ('Tanga Fio Scarlett', 'Branca', 'feminino', 'calcinhas', 24.99, 'imagens/tanga-fio-scarlett-brancaF.jpeg', NULL, '{"P/S","M/M","G/L"}', false, 0),
  ('Tanga Fio Scarlett', 'Preta', 'feminino', 'calcinhas', 24.99, 'imagens/tanga-fio-scarlett-pretaF.jpeg', 'imagens/tanga-fio-scarlett-pretaT.jpeg', '{"P/S","M/M","G/L"}', false, 0),
  ('Tanga Fio Scarlett', 'Vermelho', 'feminino', 'calcinhas', 24.99, 'imagens/tanga-fio-scarlett-vermelhoF.jpeg', 'imagens/tanga-fio-scarlett-vermelhoT.jpeg', '{"P/S","M/M","G/L"}', false, 0),
  ('Tanga Sexy Sheron', 'Preta', 'feminino', 'calcinhas', 24.99, 'imagens/tanga-fio-sexy-sheron-pretaF.jpeg', 'imagens/tanga-fio-sexy-sheron-pretaT.jpeg', '{"P/S","M/M"}', true, 3),
  ('Tanga Sexy Sheron', 'Vermelho', 'feminino', 'calcinhas', 24.99, 'imagens/tanga-fio-sexy-sheron-vermelhaF.jpeg', 'imagens/tanga-fio-sexy-sheron-vermelhaT.jpeg', '{"P/S","M/M","G/L"}', false, 0),
  ('Conjunto Fio Duplo Matilda', 'Azul Marinho', 'feminino', 'conjuntos', 64.99, 'imagens/conjunto-fio-duplo-matilda-azul-marinhoF.jpeg', 'imagens/conjunto-fio-duplo-matilda-azul-marinhoT.jpeg', '{"GG/XL"}', true, 1),
  ('Conjunto Fio Duplo Matilda', 'Off White', 'feminino', 'conjuntos', 64.99, 'imagens/conjunto-fio-duplo-matilda-off-white F.jpeg', 'imagens/conjunto-fio-duplo-matilda-off-white T.jpeg', '{"P/S"}', true, 1),
  ('Conjunto Fio Duplo Matilda', 'Branco', 'feminino', 'conjuntos', 64.99, 'imagens/conjunto-fio-duplo-matilda-brancoF.jpeg', 'imagens/conjunto-fio-duplo-matilda-brancoT.jpeg', '{"P/S","M/M","G/L"}', false, 0),
  ('Conjunto Fio Duplo Delphine', 'Azul', 'feminino', 'conjuntos', 89.99, 'imagens/conjunto-fio-duplo-delphine-azulF.jpeg', 'imagens/conjunto-fio-duplo-delphine-azulT.jpeg', '{"P/S","M/M","G/L"}', false, 0),
  ('Conjunto Fio Duplo Delphine', 'Vermelho', 'feminino', 'conjuntos', 89.99, 'imagens/conjunto-fio-duplo-delphine-vermelhoF.jpeg', 'imagens/conjunto-fio-duplo-delphine-vermelhoT.jpeg', '{"P/S","M/M","G/L"}', false, 0),
  ('Conjunto Fio Duplo Delphine', 'Preto', 'feminino', 'conjuntos', 89.99, 'imagens/conjunto-fio-duplo-delphine-pretoF.jpeg', 'imagens/conjunto-fio-duplo-delphine-pretoT.jpeg', '{"P/S"}', true, 1),
  ('Legging Sul', 'Azul', 'feminino', 'fitness', 119.99, 'imagens/legg-sul-azul-F.jpeg', NULL, '{"M/M"}', true, 1),
  ('Legging Sul', 'Roxa', 'feminino', 'fitness', 119.99, 'imagens/legg-sul-roxaT.jpeg', NULL, '{"P/S","M/M","G/L"}', false, 0),
  ('Legging Sul', 'Rosa', 'feminino', 'fitness', 119.99, 'imagens/legg-sul-rosaF.jpeg', 'imagens/legg-sul-rosaT.jpeg', '{"P/S","M/M","G/L"}', false, 0),
  ('Legging Sul', 'Lilás', 'feminino', 'fitness', 119.99, 'imagens/legg-sul-lilasF.jpeg', NULL, '{"P/S","M/M","G/L"}', false, 0),
  ('Cropped Tuany', 'Vermelho', 'feminino', 'diaadia', 74.99, 'imagens/cropped-tuany-vermelhoF.jpeg', 'imagens/cropped-tuany-vermelhoT.jpeg', '{"M/M"}', true, 1),
  ('Cropped Tuany', 'Verde Mirante', 'feminino', 'diaadia', 74.99, 'imagens/cropped-tuany-verde-mirante-F.jpeg', NULL, '{"M/M"}', true, 1),
  ('Calça Movement', 'Preta', 'feminino', 'diaadia', 144.99, 'imagens/calca-movement-pretaF.jpeg', 'imagens/calca-movement-pretaT.jpeg', '{"M/M","G/L"}', true, 2),
  ('Calça Isabela', 'Preta', 'feminino', 'diaadia', 79.99, 'imagens/calca-isabela-pretaF.jpeg', 'imagens/calca-isabela-pretaT.jpeg', '{"M/M"}', true, 0),
  ('Cueca Boxer Dragons', 'Azul Mirante', 'masculino', 'cuecas', 34.99, 'imagens/cueca-boxer-dragons-azul-miranteF.jpeg', NULL, '{"G/L"}', true, 0),
  ('Cueca Boxer Dragons', 'Azul', 'masculino', 'cuecas', 34.99, 'imagens/cueca-boxer-dragons-azulF.jpeg', 'imagens/cueca-boxer-dragons-azulT.jpeg', '{"P/S","M/M","G/L"}', false, 0),
  ('Cueca Boxer Dragons', 'Cinza', 'masculino', 'cuecas', 34.99, 'imagens/cueca-boxer-dragons-cinzaF.jpeg', NULL, '{"P/S","M/M","G/L"}', false, 0),
  ('Cueca Boxer Dragons', 'Laranja', 'masculino', 'cuecas', 34.99, 'imagens/cueca-boxer-dragons-laranjaF.jpeg', NULL, '{"P/S","M/M","G/L"}', false, 0),
  ('Cueca Boxer Dragons', 'Vermelha', 'masculino', 'cuecas', 34.99, 'imagens/cueca-boxer-dragons-vermelhaF.jpeg', NULL, '{"P/S","M/M","G/L"}', false, 0),
  ('Cueca Boxer Euro Microfibra', 'Azul Bic', 'masculino', 'cuecas', 34.99, 'imagens/cueca-boxer-euro-microfibra-azul-bicF.jpeg', NULL, '{"G/L"}', true, 0),
  ('Cueca Boxer Euro Microfibra', 'Lilás', 'masculino', 'cuecas', 34.99, 'imagens/cueca-boxer-euro-microfibra-lilasF.jpeg', NULL, '{"G/L"}', true, 0),
  ('Cueca Boxer Euro Microfibra', 'Azul Marinho', 'masculino', 'cuecas', 34.99, 'imagens/cueca-boxer-euro-microfibra-azul-marinhoF.jpeg', NULL, '{"P/S","M/M","G/L"}', false, 0),
  ('Cueca Boxer Euro Microfibra', 'Branco', 'masculino', 'cuecas', 34.99, 'imagens/cueca-boxer-euro-microfibra-brancoF.jpeg', 'imagens/cueca-boxer-euro-microfibra-brancoT.jpeg', '{"P/S","M/M","G/L"}', false, 0),
  ('Cueca Boxer Euro Microfibra', 'Cinza', 'masculino', 'cuecas', 34.99, 'imagens/cueca-boxer-euro-microfibra-cinzaF.jpeg', 'imagens/cueca-boxer-euro-microfibra-cinzaT.jpeg', '{"P/S","M/M","G/L"}', false, 0),
  ('Cueca Boxer Euro Microfibra', 'Preto', 'masculino', 'cuecas', 34.99, 'imagens/cueca-boxer-euro-microfibra-pretoF.jpeg', NULL, '{"P/S","M/M","G/L"}', false, 0),
  ('Cueca Boxer Euro Microfibra', 'Roxo Azulejo', 'masculino', 'cuecas', 34.99, 'imagens/cueca-boxer-euro-microfibra-roxo-azulejoF.jpeg', NULL, '{"P/S","M/M","G/L"}', false, 0),
  ('Cueca Boxer Euro Microfibra', 'Vermelho', 'masculino', 'cuecas', 34.99, 'imagens/cueca-boxer-euro-microfibra-vermelhoF.jpeg', NULL, '{"P/S","M/M","G/L"}', false, 0),
  ('Cueca Boxer Sem Costura Euro Top', 'Verde Militar', 'masculino', 'cuecas', 34.99, 'imagens/cueca-boxer-sem-costura-euro-top-verde-militarF.jpeg', 'imagens/cueca-boxer-sem-costura-euro-top-verde-militarT.jpeg', '{"M/M"}', true, 0),
  ('Cueca Boxer Sem Costura Euro Top', 'Cinza Mescla', 'masculino', 'cuecas', 34.99, 'imagens/cueca-boxer-sem-costura-euro-top-cinza-mesclaF.jpeg', NULL, '{"M/M"}', true, 0),
  ('Cueca Boxer Sem Costura Euro Top', 'Azul Escuro', 'masculino', 'cuecas', 34.99, 'imagens/cueca-boxer-sem-costura-euro-top-azul-escuroF.jpeg', 'imagens/cueca-boxer-sem-costura-euro-top-azul-escuroT.jpeg', '{"P/S","M/M","G/L"}', false, 0),
  ('Cueca Boxer Sem Costura Euro Top', 'Azul', 'masculino', 'cuecas', 34.99, 'imagens/cueca-boxer-sem-costura-euro-top-azulF.jpeg', NULL, '{"P/S","M/M","G/L"}', false, 0),
  ('Cueca Boxer Sem Costura Euro Top', 'Preto', 'masculino', 'cuecas', 34.99, 'imagens/cueca-boxer-sem-costura-euro-top-pretaF.jpeg', 'imagens/cueca-boxer-sem-costura-euro-top-pretaT.jpeg', '{"P/S","M/M","G/L"}', false, 0),
  ('Cueca Boxer Sem Costura Euro Top', 'Vermelho', 'masculino', 'cuecas', 34.99, 'imagens/cueca-boxer-sem-costura-euro-top-vermelhoF.jpeg', NULL, '{"P/S","M/M","G/L"}', false, 0);
