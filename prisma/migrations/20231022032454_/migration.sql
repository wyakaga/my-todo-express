/*
  Warnings:

  - You are about to alter the column `token` on the `TokenBlacklist` table. The data in that column could be lost. The data in that column will be cast from `VarChar` to `VarChar(255)`.
  - A unique constraint covering the columns `[token]` on the table `TokenBlacklist` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "TokenBlacklist" ALTER COLUMN "token" SET DATA TYPE VARCHAR(255);

-- CreateIndex
CREATE UNIQUE INDEX "TokenBlacklist_token_key" ON "TokenBlacklist"("token");
