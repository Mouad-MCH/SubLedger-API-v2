# SubLedger Backend API

## Project Overview

SubLedger is a backend API designed for managing digital subscriptions.  
The goal of this project is to build a secure REST API with authentication, authorization, and subscription management.

The system allows users to register, log in, and manage their personal subscriptions while providing administrators with access to special routes.

<img width="431" height="305" alt="{5E61FD5F-DF9D-42FC-A5AB-2377BC0D5E06}" src="https://github.com/user-attachments/assets/fea73a38-64d3-47c5-9ad2-95ddf87cc396" />


## Features

### Authentication

- User registration
- User login
- Password hashing using bcrypt
- JWT-based authentication

### Authorization

- Role-based access control (User / Admin)
- Protected routes for authenticated users
- Admin-only routes

### Subscription Management

Authenticated users can manage their subscriptions:

- Create a subscription
- View all their subscriptions
- View a single subscription
- Update a subscription
- Delete a subscription

Each subscription contains:

- name
- price
- billingCycle (monthly / yearly)
- createdAt
- userId

### Validation

Input validation is implemented using:

- Express-validator

Examples:

- Valid email required
- Password required
- Subscription name required
- Price must be greater than 0
- Billing cycle must be monthly or yearly

---

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcrypt
- Express-validator
