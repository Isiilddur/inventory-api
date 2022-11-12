/*
  Warnings:

  - You are about to drop the column `pieces` on the `product` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `product` table. All the data in the column will be lost.
  - You are about to drop the column `unit` on the `product` table. All the data in the column will be lost.
  - You are about to drop the column `weight` on the `product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "product" DROP COLUMN "pieces",
DROP COLUMN "price",
DROP COLUMN "unit",
DROP COLUMN "weight";

-- DropEnum
DROP TYPE "unit";
