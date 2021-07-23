const { model,Schema } = require("mongoose");

const TodoSchema = new Schema({
    userId: { type: String, required:true},
    title:{ type: String, required:true,min:3},
    description:{ type: String, required:true,min:3},
    due: { type: Date, required:true,default:Date.now()},
    priority: { type: Number, required:true,min:1,max:3,default:1}
},
)
module.exports = model("Todo", TodoSchema)
