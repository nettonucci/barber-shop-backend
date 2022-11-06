/*
  Warnings:

  - You are about to drop the column `passwords` on the `Clientes` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `Clientes` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `Clientes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `Clientes` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Clientes_name_key";

-- AlterTable
ALTER TABLE "Clientes" DROP COLUMN "passwords",
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "password" TEXT NOT NULL,
ALTER COLUMN "ativo" SET DEFAULT true;

-- CreateIndex
CREATE UNIQUE INDEX "Clientes_email_key" ON "Clientes"("email");
