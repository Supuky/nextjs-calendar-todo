import { FilterList } from "../lib/definitions";

export default function Filter({ filterList, filterName } : { filterList: FilterList, filterName: string}) {
    return (
        <div className="flex justify-between items-center">
            <label className="text-gray-600" htmlFor={filterName}>{filterName}</label>
            <div className="relative ml-6">
                <select 
                    name={filterName} 
                    id={filterName} 
                    className="peer block w-full rounded-md border border-gray-200 py-2 text-sm outline-2 placeholder:text-gray-500"
                    defaultValue=""
                >
                    <option value="">
                    All
                    </option>
                    {
                        filterList.map(list => (
                            <option key={list} value={list}>{list}</option>
                        ))
                    }
                </select>
            </div>
        </div>
    );
}