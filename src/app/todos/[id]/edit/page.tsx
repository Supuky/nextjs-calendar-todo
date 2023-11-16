"use client"
import { useTodoDispatchContext } from "@/app/context/todoContext";
import { useTodoListContext, useTodoListDispatchContext } from "@/app/context/todoListContext";
import { TodoDetail } from "@/app/lib/definitions";
import { filterVal } from "@/app/lib/utils";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Page( { params }: {params: { id: string }} ) {
    const router = useRouter();
    const todoLists  = useTodoListContext();
    const todoListDispatch = useTodoListDispatchContext();
    const todoDispatch = useTodoDispatchContext();
    const id = params.id;
    const targetTodo = todoLists.filter(todo => todo.id === id)[0];
    const [formData, setFormData] = useState<TodoDetail>({
        title: targetTodo.title,
        category: targetTodo.category,
        priority: targetTodo.priority,
        start: targetTodo.start,
        end: targetTodo.end ?? "",
        backgroundColor: targetTodo.backgroundColor ?? "#8B5CF6",
        id: targetTodo.id
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const { title, category, priority, start, end, id, backgroundColor } = formData;
    
        // フォームの値を使った処理
        const newTodo = { id: id, title: title, start: start, end: end, priority: priority, category: category, backgroundColor: backgroundColor };

        todoDispatch({ type: "add/update", payload: [newTodo]});
        todoListDispatch({ type: "add/update", payload: newTodo});

        router.push("/");
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
    };
    return (
        <div className="flex items-center min-h-screen">
            <div className="sm:w-1/3 w-2/3 m-auto bg-white border border-gray-200 rounded-lg shadow p-5">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-center text-gray-900">
                    Edit Todo!
                </h5>
                <form onSubmit={handleSubmit}>
                    <div className="mt-2">
                        <input placeholder="title"  value={formData.title} onChange={handleChange} name="title" className="block w-full rounded-md border dark:border-gray-200 py-1.5 text-gray-900 dark:shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-violet-400 
                        sm:text-sm sm:leading-6"/>
                    </div>
                    <div className="mt-2">
                        <input placeholder="category" value={formData.category} onChange={handleChange} name="category" className="block w-full rounded-md dark:border-gray-200 border py-1.5 text-gray-900 dark:shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-violet-400 
                        sm:text-sm sm:leading-6"/>
                    </div>
                    <div className="mt-2">
                        <input placeholder="start" value={formData.start} onChange={handleChange} name="start" type="date" className="block w-full rounded-md dark:border-gray-200 border py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-violet-400 
                        sm:text-sm sm:leading-6 bg-transparent h-10 text-left"/>
                    </div>
                    <div className="mt-2">
                        <input placeholder="end" value={formData.end} onChange={handleChange} name="end" type="date" className="block w-full rounded-md dark:border-gray-200 border py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-violet-400 
                        sm:text-sm sm:leading-6 bg-transparent h-10 text-left"/>
                    </div>
                    <div className="mt-4 flex justify-between items-center">
                        <select name="priority" value={formData.priority} onChange={handleChange} className=" border rounded-md focus-visible:ring-inset  focus-visible:ring-violet-400 p-1">
                            {
                                filterVal.map(priority => (
                                    <option key={priority} value={priority}>{priority}</option>
                                ))
                            }
                        </select>
                        <input type="color" value={formData.backgroundColor} onChange={handleChange} name="backgroundColor" className="block bg-inherit rounded-none h-7 w-12" />
                        <button className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-violet-700 rounded-md hover:bg-violet-600 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-violet-700 dark:hover:bg-violet-600 dark:focus:ring-violet-800" type="submit">Edit!</button>
                    </div>
                </form>
        </div>
        </div>

    )
}