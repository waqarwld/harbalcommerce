# Home Remedies & Natural Herbs E-Commerce Platform

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                        Docker Network                            │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────┐  │
│  │  Customer    │  │    Admin     │  │      Backend API     │  │
│  │  Angular     │  │   Angular    │  │    Node.js/Express   │  │
│  │  App         │  │   App        │  │    (Modular          │  │
│  │  :3000       │  │   :4200      │  │     Monolith)        │  │
│  └──────┬───────┘  └──────┬───────┘  └──────────┬───────────┘  │
│         │                 │                      │               │
│         └─────────┬───────┘──────────────────────┘               │
│                   │                                              │
│              ┌────┴─────┐                                        │
│              │   Nginx  │  Reverse Proxy / API Gateway           │
│              │   :80    │                                        │
│              └────┬─────┘                                        │
│                   │                                              │
│              ┌────┴─────┐                                        │
│              │PostgreSQL│  Relational Database                   │
│              │  :5432   │                                        │
│              └──────────┘                                        │
└─────────────────────────────────────────────────────────────────┘
```

## Repository Structure

```
project/
├── ARCHITECTURE.md
├── README.md
├── docker-compose.yml
├── .env.example
├── frontend/
│   ├── customer/                    # Customer E-Commerce SPA
│   │   ├── angular.json
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   ├── src/
│   │   │   ├── app/
│   │   │   │   ├── app.component.ts
│   │   │   │   ├── app.config.ts
│   │   │   │   ├── app.routes.ts
│   │   │   │   ├── components/      # Reusable UI components
│   │   │   │   ├── pages/           # Page-level components
│   │   │   │   ├── services/        # API services
│   │   │   │   ├── guards/          # Auth guards
│   │   │   │   ├── interceptors/    # HTTP interceptors
│   │   │   │   ├── models/          # TypeScript interfaces
│   │   │   │   └── shared/          # Shared utilities
│   │   │   ├── assets/
│   │   │   └── environments/
│   │   └── nginx.conf
│   └── admin/                       # Admin Dashboard SPA
│       ├── angular.json
│       ├── package.json
│       ├── tsconfig.json
│       ├── src/
│       │   ├── app/
│       │   │   ├── app.component.ts
│       │   │   ├── app.config.ts
│       │   │   ├── app.routes.ts
│       │   │   ├── components/
│       │   │   ├── pages/
│       │   │   ├── services/
│       │   │   ├── guards/
│       │   │   ├── interceptors/
│       │   │   ├── models/
│       │   │   └── shared/
│       │   ├── assets/
│       │   └── environments/
│       └── nginx.conf
├── backend/
│   ├── package.json
│   ├── tsconfig.json
│   ├── .env.example
│   └── src/
│       ├── config/
│       │   └── database.ts
│       ├── middleware/
│       │   ├── auth.ts
│       │   ├── rbac.ts
│       │   └── errorHandler.ts
│       ├── domains/
│       │   ├── auth/
│       │   │   ├── controllers/
│       │   │   │   └── authController.ts
│       │   │   ├── services/
│       │   │   │   └── authService.ts
│       │   │   ├── repositories/
│       │   │   │   └── userRepository.ts
│       │   │   ├── validators/
│       │   │   │   └── authValidator.ts
│       │   │   └── routes/
│       │   │       └── authRoutes.ts
│       │   ├── products/
│       │   │   ├── controllers/
│       │   │   │   └── productController.ts
│       │   │   ├── services/
│       │   │   │   └── productService.ts
│       │   │   ├── repositories/
│       │   │   │   └── productRepository.ts
│       │   │   ├── validators/
│       │   │   │   └── productValidator.ts
│       │   │   └── routes/
│       │   │       └── productRoutes.ts
│       │   ├── categories/
│       │   │   ├── controllers/
│       │   │   ├── services/
│       │   │   ├── repositories/
│       │   │   ├── validators/
│       │   │   └── routes/
│       │   ├── ingredients/
│       │   │   ├── controllers/
│       │   │   ├── services/
│       │   │   ├── repositories/
│       │   │   ├── validators/
│       │   │   └── routes/
│       │   ├── inventory/
│       │   │   ├── controllers/
│       │   │   ├── services/
│       │   │   ├── repositories/
│       │   │   ├── validators/
│       │   │   └── routes/
│       │   ├── orders/
│       │   │   ├── controllers/
│       │   │   ├── services/
│       │   │   ├── repositories/
│       │   │   ├── validators/
│       │   │   └── routes/
│       │   ├── customers/
│       │   │   ├── controllers/
│       │   │   ├── services/
│       │   │   ├── repositories/
│       │   │   ├── validators/
│       │   │   └── routes/
│       │   ├── payments/
│       │   │   ├── controllers/
│       │   │   ├── services/
│       │   │   ├── repositories/
│       │   │   ├── validators/
│       │   │   └── routes/
│       │   ├── reviews/
│       │   │   ├── controllers/
│       │   │   ├── services/
│       │   │   ├── repositories/
│       │   │   ├── validators/
│       │   │   └── routes/
│       │   ├── messages/
│       │   │   ├── controllers/
│       │   │   ├── services/
│       │   │   ├── repositories/
│       │   │   ├── validators/
│       │   │   └── routes/
│       │   └── notifications/
│       │       ├── controllers/
│       │       ├── services/
│       │       ├── repositories/
│       │       ├── validators/
│       │       └── routes/
│       ├── database/
│       │   ├── migrations/
│       │   └── seeds/
│       └── shared/
│           ├── utils/
│           ├── validators/
│           └── errors/
├── database/
│   ├── migrations/
│   └── seeds/
└── nginx/
    └── nginx.conf
