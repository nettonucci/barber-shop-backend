/*
  Warnings:

  - A unique constraint covering the columns `[cpf]` on the table `Clientes` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Clientes_cpf_key" ON "Clientes"("cpf");
