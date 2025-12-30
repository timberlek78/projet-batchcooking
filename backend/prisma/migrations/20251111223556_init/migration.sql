-- CreateTable
CREATE TABLE `Users` (
    `user_id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(255) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Users_username_key`(`username`),
    UNIQUE INDEX `Users_email_key`(`email`),
    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Recipes` (
    `recipe_id` INTEGER NOT NULL AUTO_INCREMENT,
    `recipe_name` VARCHAR(191) NOT NULL,
    `recipe_difficult` INTEGER NOT NULL,
    `recipe_like_number` INTEGER NOT NULL,
    `recipe_preparation_time` INTEGER NOT NULL,
    `recipe_cooking_time` INTEGER NOT NULL,

    PRIMARY KEY (`recipe_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Stape` (
    `stape_id` INTEGER NOT NULL AUTO_INCREMENT,
    `stape_number` INTEGER NOT NULL,
    `stape_desc` LONGTEXT NOT NULL,
    `recipe_id` INTEGER NOT NULL,

    PRIMARY KEY (`stape_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Ingredient` (
    `ingredient_id` INTEGER NOT NULL AUTO_INCREMENT,
    `ingredient_name` VARCHAR(255) NOT NULL,
    `ingredient_unit` VARCHAR(5) NOT NULL,

    PRIMARY KEY (`ingredient_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RecipesIngredient` (
    `recipe_id` INTEGER NOT NULL,
    `ingredient_id` INTEGER NOT NULL,
    `quantity` INTEGER NOT NULL,

    PRIMARY KEY (`recipe_id`, `ingredient_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Stape` ADD CONSTRAINT `Stape_recipe_id_fkey` FOREIGN KEY (`recipe_id`) REFERENCES `Recipes`(`recipe_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RecipesIngredient` ADD CONSTRAINT `RecipesIngredient_ingredient_id_fkey` FOREIGN KEY (`ingredient_id`) REFERENCES `Ingredient`(`ingredient_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RecipesIngredient` ADD CONSTRAINT `RecipesIngredient_recipe_id_fkey` FOREIGN KEY (`recipe_id`) REFERENCES `Recipes`(`recipe_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
