/*
  Warnings:

  - You are about to drop the column `OrdersId` on the `orderitems` table. All the data in the column will be lost.
  - You are about to drop the column `ProductsId` on the `orderitems` table. All the data in the column will be lost.
  - You are about to alter the column `quantity` on the `orderitems` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `totalprice` on the `orderitems` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to drop the column `usersId` on the `orders` table. All the data in the column will be lost.
  - You are about to alter the column `status` on the `orders` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(0))`.
  - You are about to alter the column `date` on the `orders` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `DateTime(3)`.
  - You are about to drop the column `BandId` on the `products` table. All the data in the column will be lost.
  - You are about to alter the column `price` on the `products` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to drop the column `usersId` on the `useraddress` table. All the data in the column will be lost.
  - You are about to drop the `band` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `ordersId` to the `orderItems` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productsId` to the `orderItems` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `brandId` to the `Products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `userAddress` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `orderitems` DROP FOREIGN KEY `Orderitems_OrdersId_fkey`;

-- DropForeignKey
ALTER TABLE `orderitems` DROP FOREIGN KEY `Orderitems_ProductsId_fkey`;

-- DropForeignKey
ALTER TABLE `orders` DROP FOREIGN KEY `Orders_usersId_fkey`;

-- DropForeignKey
ALTER TABLE `products` DROP FOREIGN KEY `Products_BandId_fkey`;

-- DropForeignKey
ALTER TABLE `useraddress` DROP FOREIGN KEY `UserAddress_usersId_fkey`;

-- AlterTable
ALTER TABLE `orderitems` DROP COLUMN `OrdersId`,
    DROP COLUMN `ProductsId`,
    ADD COLUMN `ordersId` INTEGER NOT NULL,
    ADD COLUMN `productsId` INTEGER NOT NULL,
    MODIFY `quantity` INTEGER NOT NULL,
    MODIFY `totalprice` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `orders` DROP COLUMN `usersId`,
    ADD COLUMN `userId` INTEGER NOT NULL,
    MODIFY `status` ENUM('ACCEPTED', 'PENDING') NOT NULL,
    MODIFY `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `products` DROP COLUMN `BandId`,
    ADD COLUMN `brandId` INTEGER NOT NULL,
    MODIFY `price` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `useraddress` DROP COLUMN `usersId`,
    ADD COLUMN `userId` INTEGER NOT NULL;

-- DropTable
DROP TABLE `band`;

-- CreateTable
CREATE TABLE `Brand` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `bandname` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `userAddress` ADD CONSTRAINT `userAddress_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Orders` ADD CONSTRAINT `Orders_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `orderItems` ADD CONSTRAINT `orderItems_ordersId_fkey` FOREIGN KEY (`ordersId`) REFERENCES `Orders`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `orderItems` ADD CONSTRAINT `orderItems_productsId_fkey` FOREIGN KEY (`productsId`) REFERENCES `Products`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Products` ADD CONSTRAINT `Products_brandId_fkey` FOREIGN KEY (`brandId`) REFERENCES `Brand`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
