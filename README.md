# Movie Explorer

A full-stack Movie Explorer platform for browsing movies, actors, directors, and genres. Built as a take-home assignment demonstrating Django REST Framework backend filtering and a React frontend.

## Tech Stack

| Layer | Technology |
|-------|------------|
| Backend | Python, Django 6, Django REST Framework |
| API Docs | drf-spectacular (OpenAPI / Swagger) |
| Filtering | django-filter (server-side only) |
| Database | SQLite |
| Frontend | React 19, TypeScript, Vite, Tailwind CSS |
| Testing | Django TestCase + Vitest / Testing Library |
| Containerization | Docker, Docker Compose |

## Features

- Browse movies with title, release year, genres, director, and rating
- Filter movies by **genre**, **director**, **actor**, or **release year** (backend query params)
- Movie detail page with cast, director, genres, rating, and review
- Actor and director profile pages with filmography
- Swagger API documentation
- Seed data with 18 movies, ratings, and reviews
- Edge cases: empty filter results, 404 for invalid IDs, movies without reviews

## Quick Start (Docker)

```bash
git clone https://github.com/shreyashnyai/movie-explorer.git
cd movie-explorer
docker compose up --build
```

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:8000/api/
- **Swagger UI:** http://localhost:8000/api/schema/swagger-ui/

## Local Development

### Backend

```bash
cd backend
python -m venv .venv
source .venv/bin/activate   # Windows: .venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py seed_movies
python manage.py runserver
```

API runs at http://localhost:8000

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at http://localhost:5173 (proxied to backend at `http://localhost:8000` via `VITE_API_URL`).

## Running Tests

### Backend

```bash
cd backend
source .venv/bin/activate
python manage.py test
```

### Frontend

```bash
cd frontend
npm run lint
npm run test
npm run build    # lint + test + typecheck + production build
```

## API Endpoints

| Method | Endpoint | Filters |
|--------|----------|---------|
| GET | `/api/movies/` | `genre`, `director`, `actor`, `release_year` |
| GET | `/api/movies/{id}/` | — |
| GET | `/api/actors/` | `movie`, `genre` |
| GET | `/api/actors/{id}/` | — |
| GET | `/api/directors/` | — |
| GET | `/api/directors/{id}/` | — |
| GET | `/api/genres/` | — |

**Example:** `GET /api/movies/?genre=Action&director=1&release_year=2010`

## Edge Cases

| Scenario | Behavior |
|----------|----------|
| Invalid movie/actor/director ID | HTTP 404 |
| Filter with no matches (e.g. `genre=Documentary`) | HTTP 200, empty `results` array |
| Invalid filter ID (e.g. `director=99999`) | HTTP 200, empty list (not 500) |
| Movie without review | Review field omitted or empty on detail page |
| Backend unavailable | Frontend shows error banner |

## Project Structure

```
MOVIE_PROJECTS/
├── backend/          # Django + DRF API
├── frontend/         # React + Vite SPA
├── docker-compose.yml
└── README.md
```

## Seed Data

Run `python manage.py seed_movies` to populate:
- 18 movies with ratings and reviews
- 8 actors, 5 directors, 7 genres
- "Documentary" genre intentionally has zero movies (for empty-filter testing)

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `VITE_API_URL` | `http://localhost:8000` | Backend URL for frontend |
| `DJANGO_DEBUG` | `True` | Django debug mode |
| `CORS_ALLOWED_ORIGINS` | `http://localhost:5173,...` | Allowed frontend origins |
