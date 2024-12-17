-- AlterTable
ALTER TABLE "News" ADD COLUMN     "surveyId" TEXT;

-- AddForeignKey
ALTER TABLE "News" ADD CONSTRAINT "News_surveyId_fkey" FOREIGN KEY ("surveyId") REFERENCES "Survey"("id") ON DELETE SET NULL ON UPDATE CASCADE;
