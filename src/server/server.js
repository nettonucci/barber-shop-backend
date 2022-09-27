import express from "express";
import * as dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import swaggerUi from "swagger-ui-express";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const swaggerDocument = require("../utils/swagger/swagger_output.json");
import router from "../routes/index.js";
import { verifyEnvs } from "../utils/verifyEnvs.js";

dotenv.config();
const app = express();
app.use(router);
app.use(express.json());

const prisma = new PrismaClient();

/**
async function teste() {
  const queries = await prisma.clientes.findMany();
  console.log(queries);
}
 */

verifyEnvs();

app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
  //teste()
});
