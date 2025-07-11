/*
  Warnings:

  - You are about to drop the column `lastAccess` on the `set` table. All the data in the column will be lost.
  - You are about to drop the column `cardStudied` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "set" DROP COLUMN "lastAccess",
ADD COLUMN     "last_access" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "num_cards" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "cardStudied",
DROP COLUMN "createdAt",
ADD COLUMN     "card_studied" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
