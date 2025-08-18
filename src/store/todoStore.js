import {create} from "zustand";

const useTodoStore = create((set) => ({
    todos: [],
    addTodo: (todo)=>set((state) => ({todos: [...state.todos,todo]})),
    removeTodo: (index)=>set((state)=>({todos: state.todos.filter((_,i) => i !== index)})),
}));

export default useTodoStore;