require('dotenv').config()
const express = require('express')
const cors = require('cors')

const app = express()

const connectDB = require('./utils/db')

const corsOptions = {
    origin:"http://localhost:5173",
    methods: "GET,POST,DELETE,PUT,PATCH,HEAD",
    credentials:true
}

app.use(express.json())
app.use(cors(corsOptions))

const authRoute = require('./routers/auth-router')
const itemRoute = require('./routers/item-router')
const orderRoute = require('./routers/order-router')
const collectionsRoute = require('./routers/collections-router')


app.use("/api/auth",authRoute)
app.use("/api/items",itemRoute)
app.use("/api/orders",orderRoute)
app.use("/api/collections",collectionsRoute)

const PORT = 5000

connectDB().then(()=>{
    app.listen(PORT,()=>{
        console.log(`Our app is running at PORT ${PORT}`)
    })
})