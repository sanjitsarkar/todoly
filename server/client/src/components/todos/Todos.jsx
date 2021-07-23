import React, { useState} from 'react'
import Todo from '../Todo/Todo'
import "./todos.css"
function Todos(todos) {
    console.log(typeof todos);
    return (
        <div>
            {
                todos.length == 0 ?
                    <h1>There is no Todo...</h1> :
                    (
                        <h1>{todos[0]["title"]}</h1>
                        
                //         todos.map((todo) => {
                //             return <Todo {...todo}/>
                // }
                // )
                        
                        // _todos.map((todo) => {
                        //     <Todo {...todo} />
                        // }
                        // )                   
                        )
            }
        </div>
    )
}

export default Todos
