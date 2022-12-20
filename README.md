## API Endpoints
#### Products
- Index ``` route: './products' [GET] ```
- Show (args: product id) ``` route: './products/:id' [GET] ``` 
- Create (args: Product)[token required] ``` route: './products' [POST] ``` 
- Top 5 most popular products ``` route: './five-most-popular-products' [GET] ```  

#### Users
- Index [token required] ``` route: './users' [GET] ``` 
- Show (args: id)[token required] ``` route: './users/:id' [GET] ``` 
- Create (args: User)[token required] ``` route: './users' [POST] ``` 

#### Orders
- Current Order by user (args: user id)[token required] ``` route: './orders/user/:userId' [GET] ``` 
- Completed Orders by user (args: user id)[token required] ``` route: './orders/user/:userId/completed' [GET] ``` 


## Database Tables

#### Products
```sql
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
	price INTEGER NOT NULL
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

## DB Creation and Migrations

### (i) DEV Database
#### In a terminal tab, create and run the database:
1. switch to the postgres user ```su postgres```
2. start psql ```psql postgres```
3. in psql run the following:
	 ```sql 
	 CREATE USER shopping_user WITH PASSWORD 'password123';
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
2. Create the .env file and add the appropriate environment variables based on the databases that you created above. See below
```env
#Dev Database
DEV_HOST=127.0.0.1
DEV_DATABASE=shopping
DEV_USER=shopping_user
DEV_PASSWORD=password123

#Test Database
TEST_HOST=127.0.0.1
TEST_DATABASE=shopping_test
TEST_USER=shopping_user
TEST_PASSWORD=password123

#environment
ENV=test

#Secrets
BCRYPT_PASSWORD=jgkt-@$^^&
SALT_ROUNDS=10
TOKEN_SECRET=fdfd.=346565jgkt-@$^^&9
```

### (v) Run DB Migrate on Dev and Test Databases
1. Run the following command ```db-migrate up```
2. Run the following command ```db-migrate up -e test```