CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(150),
		password VARCHAR(150),
		firstname VARCHAR(150),
    lastname VARCHAR(150)
);