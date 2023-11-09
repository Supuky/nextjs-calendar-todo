import { useState } from "react";
import { filterVal } from "@/app/lib/utils";
import Filter from "../filter";
import Todo from "./todo";
import { useTodoListContext } from "@/app/context/todoListContext";
import { useDateContext } from "@/app/context/dateContext";
import AddTodo from "./AddTodo";

export default function Todos() {
    const [priorityFilter, setPriorityFilter] = useState("All");

    const todoLists = useTodoListContext();
    const currentDay:string = useDateContext();

    let todayTodos;
    if(priorityFilter === "All") {
        todayTodos = todoLists.filter((todo :any) => todo.start === currentDay);
    } else {
        todayTodos = todoLists.filter((todo :any) => todo.start === currentDay && todo.priority === priorityFilter);
    }

    // const filteredEvents = eventFilter(events);
    return (
        <div className='w-full'>
            <div className='flex justify-between items-center'>
                <h2 className='text-xl font-bold'>
                    {
                        currentDay === new Date().toISOString().split("T")[0] ? 
                        "Today's" : currentDay
                    } todo
                </h2>
                <Filter filterList={filterVal} filterName='priority' priorityFilter={priorityFilter} setPriorityFilter={setPriorityFilter}/>
            </div>
            <div className='flex justify-between items-center flex-wrap'>
                {
                    todayTodos.map((todo: any) => (
                        <Todo key={todo.id} title={todo.title} id={todo.id} start={todo.start} priority={todo.priority} category={todo.category} />
                    ))
                }
                <AddTodo />
            </div>
        </div>
    )
}