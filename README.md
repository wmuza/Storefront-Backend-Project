# Udacity Storefront Backend Project
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. I have been tasked with building the API that will support this application, and my coworker who is building the frontend.

## Project setup

First, clone this repo and switch into the repo folder:

```bash
git clone https://github.com/wmuza/Storefront-Backend-Project.git
cd Storefront-Backend-Project
```


### Ports
Our database will be running on the default port 5432 and our webserver will be ruunig on port 3000

## 1. DB Creation and Migrations

### (i) Dev Database
#### In a terminal tab, create and run the database:
1. switch to the postgres user 
```
su postgres
```
2. start psql 
```
psql postgres
```
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

### (ii) Test Database
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

## (ii) Now you need to install the dependencies for the project.
### Node Version
Node version 16 or up is required. If not preseent follow the following instructions

Run 
```javascript
npm install -g n
```
```javascript
n 16
```
```javascript
PATH="$PATH"
```
```javascript
node -v
```
Version should be 16 and if not open another terminal or refresh your current terminal


### NPM Version
NPM version 9 or up is required. If not preseent follow the following instructions

Run 
```javascript
npm install -g npm@9.2.0
```

### Set up the dependencies

```bash
npm install
```

### Lint the code using Eslint

```bash
npm run lint
```

### Format the code using Prettier

```bash
npm run format
```

### Install DB Migrate
Make sure you exit psql and run this command 
```
npm install -g db-migrate-pg
```

### (iv) Add environment variables
1. Create the .env file in the home directory and add the below details:
```env
#POSTGRES Database
POSTGRES_HOST=127.0.0.1
POSTGRES_DATABASE=shopping
POSTGRES_USER=shopping_user
POSTGRES_PASSWORD=password123

#Test Database
POSTGRES_TEST_DB=shopping_test

#environment
ENV=test

#Secrets
BCRYPT_PASSWORD=jgkt-@$^^&
SALT_ROUNDS=10
TOKEN_SECRET=fdfd.=346565jgkt-@$^^&9
```

### (v) Run DB Migrate on Dev and Test Databases
1. Run the following command 
```
db-migrate up
```