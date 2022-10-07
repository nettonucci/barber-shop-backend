import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
const prisma = new PrismaClient();

async function hashPassword(password) {
  const senha = await bcrypt
    .hash(password, parseInt(process.env.SALT))
    .then((hash) => {
      return hash;
    });

  return senha;
}

export const buscarTodosOsClientes = async (req, res) => {
  try {
    const { page = 0, order = "asc", limit = 10 } = req.query;

    const clientesAsync = async () => {
      const clientesCount = await prisma.clientes.count();
      const clientesAll = await prisma.clientes.findMany({
        take: limit,
        skip: page,
        orderBy: {
          createdAt: order,
        },
      });

      return [clientesCount, clientesAll];
    };

    const clientesArray = await clientesAsync();

    const clientes = {
      info: {
        total: clientesArray[0],
        page: page,
        order: order,
        limit: limit,
      },
      data: clientesArray[1],
    };

    await res.status(200).json(clientes);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const buscarCliente = async (req, res) => {
  try {
    const { name, cpf, telefone, nascimento, ativo } = req.body;
    const { page = 0, order = "desc", limit = 10 } = req.query;

    const clientesAsync = async () => {
      const clientesCount = await prisma.clientes.count({
        where: {
          name: { contains: name, mode: "insensitive" },
          cpf: { contains: cpf },
          telefone: { contains: telefone },
          nascimento: { contains: nascimento },
          ativo: ativo,
        },
      });
      const clientesSearch = await prisma.clientes.findMany({
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

      return [clientesCount, clientesSearch];
    };

    const clientesArray = await clientesAsync();

    const clientes = {
      info: { total: clientesArray[0], page: page, order: order, limit: limit },
      data: clientesArray[1],
    };

    res.status(200).json(clientes);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const criarCliente = async (req, res) => {
  try {
    const {
      name,
      cpf,
      telefone,
      cidade,
      estado,
      logradouro,
      nascimento,
      ativo,
      email,
      password,
    } = req.body;

    if (
      !name &&
      !cpf &&
      !telefone &&
      !cidade &&
      !estado &&
      !logradouro &&
      !nascimento &&
      !ativo &&
      !email &&
      !password
    ) {
      res.status(400).send("Missing parameters.");
    } else {
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
          email,
          password: await hashPassword(password),
        },
      });

      //clientes.password = undefined;
      res.status(200).json(criar);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const deletarCliente = async (req, res) => {
  try {
    const { id } = req.body;
    const deletar = await prisma.clientes.delete({
      where: {
        id,
      },
    });
    res.status(200).json(deletar);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const updateCliente = async (req, res) => {
  try {
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
      email,
      password,
    } = req.body;

    if (!id) {
      res.status(400).send("Missing parameters. Identifier can not be empty.");
    } else {
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
          email,
          password: await hashPassword(password),
        },
      });
      res.json(atualizar);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};
