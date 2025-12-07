# LightBnB - Airbnb Clone

![GitHub last commit](https://img.shields.io/github/last-commit/VioletFigueroa/lightBnB?style=flat-square)
![GitHub repo size](https://img.shields.io/github/repo-size/VioletFigueroa/lightBnB?style=flat-square)
![License](https://img.shields.io/badge/license-Educational-blue?style=flat-square)

**Quick Links:** [Security Features](#security-relevance-for-application-security) | [Setup](#getting-started) | [Database Schema](#database-architecture)

---

**How to view artifacts:** SQL queries in `/1_queries/`; database layer in `LightBnB_WebApp/server/database.js`; migrations in `/migrations/`.

**Result snapshot:** Full-stack property rental application with PostgreSQL database, parameterized queries, and database security practices.

**Quick review:**
- **Security focus:** SQL injection prevention via parameterized queries, database access control, secure connection pooling
- **Key files:** `server/database.js` (parameterized queries), `/1_queries/` (SQL examples), `/migrations/` (schema)
- **Start with:** Review parameterized queries in `database.js` and SQL injection protection patterns

## Overview
LightBnB is an Airbnb clone built with Node.js, Express, and PostgreSQL that allows users to browse properties, make reservations, and manage listings. This project demonstrates critical database security practices, particularly SQL injection prevention through parameterized queries and proper database access patterns.

**Developed during:** Lighthouse Labs Web Development Bootcamp (April 2021)

## Security Relevance for Application Security

### SQL Injection Prevention
- **Parameterized queries** using PostgreSQL placeholders (`$1`, `$2`, etc.)
- **No string concatenation** in SQL - all user input passed as parameters
- **Prepared statement pattern** prevents malicious SQL in user input
- **Input sanitization at database layer** using pg library's built-in protections
- Demonstrates understanding of #3 OWASP Top 10 vulnerability (Injection)

### Database Security Architecture
- **Connection pooling** with pg.Pool for secure, efficient database connections
- **Credential management** using environment-based configuration
- **Least privilege principle** - database user has only necessary permissions
- **Error handling** that logs details server-side without exposing to users
- **Transaction management** for data integrity and consistency

### Secure Query Patterns
- **Dynamic filtering with safe parameters** for search functionality
- **Complex queries** built securely using parameterized WHERE clauses
- **JOIN operations** that maintain security while querying multiple tables
- **Aggregate functions** (COUNT, AVG) used safely with user input
- **RETURNING clause** for secure data retrieval after INSERT/UPDATE

### Data Access Layer Design
- **Abstraction layer** separates business logic from SQL
- **Promise-based async patterns** prevent race conditions
- **Modular query functions** facilitate security code review
- **Centralized database connection** makes security updates easier
- **Clear function contracts** with JSDoc comments aid security analysis

### Authentication & Authorization at Database Level
- **User lookup by email** uses parameterized queries
- **Password storage** (hashed values only in database)
- **User-specific reservation queries** enforce data ownership
- **Guest_id filtering** ensures users only see their own data

## Objectives
- Build secure database-backed web application
- Implement SQL injection prevention techniques
- Design relational database schema with security in mind
- Create complex queries safely with user input
- Demonstrate secure data access patterns

## Methodology
- **PostgreSQL** for robust, secure relational database
- **pg (node-postgres)** for parameterized query support
- **Database migrations** for version-controlled schema changes
- **SQL best practices** including indexes, foreign keys, constraints
- **Connection pooling** for performance and security

## Key Features
- **Property Search:** Filter by city, price range, and rating
- **User Authentication:** Login and registration with database-backed users
- **Reservations:** Create and view property bookings
- **Property Listings:** Browse available rentals with detailed information
- **User Dashboard:** View personal reservations and listing statistics
- **Complex Queries:** Multi-table JOINs with aggregate functions

## Technologies Used
- **Backend:** Node.js, Express.js
- **Database:** PostgreSQL 9.6+
- **Database Driver:** pg (node-postgres) with connection pooling
- **Frontend:** HTML, CSS, JavaScript, jQuery
- **Templating:** Server-side rendering with dynamic data
- **Build Tools:** npm, nodemon for development

## Database Architecture

### Tables
- **users:** User accounts with hashed passwords
- **properties:** Property listings with location and amenity data
- **reservations:** Booking records linking users and properties
- **property_reviews:** User reviews with ratings

### Security Features
- **Foreign key constraints** enforce referential integrity
- **NOT NULL constraints** prevent incomplete data
- **CHECK constraints** validate data ranges (e.g., ratings 1-5)
- **Unique constraints** on email prevent duplicate accounts
- **Indexes** on frequently queried columns improve performance

## Application Security Lessons Learned
- **Parameterized queries are non-negotiable:** String concatenation in SQL is a critical vulnerability
- **Database errors leak information:** Generic error messages to users, detailed logs server-side
- **Connection pooling impacts security:** Proper pool management prevents connection exhaustion attacks
- **Schema design affects security:** Constraints and foreign keys enforce data integrity at database level
- **Database credentials are crown jewels:** Environment-based config keeps credentials out of source code
- **ORM isn't always the answer:** Understanding raw SQL and parameterized queries is crucial for security reviews
- **Migration discipline matters:** Version-controlled schema changes provide audit trail and rollback capability

## Files Included

**Database:**
- `migrations/01_schema.sql` - Database schema with tables, constraints, and indexes
- `seeds/` - Sample data for development and testing
- `1_queries/` - Example SQL queries demonstrating safe query patterns
  - `1_user_login.sql` - User authentication query
  - `2_average_length_of_reservation.sql` - Aggregate query example
  - `3_property_listings_by_city.sql` - Filtered property search
  - `4_most_visited_cities.sql` - Complex JOIN with GROUP BY
  - `5_all_my_reservations.sql` - User-specific data retrieval

**Application:**
- `LightBnB_WebApp/server/database.js` - Data access layer with parameterized queries
- `LightBnB_WebApp/server/server.js` - Express server and API routes
- `LightBnB_WebApp/public/` - Client-side assets
- `LightBnB_WebApp/package.json` - Dependencies including pg driver

## Getting Started

### Prerequisites
- Node.js (v10.x or higher)
- PostgreSQL (v9.6 or higher)
- npm (v6.x or higher)

### Database Setup

1. **Create database**
   ```bash
   createdb lightbnb
   ```

2. **Run migrations**
   ```bash
   psql -d lightbnb < migrations/01_schema.sql
   ```

3. **Load seed data**
   ```bash
   psql -d lightbnb < seeds/01_seeds.sql
   psql -d lightbnb < seeds/02_seeds.sql
   ```

### Application Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/VioletFigueroa/lightBnB.git
   cd lightBnB/LightBnB_WebApp
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure database connection**
   - Edit `server/database.js` lines 3-8
   - Update credentials (or use environment variables):
   ```javascript
   const pool = new Pool({
     user: process.env.DB_USER || 'your_username',
     password: process.env.DB_PASSWORD || 'your_password',
     host: process.env.DB_HOST || 'localhost',
     database: process.env.DB_NAME || 'lightbnb'
   });
   ```

4. **Start the server**
   ```bash
   npm run local
   ```
   The application will be available at `http://localhost:3000`

## SQL Injection Protection Example

### ❌ Vulnerable Code (Never Do This)
```javascript
// DANGEROUS - Vulnerable to SQL injection
const getUserWithEmail = (email) => {
  const query = `SELECT * FROM users WHERE email = '${email}'`;
  return pool.query(query);
};
// Attacker could input: ' OR '1'='1
```

### ✅ Secure Code (Used in This Project)
```javascript
// SAFE - Parameterized query prevents SQL injection
const getUserWithEmail = (email) => {
  return pool.query(
    `SELECT * FROM users WHERE email = $1`,
    [email.toLowerCase()]
  );
};
// User input is safely escaped by pg library
```

## Complex Query Security Example

```javascript
// Secure multi-parameter query with user input
const getAllProperties = (options, limit = 10) => {
  const queryParams = [];
  let queryString = `
    SELECT properties.*, avg(property_reviews.rating) as average_rating
    FROM properties
    JOIN property_reviews ON properties.id = property_id
    WHERE 1=1
  `;

  if (options.city) {
    queryParams.push(`%${options.city}%`);
    queryString += ` AND city LIKE $${queryParams.length}`;
  }

  if (options.minimum_price_per_night) {
    queryParams.push(options.minimum_price_per_night * 100);
    queryString += ` AND cost_per_night >= $${queryParams.length}`;
  }

  queryParams.push(limit);
  queryString += `
    GROUP BY properties.id
    LIMIT $${queryParams.length};
  `;

  return pool.query(queryString, queryParams);
};
```

## Application Security Career Connection

This project demonstrates critical AppSec database security skills:

1. **SQL Injection Prevention:** Understanding and preventing the #3 OWASP Top 10 vulnerability
2. **Secure Database Design:** Implementing constraints, keys, and indexes for security and performance
3. **Code Review Skills:** Identifying SQL injection vulnerabilities in database access code
4. **Threat Modeling:** Understanding database attack vectors and implementing controls
5. **Security Testing:** Testing for SQL injection, authentication bypasses, and authorization flaws

**Database security skills essential for AppSec:**
- **Code Review:** Spotting SQL injection and unsafe query patterns in codebases
- **Security Testing:** Using SQLMap and other tools to test for injection vulnerabilities
- **Secure Architecture:** Designing database access layers with security in mind
- **Vulnerability Assessment:** Identifying database-related security weaknesses
- **Developer Training:** Teaching secure database access patterns to development teams
- **Compliance:** Understanding data protection requirements (GDPR, PCI-DSS) at database level

This project, combined with authentication (TinyApp) and XSS prevention (Tweeter), provides comprehensive web application security foundation for AppSec roles.

---

**Author:** Violet Figueroa  
**Contact:** [GitHub Profile](https://github.com/VioletFigueroa)  
**Career Focus:** Application Security | Secure Software Development | Database Security
