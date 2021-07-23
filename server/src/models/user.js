const { model,Schema } = require("mongoose");

const UserSchema = new Schema({
    fullName:String,
    email:String,
    password: String,
    googleId: String,
    picture: String
},
)

module.exports = model("User", UserSchema)
