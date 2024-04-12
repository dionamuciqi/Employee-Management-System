# Implementation and Usage of ORM

## Overview

Our Spring Boot project utilizes Spring Data JPA for Object-Relational Mapping (ORM) to interact with the MySQL database.
Spring Data JPA simplifies the data access layer by providing a set of abstractions to work with relational databases using JPA.

## ORM Implementation

### Entity Classes

We have defined several entity classes that map to database tables using JPA annotations like @Entity, @Table, @Id, @GeneratedValue, etc.
These entity classes represent the domain model of our application.

### Repository Interfaces

Spring Data JPA provides repository interfaces that extend `JpaRepository` or `CrudRepository`. 
These interfaces allow us to perform CRUD operations on the database without writing boilerplate code.

## Data Processing

### Service Layer

We have implemented a service layer that contains business logic and interacts with the repository layer to fetch or manipulate data.

### Exception Handling

We have implemented custom exception handling using `@ControllerAdvice` and `@ExceptionHandler` to handle exceptions like `ResourceNotFoundException` when a requested resource is not found.

## Technical Decisions

### Database Migration

We chose to use Hibernate's `update` strategy for schema generation (`spring.jpa.hibernate.ddl-auto = update`).
This strategy updates the database schema automatically based on the entity classes.

### Security

For database security, we have configured the database connection properties like `spring.datasource.username` and `spring.datasource.password` in a secure manner, avoiding hardcoding sensitive information directly in the source code.