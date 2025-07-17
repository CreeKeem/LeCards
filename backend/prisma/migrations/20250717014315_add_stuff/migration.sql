/*
  Warnings:

  - Added the required column `setId` to the `UserCardInfo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserCardInfo" ADD COLUMN     "setId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "UserCardInfo" ADD CONSTRAINT "UserCardInfo_setId_fkey" FOREIGN KEY ("setId") REFERENCES "Sets"("setId") ON DELETE CASCADE ON UPDATE CASCADE;
