-- CreateTable
CREATE TABLE "RetouchService" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "weight" INTEGER NOT NULL DEFAULT 0,
    "description" TEXT NOT NULL DEFAULT '',
    "image" TEXT NOT NULL,

    CONSTRAINT "RetouchService_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RetouchPrice" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "weight" INTEGER NOT NULL DEFAULT 0,
    "express" BOOLEAN NOT NULL DEFAULT false,
    "serviceId" TEXT NOT NULL,

    CONSTRAINT "RetouchPrice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RetouchVariant" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "weight" INTEGER NOT NULL DEFAULT 0,
    "price" INTEGER NOT NULL,
    "image" TEXT NOT NULL,
    "withText" BOOLEAN NOT NULL DEFAULT false,
    "withFiles" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "RetouchVariant_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "RetouchPrice" ADD CONSTRAINT "RetouchPrice_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "RetouchService"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
