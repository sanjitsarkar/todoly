import React, { useState,useEffect} from 'react'

function UpdateTodoModal({updateTodo, _title, _description, _priority, _due}) {
    const [title,setTitle] = useState(_title)
    const [description,setDescription] = useState(_description)
    const [due,setDue] = useState(_due)
    const [priority, setPriority] = useState(_priority)
  console.log(_due);
    return (
       <div className="w-full max-w-xs m-auto z-50 fixed" className="todo-form">
            <form className="bg-white shadow-2xl  rounded px-8 pt-6 pb-8 mb-4 border-t-8 border-blue-600 " >
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
        Title
      </label>
      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="title" type="text" placeholder="title" value={title} onChange={(e) => { setTitle(e.target.value) }}/>
    </div>
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
        Description
      </label>
      <textarea className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="description" value={description} onChange={(e) => { setDescription(e.target.value) }}/>
      {/* <p className="text-red-500 text-xs italic">Description</p> */}
                </div>
                 <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="due-date">
        Due Date
      </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="due-date" type="datetime-local" value={due} onChange={(e) => { setDue(e.target.value) }}/>
                </div>
                      <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="priority">
        Priority
      </label>
                    <select className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="priority"  value={priority} onChange={(e) => { setPriority(e.target.value) }}>
                        <option value="1">
Low
                        </option>
                          <option value="2">
                            Medium
                        </option>
                          <option value="3">
                            High
                        </option>
                        </select>
    </div>
          <div className="flex items-center justify-between">
         
            
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit" onClick = {(e)=> updateTodo(e,title,description,due,priority)}>
                  Update Todo
                </button>

    </div>
  </form>
</div>
    )
}

export default UpdateTodoModal
