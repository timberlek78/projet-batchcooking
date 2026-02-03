/*
  Warnings:

  - Added the required column `stepes_name` to the `Stepes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `stepes` ADD COLUMN `stepes_name` VARCHAR(191) NOT NULL,
    MODIFY `stepes_id` INTEGER NOT NULL;
