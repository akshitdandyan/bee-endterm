const OverviewSkeleton = () => {
    return (
        <div class="p-4">
            <div class="sm:grid grid-cols-[1fr_3fr_3fr] gap-8">
                {/* Classes */}
                <div>
                    <div>
                        <div class="my-4 bg-gray-100 animate-pulse rounded-md py-1 px-4 border-l-4 border-l-gray-700">
                            <div class="text-sm bg-gray-300 animate-pulse mt-2 rounded-md h-6 w-20"></div>
                            <div class="ml-8 bg-gray-300 animate-pulse mt-2 rounded-md w-40 h-5"></div>
                            <div class="text-sm bg-gray-300 animate-pulse mt-2 rounded-md h-6 w-20"></div>
                        </div>
                        <div class="my-4 bg-gray-100 animate-pulse rounded-md py-1 px-4 border-l-4 border-l-gray-700">
                            <div class="text-sm bg-gray-300 animate-pulse mt-2 rounded-md h-6 w-20"></div>
                            <div class="ml-8 bg-gray-300 animate-pulse mt-2 rounded-md w-32 h-5"></div>
                            <div class="text-sm bg-gray-300 animate-pulse mt-2 rounded-md h-6 w-20"></div>
                        </div>
                    </div>
                </div>
                {/* Announcements */}

                <div class="relative mt-4 sm:hidden">
                    <div class="bg-blue-400 rounded-full p-1 text-white w-max z-10 relative px-2 left-2 text-sm">
                        Latest Notices
                    </div>
                    <div class="h-1 bg-blue-400 rounded-lg relative bottom-4"></div>
                </div>

                <div class="sm:bg-gray-200 px-2 rounded-md mt-5 py-4">
                    <div class="bg-gray-200 animate-pulse rounded-lg shadow p-2 mb-4">
                        <pre class="mb-2 bg-gray-500 animate-pulse h-6 w-32"></pre>
                        <div class="text-xs bg-gray-500 w-10 h-3 animate-pulse"></div>
                    </div>
                    <div class="max-h-80 overflow-y-auto hide-sc px-2">
                        <div class="bg-white rounded-lg shadow-lg p-2 mb-4">
                            <div class="flex justify-between items-center">
                                <pre class="mb-2 bg-gray-500 animate-pulse h-2 w-7"></pre>
                                <div class="bg-gray-100 w-24 h-6 rounded-full text-purple-500 px-2 py-1 font-semibold  text-xs"></div>
                            </div>
                            <div class="flex justify-between">
                                <div class="flex items-center gap-2 w-44 bg-blue-100  pr-2 rounded-full">
                                    <div class="aspect-square rounded-full bg-gray-500 animate-pulse h-10 w-10 p-1 scale-75"></div>
                                    <div class="bg-gray-500 animate-pulse w-4 h-2 rounded-md flex-1"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="bg-gray-200 animate-pulse rounded-lg shadow p-2 mb-4">
                        <pre class="mb-2 bg-gray-500 animate-pulse h-6 w-24"></pre>
                        <div class="text-xs bg-gray-500 w-10 h-3 animate-pulse"></div>
                    </div>
                </div>

                {/* Events Mobile */}
                <div class="mt-2 sm:hidden">
                    <div class="flex gap-2 overflow-x-auto hide-sc">
                        <div class="my-4 bg-gray-300 animate-pulse p-3 rounded-md">
                            <div class="bg-gray-500 animate-pulse w-5 h-4 rounded-md my-2"></div>
                            <div class=" bg-gray-500 animate-pulse w-40 h-4 rounded-md"></div>
                        </div>
                        <div class="my-4 bg-gray-300 animate-pulse p-3 rounded-md">
                            <div class="bg-gray-500 animate-pulse w-5 h-4 rounded-md my-2"></div>
                            <div class=" bg-gray-500 animate-pulse w-40 h-4 rounded-md"></div>
                        </div>
                    </div>
                </div>

                {/* Resources */}

                <div class="relative mt-4 sm:hidden">
                    <div class="bg-blue-400 rounded-full p-1 text-white w-max z-10 relative px-2 left-2 text-sm">
                        Latest Resources
                    </div>
                    <div class="h-1 bg-blue-400 rounded-lg relative bottom-4"></div>
                </div>
                <div class=" bg-gray-300 animate-pulse rounded-md relative pt-4 mt-5">
                    <div class="max-h-80 overflow-y-auto hide-sc px-2">
                        <div class="bg-white rounded-lg shadow-lg p-2 mb-4">
                            <div class="flex justify-between items-center">
                                <pre class="mb-2 bg-gray-500 animate-pulse h-2 w-7"></pre>
                                <div class="bg-gray-100 w-24 h-6 rounded-full text-purple-500 px-2 py-1 font-semibold  text-xs"></div>
                            </div>
                            <div class="flex justify-between">
                                <div class="flex items-center gap-2 w-44 bg-blue-100  pr-2 rounded-full">
                                    <div class="aspect-square rounded-full bg-gray-500 animate-pulse h-10 w-10 p-1 scale-75"></div>
                                    <div class="bg-gray-500 animate-pulse w-4 h-2 rounded-md flex-1"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="max-h-80 overflow-y-auto hide-sc px-2">
                        <div class="bg-white rounded-lg shadow-lg p-2 mb-4">
                            <div class="flex justify-between items-center">
                                <pre class="mb-2 bg-gray-500 animate-pulse h-2 w-7"></pre>
                                <div class="bg-gray-100 w-24 h-6 rounded-full text-purple-500 px-2 py-1 font-semibold  text-xs"></div>
                            </div>
                            <div class="flex justify-between">
                                <div class="flex items-center gap-2 w-44 bg-blue-100  pr-2 rounded-full">
                                    <div class="aspect-square rounded-full bg-gray-500 animate-pulse h-10 w-10 p-1 scale-75"></div>
                                    <div class="bg-gray-500 animate-pulse w-4 h-2 rounded-md flex-1"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="max-h-80 overflow-y-auto hide-sc px-2">
                        <div class="bg-white rounded-lg shadow-lg p-2 mb-4">
                            <div class="flex justify-between items-center">
                                <pre class="mb-2 bg-gray-500 animate-pulse h-2 w-7"></pre>
                                <div class="bg-gray-100 w-24 h-6 rounded-full text-purple-500 px-2 py-1 font-semibold  text-xs"></div>
                            </div>
                            <div class="flex justify-between">
                                <div class="flex items-center gap-2 w-44 bg-blue-100  pr-2 rounded-full">
                                    <div class="aspect-square rounded-full bg-gray-500 animate-pulse h-10 w-10 p-1 scale-75"></div>
                                    <div class="bg-gray-500 animate-pulse w-4 h-2 rounded-md flex-1"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Events Desktop */}
            <div class="mt-2 hidden sm:block">
                <div class="flex gap-2 overflow-x-auto hide-sc">
                    <div class="my-4 bg-gray-300 animate-pulse p-3 rounded-md">
                        <div class="bg-gray-500 animate-pulse w-5 h-4 rounded-md my-2"></div>
                        <div class=" bg-gray-500 animate-pulse w-40 h-4 rounded-md"></div>
                    </div>
                    <div class="my-4 bg-gray-300 animate-pulse p-3 rounded-md">
                        <div class="bg-gray-500 animate-pulse w-5 h-4 rounded-md my-2"></div>
                        <div class=" bg-gray-500 animate-pulse w-40 h-4 rounded-md"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OverviewSkeleton;
