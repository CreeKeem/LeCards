# AI-Flashcard-Generator


# For development:

## Run all docker containers
docker compose -f 'docker-compose.dev.yml' up -d --build

## Frontend

To Run Frontend
- docker compose -f 'docker-compose.dev.yml' up -d --build 'frontend-dev'

To Enter Frontend Container
- docker exec -it flashcard-api-dev sh

## Backend

To Run the backend
- docker compose -f 'docker-compose.dev.yml' up -d --build 'api-dev'

To Enter Backend Container
- docker exec -it flashcard-api-dev sh

## Database
docker compose -f 'docker-compose.dev.yml' up -d --build 'postgres'

### Prisma Commands:
### Run a migration
docker exec -it flashcard-api-dev npx prisma migrate dev

### Open Prisma Studio
docker exec -it flashcard-api-dev npx prisma studio
