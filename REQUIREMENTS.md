# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

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
