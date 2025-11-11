-- Enable required extensions
create extension if not exists vector;

-- Documents table
create table if not exists documents (
  id uuid primary key,
  title text,
  authors text,
  year text,
  doi text,
  language text,
  created_at timestamp
);

-- Chunks table
create table if not exists chunks (
  id uuid primary key,
  document_id uuid references documents(id) on delete cascade,
  text text,
  page_from int,
  page_to int,
  section text,
  vector vector(1024),
  caption_flag boolean,
  created_at timestamp
);

