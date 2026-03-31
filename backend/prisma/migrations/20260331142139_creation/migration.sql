-- CreateTable
CREATE TABLE `Token` (
    `token_id` INTEGER NOT NULL AUTO_INCREMENT,
    `token_value` VARCHAR(255) NOT NULL,
    `token_expire_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Token_token_value_key`(`token_value`),
    PRIMARY KEY (`token_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
