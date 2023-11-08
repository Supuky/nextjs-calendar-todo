import { useTodoDispatchContext } from "@/app/context/todoContext";
import { useTodoListDispatchContext } from "@/app/context/todoListContext";
import { TodoDetail } from "@/app/lib/definitions";
import Link from "next/link";

export default function Todo({ id, title, start, priority, category }: TodoDetail) {
    const todoListDispatch = useTodoListDispatchContext();
    const todoDispatch = useTodoDispatchContext();

    const deleteHandler = () => {
        todoListDispatch({ type: "delete", payload: {title: title, id: id, start: start, category: category} })
        todoDispatch({ type: "delete", payload: [{title: title, id: id, start: start, category: category}] })
    }

    return (
        <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow  dark:border-gray-700">
            <div className="p-5 w-72">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-center text-gray-900">
                    {title}
                </h5>
                <div className="flex justify-between">
                    <p className="mb-3 font-normal text-gray-700">Category</p>
                    <p className="mb-3 font-normal text-gray-700">{category}</p>
                </div>
                <div className="flex justify-between">
                    <p className="mb-3 font-normal text-gray-700">Priority</p>
                    <p className="mb-3 font-normal text-gray-700">{priority}</p>
                </div>
                <div className="flex justify-between">
                    <p className="mb-3 font-normal text-gray-700">Times</p>
                    <p className="mb-3 font-normal text-gray-700">{start}</p>
                </div>
                <div className="flex justify-between">
                    <button onClick={deleteHandler}>Remove</button>
                    <Link href={`todos/${id}/edit`} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Read more
                    </Link>
                    {/* <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Read more
                        <svg className="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                        </svg>
                    </a>
                    <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Read more
                        <svg className="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                        </svg>
                    </a> */}
                </div>
            </div>
        </div>
    )
}