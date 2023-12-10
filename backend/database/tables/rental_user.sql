CREATE TABLE IF NOT EXISTS rental_user(
    id SERIAL PRIMARY KEY ,
    name VARCHAR(255) NOT NULL ,
    phone_number VARCHAR(20) UNIQUE NOT NULL ,
    hash_pass VARCHAR(255) NOT NULL ,
    role_id INTEGER DEFAULT 0 references role(id)
);
