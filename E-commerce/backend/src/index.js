require('dotenv').config()
const express = require('express')
const cors    = require('cors')
const { connectMongo } = require('./config/mongodb')
const routes           = require('./routes/index')

const app  = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())
app.use('/api', routes)

const start = async () => {
  await connectMongo()
  app.listen(PORT, () => console.log(`🚀 Backend running on port ${PORT}`))
}

start()