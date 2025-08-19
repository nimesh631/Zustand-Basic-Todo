import React, { useState } from 'react'
import useTodoStore from '../store/todoStore'

function TodoApp() {
    const {todos, addTodo, removeTodo, toggleTodo, clearTodos, filter, setFilter} = useTodoStore();
    const [text, setText] = useState("");

    const handleAdd = () => {
        if(text.trim() === "") return;
        addTodo(text);
        setText("");
    }

    const filteredTodos = todos.filter((todo)=> {
      if(filter === "active") return !todo.completed;
      if(filter === "completed") return todo.completed;
      return true; //all

    })
  return (
    <div style={{textAlign: "center", marginTop: "50px" }}>
        <h1>Todo List</h1>
        <input 
        type="text"
        value={text}
        onChange={(e)=>setText(e.target.value)}
         />
         <button onClick={handleAdd}>Add</button>
         <button onClick={clearTodos} style={{ marginLeft: "10px" }}>Clear All</button>

         {/* filter buttons */}
          <div style={{ marginTop: "20px" }}>
            <button
            onClick={()=> setFilter("all")}
             style={{
            marginLeft: "10px",
            fontWeight: filter === "all" ? "bold" : "normal",
          }}
            >
              All
            </button>

                 <button
            onClick={()=> setFilter("active")}
             style={{
            marginLeft: "10px",
            fontWeight: filter === "active" ? "bold" : "normal",
          }}
            >
              Active
            </button>

                 <button
            onClick={()=> setFilter("completed")}
             style={{
            marginLeft: "10px",
            fontWeight: filter === "completed" ? "bold" : "normal",
          }}
            >
              Completed
            </button>
          </div>
         <ul style={{ listStyleType: "none", padding: 0 ,textAlign:"left"}}>
            {filteredTodos.map((todo,index) => (
                <li key={index}
                style={{
                  marginBottom: "10px",
                  textDecoration: todo.completed? "line-through" :"none",
                }}>
                  <input type="checkbox"
                  checked={todo.completed}
                  onChange={()=>toggleTodo(index)}
                  style={{marginRight: "10px"}}
                   />
                {index+1}. {todo.text} <button onClick={()=>removeTodo(index)}>❌</button>
                </li>
            ))}
         </ul>
    </div>
  )
}

export default TodoApp