import React, { useState } from 'react'
import useTodoStore from '../store/todoStore'

function TodoApp() {
    const {todos, addTodo, removeTodo, toggleTodo, clearTodos, filter, setFilter,editTodo} = useTodoStore();
    const [text, setText] = useState("");
    const [editingIndex, setEditingIndex] = useState(null);
    const [editText, setEditText] = useState("");

    const handleAdd = () => {
        if(text.trim() === "") return;
        addTodo(text);
        setText("");
    }

  const handleEditSave = (index) => {
    if (editText.trim() === "") return;
    editTodo(index, editText);
    setEditingIndex(null); // exit edit mode
    setEditText("");
  };


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
            fontSize: filter === "all" ? "18px" : "14px",

          }}
            >
              All
            </button>

            <button
            onClick={()=> setFilter("active")}
             style={{
            marginLeft: "10px",
            fontWeight: filter === "active" ? "bold" : "normal",
            fontSize: filter === "active" ? "18px" : "14px",
          }}
            >
              Active
            </button>

                 <button
            onClick={()=> setFilter("completed")}
             style={{
            marginLeft: "10px",
            fontWeight: filter === "completed" ? "bold" : "normal",
            fontSize: filter === "completed" ? "18px" : "14px",

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

                   {/* if editing this todo */}
                   {editingIndex === index ? (
                    <>
                    <input
                     type="text"
                     value={editText}
                     onChange={(e) => setEditText(e.target.value)}
                    />
                    <button onClick={()=>handleEditSave(index)}>Save</button>
                  <button onClick={() => setEditingIndex(null)}>Cancel</button>

                    </>
                   ):(
                    <>
                       {todo.text}
                <button
                  onClick={() => {
                    setEditingIndex(index);
                    setEditText(todo.text);
                  }}
                  style={{ marginLeft: "10px" }}
                >
                  ✏️ Edit
                </button>
                <button onClick={() => removeTodo(index)}>❌</button>
              </>
                   )}
                </li>
            ))}
         </ul>
    </div>
  )
}

export default TodoApp