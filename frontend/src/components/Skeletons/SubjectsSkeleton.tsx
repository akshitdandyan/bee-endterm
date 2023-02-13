import { For } from "solid-js";

const SubjectsSkeleton = () => {
    return (
        <div class="sm:grid grid-cols-4 gap-4 p-4">
            <For each={[...Array(10)]}>
                {() => (
                    <div class="bg-gray-300 animate-pulse mt-2 sm:mt-0 grid grid-cols-[5fr_1fr] items-center p-4 rounded-md">
                        <div class="bg-gray-400 animate-pulse w-32 h-4 rounded-md"></div>
                        <div>
                            <div class="bg-gray-400 animate-pulse rounded-full w-8 h-8"></div>
                        </div>
                    </div>
                )}
            </For>
        </div>
    );
};

export default SubjectsSkeleton;
