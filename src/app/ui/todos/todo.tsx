import { useTodoDispatchContext } from "@/app/context/todoContext";
import { useTodoListDispatchContext } from "@/app/context/todoListContext";
import { TodoDetail } from "@/app/lib/definitions";
import Link from "next/link";

export default function Todo({ id, title, start, priority, category }: TodoDetail) {
    const todoListDispatch = useTodoListDispatchContext();
    const todoDispatch = useTodoDispatchContext();

    const deleteHandler = () => {
        todoListDispatch({ type: "delete", payload: {title: title, id: id, start: start, category: category} });
        todoDispatch({ type: "delete", payload: [{title: title, id: id, start: start, category: category}] });
    }

    return (
        <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow">
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
                    <button type="button" className="inline-flex justify-center rounded-md  px-3 py-2 text-sm font-semibold text-red-500 border border-red-500 :hover:bg-gray-50  sm:w-auto" onClick={deleteHandler}>Delete</button>
                    <Link href={`todos/${id}/edit`} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-violet-400 rounded-md hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-violet-700 dark:hover:bg-violet-600 dark:focus:ring-blue-800">
                        Read
                    </Link>
                </div>
            </div>
        </div>
    )
}