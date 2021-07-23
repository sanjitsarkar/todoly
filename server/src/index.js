const  express  = require('express')
const mongoose = require("mongoose");
const cors = require("cors")
require("dotenv").config()
const cookieSession = require("cookie-session");
const Todos = require('./api/todos')
const LoginWithGoogle = require("./api/login");
const passport = require("passport")
// require("./auth/passport");
require("./auth/passportGoogle");
const middlewares  = require("./middlewares/error");
const { isUserAuthenticated } = require('./middlewares/auth');
const User = require("./api/user") 

// require("./models/user");
// const middlewares = require("./middlewares");
// const api = require("./api");
const mongoDB = process.env.MONGO_DB_URL;
const app = express()

app.use(express.json())
app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_KEY],
  })
);

app.use(express.urlencoded({extended:true}))
app.use(cors({ origin: "https://todask.herokuapp.com/", credentials: true }))
// app.use(helmet())
app.use(passport.initialize())
app.use(passport.session())
 mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true,useFindAndModify: false,useCreateIndex: true}).then(() => {
    const PORT = 5000
    app.listen(process.env.PORT | PORT, () => {
    console.log(`Running on https://todask.herokuapp.com/${PORT}`);
 })
})
app.use("/todos",isUserAuthenticated, Todos)
app.use(LoginWithGoogle)
app.use("/user",isUserAuthenticated,User)
app.get("/", (req, res) => {
    res.send("Home")
})
app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

