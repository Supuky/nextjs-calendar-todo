export default function CalendarSkeleton() {
    return (
        <div className={`animate-pulse`}>
            <div className="flex justify-between items-center p-2 mb-6">
                <div className="flex">
                    <div className=" bg-gray-200 w-10 h-10 shadow-sm"></div>
                    {/* <div className="bg-gray-200 w-10 h-10 shadow-sm"></div>
                    <div className="bg-gray-200 w-16 h-10 shadow-sm"></div> */}
                </div>

                <div>
                    <div className="bg-gray-200 w-32 sm:w-64 h-10 shadow-sm"></div>
                </div>

                <div className="flex">
                    <div className=" bg-gray-200 w-10 h-10 shadow-sm"></div>
                    {/* <div className="bg-gray-200 w-16 h-10 shadow-sm"></div> */}
                    {/* <div className="bg-gray-200 w-16 h-10 shadow-sm"></div> */}
                </div>
            </div>
            <div className="bg-gray-200 p-32 sm:p-64 shadow-sm"></div>
        </div>
    )
} 