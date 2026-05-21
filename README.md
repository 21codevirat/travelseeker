# Travel Seekers

Full-stack travel planner with a Flask backend, React frontend, and PostgreSQL schema for Indian destinations.

## Features

- Multi-page responsive React experience with separate pages for home, destinations, planner, about, contact, and disclaimer.
- Flask API with CORS enabled.
- Destination search, category filter, region filter, budget filter, rating filter, and sorting.
- Destination detail modal powered by a single-destination API route.
- Dedicated image and video media packs for every destination.
- Local trip planner that adds/removes stops and calculates estimated days and budget.
- Weather-aware AI planner with simulated streaming responses, browser voice prompts, day-by-day itinerary cards, Google Maps route export, and hotel/flight price prediction signals.
- PostgreSQL schema with destinations, destination highlights, and destination media.

## Project Structure

```text
travel-tourism-app/
  backend/
    app.py
    requirements.txt
  database/
    schema.sql
  frontend/
    index.html
    package.json
    vite.config.js
    public/
      travel-seekers-logo.svg
    src/
      App.jsx
      constants.js
      main.jsx
      styles.css
      components/
      pages/
      utils/
```

## 1. Run the Flask Backend

```bash
cd backend
python -m venv venv
venv\Scripts\Activate.ps1
pip install -r requirements.txt
python app.py
```

The backend runs at:

```text
http://127.0.0.1:5000
```

Useful API endpoints:

```text
GET /api/destinations
GET /api/destinations?q=goa&category=Beach&sort=rating
GET /api/destinations/1
GET /api/filters
```

## 2. Run the React Frontend

Open a second terminal:

```bash
cd frontend
npm install
npm run dev
```

The frontend runs at the URL printed by Vite, usually:

```text
http://localhost:5173
```

Frontend pages:

```text
/
/destinations
/gallery
/planner
/about
/contact
/disclaimer
```

The gallery and home hero use external demo media URLs from `frontend/src/constants.js`.
Replace them with your own licensed destination images and short promotional videos when available.

## Contact Details

Customer-facing email, phone, WhatsApp, address, and social links are stored in:

```text
frontend/src/constants.js
```

Update the `CONTACT_INFO` object with your verified business details before launching publicly.

## 3. Create the PostgreSQL Database

Create a database:

```bash
createdb travel_tourism
```

Run the schema and sample inserts:

```bash
psql -U postgres -d travel_tourism -f database/schema.sql
```

The schema creates:

- `destinations`
- `destination_highlights`
- `destination_media`

Sample destinations include Goa, Manali, Jaipur, Kerala Backwaters, Varanasi, and Munnar.

## Notes

- The Flask API currently returns sample destination data from `app.py` so the project works immediately.
- The PostgreSQL schema is ready for connecting the backend to a real database later.
- CORS is enabled so the React app can fetch from the Flask API during local development.

## Deploy Live

Deploy the backend first, then set the frontend API URL.

Backend:

```bash
cd backend
pip install -r requirements.txt
gunicorn app:app
```

Frontend:

```bash
cd frontend
npm install
npm run build
```

Set this environment variable in your frontend host:

```text
VITE_API_BASE_URL=https://your-backend-domain.example.com/api
```

The frontend folder includes `netlify.toml` and `vercel.json` for SPA routing. The backend folder includes `Procfile` and `render.yaml` for Python web hosting.
