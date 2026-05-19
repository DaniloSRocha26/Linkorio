CREATE EXTENSION IF NOT EXISTS citext;

CREATE TABLE usuarios(
id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
nome VARCHAR(255) NOT NULL,
email CITEXT NOT NULL UNIQUE,
senha VARCHAR(255) NOT NULL,
created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE categorias(
id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
usuario_id  UUID NOT NULL REFERENCES usuarios(id),
nome VARCHAR(255) NOT NULL
);

CREATE TABLE produtos (
id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
usuario_id UUID NOT NULL REFERENCES usuarios(id),
categoria_id UUID REFERENCES categorias(id),
nome VARCHAR(255) NOT NULL,
descricao TEXT,
comprado BOOLEAN NOT NULL DEFAULT FALSE,
created_at TIMESTAMPTZ DEFAULT NOW() 
);

CREATE TABLE links(
id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
produto_id UUID NOT NULL REFERENCES produtos(id),
url TEXT NOT NULL,
nome_loja VARCHAR(255)
);

