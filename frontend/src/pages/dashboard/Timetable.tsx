import { createSignal, For, onMount, Show, useContext } from "solid-js";
import { axiosAuth } from "../../@utils/axios";
import { DashboardContext, TimetableClass } from "../../@utils/context";

type TimetableDay = {
    dayname: string;
    dayindex: number;
    classes: TimetableClass[];
};

interface Timetable {
    groupname: string;
    groupnumber: string;
    days: TimetableDay[];
}

const Timetable = () => {
    const { groups, setGroups } = useContext(DashboardContext);

    const [selectedGroup, setSelectedGroup] = createSignal<string>(
        localStorage.getItem("selectedGroup") ?? ""
    );
    const [timetable, setTimetable] = createSignal<Timetable>();
    const [group2, setGroup2] = createSignal<string>("");
    const [commonBreaks, setCommonBreaks] = createSignal<
        {
            dayindex: number;
            dayname: string;
            startat: string;
            endat: string;
        }[]
    >([]);

    async function fetchGroups() {
        try {
            const res = await axiosAuth.get("/dashboard/getgroups");
            console.log(res);
            if (res.data.success) {
                setGroups(res.data.payload.groups);
                // fetchTimetable(res.data.payload.groups[0].groupname);
            }
        } catch (error) {
            console.log(error);
        }
    }

    async function fetchTimetable(groupName: string) {
        console.log("fetchTimetable", groupName);
        setSelectedGroup(groupName);
        localStorage.setItem("selectedGroup", groupName);
        try {
            const res = await axiosAuth.get(
                "/dashboard/gettimetable?group=".concat(groupName)
            );
            console.log(res);
            if (res.data.success && res.data.payload.timetable) {
                setTimetable(res.data.payload.timetable);

                // scroll #today-day-name in view
                const todayDayName = document.getElementById("today-day-name");
                if (todayDayName) {
                    todayDayName.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                        inline: "nearest",
                    });
                }
            } else {
                console.log("No timetable found");
                localStorage.removeItem("selectedGroup");
            }
        } catch (error) {
            console.log("No timetable found[2]", error);
            localStorage.removeItem("selectedGroup");
        }
    }

    async function fetchCommonBreaks(group2: string) {
        try {
            setGroup2(group2);
            const res = await axiosAuth.get(
                "/dashboard/getcommonbreaks?group1="
                    .concat(selectedGroup())
                    .concat("&group2=")
                    .concat(group2)
            );
            console.log(res);
            if (res.data.success && res.data.payload.commonBreaks) {
                setCommonBreaks(res.data.payload.commonBreaks);
            }
        } catch (error) {
            console.log(error);
        }
    }

    onMount(() => {
        if (groups.length === 0) {
            fetchGroups();
        }
        console.log("selectedGroup", localStorage.getItem("selectedGroup"));
        if (localStorage.getItem("selectedGroup")) {
            fetchTimetable(localStorage.getItem("selectedGroup"));
        }
    });

    return (
        <div class="p-4">
            <div class="flex gap-2 flex-wrap justify-between">
                <For each={groups}>
                    {(group) => (
                        <button
                            class={`p-2 text-xs rounded-full ${
                                selectedGroup() === group.groupname
                                    ? "bg-blue-700 text-white"
                                    : "text-blue-700 bg-blue-100"
                            }`}
                            onClick={() => fetchTimetable(group.groupname)}
                        >
                            {group.groupname}
                        </button>
                    )}
                </For>
            </div>
            <div class="border-b-2 my-4"></div>
            <div class="sm:flex sm:gap-4">
                <Show when={timetable()}>
                    <div class="flex gap-4 pr-4 pb-4 overflow-x-auto hide-sc">
                        <For each={timetable().days}>
                            {(day, i) => (
                                <div
                                    id={
                                        i().toString() ===
                                        (new Date().getDay() - 1).toString()
                                            ? "today-day-name"
                                            : ""
                                    }
                                >
                                    <div
                                        class="text-gray-500"
                                        style={
                                            i().toString() ===
                                            (new Date().getDay() - 1).toString()
                                                ? {
                                                      color: "rgb(22, 163, 74)",
                                                  }
                                                : {}
                                        }
                                    >
                                        {day.dayname}
                                    </div>
                                    <For each={day.classes}>
                                        {(classItem) => (
                                            <div class="bg-gray-100 shadow-lg p-4 mt-4 rounded-md relative">
                                                <Show when={classItem.subGroup}>
                                                    <div class="text-xs text-white rounded-full px-2 absolute -top-1 -left-1 bg-yellow-500 ">
                                                        Group{" "}
                                                        {classItem.subGroup}
                                                    </div>
                                                </Show>
                                                <div class="font-bold text-blue-500">
                                                    {classItem.subjectname}
                                                </div>

                                                <div class="flex gap-1 text-xs mt-2 text-green-600">
                                                    <div>
                                                        {classItem.startat}
                                                    </div>
                                                    <div>-</div>
                                                    <div>{classItem.endat}</div>
                                                </div>
                                                <div class="mt-2 text-gray-600 text-xs">
                                                    in {classItem.roomnumber}
                                                </div>
                                            </div>
                                        )}
                                    </For>
                                </div>
                            )}
                        </For>
                    </div>
                </Show>
                <Show when={timetable()}>
                    <div class="sm:mt-0 mt-2">
                        <div>
                            <div class="bg-gray-200  text-zinc-600 p-2 rounded-full text-xs">
                                {group2()
                                    ? `Common Breaks of ${selectedGroup()} With ${group2()}`
                                    : `Select your friend's group to see common breaks`}
                            </div>
                            <div class="flex flex-wrap gap-1 sm:max-w-[300px] mt-2">
                                <For each={commonBreaks()}>
                                    {(commonBreak) => (
                                        <div class="shadow-lg rounded-lg p-2">
                                            <div
                                                class={`text-xs ${
                                                    commonBreak.dayindex ===
                                                    new Date().getDay() - 1
                                                        ? "text-green-500"
                                                        : "text-gray-500"
                                                }`}
                                            >
                                                {commonBreak.dayname}
                                            </div>
                                            <div class="flex gap-1 text-gray-700">
                                                <div class="">
                                                    {commonBreak.startat}
                                                </div>
                                                <div class="">-</div>
                                                <div class="">
                                                    {commonBreak.endat}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </For>
                            </div>
                        </div>
                        <div>
                            <div class="grid grid-cols-3 text-center gap-1 sm:max-w-[300px] mt-2">
                                <For each={groups}>
                                    {(group) => (
                                        <div
                                            class={`p-2 cursor-pointer text-xs rounded-full ${
                                                group2() !== group.groupname
                                                    ? "bg-gray-100 text-blue-700"
                                                    : "text-white bg-blue-700"
                                            }`}
                                            onClick={() =>
                                                fetchCommonBreaks(
                                                    group.groupname
                                                )
                                            }
                                        >
                                            {group.groupname}
                                        </div>
                                    )}
                                </For>
                            </div>
                        </div>
                    </div>
                </Show>
            </div>
        </div>
    );
};

export default Timetable;
