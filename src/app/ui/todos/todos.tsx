"use client"
import { useState } from "react";
import { filterVal } from "@/app/lib/utils";
import Filter from "../filter";
import Todo from "./todo";
import { useTodoListContext, useTodoListDispatchContext } from "@/app/context/todoListContext";
import { useDateContext } from "@/app/context/dateContext";

export default function Todos() {
    const [priorityFilter, setPriorityFilter] = useState("All");

    const todoLists = useTodoListContext();
    const currentDay = useDateContext();
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
                <h2 className='text-xl font-bold'>Today&apos;s todo</h2>
                <Filter filterList={filterVal} filterName='priority' priorityFilter={priorityFilter} setPriorityFilter={setPriorityFilter}/>
            </div>
            <div className='flex justify-between items-center flex-wrap'>
                {
                    todayTodos.map((todo: any) => (
                        <Todo key={todo.id} title={todo.title} id={todo.id!} start={todo.start!} priority={todo.priority} />
                    ))
                }
            </div>
        </div>
    )
}