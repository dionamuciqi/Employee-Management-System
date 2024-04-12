# Employee-Management-System

### Exception Handling

We have implemented custom exception handling using `@ControllerAdvice` and `@ExceptionHandler` to handle exceptions like `ResourceNotFoundException`
when a requested resource is not found.

## Technical Decisions

### Database Migration

We chose to use Hibernate's `update` strategy for schema generation (`spring.jpa.hibernate.ddl-auto = update`).
This strategy updates the database schema automatically based on the entity classes.

### Security

For database security, we have configured the database connection properties like `spring.datasource.username` and `spring.datasource.password` in a secure manner,
avoiding hardcoding sensitive information directly in the source code.