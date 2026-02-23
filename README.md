# SoftPoint Challenge - Fullstack Property Management Platform

A fullstack Property Management Platform built with **Laravel** and **React**.

This platform allows users to securely authenticate, manage properties, view aggregated dashboard data, and interact with a RESTful API.

---

## Features

- Authentication
- Property Management
- Dashboard

---

## Tech Stack

### Backend
- Laravel 12
- MySQL
- Laravel Sanctum
- Eloquent ORM
- Redis

### Frontend
- React 19
- Axios
- React Router
- Zustand

### Requirements

- PHP 8.2+
- Composer
- MySQL (or compatible database)
- Node.js (optional, only if using frontend assets)

---

## Installation

### Clone the repository

```bash
git clone https://github.com/DiiegoAG/softpoint-challenge.git
cd softpoint-challenge
```

### Backend

```bash
cd backend
composer install
php artisan key:generate
```

Copy .env.example to .env
```bash
cp .env.example .env
```

Configure database and sactum variables

```bash
SANCTUM_STATEFUL_DOMAINS=localhost:5173 # if you are running frontend on other port, change it here
SESSION_DOMAIN=localhost

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=softpoint
DB_USERNAME=root
DB_PASSWORD=
```

Run migrations and seeders

```bash
php artisan migrate
php artisan db:seed
```

Run tests and job queue

```bash
php artisan test
php artisan queue:work
```

Run server if you want to use artisan server or other tools

```bash
php artisan serve
```

### Frontend

From the root directory

```bash
cd frontend
npm install
```

Configure .env file

```bash
VITE_API_URL=http://localhost:8000/api # if you are running backend on other port, change it here, don't forget the /api at the end
```

Run dev server

```bash
npm run dev
```

Or if you want to build for production

```bash
npm run build
```

