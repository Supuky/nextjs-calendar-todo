// dark mode と serversideへのリファクタリングをしたい
"use client"
import Calendar from "./ui/calendar/calendar";
import Todos from "./ui/todos/todos";

export default function Page() {
  return (
    <main className="min-h-screen p-1 sm:p-4">
      <nav className="flex justify-between mb-4 border-b border-violet-100 p-4">
        <h1 className="font-bold sm:text-2xl text-gray-700">Advanced Todo List</h1>
      </nav>
      <div className="max-w-4xl m-auto">
        <Calendar /> 
        <Todos />
      </div>
    </main>
  )
}
