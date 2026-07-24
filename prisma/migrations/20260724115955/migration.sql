/*
  Warnings:

  - You are about to drop the column `durationminutes` on the `event_types` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[hostId,slug]` on the table `event_types` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `durationMinutes` to the `event_types` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `event_types` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "event_types" DROP COLUMN "durationminutes",
ADD COLUMN     "durationMinutes" INTEGER NOT NULL,
ADD COLUMN     "slug" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "event_types_hostId_slug_key" ON "event_types"("hostId", "slug");
