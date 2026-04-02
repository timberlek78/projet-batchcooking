-- CreateTable
CREATE TABLE `_RecipesToUsers` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_RecipesToUsers_AB_unique`(`A`, `B`),
    INDEX `_RecipesToUsers_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_RecipesToUsers` ADD CONSTRAINT `_RecipesToUsers_A_fkey` FOREIGN KEY (`A`) REFERENCES `Recipes`(`recipe_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_RecipesToUsers` ADD CONSTRAINT `_RecipesToUsers_B_fkey` FOREIGN KEY (`B`) REFERENCES `Users`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;
