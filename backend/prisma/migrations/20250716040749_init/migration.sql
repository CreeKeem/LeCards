-- CreateEnum
CREATE TYPE "LearningStatus" AS ENUM ('NOT_LEARNED', 'LEARNING', 'MASTERED');

-- CreateTable
CREATE TABLE "Users" (
    "userId" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "fName" TEXT NOT NULL,
    "lName" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "hashedRt" TEXT,
    "cardStudied" INTEGER NOT NULL DEFAULT 0,
    "correct" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "Sets" (
    "setId" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "color" TEXT NOT NULL DEFAULT '#552583',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastAccess" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "numCards" INTEGER NOT NULL DEFAULT 0,
    "cardsLearned" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Sets_pkey" PRIMARY KEY ("setId")
);

-- CreateTable
CREATE TABLE "Flashcard" (
    "cardId" SERIAL NOT NULL,
    "setId" INTEGER NOT NULL,
    "term" TEXT NOT NULL,
    "definition" TEXT NOT NULL,
    "contentDefinition" TEXT,
    "audioDefinition" TEXT,
    "contentTerm" TEXT,
    "audioTerm" TEXT,

    CONSTRAINT "Flashcard_pkey" PRIMARY KEY ("cardId")
);

-- CreateTable
CREATE TABLE "UserCardInfo" (
    "cardId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "favorite" BOOLEAN NOT NULL DEFAULT false,
    "learningStatus" "LearningStatus" NOT NULL DEFAULT 'NOT_LEARNED',

    CONSTRAINT "UserCardInfo_pkey" PRIMARY KEY ("cardId","userId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- AddForeignKey
ALTER TABLE "Sets" ADD CONSTRAINT "Sets_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Flashcard" ADD CONSTRAINT "Flashcard_setId_fkey" FOREIGN KEY ("setId") REFERENCES "Sets"("setId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCardInfo" ADD CONSTRAINT "UserCardInfo_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "Flashcard"("cardId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCardInfo" ADD CONSTRAINT "UserCardInfo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("userId") ON DELETE CASCADE ON UPDATE CASCADE;
