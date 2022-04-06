/*
  Warnings:

  - A unique constraint covering the columns `[authUserId]` on the table `students` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "students" ADD COLUMN     "authUserId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "students_authUserId_key" ON "students"("authUserId");
