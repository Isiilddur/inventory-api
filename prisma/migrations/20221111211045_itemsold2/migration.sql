/*
  Warnings:

  - You are about to drop the column `categoryId` on the `item_sold` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "item_sold" DROP CONSTRAINT "item_sold_categoryId_fkey";

-- AlterTable
ALTER TABLE "item_sold" DROP COLUMN "categoryId";
