const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cours = require('cors')
const morgan = require('morgan')
const { readdirSync } = require('fs')
require('dotenv').config()

const app = express()

   // const authRoute = require('./routers/auth') 
    
    mongoose.connect(process.env.DATABASE , {
        useNewUrlParser: true, 
        useUnifiedTopology: true   
    })  
    .then(() => {console.log('DB CONNECTED');})
    .catch((err) => {
        console.log(`SOMTHING went worong ${err}`);
    })

    app.use(morgan("dev"))
    app.use(bodyParser.json({limit : "2mb" }))
    app.use(cours())
    readdirSync("./routers").map((r) => app.use("/api", require("./routers/" + r)));
    // route middle ware
    
   // app.use('/api',authRoute)
    
    app.get('/api', (req,res) => {
    res.json({
        name : "ancde"
    })
    
})

app.listen(process.env.PORT,() => { 
    console.log( process.env.PORT , "SERVER IS START");
})