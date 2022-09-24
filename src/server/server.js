import express from 'express'
import * as dotenv from 'dotenv'

import router from '../routes/index.js'

dotenv.config()

const app = express()

app.use(router)

app.use(express.json())

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`)
})

