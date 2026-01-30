# Security Policy

## Scope

This is an educational/portfolio project demonstrating database security concepts, particularly SQL injection prevention through parameterized queries and secure database access patterns.

## Supported Versions

This project is not actively maintained for production use. It was created as a learning exercise during the Lighthouse Labs Web Development Bootcamp (April 2021).

## Reporting a Vulnerability

While this is a learning project, I appreciate security feedback and use it as an opportunity to improve my security knowledge:

- **Email:** violet@violetfigueroa.com
- **Response Time:** Best effort (typically 2-7 days)
- **Recognition:** Security findings will be acknowledged in this SECURITY.md file

## Security Features Implemented

This project demonstrates understanding of the following security concepts:

### SQL Injection Prevention
- **Parameterized queries** using PostgreSQL placeholders ($1, $2, etc.)
- **No string concatenation in SQL** - all user input passed as parameters
- **pg library built-in protections** for prepared statements
- **Input sanitization at database layer**
- Addresses **OWASP Top 10 A03:2021 - Injection**

### Database Security Architecture
- **Connection pooling** using pg.Pool for secure, efficient connections
- **Environment-based credential management** (not hardcoded)
- **Least privilege principle** - database user has only necessary permissions
- **Error handling** that logs details server-side without exposing to clients
- **Transaction management** for data integrity

### Secure Query Patterns
- **Dynamic filtering with safe parameters** for search functionality
- **Complex queries** built securely using parameterized WHERE clauses
- **JOIN operations** that maintain security while querying multiple tables
- **Aggregate functions** (COUNT, AVG) used safely with user input

### Data Access Layer Design
- **Abstraction layer** separates business logic from SQL
- **Promise-based async patterns** prevent race conditions
- **Modular query functions** facilitate security code review
- **Centralized database connection** makes security updates easier

## Known Limitations (Educational Context)

The following production-ready features are **intentionally excluded** as this is a learning project:

- **HTTPS enforcement** (assumed for production deployment)
- **Rate limiting** for query abuse prevention
- **Database query timeout protection**
- **SQL injection testing suite**
- **Database encryption at rest**
- **Comprehensive audit logging** of database access
- **Database user role separation** (read-only vs. read-write)
- **Prepared statement caching** for performance
- **Connection string security** (basic env vars only)

## Security Mindset

This project was built with security consciousness even in an educational context. Key principles applied:

1. **Never trust user input** - All input treated as potentially malicious
2. **Defense in depth** - Multiple layers of validation and sanitization
3. **Secure by default** - Parameterized queries are the standard, not the exception
4. **Fail securely** - Database errors don't expose schema or query details
5. **Principle of least privilege** - Database user has minimal required permissions

## References

This implementation follows security best practices from:
- OWASP Top 10 (particularly A03:2021 - Injection)
- PostgreSQL Security Documentation
- Node.js postgres (pg) Best Practices
- OWASP SQL Injection Prevention Cheat Sheet

## Security Acknowledgments

None at this time. Be the first to provide constructive security feedback!

---

**Last Updated:** January 30, 2026  
**Project Status:** Educational/Portfolio (Not Production-Ready)
