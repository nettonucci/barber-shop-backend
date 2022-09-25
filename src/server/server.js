import express from "express";
import * as dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import router from "../routes/index.js";

dotenv.config();
const app = express();
app.use(router);
app.use(express.json());

const prisma = new PrismaClient();

async function query() {
  const query = await prisma.clientes.findMany();
  console.log(query);
}

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
  query()
});
