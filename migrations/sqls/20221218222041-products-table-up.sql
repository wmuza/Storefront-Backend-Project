CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
		price INTEGER NOT NULL,
    timestamp timestamp default current_timestamp
);