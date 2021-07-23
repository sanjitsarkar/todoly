const express = require("express");
const Todo  =  require("../models/Todo");
const router = express.Router()
router.get("/", async (req, res) => {
    const { googleId } = req.user
    const todos = await Todo.find({ userId: googleId })
    res.json(todos)
})
router.post("/", async (req, res) => {
    const { title, description, userId, due, priority } = req.body
    console.log(title, description, userId, due, priority);
    const todo = new Todo({ title, userId, description, due, priority })
   await todo.save()
    res.json(todo)
})
router.put("/:id", async (req, res) => {
    const { id } = req.params
    try {
        const { title, userId, description, due, priority } = req.body
        const newTodo = new Todo({ _id:id,title, userId, description, due, priority })
      await Todo.findByIdAndUpdate(id,newTodo)
     res.json(newTodo)
    }
    catch (e) {
        
        res.staus(404).json(`Todo with this id ${id} is not found`)
    }
})
router.delete("/:id", async (req, res) => {
    const { id } = req.params
    
    try {
        await Todo.findByIdAndDelete(id)
        res.json(`Successfully deleted Todo with id ${id}`)
    }
    catch (e) {
        
        res.staus(404).json(`Todo with this id ${id} is not found`)
    }


   
})

module.exports = router