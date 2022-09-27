import express from "express";
import * as dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import swaggerUi from "swagger-ui-express";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
import chalk from "chalk";

const swaggerDocument = require("../utils/swagger/swagger_output.json");
import router from "../routes/index.js";
import { verifyEnvs } from "../utils/verifyEnvs.js";

dotenv.config();
const app = express();
app.use(router);
app.use(express.json());

const prisma = new PrismaClient();

await prisma.$connect().then(() => {
  console.log(chalk.green(`[Database] [CONNECTED - ${process.env.DATABASE_TYPE}]`));
}).catch((err) => {
  console.log(chalk.red(`[Database] [ERROR - ${process.env.DATABASE_TYPE}]`));
  console.log(err);
});

verifyEnvs();

app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
