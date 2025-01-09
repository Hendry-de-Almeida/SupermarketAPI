/*
  Warnings:

  - Added the required column `sellerName` to the `Sells` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Sells" ADD COLUMN     "sellerName" TEXT NOT NULL;
