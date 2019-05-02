CREATE TABLE IF NOT EXISTS users(
  id SERIAL PRIMARY KEY,
  email VARCHAR(200) UNIQUE,
  name VARCHAR(200)
);

CREATE TABLE IF NOT EXISTS organizations(
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) UNIQUE
);

CREATE TABLE IF NOT EXISTS divisions(
  id SERIAL PRIMARY KEY,
  name VARCHAR(50),
  organization VARCHAR(200) REFERENCES organizations(name)
);

CREATE TABLE IF NOT EXISTS tasks(
  id SERIAL PRIMARY KEY,
  title VARCHAR(100),
  division VARCHAR(200),
  task_status VARCHAR(200),
  assigned VARCHAR(200),
  created_at TIMESTAMP DEFAULT NOW(),
  organization VARCHAR(200) REFERENCES organizations(name)
);

CREATE TABLE IF NOT EXISTS users_organizations(
  id SERIAL PRIMARY KEY,
  username VARCHAR(200) REFERENCES users(email),
  organization VARCHAR(50) REFERENCES organizations(name)
);