import React, { useState,useEffect}from 'react'
import Loader from '../Loader/Loader'
import Todo from '../todo/Todo'
import './home.css'
import FloatingAddButton from '../floating_add_button/FloatingAddButton'
import TodoModal from '../todo_modal/TodoModal'
import axios from "axios"
import UpdateTodoModal from '../todo_modal/UpdateTodoModel'

function Home({ googleId }) {
    const [todos, setTodos] = useState([])
    const [_id, set_id] = useState("")
    const [title,setTitle] = useState("")
    const [description,setDescription] = useState("")
    const [due,setDue] = useState(new Date())
    const [priority, setPriority] = useState(1)
    const [loading, setLoading] = useState(true)
    const [showModal, setShowModal] = useState(false)
    const [showUpdateModal, setShowUpdateModal] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
      const addTodo = async(e,title,description,due,priority) => {
          e.preventDefault()
        
        //   setLoading(true)
      console.log(priority + due);
    //   console.log(googleId);
const response = await axios.post("https://todask.herokuapp.com/todos", {title,description,due,priority,userId:googleId}, { withCredentials: true })
console.log(response.data);
          
          await fetchTodos()
        //   setLoading(false)
          setShowModal(false)
          
    }
    const updateTodo = async(e,title,description,due,priority)=>
          {
        e.preventDefault()
        // await fetch(`http://localhost:5000/todos/${_id}`, { credentials: "include", method="PUT", body: JSON.stringify({title,description,due,priority,userId:googleId})})
        await axios.put(`https://todask.herokuapp.com/todos/${_id}`, { title, description, due, priority, userId: googleId }, {withCredentials:true})
        set_id("")
        setTitle("")
        setDescription("")
        setPriority(1)
        setDue(new Date())
        setShowUpdateModal(false)
        await fetchTodos()
        
     }

    const fetchTodos = async () => {
        try {
            let response = await fetch("https://todask.herokuapp.com/todos", {credentials:"include"})
            response = await response.json()
            // console.log("type",typeof response);
            if(response.error)
                setErrorMessage("You need to Login to add todos")
            else
            setTodos(response)
        }
        catch (e) {
            console.log("error",e);

        }

    }
    async function editTodo(e, _id, title, description, priority, due) {
        e.preventDefault()
        console.log(_id,title,description,priority,due);
        set_id(_id)
        setTitle(title)
        setDescription(description)
        setPriority(priority)
        setDue(due.slice(0, -1))
        setShowUpdateModal(true)
    }
    useEffect(async() => {
        await fetchTodos()
        setLoading(false)
    }, [])
    // console.log(errorMessage);
    return (
        <div className="home">
            {
                loading ?
                    <Loader /> :
                    (
                       
                        !errorMessage?<div className="todos">
                        
                            {
                                todos.length?
                                todos.map((todo) => {
                                    return <Todo {...todo} key={todo._id} fetchTodos={fetchTodos} editTodo={ editTodo}/>
                                }
                        
                                    ) : <h1 className="error">No todos available</h1>
                                    
                            }
                            {showModal ?
                                <TodoModal  addTodo={ addTodo}  /> : (
                                    null
                                )
                            }
                                                     {showUpdateModal ?
                                <UpdateTodoModal updateTodo={updateTodo} _title={title} _description={description} _due={due} _priority={ priority} /> : (
                                    null
                                )
}
                            <div onClick={() => {
                                if (!showUpdateModal)
                                    setShowModal(!showModal)
                                else
                                    setShowUpdateModal(!showUpdateModal)
                                    
                            }}>
                                <FloatingAddButton />
                            </div>
                        </div> :
                            (
                                <h1 className="error">{errorMessage}</h1>
                            )
                        )
            
            }
        </div>
    )
}

export default Home
