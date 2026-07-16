# SaaS CRM Landing Page & Product Inquiry System

A production-quality monorepo implementation of a SaaS CRM Landing Page integrated with a Product Inquiry intake pipeline and an Admin submissions dashboard. Built utilizing React.js (Vite) on the frontend, and Node.js (Express) with MongoDB on the backend.

---

## Technical Stack

| Category | Technology | Description |
|---|---|---|
| **Frontend** | React (Vite) | JavaScript template (v18) for state reactivity and rendering |
| **Backend** | Node.js + Express | REST server endpoints, controllers, and routing pathways |
| **Database** | MongoDB (Mongoose) | Documents store for incoming customer inquiries |
| **Styling** | Tailwind CSS | Utility-first styling with responsive, dark-mode compatibility |
| **Validation** | React Hook Form + Yup | Frontend inline notifications and blur validation |
| **HTTP Client** | Axios | Frontend client connection service instance |
| **Testing** | Jest + Supertest | Integration tests utilizing in-memory database server |
| **Containerization** | Docker | Docker Compose setups for client, API server, and MongoDB |

---

## Folder Structure

```
Helloaaye_CRM/
├── client/                # React + Vite frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── layout/        (Navbar.jsx, Footer.jsx)
│   │   │   ├── sections/      (Hero.jsx, Features.jsx, Pricing.jsx, Testimonials.jsx, FAQ.jsx, ContactForm.jsx)
│   │   │   ├── ui/            (Button.jsx, Input.jsx, Select.jsx, SearchableSelect.jsx, Textarea.jsx, Card.jsx, Modal.jsx, Spinner.jsx, Toast.jsx)
│   │   │   └── admin/         (SearchFilterBar.jsx, InquiryTable.jsx)
│   │   ├── pages/             (LandingPage.jsx, AdminDashboardPage.jsx, NotFoundPage.jsx)
│   │   ├── hooks/             (useDarkMode.js, useDebounce.js)
│   │   ├── context/           (ThemeContext.jsx)
│   │   ├── services/          (api.js — Axios configuration and requests)
│   │   ├── utils/             (constants.js, validationSchemas.js)
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── .env.example
│   ├── .env
│   └── package.json
├── server/                # Express backend
│   ├── src/
│   │   ├── config/            (db.js — database setup)
│   │   ├── models/            (Inquiry.js — Mongoose Model)
│   │   ├── controllers/       (inquiryController.js)
│   │   ├── routes/            (inquiryRoutes.js)
│   │   ├── middlewares/       (errorHandler.js, validateRequest.js, rateLimiter.js)
│   │   ├── utils/             (apiResponse.js, logger.js)
│   │   └── server.js
│   ├── tests/                 (inquiry.test.js — Integration suites)
│   ├── .env.example
│   ├── .env
│   └── package.json
├── docker-compose.yml
├── .gitignore
└── README.md
```

---

## Setup & Running Instructions

### Local Manual Start

Make sure you have a local MongoDB daemon running, or customize your Atlas strings.

