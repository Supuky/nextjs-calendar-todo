"client"
import { useState } from "react";
import { useDateContext } from "@/app/context/dateContext";
import { useTodoDispatchContext } from "@/app/context/todoContext";
import { useTodoListContext, useTodoListDispatchContext } from "@/app/context/todoListContext";
import { filterVal } from "@/app/lib/utils";
import { TodoDetail } from "@/app/lib/definitions";

export default function AddTodo() {
    const [formData, setFormData] = useState<TodoDetail>({
        title: '',
        category: '',
        priority: 'high',
    });
    const currentDate = useDateContext();
    const todoLists  = useTodoListContext();
    const todoListDispatch = useTodoListDispatchContext();
    const todoDispatch = useTodoDispatchContext();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const { title, category, priority } = formData;
    
        // フォームの値を使った処理
        const newTodo = { id: todoLists.length.toString(), title: title, start: currentDate, priority: priority, category: category };

        todoDispatch({ type: "add", payload: [newTodo]});
        todoListDispatch({ type: "add", payload: newTodo});

        // フォームの値を初期化
        setFormData({
          title: '',
          category: '',
          priority: 'high',
        });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
    };

    return (
        <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow">
            <div className="p-5 w-72">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-center text-gray-900">
                    Create Todo!
                </h5>
                <form onSubmit={handleSubmit}>
                    <div className="mt-2">
                        <input placeholder="title" value={formData.title} onChange={handleChange} name="title" className="block w-full rounded-md border border-gray-200 dark:border-gray-200 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-violet-400 
                        sm:text-sm sm:leading-6"/>
                    </div>
                    <div className="mt-2">
                        <input placeholder="category" value={formData.category} onChange={handleChange} name="category" className="block w-full rounded-md border border-gray-200 dark:border-gray-200 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-violet-400 
                        sm:text-sm sm:leading-6"/>
                    </div>
                    <div className="mt-4 flex justify-between">
                        <select name="priority" value={formData.priority} onChange={handleChange} className=" border rounded-md focus-visible:ring-inset  focus-visible:ring-violet-400">
                            {
                                filterVal.map(priority => (
                                    <option key={priority} value={priority}>{priority}</option>
                                ))
                            }
                        </select>
                        <button className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-violet-400 rounded-md hover:bg-violet-800 focus:ring-4 focus:outline-none focus:ring-violet-300 dark:bg-violet-700 dark:hover:bg-violet-600 dark:focus:ring-violet-800" type="submit">Add!</button>
                    </div>
                </form>
            </div>
        </div>
    )
}