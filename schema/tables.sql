create table students (
  id integer primary key,
  name text not null,
  email text not null,
  phone text not null,
  created_at timestamp not null,
  updated_at timestamp 
);