/*
  Warnings:

  - A unique constraint covering the columns `[authUserId]` on the table `customers` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "customers" ADD COLUMN     "authUserId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "customers_authUserId_key" ON "customers"("authUserId");
