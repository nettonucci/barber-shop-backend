import express from 'express'
import * as dotenv from 'dotenv'

import router from '../routes/index.js'
import { verifyEnvs } from '../utils/verifyEnvs.js'

dotenv.config()

verifyEnvs()

const app = express()

app.use(router)

app.use(express.json())

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`)
})

