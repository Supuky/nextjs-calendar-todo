"use client"
import Calendar from "./ui/calendar/calendar";
import Todos from "./ui/todos/todos";
import { TodoProvider } from "./context/todoContext";
import { TodoListProvider } from "./context/todoListContext";
import { DateProvider } from "./context/dateContext";

export default function Page() {
  return (
    <main className="min-h-screen  p-4">
      <nav className="flex justify-between mb-4 border-b border-violet-100 p-4">
        <h1 className="font-bold text-2xl text-gray-700">Advanced Todo List</h1>
      </nav>
      <div className="max-w-4xl m-auto">
        <DateProvider>
          <TodoListProvider>
            <TodoProvider >
                <Calendar /> 
                <Todos />
            </TodoProvider>
          </TodoListProvider>
        </DateProvider>
      </div>
    </main>
  )
}
