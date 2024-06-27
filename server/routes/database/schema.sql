-- Creazione della tabella users
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    role VARCHAR(20) NOT NULL CHECK (role IN ('user', 'admin', 'moderator', 'editor', 'viewer')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Inserimento di esempio
INSERT INTO users (username, password, email, role) VALUES ('admin', 'hashed_password', 'admin@example.com', 'admin');
INSERT INTO users (username, password, email, role) VALUES ('johndoe', 'hashed_password', 'john@example.com', 'user');
INSERT INTO users (username, password, email, role) VALUES ('janedoe', 'hashed_password', 'jane@example.com', 'moderator');
INSERT INTO users (username, password, email, role) VALUES ('editor1', 'hashed_password', 'editor1@example.com', 'editor');
INSERT INTO users (username, password, email, role) VALUES ('viewer1', 'hashed_password', 'viewer1@example.com', 'viewer');

-- Creazione della tabella posts
CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Creazione della tabella comments
CREATE TABLE comments (
    id SERIAL PRIMARY KEY,
    post_id INT NOT NULL,
    user_id INT NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (post_id) REFERENCES posts(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Creazione della tabella likes
CREATE TABLE likes (
    id SERIAL PRIMARY KEY,
    post_id INT NOT NULL,
    user_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (post_id) REFERENCES posts(id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    UNIQUE (post_id, user_id) -- Un utente può mettere like a un post solo una volta
);

-- Creazione della tabella shares
CREATE TABLE shares (
    id SERIAL PRIMARY KEY,
    post_id INT NOT NULL,
    user_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (post_id) REFERENCES posts(id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    UNIQUE (post_id, user_id) -- Un utente può condividere un post solo una volta
);

-- Inserire un nuovo post
INSERT INTO posts (user_id, title, content) VALUES (1, 'Primo Post', 'Questo è il contenuto del primo post');

-- Inserire un commento
INSERT INTO comments (post_id, user_id, content) VALUES (1, 2, 'Questo è un commento al primo post');

-- Inserire un like
INSERT INTO likes (post_id, user_id) VALUES (1, 3);

-- Inserire una condivisione
INSERT INTO shares (post_id, user_id) VALUES (1, 4);
