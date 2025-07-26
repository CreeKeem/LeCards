/*
  Warnings:

  - You are about to drop the column `cardsLearned` on the `Sets` table. All the data in the column will be lost.
  - You are about to drop the column `color` on the `Sets` table. All the data in the column will be lost.
  - You are about to drop the column `lastAccess` on the `Sets` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Sets" DROP COLUMN "cardsLearned",
DROP COLUMN "color",
DROP COLUMN "lastAccess";

-- AlterTable
ALTER TABLE "UserCardInfo" ADD COLUMN     "lastReviewed" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "UserSetInfo" (
    "setId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "color" TEXT NOT NULL DEFAULT '#FDB927',
    "lastAccess" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "cardsLearned" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "UserSetInfo_pkey" PRIMARY KEY ("setId","userId")
);

-- AddForeignKey
ALTER TABLE "UserSetInfo" ADD CONSTRAINT "UserSetInfo_setId_fkey" FOREIGN KEY ("setId") REFERENCES "Sets"("setId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSetInfo" ADD CONSTRAINT "UserSetInfo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("userId") ON DELETE CASCADE ON UPDATE CASCADE;
