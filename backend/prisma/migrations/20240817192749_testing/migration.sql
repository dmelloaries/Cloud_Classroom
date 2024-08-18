/*
  Warnings:

  - You are about to drop the column `name` on the `Classroom` table. All the data in the column will be lost.
  - Added the required column `class_name` to the `Classroom` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Classroom" DROP COLUMN "name",
ADD COLUMN     "class_name" TEXT NOT NULL;
