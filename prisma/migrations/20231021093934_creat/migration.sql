/*
  Warnings:

  - You are about to drop the column `productId` on the `cart` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `cart` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `cart` DROP COLUMN `productId`,
    DROP COLUMN `userId`;
