const express = require("express")
const jwt = require("jsonwebtoken")
require("dotenv").config()
const app = express()
app.use(express.json())
const users = [{
  "id": 1,
"name":"Sanjit Sarkar"},{
  "id": 2,
    "name": "Xanjit Xarkar"
  }]
app.post("/login", (req, res) => {
    const { id } = req.body
    const user = {userId:id}
    const accessToken = jwt.sign(user, process.env.JWT_SECRET)
    res.json({accessToken:accessToken})


})
app.get("/", authenticateToken, (req, res) => {
    console.log(req.id);
    return res.json(users.filter((user)=>user.id==req.id))

})

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(" ")[1]
    if (token == null) return res.sendStatus(401)
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403)
        req.id = user.userId
        next()
    })
    
}

app.listen(1234)