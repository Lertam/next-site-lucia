-- CreateTable
CREATE TABLE "NewsComment" (
    "id" TEXT NOT NULL,
    "newsId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "NewsComment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "NewsComment" ADD CONSTRAINT "NewsComment_newsId_fkey" FOREIGN KEY ("newsId") REFERENCES "News"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NewsComment" ADD CONSTRAINT "NewsComment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
