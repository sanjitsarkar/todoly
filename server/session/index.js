const express = require('express')
const mongoose = require('mongoose')
const session = require('express-session')
require('dotenv').config()
const { errorMiddleware, dummyMiddleware} = require("./middleware/errorMiddleware")
const MongoStore = require('connect-mongo')
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const mongoUrl = process.env.MONGO_DB_URL
const mongoOptions = { useUnifiedTopology: true, useNewUrlParser: true }
const connection = mongoose.createConnection(mongoUrl,mongoOptions)

const sessionStore =  MongoStore.create({
    collectionName: "session",
    mongoUrl,
    mongoOptions
})

app.use(session({
    secret: process.env.COOKIE_KEY,
    resave: false,
    saveUninitialized: true,
    store: sessionStore,

    cookie: {

        maxAge:1000*60*60*24
    }
    
}))
app.use(dummyMiddleware)

app.get("/", async(req, res, next) => {
    console.log(req.session);
    // console.log(collection);
    if (req.session.viewsCount) {
        req.session.viewsCount++;

    }
    else {
        req.session.viewsCount=1;
    }
        res.cookie = `count={req.session.viewsCount}`

        res.send(`You have visited this page ${req.session.viewsCount} times.`)

})


app.use(errorMiddleware)
app.listen(12345)