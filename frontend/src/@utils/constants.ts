import {
    AnnouncementsIcon,
    DownloadIcon,
    EventsIcon,
    FileIcon,
    OverviewIcon,
    TimetableIcon,
} from "../components/icons";

export const dashboardNavItems = [
    {
        key: "Overview",
        path: "/",
        icon: OverviewIcon,
    },
    {
        key: "Resources",
        path: "/resources",
        icon: FileIcon,
    },
    {
        key: "Announcements",
        path: "/announcements",
        icon: AnnouncementsIcon,
    },
    {
        key: "Events",
        path: "/events",
        icon: EventsIcon,
    },
    {
        key: "Time Table",
        path: "/timetable",
        icon: TimetableIcon,
    },
    {
        key: "Downloads",
        path: "/downloads",
        icon: DownloadIcon,
    },
];

export const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export const MONTHS = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
];

export const YEARS = ["2022", "2023"];
