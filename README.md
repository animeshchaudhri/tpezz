# Tpezz 



## Structure

```
.
├── frontend/    # Next.js frontend
└── backend/     # Go backend
```

## Development

### Frontend

To run the frontend development server:

```bash
cd frontend
npm run dev
```

The frontend will be available at `http://localhost:3000` 

### Backend

To run the backend development server:

```bash
cd backend
go run cmd/main.go
```

The backend API will be available at `http://localhost:8080` 

## Prerequisites

- Node.js and npm for the frontend
- Go programming language for the backend

## Installation

1. Clone the repository
2. Install frontend dependencies:
   ```bash
   cd frontend
   npm install
   ```
3. Install backend dependencies:
   ```bash
   cd backend
   go mod tidy
   ```

## Environment Variables

### Backend

Create a `.env` file in the `backend` directory based on the `.env.example` file:

```env
APP_ENV=development
SERVER_ADDRESS=:8080
PORT=8080
CONTEXT_TIMEOUT=8
DB_HOST=your_db_host
DB_PORT=your_db_port
DB_USER=your_db_username
DB_PASS=your_db_password
DB_NAME=your_db_name
ACCESS_TOKEN_EXPIRY_HOUR=2
REFRESH_TOKEN_EXPIRY_HOUR=168
ACCESS_TOKEN_SECRET=your_access_token_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret
RAPID_API_KEY=your_rapid_api_key
RAPID_API_HOST=booking-com.p.rapidapi.com
```

Replace the placeholder values with your actual configuration.

### Frontend

Create a `.env.local` file in the `frontend` directory with the following content:

```env
NEXT_PUBLIC_BACKENDURL=http://localhost:8080
NEXT_PUBLIC_API_KEY=your_api_key
NEXT_PUBLIC_API_GEMINI=your_gemini_api_key
```

Replace `your_api_key` and `your_gemini_api_key` with your actual API keys.

