# Nova Studio - Digital Agency Platform

A premium, full-stack digital agency web application developed with **Next.js**, **Material UI + CSS**, **PostgreSQL**, and **MongoDB**. This project satisfies the full-stack developer assignment guidelines, covering frontend UI sections, secured admin dashboard functionalities, backend API endpoints, database logging analytics, and responsive transitions.

---

## Technical Stack

*   **Frontend**: Next.js (App Router)
*   **UI & Styling**: Material UI + CSS, framer-motion (animations), lucide-react (icons)
*   **Backend**: Next.js Route Handlers
*   **Primary Database**: PostgreSQL (structured agency data managed via Prisma v7)
*   **Primary Database**: PostgreSQL (all structured agency data and event logging managed via Prisma v7)
*   **Authentication**: JWT session tokens stored in secure, HTTP-only cookies

---

## Features

1.  **Landing Page**: Fully responsive layout matching mobile, tablet, and desktop breakpoints.
2.  **Services**: Dynamic cards section (Web Design, Front-End Development, and Branding) fetched from `/api/services` with hover animations.
3.  **Portfolio Showcase**: Dynamic project grid with image zoom hover states and custom client-side category filter buttons.
4.  **Count-up Metrics**: Animated numbers showing agency stats, tracked and synchronized via scroll-triggers.
5.  **Interactive Form**: Contact form with strict validation controls and visual success/error notifications.
6.  **Secured Admin Area**: Cookie-protected admin login and dashboard allowing managers to read contact submissions, publish new portfolio projects, and delete current items.
7.  **Logs Analytics**: Logs page visits and Start a Project CTA button clicks directly to PostgreSQL.

---

## Setup Instructions

### Prerequisites
*   Node.js (v18.x or above recommended)
*   PostgreSQL server running locally or externally

### 1. Configure Environment variables
Create a `.env` file at the root. The project contains a `.env.example` file that you can copy directly:
```bash
cp .env.example .env
```
Default connection parameters for local PostgreSQL database:
*   `DATABASE_URL`: `postgresql://postgres:postgres@localhost:5432/nova_studio?schema=public`
*   `JWT_SECRET`: `nova_studio_development_jwt_secret_key_12345`
*   `ADMIN_USERNAME`: `admin`
*   `ADMIN_PASSWORD`: `admin123`

### 2. Generate Prisma Client & Migrate Schema
Apply the database schemas and generate the Prisma 7 client bindings:
```bash
# Push schema structure to local PostgreSQL database
npx prisma db push

# Run client generator
npx prisma generate
```

### 3. Seed Database
Populate the database with the initial metrics, sample portfolio projects, and the admin credentials:
```bash
node prisma/seed.js
```

### 4. Start Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the landing page.
Access the admin dashboard at [http://localhost:3000/admin/Dashboard](http://localhost:3000/admin/Dashboard).

---

## API Documentation

### Public Endpoints

*   **`GET /api/projects`**
    *   *Description*: Retrieves all portfolio projects.
    *   *Response*: `200 OK` with JSON array of project objects.
*   **`GET /api/stats`**
    *   *Description*: Retrieves count metrics.
    *   *Response*: `200 OK` with JSON array of statistics items.
*   **`GET /api/services`**
    *   *Description*: Retrieves the list of core agency expertise.
    *   *Response*: `200 OK` with JSON array of services.
*   **`POST /api/contact`**
    *   *Description*: Submits a contact inquiry.
    *   *Payload*: `{ name: string, email: string, message: string }`
    *   *Response*: `210 Created` on success, `400 Bad Request` if validations fail.
*   **`POST /api/analytics`**
    *   *Description*: Logs site events (page views / CTA clicks) to MongoDB.
    *   *Payload*: `{ eventType: string, elementId?: string, url?: string }`
    *   *Response*: `201 Created`

### Administrative Endpoints (Authentication Required)

All administrative endpoints are protected with standard **HTTP Basic Authentication**. The browser will natively prompt for credentials on first access, and securely attach the `Authorization: Basic <credentials>` header for all subsequent page and API requests.

*   **`GET /api/contacts`**
    *   *Description*: Retrieves all contact inquiries.
    *   *Response*: `200 OK` with JSON array of inquiries. `401 Unauthorized` if invalid or missing authorization headers.
*   **`POST /api/projects`**
    *   *Description*: Registers a new portfolio project.
    *   *Payload*: `{ title: string, category: string, image: string, description: string }`
    *   *Response*: `201 Created` on success.
*   **`DELETE /api/projects/[id]`**
    *   *Description*: Removes a portfolio project.
    *   *Response*: `200 OK`.

---

## Design & Architecture Decisions

1.  **Decoupled Service Layer**: Database queries are encapsulated in separate files inside `src/services/` rather than inline in API routes. This creates a clean boundary, facilitates unit testing, and keeps API route handlers readable.
2.  **Robust Fallbacks**: If the local database is not started or connection timeouts occur, the service layer returns fallback arrays (for GET requests) so that the UI does not crash. For administration checks, a fallback is provided to verify admin logins directly against the `.env` configuration file, guaranteeing developers can access the panel under any local setup conditions.
3.  **Modern Next.js 16 File Conventions**: Migrated the deprecated `middleware.js` to the new Next.js 16 `proxy.js` structure in the `src` directory, resolving build configuration warnings.
4.  **Native HTTP Basic Authentication**: Admin pages and modification API endpoints are protected using browser-native HTTP Basic Authentication verified at the proxy boundary, leaving zero client-side state/token storage.
5.  **Aesthetics and Theme Provider**: Created a custom HSL theme variable system supporting Light, Dark, Mint, and Violet options, mapped directly to Material UI and CSS stylesheets.
