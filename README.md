# AnimeVerse

AnimeVerse is a modern, premium full-stack web application designed for exploring and discovering top anime. The application features a dynamic and animated user interface built with Next.js and styled with TailwindCSS and Framer Motion, powered by a headless Strapi CMS backend.

## Project Structure

This repository is organized as a monorepo:

- **`frontend/`**: The web application built using Next.js 14 (App Router), TypeScript, Framer Motion, and TailwindCSS.
- **`backend/`**: The headless Content Management System (CMS) powered by Strapi 5 (TypeScript, Better-SQLite3).

---

## Getting Started

### Prerequisites

- Node.js (version 18.x.x, 20.x.x, or 22.x.x)
- npm or yarn

### 1. Backend Setup (Strapi)

Navigate to the backend directory:
```bash
cd backend
```

Create a `.env` file (you can copy `.env.example` as a template):
```bash
cp .env.example .env
```

Install dependencies:
```bash
npm install
```

Start the Strapi development server:
```bash
npm run dev
```
The Strapi Admin panel will be available at [http://localhost:1337/admin](http://localhost:1337/admin).

### 2. Frontend Setup (Next.js)

Navigate to the frontend directory:
```bash
cd ../frontend
```

Install dependencies:
```bash
npm install
```

Start the Next.js development server:
```bash
npm run dev
```
The web application will be available at [http://localhost:3000](http://localhost:3000).

---

## Features

- **Dynamic Homepage**: Visually stunning slider, explore collections, and browse all anime listings.
- **Responsive Layout**: Seamless layout experience across desktop, tablet, and mobile screens.
- **Micro-Animations**: Fluid page transitions and interactive hover elements powered by Framer Motion.
- **Modular Sections**: Dynamically managed pages (CTA, Forms, Anime collections, Hero sections) editable directly in Strapi.
- **Performant Data Retrieval**: Tailored API layers calling Strapi content types with deep population plugins.

---

## Author

- **Harsh Mishra**
