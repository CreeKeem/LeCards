# AI-Flashcard-Generator


# For development:

## Run all docker containers
docker compose -f 'docker-compose.dev.yml' up -d --build

## Frontend

To Run Frontend
- docker compose -f 'docker-compose.dev.yml' up -d --build 'frontend-dev'

To Enter Frontend Container
- docker exec -it flashcard-frontend-dev sh

To Restart Frontend Container
- docker-compose restart frontend-dev

## Backend

To Run the backend
- docker compose -f 'docker-compose.dev.yml' up -d --build 'api-dev'

To Enter Backend Container
- docker exec -it flashcard-api-dev sh

To Restart Backend Container
- docker-compose restart backend-dev

## Database

To Run the DB
- docker compose -f 'docker-compose.dev.yml' up -d --build 'postgres'

To Enter Backend Container
- docker exec -it flashcard-db-dev sh

To Restart DB Container
- docker-compose restart postgres

### Prisma Commands:
#### Run a migration
docker exec -it flashcard-api-dev npx prisma migrate dev

#### Run Seed Job
docker exec -it flashcard-api-dev npx prisma db seed    

#### Open Prisma Studio
docker exec -it flashcard-api-dev npx prisma studio

## Stop Services
docker-compose -f docker-compose.dev.yml down