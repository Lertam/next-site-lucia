/*
  Warnings:

  - You are about to drop the column `enabled` on the `FastWay` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "FastWay" DROP COLUMN "enabled",
ADD COLUMN     "weight" INTEGER NOT NULL DEFAULT 0;
