-- AlterTable
ALTER TABLE "ShopItem" ADD COLUMN     "categoryId" TEXT NOT NULL DEFAULT '';

-- CreateTable
CREATE TABLE "ShopCategory" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "ShopCategory_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ShopItem" ADD CONSTRAINT "ShopItem_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "ShopCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
