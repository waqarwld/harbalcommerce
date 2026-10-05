# HerbalCommerce — Home Remedies & Natural Herbs E-Commerce Platform

A comprehensive full-stack e-commerce platform for home remedies and natural herbal products, designed as a modular monolith with microservice extraction paths.

## 🌿 Overview

HerbalCommerce provides customer-facing storefronts and administrative control panels backed by a modular Node.js/TypeScript REST API, PostgreSQL database, and Nginx reverse proxy gateway.

### Architecture Highlights
- **Backend**: Node.js, Express, TypeScript (Domain-Driven Modular Monolith)
- **Database**: PostgreSQL with normalized schema, migrations, and seed scripts
- **Frontend**: 
  - Customer Portal (Angular SPA)
  - Admin Dashboard (Angular SPA)
- **Gateway & Proxy**: Nginx (reverse proxy, rate limiting, security headers)
- **Containerization**: Docker & Docker Compose multi-service orchestration

---

## 🏗️ Project Structure

```
├── ARCHITECTURE.md          # Complete system architecture and domain design
├── PHASE1_DELIVERABLES.md   # Detailed roadmap and phase breakdown
├── docker-compose.yml       # Docker development environment
├── nginx/                   # Nginx reverse proxy configurations
├── database/                # Schema migrations & seed datasets
│   ├── migrations/
│   └── seeds/
├── backend/                 # Modular Express/TypeScript REST API
│   ├── src/
│   │   ├── config/          # Database and environment configurations
│   │   ├── middleware/      # Auth, RBAC, error handlers, rate limiting
│   │   ├── shared/          # Shared utilities (pagination, validation, response)
│   │   └── domains/         # Domain modules (auth, products, orders, inventory, etc.)
│   ├── package.json
│   └── tsconfig.json
└── frontend/                # Client applications
    ├── customer/            # Customer storefront Angular app
    └── admin/               # Administrative portal Angular app
```

---

## 🚀 Getting Started

### Prerequisites
- [Docker](https://www.docker.com/) & Docker Compose
- [Node.js](https://nodejs.org/) (v20+ recommended)
- [PostgreSQL](https://www.postgresql.org/) (v15+)

### Quick Start with Docker

1. **Clone the repository**:
   ```bash
   git clone https://github.com/waqarwld/herbalcommerce.git
   cd herbalcommerce
   ```

2. **Configure environment variables**:
   ```bash
   cp backend/.env.example backend/.env
   ```

3. **Start the multi-container stack**:
   ```bash
   docker compose up --build
   ```

4. **Access the services**:
   - Customer Portal: `http://localhost:3000` (or `http://localhost/` via Nginx)
   - Admin Portal: `http://localhost:4200` (or `http://localhost/admin` via Nginx)
   - Backend API: `http://localhost:5000/api/v1` (or `http://localhost/api/v1` via Nginx)

---

## 🔒 Security & Best Practices
- Strict authentication via JWT and granular role-based access control (RBAC).
- Secrets and environment credentials managed via `.env` (excluded from git tracking).
- Nginx reverse proxy enforcing SSL termination, rate limits, and secure headers.
- Input validation and sanitized database queries.

---

## 📄 License
MIT License
