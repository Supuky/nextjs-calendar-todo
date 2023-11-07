import Calendar from "./ui/calendar/calendar";
import Todo from "./ui/todo/todo";

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-8">
      <h1 className="text-2xl text-gray-600 font-bold">Advanced Todo List</h1>
      <Calendar/>
      <Todo/>
    </main>
  )
}
