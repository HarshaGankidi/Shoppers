# Shoppers E-commerce Application

## Overview

This is a full-stack e-commerce application built with React (frontend) and Spring Boot (backend). It features user authentication, role-based access control (RBAC), product management, and Google SSO integration.

## Features

- User registration and login
- JWT-based authentication
- OAuth 2.0 Google SSO
- Role-based access control (Admin/User)
- Product management (CRUD for admins)
- User profile management
- Modern responsive UI

## Tech Stack

- **Backend**: Spring Boot, Spring Security, JWT, OAuth2, PostgreSQL
- **Frontend**: React, Vite, Tailwind CSS

## Setup Steps

### Prerequisites
- Java 17
- Node.js 18
- Maven

### Backend Setup
1. `cd backend`
2. `mvn spring-boot:run`

### Frontend Setup
1. `cd frontend`
2. `npm install`
3. `npm run dev`

## API Details

### Authentication
- POST /api/auth/signin
- POST /api/auth/signup

### Products
- GET /api/products (all users)
- POST /api/products (admin only)
- PUT /api/products/{id} (admin only)
- DELETE /api/products/{id} (admin only)

### User Profile
- GET /api/users/me
- PUT /api/users/me
- PUT /api/users/me/change-password

## SSO Configuration

1. Go to Google Cloud Console
2. Create OAuth credentials
3. Add redirect URI: `http://localhost:8080/login/oauth2/code/google`
4. Configure in `backend/.env`:
   ```
   OAUTH_GOOGLE_CLIENT_ID=YOUR_CLIENT_ID
   OAUTH_GOOGLE_CLIENT_SECRET=YOUR_SECRET
   ```

## Demo Credentials

- Admin: admin / password
- User: user / password

## Database Design

### Users Table
- id, username, password, role, email

### Products Table
- id, name, description, price

## Security Best Practices

- BCrypt password hashing
- JWT tokens
- HTTPS in production
- Input validation

## Testing Checklist

- User registration works
- Login works (JWT)
- SSO login works
- Admin can manage products
- User cannot modify products
- Profile update works
