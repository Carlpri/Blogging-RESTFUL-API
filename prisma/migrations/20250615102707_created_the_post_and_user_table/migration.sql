/*
  Warnings:

  - You are about to drop the column `content` on the `post` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `post` table. All the data in the column will be lost.
  - Added the required column `p0st_content` to the `post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `post_title` to the `post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "post" DROP COLUMN "content",
DROP COLUMN "title",
ADD COLUMN     "p0st_content" TEXT NOT NULL,
ADD COLUMN     "post_title" TEXT NOT NULL;
