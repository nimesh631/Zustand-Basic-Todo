import React, { useState } from 'react'
import useTodoStore from '../store/todoStore'

function TodoApp() {
    const {todos, addTodo, removeTodo} = useTodoStore();
    const [text, setText] = useState("");

    const handleAdd = () => {
        if(text.trim() === "") return;
        addTodo(text);
        setText("");
    }

  return (
    <div style={{textAlign: "center", marginTop: "50px" }}>
        <h1>Todo List</h1>
        <input 
        type="text"
        value={text}
        onChange={(e)=>setText(e.target.value)}
         />
         <button onClick={handleAdd}>Add</button>

         <ul style={{ listStyleType: "none", padding: 0 }}>
            {todos.map((todo,index) => (
                <li key={index}>
                {index+1}. {todo} <button onClick={()=>removeTodo(index)}>Remove</button>
                </li>
            ))}
         </ul>
    </div>
  )
}

export default TodoApp