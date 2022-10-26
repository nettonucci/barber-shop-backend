import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

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

export const gerarRecovery = async (req, res) => {
  try {
    const { email, cpf } = req.body;

    if (!email || !cpf) {
      res.status(400).json("Missing parameters. Identifier can not be empty.");
    } else {
      try {
        const verify = await prisma.clientes.findUnique({
          where: {
            email,
          },
          select: {
            id: true,
          },
        });

        if (verify !== null) {
          try {
            const recoveryNumber = Math.floor(100000 + Math.random() * 900000);

            const createRecover = await prisma.resetPassword.create({
              data: {
                clienteId: verify.id,
                recovery: recoveryNumber.toString(),
              },
            });
            res.status(400).json(createRecover);
          } catch (error) {
            res.status(400).json(error.message);
          }
        } else {
          res.status(200).json("Error: Email and CPF do not match.");
        }
      } catch (error) {
        res.status(400).json(error.message);
      }

      //res.json(criarRecovery);
      // ##TODO: ENVIAR PARA O EMAIL O LINK PARA CLICAR, JUNTO AOS NÚMEROS GERADOS PARA PODER RECUPERAR SENHA
    }
  } catch (error) {
    res.status(400).json(error.message);
  }
};

export const novaSenha = async (req, res) => {
  try {
    const { id, clienteId, recovery, newPassword } = req.body;

    const checkRecoverExist = await prisma.resetPassword.findUnique({
      where: {
        id,
      },
    });

    if (checkRecoverExist !== null) {
      if (
        checkRecoverExist.clienteId === clienteId &&
        checkRecoverExist.recovery === recovery
      ) {
        await prisma.clientes
          .update({
            where: { id: clienteId },
            data: {
              password: await hashPassword(newPassword),
            },
          })
          .then(async () => {
            await prisma.resetPassword.delete({
              where: {
                id,
              },
            });
          })
          .then(async () => {
            res.status(200).json({ message: "Password changed successfully." });
          });
      } else {
        res.status(400).json({ message: "Something don't match." });
      }
    } else {
      res.status(400).json({ message: "Recover do not exist" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
