# Shoppers E-commerce Application

A simple web application built with React (frontend) and Spring Boot (backend) featuring authentication, role-based access control (RBAC), and product management.

## Features

- **User Authentication**: Register and login with local credentials or Google SSO (OAuth 2.0).
- **Role-Based Access Control (RBAC)**:
  - **Admin**: Can view, create, update, and delete products.
  - **User**: Can only view products.
- **Product Dashboard**: A clean UI to view all products with images, descriptions, and prices.
- **User Profile Management**: Update personal information and change passwords.
- **Modern UI**: Built with React, Tailwind CSS, and Lucide icons.

## Tech Stack

- **Backend**: Java 17, Spring Boot 3.2.4, Spring Security, Spring Data JPA, H2 Database, JWT, OAuth 2.0 Client.
- **Frontend**: React, Vite, Tailwind CSS, Axios, React Router, Lucide React.

## Getting Started

### Prerequisites

- Java 17 or higher
- Node.js 18 or higher
- Maven

### Running the Backend

1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Run the application using Maven:
   ```bash
   mvn spring-boot:run
   ```
   The backend will start on `http://localhost:8080`.
   - H2 Console: `http://localhost:8080/h2-console` (JDBC URL: `jdbc:h2:mem:shoppersdb`, Username: `sa`, Password: `password`)

### Running the Frontend

1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
   The frontend will start on `http://localhost:5173`.

## Demo Credentials

- **Admin User**:
  - Username: `admin`
  - Password: `admin123`
- **Regular User**:
  - Username: `user`
  - Password: `user123`

## OAuth 2.0 Configuration

To enable Google SSO, you must replace the placeholder values in `backend/src/main/resources/application.properties` with your actual Google Client ID and Secret:

```properties
spring.security.oauth2.client.registration.google.client-id=YOUR_GOOGLE_CLIENT_ID
spring.security.oauth2.client.registration.google.client-secret=YOUR_GOOGLE_CLIENT_SECRET
```

## Project Structure

```
shoppers/
├── backend/                # Spring Boot application
│   ├── src/main/java/      # Java source files
│   └── src/main/resources/ # Configuration and static assets
└── frontend/               # React application
    ├── src/components/     # Reusable UI components
    ├── src/pages/          # Application pages
    ├── src/services/       # API service layers
    └── src/context/        # Authentication context
```
