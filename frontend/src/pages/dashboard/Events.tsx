import {
    Component,
    createEffect,
    createSignal,
    For,
    onCleanup,
    onMount,
    Show,
} from "solid-js";
import { axiosAuth } from "../../@utils/axios";
import { DAYS, MONTHS, YEARS } from "../../@utils/constants";
import { Day } from "../../@utils/context";
import {
    getEndDateToFetchEvents,
    getRandomColor,
    getStartDateToFetchEvents,
} from "../../@utils/helpers";
import Dropdown from "../../components/Dropdown/Dropdown";

const DayComponent: Component<{
    day: Day;
    belongsToCurrMonth: boolean;
    isToday: boolean;
    showEventMenu: (e: MouseEvent, title: string, description: string) => void;
    showMobileEventMenu: (day: Day) => void;
}> = ({
    day,
    belongsToCurrMonth,
    isToday,
    showEventMenu,
    showMobileEventMenu,
}) => {
    const hasEvents = day.events?.length > 0;
    const color = getRandomColor();
    return (
        <div
            class={"p-2 rounded-lg bg-gray-100 shadow-lg relative"}
            onclick={() => showMobileEventMenu(day)}
        >
            <Show when={hasEvents}>
                <div class="absolute -top-1 -right-1 sm:hidden bg-green-100 text-green-700 rounded-full aspect-square p-1 text-xs">
                    {day.events.length}
                </div>
            </Show>
            <div class="flex justify-between">
                <div
                    class={`text-sm ${
                        isToday && belongsToCurrMonth
                            ? "bg-blue-500 text-white px-1  rounded-full aspect-square"
                            : belongsToCurrMonth
                            ? "text-blue-500"
                            : "text-gray-500"
                    }`}
                >
                    {day.date}
                </div>
                <Show when={hasEvents}>
                    <div
                        class={`hidden sm:block text-xs ${
                            hasEvents && belongsToCurrMonth
                                ? "text-blue-500"
                                : "text-gray-500"
                        }`}
                    >
                        {day.events.length}{" "}
                        {day.events.length === 1 ? "event" : "events"}
                    </div>
                </Show>
            </div>
            <Show when={hasEvents}>
                <div class="hidden sm:grid grid-cols-2 gap-1">
                    <For each={day.events}>
                        {(event) => (
                            <abbr title={event.title}>
                                <div
                                    class={`truncate rounded-sm mt-1 p-1 border-l-4  border-l-${color}-600 bg-${color}-100 hover:bg-${color}-200 active:opacity-25 duration-150 cursor-pointer text-${color}-600 text-xs`}
                                    onclick={(e) => {
                                        e.stopPropagation();
                                        showEventMenu(
                                            e,
                                            event.title,
                                            event.description
                                        );
                                    }}
                                >
                                    {event.title}
                                </div>
                            </abbr>
                        )}
                    </For>
                </div>
            </Show>
            <Show when={!hasEvents}>
                <div class="hidden sm:block text-xs text-gray-500 text-center pb-2">
                    No events
                </div>
            </Show>
        </div>
    );
};

const currMonth = new Date().getMonth();
const currDate = new Date().getDate();
const currYear = new Date().getFullYear();

