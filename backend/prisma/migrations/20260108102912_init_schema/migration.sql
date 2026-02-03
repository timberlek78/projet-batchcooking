-- CreateTable
CREATE TABLE `Week` (
    `week_id` INTEGER NOT NULL,
    `week_start` DATETIME(3) NOT NULL,
    `week_end` DATETIME(3) NOT NULL,
    `user_id` INTEGER NOT NULL,
    `recipe_id` INTEGER NOT NULL,

    PRIMARY KEY (`week_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Week` ADD CONSTRAINT `Week_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `Users`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Week` ADD CONSTRAINT `Week_recipe_id_fkey` FOREIGN KEY (`recipe_id`) REFERENCES `Recipes`(`recipe_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
