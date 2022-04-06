/*
  Warnings:

  - You are about to drop the column `coursesSlug` on the `enrollments` table. All the data in the column will be lost.
  - Added the required column `courseId` to the `enrollments` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "enrollments" DROP CONSTRAINT "enrollments_coursesSlug_fkey";

-- AlterTable
ALTER TABLE "enrollments" DROP COLUMN "coursesSlug",
ADD COLUMN     "courseId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "enrollments" ADD CONSTRAINT "enrollments_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "courses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
