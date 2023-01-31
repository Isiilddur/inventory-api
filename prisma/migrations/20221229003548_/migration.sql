/*
  Warnings:

  - You are about to drop the column `debt` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `payed` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `orderId` on the `payments` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "payments" DROP CONSTRAINT "payments_orderId_fkey";

-- AlterTable
ALTER TABLE "client" ADD COLUMN     "debt" DECIMAL(65,30) NOT NULL DEFAULT 0.0,
ADD COLUMN     "status" "status" NOT NULL DEFAULT 'ON_TIME';

-- AlterTable
ALTER TABLE "order" DROP COLUMN "debt",
DROP COLUMN "payed",
DROP COLUMN "status";

-- AlterTable
ALTER TABLE "payments" DROP COLUMN "orderId";
