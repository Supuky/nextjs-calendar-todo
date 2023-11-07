import { eventFilter, filterVal } from "@/app/lib/utils";
import Filter from "../filter";
import Todo from "./todo";
import { TodoDetail } from "@/app/lib/definitions";
import { useTodoContext } from "@/app/context/todoContext";

// idかstartがあるオブジェクトをだけを取得する関数を作成 

// const state: TodoDetail[] = [
//     {
//         id: 'a',
//         title: 'my event',
//         start: '2023-11-03'
//     },
//     {
//         id: 'b',
//         title: 'you event',
//         start: '2023-11-01'
//     },
//     {
//         id: 'c',
//         title: 'my event',
//         start: '2023-11-01'
//     },
// ]

export default function Todos() {
    const events = useTodoContext();
    const filteredEvents = eventFilter(events);
    return (
        <div className='w-full'>
            <div className='flex justify-between items-center'>
                <h2 className='text-xl font-bold'>Today&apos;s todo</h2>
                <Filter filterList={filterVal} filterName='priority' />
            </div>
            <div className='flex justify-between items-center flex-wrap'>
                {
                    filteredEvents.map(todo => (
                        <Todo key={todo.id} title={todo.title} id={todo.id!} start={todo.start!} priority={todo.priority} />
                    ))
                }
            </div>
        </div>
    )
}