/*
  Warnings:

  - You are about to drop the column `setId` on the `UserCardInfo` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserCardInfo" DROP CONSTRAINT "UserCardInfo_setId_fkey";

-- AlterTable
ALTER TABLE "UserCardInfo" DROP COLUMN "setId";
