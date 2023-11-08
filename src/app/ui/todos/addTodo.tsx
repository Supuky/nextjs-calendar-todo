import { useDateContext } from "@/app/context/dateContext";
import { useTodoDispatchContext } from "@/app/context/todoContext";
import { useTodoListContext, useTodoListDispatchContext } from "@/app/context/todoListContext";
import { filterVal } from "@/app/lib/utils";

export default function AddTodo() {
    const currentDate = useDateContext();
    const todoLists  = useTodoListContext();
    const todoListDispatch = useTodoListDispatchContext();
    const todoDispatch = useTodoDispatchContext();

    const handleSubmit = (e: React.FocusEvent<HTMLFormElement>) => {
        e.preventDefault()
        const form = new FormData(e.currentTarget);
        const title = form.get("title") || "";
        const priority = form.get("priority") || "";
        const category = form.get("category") || "";
        const newTodo = { id: todoLists.length.toString(), title: title, start: currentDate, priority: priority, category: category };
        todoListDispatch({ type: "add", payload: newTodo});
        todoDispatch({ type: "add", payload: [newTodo]});
    }

    return (
        <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow  dark:border-gray-700">
            <div className="p-5 w-72">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-center text-gray-900">
                    Add Todo!
                </h5>
                <form onSubmit={handleSubmit}>
                    <input placeholder="title" defaultValue="" name="title" className="mb-3 font-normal text-gray-700 border"/>
                    <input placeholder="category" defaultValue="" name="category" className="mb-3 font-normal text-gray-700 border"/>
                    <div>
                        <select name="priority">
                            {
                                filterVal.map(priority => (
                                    <option key={priority} value={priority}>{priority}</option>
                                ))
                            }
                        </select>
                    </div>
                    <button type="submit">Add!</button>
                </form>
            </div>
        </div>
    )
}