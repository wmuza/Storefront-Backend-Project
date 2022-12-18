## 1. Database Tables

#### Products
```sql
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
		price INTEGER NOT NULL,
		category VARCHAR(150)
);
```

#### Users
```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(150),
		password VARCHAR(150),
		firstName VARCHAR(150),
    lastName VARCHAR(150)
);
```

#### Orders
```sql
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    status VARCHAR(64),
		user_id BIGINT REFERENCES users(id)
);
```

#### Order Products
```sql
CREATE TABLE order_products (
    id SERIAL PRIMARY KEY,
    quantity INTEGER,
		order_id BIGINT REFERENCES orders(id),
		product_id BIGINT REFERENCES products(id)
);
```

## 2. DB Creation and Migrations

### (i) DEV Database
#### In a terminal tab, create and run the database:
1. switch to the postgres user ```su postgres```
2. start psql ```psql postgres```
3. in psql run the following:
	 ```sql 
	 CREATE USER shopping_user WITH PASSWORD '[replace with your password]';
	 ```
	 ```sql 
	 CREATE DATABASE shopping;
	 ```
	 ```sql 
	 \c shopping
	 ```
	 ```sql 
	 GRANT ALL PRIVILEGES ON DATABASE shopping TO shopping_user;
	 ```
4. to test that it is working run ```\dt``` and it should output "No relations found."

### (ii) DEV Database
#### In a terminal tab, create and run the database:
1. switch to the postgres database ```\c postgres```
2. run the following:
	 ```sql 
	 CREATE DATABASE shopping_test;
	 ```
	 ```sql 
	 \c shopping_test
	 ```
	 ```sql 
	 GRANT ALL PRIVILEGES ON DATABASE shopping_test TO shopping_user;
	 ```
3. to test that it is working run ```\dt``` and it should output "No relations found."

### (iii) Install DB Migrate
Make sure you exit psql and run this command ```npm install db-migrate -g```

### (iv) Create database.json and add your password in .env
1. Create database.json in the root of the project and add the following 
```json
{
  "dev": {
    "driver": "pg",
    "host": {"ENV": "DEV_HOST"},
    "database": {"ENV": "DEV_DATABASE"},
    "user": {"ENV": "DEV_USER"},
    "password": {"ENV": "DEV_PASSWORD"}
  },
  "test": {
    "driver": "pg",
    "host": {"ENV": "TEST_HOST"},
    "database": {"ENV": "TEST_DATABASE"},
    "user": {"ENV": "TEST_USER"},
    "password": {"ENV": "TEST_PASSWORD"}
  }
}
```
2. Create the .env file and add the appropriate environment variables based on the databases that you created above

### (v) Run DB Migrate on Dev and Test Databases
1. Run the following command ```db-migrate up```
2. Run the following command ```db-migrate up -e test```