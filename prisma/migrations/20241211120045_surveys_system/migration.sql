-- CreateTable
CREATE TABLE "Surver" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Surver_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SurveyVariant" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "surveyId" TEXT NOT NULL,

    CONSTRAINT "SurveyVariant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SurveyVote" (
    "userId" TEXT NOT NULL,
    "variantId" TEXT NOT NULL,

    CONSTRAINT "SurveyVote_pkey" PRIMARY KEY ("userId","variantId")
);

-- AddForeignKey
ALTER TABLE "SurveyVariant" ADD CONSTRAINT "SurveyVariant_surveyId_fkey" FOREIGN KEY ("surveyId") REFERENCES "Surver"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SurveyVote" ADD CONSTRAINT "SurveyVote_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SurveyVote" ADD CONSTRAINT "SurveyVote_variantId_fkey" FOREIGN KEY ("variantId") REFERENCES "SurveyVariant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
