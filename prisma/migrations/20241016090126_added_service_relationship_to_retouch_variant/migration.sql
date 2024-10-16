/*
  Warnings:

  - Added the required column `serviceId` to the `RetouchVariant` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "RetouchVariant" ADD COLUMN     "serviceId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "RetouchVariant" ADD CONSTRAINT "RetouchVariant_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "RetouchService"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
