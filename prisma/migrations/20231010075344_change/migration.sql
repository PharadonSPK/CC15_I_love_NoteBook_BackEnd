/*
  Warnings:

  - You are about to drop the column `fistName` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `phonenumber` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[phoneNumber]` on the table `Users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `firstName` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Users_phonenumber_key` ON `users`;

-- AlterTable
ALTER TABLE `users` DROP COLUMN `fistName`,
    DROP COLUMN `phonenumber`,
    ADD COLUMN `firstName` VARCHAR(191) NOT NULL,
    ADD COLUMN `phoneNumber` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Users_phoneNumber_key` ON `Users`(`phoneNumber`);
