# Pet Store Monorepo

A full-stack TypeScript application with NestJS backend and Angular frontend, featuring type-safe API integration using OpenAPI.

## Prerequisites

- Node.js >= 18
- pnpm >= 8

## Installation

```bash
# Install dependencies for all packages
pnpm install

# Install backend dependencies
cd backend && pnpm install

# Install frontend dependencies
cd frontend && pnpm install
```

## Development

```bash
# Start both backend and frontend in development mode
pnpm run dev

# Or start them separately:
pnpm run dev:backend  # Backend on http://localhost:3000
pnpm run dev:frontend # Frontend on http://localhost:4200
```

## Generate Types

```bash
# Generate OpenAPI schema from backend and update frontend types
pnpm run generate:types
```

## API Documentation

Once the backend is running, visit:

- API Docs: http://localhost:3000/api/docs
- Raw OpenAPI JSON: http://localhost:3000/api/docs-json

## Project Structure

```
├── backend/          # NestJS API server
│   ├── src/
│   │   ├── pets/     # Pet module (controller, service, DTOs)
│   │   └── main.ts   # Bootstrap file
│   └── package.json
├── frontend/         # Angular application
│   ├── src/
│   │   ├── app/      # Angular components
│   │   └── lib/api/  # Generated API client
│   └── package.json
├── shared/          # Shared OpenAPI schema
└── package.json     # Root workspace config
```

## Features

- ✅ Type-safe API client generation
- ✅ OpenAPI documentation
- ✅ Full CRUD operations for pets
- ✅ Real-time type checking
- ✅ Development mode with hot reload
- ✅ Monorepo structure with pnpm workspaces

## Getting Started

1. **Install dependencies**:

   ```bash
   pnpm install
   ```

2. **Start development servers**:

   ```bash
   pnpm run dev
   ```

3. **Visit the application**:

   - Frontend: http://localhost:4200
   - Backend API: http://localhost:3000
   - API Docs: http://localhost:3000/api/docs

4. **Generate types after backend changes**:
   ```bash
   pnpm run generate:types
   ```

## API Endpoints

### Pets

- `GET /pets` - List all pets (with optional limit query parameter)
- `POST /pets` - Create a new pet
- `GET /pets/{id}` - Get a specific pet
- `PUT /pets/{id}` - Update a pet
- `DELETE /pets/{id}` - Delete a pet

## Development Workflow

1. Make changes to the backend API in `backend/src/`
2. The NestJS server will automatically restart (hot reload)
3. Generate new types with `pnpm run generate:types`
4. Frontend will automatically get type safety for the new API changes
5. Angular will hot reload with the new changes

## Building for Production

```bash
# Build both backend and frontend
pnpm run build

# Build individually
pnpm run build:backend
pnpm run build:frontend
```

## Testing

```bash
# Run all tests
pnpm run test

# Run tests individually
pnpm run test:backend
pnpm run test:frontend
```

## Tech Stack

### Backend

- NestJS
- TypeScript
- Swagger/OpenAPI
- Class Validator
- Class Transformer

### Frontend

- Angular 17
- TypeScript
- openapi-fetch
- openapi-typescript

### Tools

- pnpm (package manager)
- Concurrently (running multiple processes)
- OpenAPI code generation
