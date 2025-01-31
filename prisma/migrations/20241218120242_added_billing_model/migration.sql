-- CreateEnum
CREATE TYPE "BillingStatus" AS ENUM ('WAIT', 'READY', 'DELETED');

-- CreateTable
CREATE TABLE "Billing" (
    "id" TEXT NOT NULL,
    "sum" INTEGER NOT NULL,
    "comment" TEXT NOT NULL DEFAULT '',
    "userId" TEXT NOT NULL,
    "shopItemId" INTEGER,

    CONSTRAINT "Billing_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Billing" ADD CONSTRAINT "Billing_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Billing" ADD CONSTRAINT "Billing_shopItemId_fkey" FOREIGN KEY ("shopItemId") REFERENCES "ShopItem"("id") ON DELETE SET NULL ON UPDATE CASCADE;
