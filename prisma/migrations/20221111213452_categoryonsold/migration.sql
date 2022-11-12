-- AlterTable
ALTER TABLE "products_on_orders" ADD COLUMN     "categoryId" TEXT;

-- AddForeignKey
ALTER TABLE "products_on_orders" ADD CONSTRAINT "products_on_orders_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE SET NULL ON UPDATE CASCADE;
