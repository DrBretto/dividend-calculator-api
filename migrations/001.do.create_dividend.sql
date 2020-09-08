DROP TABLE IF EXISTS stock;
DROP TABLE IF EXISTS strategy;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    user_name TEXT NOT NULL UNIQUE,
    full_name TEXT NOT NULL,
    password TEXT NOT NULL,
    nickname TEXT,
    date_created TIMESTAMP DEFAULT now() NOT NULL,
    date_modified TIMESTAMP
);

CREATE TABLE strategy (
    id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    title TEXT NOT NULL,
    date_published TIMESTAMPTZ DEFAULT now() NOT null,
    author_id INTEGER REFERENCES users(id) ON DELETE SET NULL
);

CREATE TABLE stock (
    id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    ticker TEXT NOT NULL,
    industry TEXT NOT NULL,
    shares INTEGER not null,
    price NUMERIC not null,
    eps1 NUMERIC NOT NULL,
    eps5 NUMERIC NOT NULL,
    yield NUMERIC NOT NULL,
    strategy_id INTEGER
        REFERENCES strategy(id) ON DELETE CASCADE NOT NULL,
    user_id INTEGER
        REFERENCES users(id) ON DELETE CASCADE NOT NULL,
    date_published TIMESTAMPTZ DEFAULT now() NOT null
);


