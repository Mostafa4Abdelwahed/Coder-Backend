const express = require('express')
const ConnectToDb = require('./config/ConnectToDb')
const cors = require('cors')
require('dotenv').config()

// Inital App
const app = express()

// Connect To DB
ConnectToDb()

// MiddleWares
app.use(express.json())
app.use(cors())

// Routes
app.use("/api/auth", require('./routes/authRoute'))
app.use("/api/users", require('./routes/usersRoute'))
app.use("/api/courses", require('./routes/coursesRoute'))
app.use("/api/enginners", require('./routes/engRoute'))
app.use("/api/orders", require('./routes/ordersRoute'))
app.get("*",(req, res)=>{
    res.json({message: "Api Warking"})
})



// Run Server
const PORT = process.env.PORT || 3000
// app.listen(PORT, () => console.log(`App Listening On Port ${PORT}!`))
module.exports = app;
