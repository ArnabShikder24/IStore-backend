const express = require('express');
const app  = new express();
const env =  require('dotenv').config()
const router = require('./src/routes/api');


const rateLimit = require('express-rate-limit');
const helmet = require('helmet')
const hpp = require('hpp')
const cors = require('cors')
const xss = require('xss-clean')
const bodyParser = require('body-parser')
// Security module implement

  
app.use(cors())
app.use(helmet())
app.use(hpp())
app.use(xss())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

const limiter = rateLimit({
    windowMs: 15*60*1000,
    max:3000,
});

app.use(limiter);

// Database Connection


app.use("/api/v1",router)

app.use("*",(req,res)=>{
    res.status(404).json({status:"Invalid Route"})
});

module.exports = app;
