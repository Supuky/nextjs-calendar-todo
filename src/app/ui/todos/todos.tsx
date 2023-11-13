import { useEffect, useState } from "react";
import { filterVal } from "@/app/lib/utils";
import Filter from "../filter";
import Todo from "./todo";
import { useTodoListContext } from "@/app/context/todoListContext";
import { useDateContext } from "@/app/context/dateContext";
import AddTodo from "./addTodo";
import { TodoDetail } from "@/app/lib/definitions";

export default function Todos() {
    const [priorityFilter, setPriorityFilter] = useState("All");
    const [todayTodos, setTodayTodos] = useState<TodoDetail[]>([]);

    const todoLists = useTodoListContext();
    const currentDay: string = useDateContext();

    useEffect(() => {
        let filteredTodos;
        if (priorityFilter === "All") {
            filteredTodos = todoLists.filter((todo: TodoDetail) => todo.start === currentDay);
        } else {
            filteredTodos = todoLists.filter((todo: TodoDetail) => todo.start === currentDay && todo.priority === priorityFilter);
        }
        setTodayTodos(filteredTodos);
    }, [priorityFilter, todoLists, currentDay]);

    return (
        <div className='w-full'>
            <div className='flex justify-between items-center mb-2'>
                <h2 className='sm:text-xl font-bold'>
                    {
                        currentDay === new Date().toISOString().split("T")[0] ? 
                        "Today's" : currentDay
                    } todo
                </h2>
                <Filter filterList={filterVal} filterName='priority' priorityFilter={priorityFilter} setPriorityFilter={setPriorityFilter}/>
            </div>
            <div className='flex justify-center items-stretch flex-wrap sm:justify-between gap-3'>
                {
                    todayTodos.map((todo: TodoDetail) => (
                        <Todo key={todo.id} title={todo.title} id={todo.id} start={todo.start} priority={todo.priority} category={todo.category} />
                    ))
                }
                <AddTodo />
            </div>
        </div>
    )
}