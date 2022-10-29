/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `store` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "store_name_key" ON "store"("name");
