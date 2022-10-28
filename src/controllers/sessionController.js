import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwb from "jsonwebtoken";

//estudar importação e exportação
async function hashPassword(password) {
  const senha = await bcrypt
    .hash(password, parseInt(process.env.SALT))
    .then((hash) => {
      return hash;
    });

  return senha;
}

const prisma = new PrismaClient();

export const efetuarLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const cliente = await prisma.clientes.findUnique({
      where: {
        email,
      },
    });

    if (!cliente)
      return res.status(400).json({ error: "Email não encontrado." });

    if (!(await bcrypt.compare(password, cliente.password)))
      return res.status(400).json({ error: "Senha incorreta." });

    const token = jwb.sign({ id: cliente.id }, process.env.SALT, {
      expiresIn: 36000,
    });

    cliente.password = undefined;
    res.status(200).json({ cliente, token });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const trocarSenha = async (req, res) => {
  try {
    const { id, senhaAtual, senhaNova } = req.body;

    const cliente = await prisma.clientes.findUnique({
      where: {
        id,
      },
    });

    if (!(await bcrypt.compare(senhaAtual, cliente.password)))
      return res.status(400).json({ error: "Senha incorreta." });

    await prisma.clientes.update({
      where: { id },
      data: {
        password: await hashPassword(senhaNova),
      },
    });
    // aqui é bom setar undefined pra password também?
    res.status(200).json({ message: "Senha Atualizada com sucesso!" });
  } catch (error) {
    res.status(500).json(error.message);
  }
};