```

## Technology Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Customer Frontend | Angular 17+ | SPA with standalone components |
| Admin Frontend | Angular 17+ | Separate SPA for dashboard |
| Backend | Node.js + Express.js | RESTful API server |
| Database | PostgreSQL 15+ | Relational data store |
| Cache | Redis | Session storage, caching |
| Reverse Proxy | Nginx | Routing, SSL termination |
| Containerization | Docker + Compose | Dev/prod environments |
| Auth | JWT + bcrypt | Authentication & authorization |
| Payments | Stripe (abstraction) | Payment processing |
| Search | PostgreSQL Full-text | Product search |

## Domain Boundaries (Microservice Extraction Ready)

```
┌─────────────────────────────────────────────────────────────┐
│                    Modular Monolith                         │
│  ┌──────────┐ ┌──────────┐ ┌──────────────┐ ┌──────────┐   │
│  │  Auth    │ │ Products │ │  Inventory   │ │  Orders  │   │
│  │ Domain   │ │  Domain  │ │    Domain    │ │  Domain  │   │
│  └────┬─────┘ └────┬─────┘ └──────┬───────┘ └────┬─────┘   │
│       │            │              │              │         │
│  ┌────┴─────┐ ┌────┴─────┐ ┌──────┴───────┐ ┌────┴─────┐   │
│  │ Customers│ │ Categories│ │  Ingredients │ │ Payments │   │
│  │ Domain   │ │  Domain   │ │    Domain    │ │  Domain  │   │
│  └──────────┘ └──────────┘ └──────────────┘ └──────────┘   │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────────┐   │
│  │ Reviews  │ │ Messages │ │Inventory │ │ Notifications│   │
│  │ Domain   │ │  Domain  │ │Transactions│ │   Domain    │   │
│  └──────────┘ └──────────┘ └──────────┘ └──────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

## API Versioning

All APIs use `/api/v1` prefix for versioning:

```
/api/v1/auth        - Authentication & authorization
/api/v1/products    - Product catalog
/api/v1/categories  - Product categories
/api/v1/ingredients - Ingredient management
/api/v1/inventory   - Stock management
/api/v1/orders      - Order processing
/api/v1/customers   - Customer management
/api/v1/payments    - Payment processing
/api/v1/reviews     - Product reviews
/api/v1/messages    - Customer messages
```

## Security Architecture

1. **Authentication**: JWT with refresh tokens
2. **Authorization**: Role-based access control (RBAC)
3. **Data Protection**: bcrypt password hashing, HTTPS only
4. **Input Validation**: Express-validator on all endpoints
5. **Rate Limiting**: Per-IP rate limiting on auth endpoints
6. **CORS**: Whitelist-based CORS configuration
7. **SQL Injection**: Parameterized queries via pg/promise
8. **XSS**: Content sanitization middleware

## Future Microservice Extraction

Domains ready for extraction (clean interfaces defined):
- `Product Service` - Product catalog and search
- `Inventory Service` - Stock management
- `Order Service` - Order processing
- `Customer Service` - Customer accounts
- `Payment Service` - Payment processing
- `Notification Service` - Email/SMS notifications

## AI Integration Extension Points

```
Customer → AI Assistant → Backend API → Products/Orders/FAQs
```

AI uses controlled APIs only, never direct database access.