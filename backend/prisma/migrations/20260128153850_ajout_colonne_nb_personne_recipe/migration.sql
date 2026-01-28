/*
  Warnings:

  - Added the required column `recipe_nb_personne` to the `Recipes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `recipes` ADD COLUMN `recipe_nb_personne` INTEGER NOT NULL;
