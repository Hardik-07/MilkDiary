const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const dotenv = require('dotenv')
const connectDB = require('./config/db')
dotenv.config({ path: './config/config.env' })
console.log('imports successful')
connectDB()

const user = require('./routes/user')
const customers = require('./routes/customers')
const products = require('./routes/products')
const PORT = process.env.PORT || 5000
const app = express()

app.use(express.json({ limit: '10mb' }))
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())

app.use('/api/v1/users', user)
app.use('/api/v1/customers', customers)
app.use('/api/v1/products', products)
app.listen(PORT, () => console.log(`Server Running on port : ${PORT}`))
