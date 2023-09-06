/*
  Warnings:

  - Added the required column `updatedAt` to the `Finance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `RssFeed` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Todo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Finance" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "RssFeed" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Todo" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
