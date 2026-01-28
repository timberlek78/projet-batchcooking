/*
  Warnings:

  - You are about to drop the `stape` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `stape` DROP FOREIGN KEY `Stape_recipe_id_fkey`;

-- DropTable
DROP TABLE `stape`;

-- CreateTable
CREATE TABLE `Stepes` (
    `stepes_id` INTEGER NOT NULL AUTO_INCREMENT,
    `stepes_number` INTEGER NOT NULL,
    `stepes_desc` LONGTEXT NOT NULL,
    `recipe_id` INTEGER NOT NULL,

    PRIMARY KEY (`stepes_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Stepes` ADD CONSTRAINT `Stepes_recipe_id_fkey` FOREIGN KEY (`recipe_id`) REFERENCES `Recipes`(`recipe_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
