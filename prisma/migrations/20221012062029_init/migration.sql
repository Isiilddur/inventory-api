/*
  Warnings:

  - You are about to drop the `productsOnOrders` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "productsOnOrders" DROP CONSTRAINT "productsOnOrders_orderId_fkey";

-- DropForeignKey
ALTER TABLE "productsOnOrders" DROP CONSTRAINT "productsOnOrders_productId_fkey";

-- DropTable
DROP TABLE "productsOnOrders";

-- CreateTable
CREATE TABLE "products_on_orders" (
    "productId" INTEGER NOT NULL,
    "orderId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "products_on_orders_pkey" PRIMARY KEY ("productId","orderId")
);

-- AddForeignKey
ALTER TABLE "products_on_orders" ADD CONSTRAINT "products_on_orders_productId_fkey" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products_on_orders" ADD CONSTRAINT "products_on_orders_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
