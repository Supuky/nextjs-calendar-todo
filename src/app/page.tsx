"use client"
import Calendar from "./ui/calendar/calendar";
import Todos from "./ui/todos/todos";
import { TodoProvider } from "./context/todoContext";
import { TodoListProvider } from "./context/todoListContext";
import { DateProvider } from "./context/dateContext";

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-8">
      <h1 className="text-2xl text-gray-600 font-bold">Advanced Todo List</h1>
      <DateProvider>
        <TodoListProvider>
          <TodoProvider >
              <Calendar /> 
              <Todos />
          </TodoProvider>
        </TodoListProvider>
      </DateProvider>
    </main>
  )
}
