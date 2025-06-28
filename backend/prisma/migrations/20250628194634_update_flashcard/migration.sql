/*
  Warnings:

  - You are about to drop the column `audio` on the `flashcard` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `flashcard` table. All the data in the column will be lost.
  - You are about to drop the column `video` on the `flashcard` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "flashcard" DROP COLUMN "audio",
DROP COLUMN "image",
DROP COLUMN "video",
ADD COLUMN     "audio_definition" TEXT,
ADD COLUMN     "audio_term" TEXT,
ADD COLUMN     "image_definition" TEXT,
ADD COLUMN     "image_term" TEXT,
ADD COLUMN     "video_definition" TEXT,
ADD COLUMN     "video_term" TEXT;
