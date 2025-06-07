/*
  Warnings:

  - Added the required column `audio` to the `flashcard` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `flashcard` table without a default value. This is not possible if the table is not empty.
  - Added the required column `video` to the `flashcard` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "flashcard" ADD COLUMN     "audio" TEXT NOT NULL,
ADD COLUMN     "image" TEXT NOT NULL,
ADD COLUMN     "video" TEXT NOT NULL;
