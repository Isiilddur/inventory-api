-- CreateTable
CREATE TABLE "item_sold" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "item_sold_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "item_sold" ADD CONSTRAINT "item_sold_productId_fkey" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item_sold" ADD CONSTRAINT "item_sold_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
