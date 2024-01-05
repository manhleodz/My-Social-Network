export const LoadingCard = () => {
    return (
        <div className="w-full rounded-lg overflow-hidden shadow-lg my-5">
            <div className="w-full h-20 bg-white p-4 flex space-x-2">
                <div className=" w-10 h-10 bg-gray-300 animate-pulse rounded-full"></div>
                <div className=" space-y-2">
                    <div className="w-20 h-3 bg-gray-300 animate-pulse"></div>
                    <div className="w-20 h-3 bg-gray-300 animate-pulse"></div>
                </div>
            </div>
            <div className="w-full h-64 bg-gray-300 animate-pulse"></div>
            <div className="px-6 py-4 items-center">
                <div className="font-regular text-xl mb-2 w-20 h-4 bg-gray-300 animate-pulse"></div>
            </div>
        </div>
    );
}

export const LoadingPosts = () => {
    const loadPages = [1, 2];
    return (
        <div className="">
            {loadPages.map((num, id) => { return <LoadingCard key={id}/> })}
        </div>
    );
}