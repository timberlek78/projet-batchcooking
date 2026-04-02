/*
  Warnings:

  - You are about to drop the `_recipestousers` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `recipe_user_id` to the `Recipes` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `_recipestousers` DROP FOREIGN KEY `_RecipesToUsers_A_fkey`;

-- DropForeignKey
ALTER TABLE `_recipestousers` DROP FOREIGN KEY `_RecipesToUsers_B_fkey`;

-- AlterTable
ALTER TABLE `recipes` ADD COLUMN `recipe_user_id` INTEGER NOT NULL;

-- DropTable
DROP TABLE `_recipestousers`;

-- AddForeignKey
ALTER TABLE `Recipes` ADD CONSTRAINT `Recipes_recipe_user_id_fkey` FOREIGN KEY (`recipe_user_id`) REFERENCES `Users`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
