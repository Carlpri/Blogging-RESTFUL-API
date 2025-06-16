/*
  Warnings:

  - You are about to drop the column `p0st_content` on the `post` table. All the data in the column will be lost.
  - Added the required column `post_content` to the `post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "post" DROP COLUMN "p0st_content",
ADD COLUMN     "post_content" TEXT NOT NULL;
