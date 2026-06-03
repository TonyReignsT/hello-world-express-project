# Inventory Management System API

## Overview

This project is a RESTful API for an Inventory Management System built using Node.js and Express.js with a PostgreSQL database. The API supports full CRUD operations for users, categories, inventory items, and transactions, with JWT-based authentication and role-based access control.

The purpose of creating this software is to strengthen my understanding of backend development, REST API design, database management, and security practices such as password hashing and token-based authentication.

## Features

- **Authentication** — JWT-based login with bcrypt password hashing
- **Role-Based Access Control** — Admin and Staff roles with different permissions
- **Users** — Create, read, update, and delete users
- **Categories** — Manage inventory categories
- **Inventory Items** — Track items with quantity, price, and category
- **Transactions** — Record stock movements (purchase, sale, return, etc.)

## Development Environment

The software was developed using the following tools:

- Visual Studio Code
- Node.js
- Express.js
- PostgreSQL
- pgAdmin 4
- Git
- GitHub
- Thunder Client (API testing)

The programming language used is JavaScript (Node.js, Express.js).

## Dependencies

- `express` — Web framework
- `pg` — PostgreSQL client
- `bcryptjs` — Password hashing
- `jsonwebtoken` — JWT authentication
- `dotenv` — Environment variable management

## Getting Started

### Prerequisites
- Node.js installed
- PostgreSQL installed and running

### Installation

1. Clone the repository
```bash
   git clone https://github.com/yourusername/your-repo-name.git
```

2. Install dependencies
```bash
   npm install
```

3. Create a `.env` file in the root directory and fill in your own values:
        DB_HOST=localhost
        DB_PORT=5432
        DB_USER=your_db_user
        DB_PASSWORD=your_db_password
        DB_NAME=your_db_name
        JWT_SECRET=your_jwt_secret
        PORT=8000

4. Run the database schema
```bash
   psql -U your_db_user -d your_db_name -f src/database/schema.sql
```

5. Create the admin account by running this SQL directly in your database:
```sql
   INSERT INTO users (name, email, password_hash, role)
   VALUES ('Admin', 'admin@example.com', 'your_bcrypt_hashed_password', 'admin');
```

6. Start the server
```bash
   npm run dev
```

## API Endpoints

### Auth
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | /auth/login | Public | Login and get JWT token |

### Users
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | /users | Admin | Create a new user |
| GET | /users | Admin | Get all users |
| GET | /users/:id | Admin | Get user by ID |
| PUT | /users/:id | Admin | Update a user |
| DELETE | /users/:id | Admin | Delete a user |

### Categories
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | /categories | Admin | Create a category |
| GET | /categories | All | Get all categories |
| GET | /categories/:id | All | Get category by ID |
| PUT | /categories/:id | Admin | Update a category |
| DELETE | /categories/:id | Admin | Delete a category |

### Inventory Items
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | /inventory | Admin | Create an item |
| GET | /inventory | All | Get all items |
| GET | /inventory/:id | All | Get item by ID |
| PUT | /inventory/:id | Admin | Update an item |
| DELETE | /inventory/:id | Admin | Delete an item |

### Transactions
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | /transactions | All | Create a transaction |
| GET | /transactions | All | Get all transactions |
| GET | /transactions/:id | All | Get transaction by ID |
| PUT | /transactions/:id | Admin | Update a transaction |
| DELETE | /transactions/:id | Admin | Delete a transaction |

## Useful Websites

* [Node.js Documentation](https://nodejs.org/en/docs)
* [Express.js Documentation](https://expressjs.com/)
* [PostgreSQL Documentation](https://www.postgresql.org/docs/)
* [JWT Documentation](https://jwt.io/)
* [bcryptjs Documentation](https://www.npmjs.com/package/bcryptjs)
* [GitHub Documentation](https://docs.github.com/)