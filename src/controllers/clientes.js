import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const buscarTodosOsClientes = async (req, res) => {
  const { page = 0, order = "asc", limit = 10 } = req.query;
  const clientes = await prisma.clientes.findMany({
    take: limit,
    skip: page,
    orderBy: {
      createdAt: order,
    },
  });
  await res.json(clientes);
};

export const buscarCliente = async (req, res) => {
  const { name, cpf, telefone, nascimento, ativo } = req.body;
  const { page = 0, order = "desc", limit = 10 } = req.query;
  console.log(page, order, limit);
  const clientePorId = await prisma.clientes.findMany({
    take: limit,
    skip: page,
    where: {
      name: { contains: name, mode: "insensitive" },
      cpf: { contains: cpf },
      telefone: { contains: telefone },
      nascimento: { contains: nascimento },
      ativo: ativo,
    },
    orderBy: {
      name: order,
    },
  });
  res.json(clientePorId);
};

export const criarCliente = async (req, res) => {
  const {
    name,
    cpf,
    telefone,
    cidade,
    estado,
    logradouro,
    nascimento,
    ativo,
    passwords,
  } = req.body;

  const criar = await prisma.clientes.create({
    data: {
      name,
      cpf,
      telefone,
      cidade,
      estado,
      logradouro,
      nascimento,
      ativo,
      passwords,
    },
  });
  res.json(criar);
};

export const deletarCliente = async (req, res) => {
  const { id } = req.body;
  const deletar = await prisma.clientes.delete({
    where: {
      id,
    },
  });
  res.json(deletar);
};

export const updateCliente = async (req, res) => {
  const {
    id,
    name,
    cpf,
    telefone,
    cidade,
    estado,
    logradouro,
    nascimento,
    ativo,
    passwords,
  } = req.body;

  const atualizar = await prisma.clientes.update({
    where: { id },
    data: {
      name,
      cpf,
      telefone,
      cidade,
      estado,
      logradouro,
      nascimento,
      ativo,
      passwords,
    },
  });
  res.json(atualizar);
};
