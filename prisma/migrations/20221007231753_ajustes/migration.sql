/*
  Warnings:

  - A unique constraint covering the columns `[cnpj]` on the table `Fornecedor` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Clientes" ALTER COLUMN "nascimento" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Cortes" ALTER COLUMN "name" DROP DEFAULT,
ALTER COLUMN "name" SET DATA TYPE TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Fornecedor_cnpj_key" ON "Fornecedor"("cnpj");
