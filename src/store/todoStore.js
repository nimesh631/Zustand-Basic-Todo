import { create } from "zustand";
import { persist } from "zustand/middleware";

const useTodoStore = create(persist((set) => ({
  todos: [],
  filter: "all",
  addTodo: (todo) =>
    set((state) => ({
      todos: [...state.todos, { text: todo, completed: false }],
    })),
  removeTodo: (index) =>
    set((state) => ({ todos: state.todos.filter((_, i) => i !== index) })),
  toggleTodo: (index) =>
    set((state) => ({
      todos: state.todos.map((todo, i) =>
        i === index ? { ...todo, completed: !todo.completed } : todo
      ),
    })),
  clearTodos: () => set({ todos: [] }),
  setFilter: (filter) => set({filter}),
}),
{
  name: "todo-storage", //key in local storage
}
));

export default useTodoStore;
