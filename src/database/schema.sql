-- users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role VARCHAR(50) DEFAULT 'staff'
);


-- categories table
CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    category_name VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- inventory table
CREATE TABLE inventory_items (
    id SERIAL PRIMARY KEY,
    item_name VARCHAR(150) NOT NULL,
    description TEXT,
    quantity INTEGER DEFAULT 0,
    unit_price NUMERIC(10, 2),
    category_id INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_category FOREIGN KEY(category_id) REFERENCES categories(id) ON DELETE
    SET NULL
);


-- transactions table
CREATE TABLE transactions (
    id SERIAL PRIMARY KEY,
    item_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    quantity INTEGER NOT NULL,
    transaction_type VARCHAR(50) NOT NULL,
    transaction_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_item FOREIGN KEY(item_id) REFERENCES inventory_items(id) ON DELETE CASCADE,
    CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
);


-- Relationship - Joins
SELECT 
	inventory_items.item_name,
	categories.category_name
FROM inventory_items
JOIN categories
ON inventory_items.category_id = categories.id


