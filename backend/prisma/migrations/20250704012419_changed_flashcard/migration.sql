/*
  Warnings:

  - You are about to drop the column `image_definition` on the `flashcard` table. All the data in the column will be lost.
  - You are about to drop the column `image_term` on the `flashcard` table. All the data in the column will be lost.
  - You are about to drop the column `video_definition` on the `flashcard` table. All the data in the column will be lost.
  - You are about to drop the column `video_term` on the `flashcard` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "flashcard" DROP COLUMN "image_definition",
DROP COLUMN "image_term",
DROP COLUMN "video_definition",
DROP COLUMN "video_term",
ADD COLUMN     "content_definition" TEXT,
ADD COLUMN     "content_term" TEXT;
