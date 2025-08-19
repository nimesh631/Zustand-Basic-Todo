import React, { useState } from 'react'
import useTodoStore from '../store/todoStore'

function TodoApp() {
    const {todos, addTodo, removeTodo, toggleTodo, clearTodos} = useTodoStore();
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
         <button onClick={clearTodos} style={{ marginLeft: "10px" }}>Clear All</button>

         <ul style={{ listStyleType: "none", padding: 0 }}>
            {todos.map((todo,index) => (
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