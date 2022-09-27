import express from 'express'
import swaggerUi from 'swagger-ui-express'
import { createRequire } from "module";
import * as dotenv from 'dotenv'

import router from '../routes/index.js'
import { verifyEnvs } from '../utils/verifyEnvs.js'

const require = createRequire(import.meta.url);
const swaggerDocument = require("../utils/swagger/swagger_output.json");

dotenv.config()

verifyEnvs()

const app = express()

app.use(router)

app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.use(express.json())

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port: ${process.env.PORT}`)
})

