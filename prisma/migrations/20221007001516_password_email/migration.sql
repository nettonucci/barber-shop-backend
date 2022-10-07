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
ALTER TABLE "Agendamentos" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Clientes" DROP COLUMN "passwords",
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "password" TEXT NOT NULL,
ALTER COLUMN "ativo" SET DEFAULT true;

-- CreateTable
CREATE TABLE "Fornecedor" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "tipo_pessoa" TEXT NOT NULL,
    "cnpj" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "ativo" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "comprasId" TEXT,

    CONSTRAINT "Fornecedor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Compras" (
    "id" TEXT NOT NULL,
    "estoqueId" TEXT NOT NULL,
    "valor_unitario" TEXT NOT NULL,
    "valor_total" TEXT NOT NULL,
    "quantidade" TEXT NOT NULL,
    "fornecedorId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Compras_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Estoque" (
    "id" TEXT NOT NULL,
    "nome_produto" TEXT NOT NULL,
    "preco_venda" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "quantidade" TEXT NOT NULL,
    "ativo" BOOLEAN NOT NULL,
    "comprasId" TEXT,

    CONSTRAINT "Estoque_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vendas" (
    "id" TEXT NOT NULL,
    "agendamentoId" TEXT,
    "estoqueId" TEXT,
    "clienteId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "total" TEXT NOT NULL,
    "comprovante" TEXT,

    CONSTRAINT "Vendas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Caixa" (
    "id" TEXT NOT NULL,
    "vendaId" TEXT NOT NULL,
    "valor" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Caixa_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Clientes_email_key" ON "Clientes"("email");

-- AddForeignKey
ALTER TABLE "Fornecedor" ADD CONSTRAINT "Fornecedor_comprasId_fkey" FOREIGN KEY ("comprasId") REFERENCES "Compras"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Estoque" ADD CONSTRAINT "Estoque_comprasId_fkey" FOREIGN KEY ("comprasId") REFERENCES "Compras"("id") ON DELETE SET NULL ON UPDATE CASCADE;
