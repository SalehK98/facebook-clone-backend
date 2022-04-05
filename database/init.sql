BEGIN;

DROP TABLE IF EXISTS users, posts, comments CASCADE;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    profile_img VARCHAR(255),
    createdAt DATE NOT NULL DEFAULT CURRENT_DATE
);

CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    post TEXT NOT NULL,
    likes INTEGER, 
    createdAt DATE NOT NULL DEFAULT CURRENT_DATE
);

CREATE TABLE comments (
    id SERIAL PRIMARY KEY,
    comment TEXT NOT NULL,
    user_id INTEGER REFERENCES users(id),
    post_id INTEGER REFERENCES posts(id),
    createdAt DATE NOT NULL DEFAULT CURRENT_DATE
);


COMMIT;