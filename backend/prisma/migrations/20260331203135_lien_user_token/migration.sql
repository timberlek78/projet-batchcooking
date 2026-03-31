/*
  Warnings:

  - You are about to drop the column `token_expire_at` on the `token` table. All the data in the column will be lost.
  - Added the required column `token_expire` to the `Token` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Token` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `token` DROP COLUMN `token_expire_at`,
    ADD COLUMN `token_expire` DATETIME(3) NOT NULL,
    ADD COLUMN `user_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Token` ADD CONSTRAINT `Token_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `Users`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
