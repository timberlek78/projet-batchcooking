-- CreateTable
CREATE TABLE `UserLike` (
    `user_id` INTEGER NOT NULL,
    `recipe_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`user_id`, `recipe_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