const Events = () => {
    const [month, setMonth] = createSignal(new Date().getMonth());
    const [year, setYear] = createSignal(new Date().getFullYear());

    const [prevMonthDays, setPrevMonthDays] = createSignal<Day[]>([]);
    const [currentMonthDays, setCurrentMonthDays] = createSignal<Day[]>([]);
    const [nextMonthDays, setNextMonthDays] = createSignal<Day[]>([]);

    const [eventMenu, setEventMenu] = createSignal({
        top: "0px",
        left: "0px",
        description: "",
        title: "",
    });

    const [mobileEventMenu, setMobileEventMenu] = createSignal<Day>();

    const fetchEvents = async () => {
        try {
            const startDate = getStartDateToFetchEvents(
                year(),
                month(),
                prevMonthDays().length
            );
            const endDate = getEndDateToFetchEvents(
                year(),
                month(),
                prevMonthDays().length
            );

            const res = await axiosAuth(
                `/dashboard/getevents?startDate=${startDate}&endDate=${endDate}`
            );
            if (res.data.success) {
                const { currentMonthDays, nextMonthDays, prevMonthDays } =
                    getDaysStructure();
                const events = res.data.payload.events;

                const updatedPrevMonthDays = prevMonthDays.map((day) => {
                    const eventsOnDay = events.filter(
                        (event) =>
                            new Date(event.eventOn).getDate() === day.date &&
                            new Date(event.eventOn).getMonth() === day.month
                    );
                    return { ...day, events: eventsOnDay };
                });

                const updatedCurrentMonthDays = currentMonthDays.map((day) => {
                    const eventsOnDay = events.filter(
                        (event) =>
                            new Date(event.eventOn).getDate() === day.date &&
                            new Date(event.eventOn).getMonth() === day.month
                    );
                    return { ...day, events: eventsOnDay };
                });

                const updatedNextMonthDays = nextMonthDays.map((day) => {
                    const eventsOnDay = events.filter(
                        (event) =>
                            new Date(event.eventOn).getDate() === day.date &&
                            new Date(event.eventOn).getMonth() === day.month
                    );
                    return { ...day, events: eventsOnDay };
                });

                setPrevMonthDays(updatedPrevMonthDays);
                setCurrentMonthDays(updatedCurrentMonthDays);
                setNextMonthDays(updatedNextMonthDays);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const getDaysStructure = () => {
        const firstDay = new Date(year(), month(), 1).getDay();
        const lastDay = new Date(year(), month() + 1, 0).getDay();
        const daysInMonth = new Date(year(), month() + 1, 0).getDate();
        const daysInPrevMonth = new Date(year(), month(), 0).getDate();

        const prevMonthDays: Day[] = [];
        for (let i = 0; i < firstDay; i++) {
            prevMonthDays.push({
                date: daysInPrevMonth - i,
                month: month() - 1,
            });
        }

        const currentMonthDays: Day[] = [];
        for (let i = 1; i <= daysInMonth; i++) {
            currentMonthDays.push({ date: i, month: month() });
        }

        const nextMonthDays: Day[] = [];
        for (let i = 1; i <= 6 - lastDay; i++) {
            nextMonthDays.push({ date: i, month: month() + 1 });
        }

        return {
            prevMonthDays: prevMonthDays.reverse(),
            currentMonthDays,
            nextMonthDays,
        };
    };

    createEffect(() => {
        const { currentMonthDays, nextMonthDays, prevMonthDays } =
            getDaysStructure();
        setPrevMonthDays(prevMonthDays);
        setCurrentMonthDays(currentMonthDays);
        setNextMonthDays(nextMonthDays);
    });

    onMount(() => {
        const { currentMonthDays, nextMonthDays, prevMonthDays } =
            getDaysStructure();
        setPrevMonthDays(prevMonthDays);
        setCurrentMonthDays(currentMonthDays);
        setNextMonthDays(nextMonthDays);
        fetchEvents();
    });

    const showEventMenu = (
        e: MouseEvent,
        title: string,
        description: string
    ) => {
        e.preventDefault();
        e.stopPropagation();
        const x = e.clientX;
        const y = e.clientY;
        let top = y + "px";
        let left = x + "px";
        // set the position of the menu, it should be within the screen
        if (window.innerWidth - x < 200) {
            left = x - 200 + "px";
        }
        if (window.innerHeight - y < 300) {
            top = y - 300 / 2 + "px";
        }

        setEventMenu({
            top: top,
            left: left,
            title,
            description,
        });
    };

    function closeMenu(e: MouseEvent) {
        // close the menu if the user clicks outside the menu
        if (
            !(
                e.target instanceof HTMLElement &&
                e.target.closest(".events-view-menu")
            )
        ) {
            setEventMenu({
                top: "0px",
                left: "0px",
                title: "",
                description: "",
            });
        }
    }

    onMount(() => {
        window.addEventListener("click", closeMenu);
    });

    onCleanup(() => {
        document.removeEventListener("click", closeMenu);
    });

    return (
        <div class="p-4">
            <div class="flex gap-2">
                <Dropdown
                    options={MONTHS.map((m) => ({ key: m, value: m }))}
                    onChange={(v: string) => {
                        setMonth(MONTHS.indexOf(v));
                        fetchEvents();
                    }}
                    defaultValue={MONTHS[month()]}
                />
                <Dropdown
                    options={YEARS.map((y) => ({ key: y, value: y }))}
                    onChange={(v: string) => {
                        setYear(parseInt(v));
                        fetchEvents();
                    }}
                    defaultValue={year()}
                />
            </div>
            <div class="border-b-2 mt-2"></div>
            <div class="grid grid-cols-7 gap-4">
                <For each={DAYS}>
                    {(day) => (
                        <div class="text-center uppercase text-sm font-bold p-2 rounded-lg text-blue-500">
                            {day}
                        </div>
                    )}
                </For>
            </div>
            <div class="grid grid-cols-7 gap-4">
                <Show when={eventMenu().title}>
                    <div
                        class="fixed bg-white rounded-md shadow-lg z-10 p-2 events-view-menu duration-200"
                        style={{
                            top: eventMenu().top,
                            left: eventMenu().left,
                        }}
                    >
                        <div class="text-blue-900 font-semibold px-2">
                            {eventMenu().title}
                        </div>
                        <div class="border-b-2 border-blue-900"></div>
                        <pre class="max-h-72 max-w-xs text-sm text-gray-500 overflow-y-auto custom-sc whitespace-pre-wrap break-words">
                            {eventMenu().description}
                        </pre>
                    </div>
                </Show>
                <For each={prevMonthDays()}>
                    {(day) => (
                        <DayComponent
                            day={day}
                            belongsToCurrMonth={false}
                            isToday={
                                month() === currMonth &&
                                day.date === currDate &&
                                year() === currYear
                            }
                            showEventMenu={showEventMenu}
                            showMobileEventMenu={(day) =>
                                setMobileEventMenu(day)
                            }
                        />
                    )}
                </For>
                <For each={currentMonthDays()}>
                    {(day) => (
                        <DayComponent
                            day={day}
                            belongsToCurrMonth={true}
                            isToday={
                                month() === currMonth &&
                                day.date === currDate &&
                                year() === currYear
                            }
                            showEventMenu={showEventMenu}
                            showMobileEventMenu={(day) =>
                                setMobileEventMenu(day)
                            }
                        />
                    )}
                </For>
                <For each={nextMonthDays()}>
                    {(day) => (
                        <DayComponent
                            day={day}
                            belongsToCurrMonth={false}
                            isToday={
                                month() === currMonth &&
                                day.date === currDate &&
                                year() === currYear
                            }
                            showEventMenu={showEventMenu}
                            showMobileEventMenu={(day) =>
                                setMobileEventMenu(day)
                            }
                        />
                    )}
                </For>
            </div>

            <Show when={mobileEventMenu() && mobileEventMenu().events?.length}>
                <div class="mt-2 sm:hidden">
                    <div class="text-green-800 text-sm">
                        Events on {mobileEventMenu().date}{" "}
                        {MONTHS[mobileEventMenu().month]}
                    </div>
                    <div class="">
                        <For each={mobileEventMenu().events}>
                            {(event) => (
                                <div class="my-4 border-l-4 border-green-600 bg-green-100 rounded-md py-1 px-4">
                                    <div class="text-sm text-green-600 font-semibold">
                                        {new Date(event.eventOn).toDateString()}
                                    </div>
                                    <div class=" text-green-700 text-xs font-semibold mt-1">
                                        {event.title}
                                    </div>
                                    <div class="text-sm text-gray-600">
                                        {event.description}
                                    </div>
                                </div>
                            )}
                        </For>
                    </div>
                </div>
            </Show>
        </div>
    );
};

export default Events;
