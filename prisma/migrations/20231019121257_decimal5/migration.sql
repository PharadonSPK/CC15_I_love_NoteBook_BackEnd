/*
  Warnings:

  - You are about to drop the column `newPrice` on the `products` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `products` DROP COLUMN `newPrice`,
    ADD COLUMN `discount` DECIMAL(10, 2) NULL;
