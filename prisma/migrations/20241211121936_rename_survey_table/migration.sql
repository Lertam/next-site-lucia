/*
  Warnings:

  - You are about to drop the `Surver` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "SurveyVariant" DROP CONSTRAINT "SurveyVariant_surveyId_fkey";

-- DropTable
DROP TABLE "Surver";

-- CreateTable
CREATE TABLE "Survey" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Survey_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SurveyVariant" ADD CONSTRAINT "SurveyVariant_surveyId_fkey" FOREIGN KEY ("surveyId") REFERENCES "Survey"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
