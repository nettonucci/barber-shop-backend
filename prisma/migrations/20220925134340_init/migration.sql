-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- CreateTable
CREATE TABLE "Clientes" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "cidade" TEXT NOT NULL,
    "estado" TEXT NOT NULL,
    "logradouro" TEXT NOT NULL,
    "nascimento" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ativo" BOOLEAN NOT NULL,
    "passwords" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',

    CONSTRAINT "Clientes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cortes" (
    "id" TEXT NOT NULL,
    "name" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "time" TEXT NOT NULL DEFAULT '60',
    "valor" TEXT NOT NULL,

    CONSTRAINT "Cortes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Agendamentos" (
    "id" TEXT NOT NULL,
    "corteId" TEXT NOT NULL,
    "clienteId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "hora_inicio" TEXT NOT NULL,
    "hora_fim" TEXT NOT NULL,
    "valor" TEXT NOT NULL,

    CONSTRAINT "Agendamentos_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Clientes_name_key" ON "Clientes"("name");

-- AddForeignKey
ALTER TABLE "Agendamentos" ADD CONSTRAINT "Agendamentos_corteId_fkey" FOREIGN KEY ("corteId") REFERENCES "Cortes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Agendamentos" ADD CONSTRAINT "Agendamentos_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Clientes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
