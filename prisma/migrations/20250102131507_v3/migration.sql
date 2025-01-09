/*
  Warnings:

  - You are about to drop the column `itemName` on the `Items` table. All the data in the column will be lost.
  - You are about to drop the column `itemPrice` on the `Items` table. All the data in the column will be lost.
  - You are about to drop the column `itemQuantity` on the `Items` table. All the data in the column will be lost.
  - The primary key for the `Sells` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `price` to the `Items` table without a default value. This is not possible if the table is not empty.
  - Added the required column `product` to the `Items` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantity` to the `Items` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Items" DROP CONSTRAINT "Items_sellID_fkey";

-- AlterTable
ALTER TABLE "Items" DROP COLUMN "itemName",
DROP COLUMN "itemPrice",
DROP COLUMN "itemQuantity",
ADD COLUMN     "price" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "product" TEXT NOT NULL,
ADD COLUMN     "quantity" INTEGER NOT NULL,
ALTER COLUMN "sellID" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Sells" DROP CONSTRAINT "Sells_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Sells_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Sells_id_seq";

-- AddForeignKey
ALTER TABLE "Items" ADD CONSTRAINT "Items_sellID_fkey" FOREIGN KEY ("sellID") REFERENCES "Sells"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