#### 1. Setup Backend Server
```bash
cd server
npm install
```
Configure a `.env` file inside `server/` following `.env.example`:
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/saas_crm
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```
Start the development server with live reload:
```bash
npm run dev
```

#### 2. Setup React Client
```bash
cd ../client
npm install
```
Configure a `.env` file inside `client/` following `.env.example`:
```env
VITE_API_BASE_URL=http://localhost:5000/api
```
Launch the Vite React development server:
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

---

### Run with Docker Compose

Build, configure, and boot the database, server API, and compiled client bundle inside containers in one command:
```bash
docker-compose up --build
```
This maps:
- **Client App:** [http://localhost](http://localhost) (Nginx serving port 80)
- **API Server:** [http://localhost:5000](http://localhost:5000)
- **MongoDB:** `localhost:27017`

---

## REST API Documentation

### 1. Submit Product Inquiry
* **Endpoint:** `POST /api/inquiry`
* **Access:** Public (Rate-limited: Max 5 submissions per 15 minutes per IP address)
* **Request Body Schema (JSON):**
```json
{
  "fullName": "Sarah Jenkins",
  "companyName": "CloudScale Inc.",
  "email": "sarah.jenkins@cloudscale.com",
  "phoneNumber": "+1234567890",
  "country": "United States",
  "industry": "Technology",
  "companySize": "51-200",
  "message": "We would like to request an outbound pipeline dashboard demo."
}
```
* **Success Response (201 Created):**
```json
{
  "success": true,
  "message": "Product inquiry submitted successfully",
  "data": {
    "_id": "669527ec31a3194a28f804aa",
    "fullName": "Sarah Jenkins",
    "companyName": "CloudScale Inc.",
    "email": "sarah.jenkins@cloudscale.com",
    "phoneNumber": "+1234567890",
    "country": "United States",
    "industry": "Technology",
    "companySize": "51-200",
    "message": "We would like to request an outbound pipeline dashboard demo.",
    "createdAt": "2026-07-15T10:30:12.500Z",
    "updatedAt": "2026-07-15T10:30:12.500Z"
  }
}
```
* **Common Error Statuses:**
  * `400 Bad Request`: Input validation failed (e.g. invalid email format, phone digits length out of bounds, name contains numbers).
  * `429 Too Many Requests`: Rate limiter triggered.

---

### 2. Retrieve All Inquiries
* **Endpoint:** `GET /api/inquiry`
* **Access:** Public (or Admin Portal)
* **Query Parameters:**
  * `search` (Optional): Query keyword matched against `fullName`, `companyName`, and `email` fields (partial regex matching).
  * `industry` (Optional): Filters inquiries belonging to a specific industry option.
  * `country` (Optional): Filters inquiries submitted from a specific country.
  * `page` (Optional, default `1`): Pagination page.
  * `limit` (Optional, default `10`): Items limit count.
* **Success Response (200 OK):**
```json
{
  "success": true,
  "message": "Inquiries retrieved successfully",
  "data": {
    "inquiries": [
      {
        "_id": "669527ec31a3194a28f804aa",
        "fullName": "Sarah Jenkins",
        "companyName": "CloudScale Inc.",
        "email": "sarah.jenkins@cloudscale.com",
        "phoneNumber": "+1234567890",
        "country": "United States",
        "industry": "Technology",
        "companySize": "51-200",
        "message": "We would like to request an outbound pipeline dashboard demo.",
        "createdAt": "2026-07-15T10:30:12.500Z"
      }
    ],
    "pagination": {
      "totalCount": 1,
      "totalPages": 1,
      "currentPage": 1,
      "limit": 10
    }
  }
}
```

---

### 3. Retrieve Single Inquiry
* **Endpoint:** `GET /api/inquiry/:id`
* **Access:** Public/Admin
* **Success Response (200 OK):**
```json
{
  "success": true,
  "message": "Inquiry retrieved successfully",
  "data": { ... }
}
```
* **Error Statuses:**
  * `400 Bad Request`: Invalid Mongoose ID syntax.
  * `404 Not Found`: Record not present in the database.

---

### 4. Delete Inquiry
* **Endpoint:** `DELETE /api/inquiry/:id`
* **Access:** Admin
* **Success Response (200 OK):**
```json
{
  "success": true,
  "message": "Inquiry deleted successfully",
  "data": null
}
```
* **Error Statuses:**
  * `404 Not Found`: Inquiry record not found.

---

## Testing

The backend includes database-isolated integration tests running via Jest and Supertest.

Run the test suite:
```bash
cd server
npm run test
```

Tests cover:
- Successful submission with proper validations.
- Validation failures for illegal inputs (e.g. number injections on names).
- Pagination parameters and query search keyword filtering.
- Deletions using Mongoose IDs.

---

## Screenshots / Visual UI Layouts

### 1. Landing Page
* Responsive header navigation with light/dark theme switch.
* Modern hero section with custom dashboard CSS panel representation.
* Responsive sections: 6 Features Cards, Monthly/Yearly Pricing Toggle, Testimonial cards, Single-collapse accordion FAQ.
* Inquiry Form with characters counter and customizable searchable dropdown.

### 2. Admin Dashboard Portal
* Full grid table of submissions with custom skeleton loading state.
* Keyword searches and multi-column filter fields.
* Detailed inquiry inspection drawer view.
* Double-confirmation modals for secure data deletions.

---



