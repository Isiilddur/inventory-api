-- AlterTable
ALTER TABLE "order" ADD COLUMN     "storeId" TEXT,
ALTER COLUMN "debt" DROP DEFAULT;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "store"("id") ON DELETE SET NULL ON UPDATE CASCADE;
