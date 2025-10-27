# Notes App

## Overview

Notes App

## Overview

This repository contains a small Notes application with categories/tags. It has a Java Spring Boot backend and a Vite + React + TypeScript frontend. The project is set up to run via Docker (recommended) or locally using the native runtimes.

## Deployed version

A deployed version of the application is available at: http://34.58.16.29:5173/

Credentials for the demo instance:

- Username: admin
- Password: admin

## Repository layout

- `backend/` — Spring Boot application (controllers, services, repositories).
- `frontend/` — Vite + React + TypeScript (Redux Toolkit, PrimeReact, Tailwind CSS).
- `run.sh` — convenience script that brings the whole stack up with Docker Compose.
- `docker-compose.yml` — Compose file (Postgres, backend, frontend).

## Concrete runtimes & tools

- Java: Eclipse Temurin / OpenJDK 21 (used in Dockerfiles and `pom.xml` property `java.version` = 21)
- Maven: 3.9.6 (used in `backend/Dockerfile` base image `maven:3.9.6-eclipse-temurin-21`)
- Node: 22 (Dockerfile uses `node:22-alpine`)
- npm: the Node 22 image includes npm 10.x (use npm 10+ locally)
- PostgreSQL: 17 (docker image `postgres:17` used in `docker-compose.yml`)

Frontend package versions

- React: ^19.1.1
- Vite: ^7.1.7
- TypeScript: ~5.9.3
- @reduxjs/toolkit: ^2.9.2
- primereact / primeicons / primeflex: primereact ^10.9.7, primeicons ^7.0.0, primeflex ^4.0.0

Backend (Maven / Spring)

- Spring Boot parent: 3.5.7 (declared in `pom.xml`)
- Java source/target: 21 (pom property `java.version` = 21)
- Dependencies: spring-boot-starter-web, spring-boot-starter-data-jpa, postgresql (runtime), lombok (optional), flyway (postgresql variant)

## Quick local / docker run instructions

Recommended: run the whole stack with Docker (ensures correct runtimes and versions):

1. Requirements on host for docker mode

- Docker Engine (20.10+), Docker Compose (v2 or compose CLI) installed.

2. Start using the convenience script (project root)

```bash
./run.sh
```

This script runs `docker-compose up -d --build` and prints service URLs:

- Frontend: http://localhost:5173
- Backend: http://localhost:8080
- Postgres (host port): 5433 -> container 5432

## Running parts individually (development)

If you prefer to run services locally (not in Docker), use these instructions.

Backend (native)

- JDK: 21 (Eclipse Temurin or other OpenJDK 21 distribution)
- Maven: 3.8+ (3.9.6 recommended to match Dockerfile)

From `backend/`:

```bash
mvn -v   # verify Maven (recommended 3.9.6)
java -version  # verify JDK 21
mvn spring-boot:run
```

Backend local config notes:

- The Docker Compose file sets `SPRING_PROFILES_ACTIVE: docker` for the container. To run locally against the DB started by compose, set `SPRING_PROFILES_ACTIVE=docker` or adjust `application-*.properties` as needed.

Frontend (native)

- Node: 22 (tested with Node 22.x)
- npm: 10.x

From `frontend/`:

```bash
node -v   # expect v22.x
npm -v    # expect 10.x
npm install
npm run dev
```

This starts the Vite dev server on http://localhost:5173 by default.

## Database

The project expects PostgreSQL. Docker Compose binds container port 5432 to host 5433. Connection params used by the app (from `docker-compose.yml`):

- POSTGRES_USER: notes
- POSTGRES_PASSWORD: notes_pass
- POSTGRES_DB: notesdb

## Notes about migration

Flyway migrations are under `backend/src/main/resources/db/migration` and will run automatically when the backend starts (for docker/local profiles that enable Flyway).

## Useful commands

- Build backend jar locally:

```bash
cd backend
mvn clean package -DskipTests

# Run produced jar
java -jar target/*.jar
```

- Build and preview frontend production build (locally):

```bash
cd frontend
npm run build
npm run preview
```
