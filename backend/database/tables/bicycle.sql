CREATE TABLE IF NOT EXISTS bicycle (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    image VARCHAR(255),
    cost INTEGER NOT NULL
);
