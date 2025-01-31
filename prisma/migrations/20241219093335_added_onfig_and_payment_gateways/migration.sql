-- CreateEnum
CREATE TYPE "PaymentGateways" AS ENUM ('ROBOKASSA', 'WALLET_ONE', 'UNITPAY', 'YOOMONEY');

-- CreateTable
CREATE TABLE "FastWay" (
    "id" TEXT NOT NULL,
    "sum" INTEGER NOT NULL,
    "way" "PaymentGateways" NOT NULL,
    "enabled" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "FastWay_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Config" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "value" JSONB NOT NULL,

    CONSTRAINT "Config_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Config_key_key" ON "Config"("key");
