-- DropForeignKey
ALTER TABLE "ShopItem" DROP CONSTRAINT "ShopItem_categoryId_fkey";

-- AlterTable
ALTER TABLE "ShopItem" ALTER COLUMN "categoryId" DROP NOT NULL,
ALTER COLUMN "categoryId" DROP DEFAULT;

-- AddForeignKey
ALTER TABLE "ShopItem" ADD CONSTRAINT "ShopItem_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "ShopCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;
