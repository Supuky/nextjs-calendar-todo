import { filterVal } from "@/app/lib/utils";
import Filter from "../filter";

export default function Todo() {
    return (
        <div className='w-full'>
        <div className='flex justify-between items-center'>
            <h2 className='text-xl font-bold'>Today&apos;s todo</h2>
            <Filter filterList={filterVal} filterName='priority' />
        </div>
    </div>
    )
}