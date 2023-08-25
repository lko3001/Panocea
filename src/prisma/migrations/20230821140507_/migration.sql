/*
  Warnings:

  - You are about to drop the `Categories` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Categories" DROP CONSTRAINT "Categories_userId_fkey";

-- AlterTable
ALTER TABLE "RssFeed" ADD COLUMN     "category" TEXT;

-- AlterTable
ALTER TABLE "Todo" ADD COLUMN     "category" TEXT;

-- DropTable
DROP TABLE "Categories";
