/*
  Warnings:

  - The primary key for the `stepes` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE `stepes` DROP PRIMARY KEY,
    MODIFY `stepes_id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`stepes_id`);
