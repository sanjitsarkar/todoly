import axios from 'axios'
import React from 'react'
import "./todo.css"

function Todo({ _id, userId, title, description, priority, due,fetchTodos,editTodo }) {
    const priorityList = ["Low", "Medium", "High"]
    const deleteTodo = async (e) => {
       e.preventDefault()
        let response = await axios.delete(`http://localhost:5000/todos/${_id}`, {withCredentials:true})
        // response = await response.json()
        console.log(response);
        await fetchTodos()
        // window.location.href = "/"
    }


    return (
        <div className="card" key={_id}>
            <h1 className="title">{title} <button onClick={deleteTodo}>Delete</button> <button onClick={(e)=>editTodo(e,_id, title, description, priority, due)}>Edit</button></h1>
            <p className="description">{description}</p>
            <h1 className="priority">Priority: { priorityList[priority-1]}</h1>
            <h1 className="due">Due: { new Date(due).toUTCString()}</h1>
        </div>
    )
}

export default Todo
