-- AlterTable
ALTER TABLE "Set" ALTER COLUMN "description" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Flashcard" (
    "card_id" SERIAL NOT NULL,
    "set_id" INTEGER NOT NULL,
    "term" TEXT NOT NULL,
    "definition" TEXT NOT NULL,

    CONSTRAINT "Flashcard_pkey" PRIMARY KEY ("card_id")
);

-- AddForeignKey
ALTER TABLE "Flashcard" ADD CONSTRAINT "Flashcard_set_id_fkey" FOREIGN KEY ("set_id") REFERENCES "Set"("set_id") ON DELETE CASCADE ON UPDATE CASCADE;
