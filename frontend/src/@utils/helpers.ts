import { axiosNormal } from "./axios";

export function timeSince(date: number) {
    var seconds = Math.floor((new Date().getTime() - date) / 1000);

    var interval = seconds / 31536000;

    if (interval > 1) {
        return (
            Math.floor(interval) +
            " year".concat(Math.floor(interval) > 1 ? "s ago" : " ago")
        );
    }
    interval = seconds / 2592000;
    if (interval > 1) {
        return (
            Math.floor(interval) +
            " month".concat(Math.floor(interval) > 1 ? "s ago" : " ago")
        );
    }
    interval = seconds / 86400;
    if (interval > 1) {
        return (
            Math.floor(interval) +
            " day".concat(Math.floor(interval) > 1 ? "s ago" : " ago")
        );
    }
    interval = seconds / 3600;
    if (interval > 1) {
        return (
            Math.floor(interval) +
            " hour".concat(Math.floor(interval) > 1 ? "s ago" : " ago")
        );
    }
    interval = seconds / 60;
    if (interval > 1) {
        return (
            Math.floor(interval) +
            " minute".concat(Math.floor(interval) > 1 ? "s ago" : " ago")
        );
    }
    return (
        Math.floor(seconds) +
        " second".concat(Math.floor(interval) > 1 ? "s ago" : " ago")
    );
}

export function daysInMonth(month: number, year: number) {
    return new Date(year, month, 0).getDate();
}

export function getStartDateToFetchEvents(
    year: number,
    month: number,
    prevMonthDaysVisible: number
) {
    const startDate = new Date(year, month - 1, 1);
    const day = startDate.getDay();
    const diff = day - prevMonthDaysVisible;
    startDate.setDate(startDate.getDate() - diff);
    if (month === 0) {
        startDate.setFullYear(year - 1);
        startDate.setMonth(11);
    }
    return startDate;
}

export function getEndDateToFetchEvents(
    year: number,
    month: number,
    nextMonthDaysVisible: number
) {
    const endDate = new Date(year, month + 1, 1);
    const day = endDate.getDay();
    const diff = nextMonthDaysVisible - day;
    endDate.setDate(endDate.getDate() + diff);
    if (month === 11) {
        endDate.setFullYear(year + 1);
        endDate.setMonth(0);
    }
    return endDate;
}

export const getRandomColor = () => {
    const colors = ["red", "blue", "green", "yellow"];
    return colors[Math.floor(Math.random() * colors.length)];
};

export async function getBatches() {
    try {
        const res = await axiosNormal.get("/user/batches");
        if (res.data.success) {
            return res.data.payload.batches.map(({ batchId }) => ({
                key: batchId.split("-")[2] + "-" + batchId.split("-")[3],
                value: batchId,
            }));
        }
        return [];
    } catch (error) {
        console.log(error);
        return [];
    }
}

export function urlBase64ToUint8Array(base64String: string) {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
        .replace(/\-/g, "+")
        .replace(/_/g, "/");

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

export function isImage(filename: string) {
    const ext = filename.split(".")[filename.split(".").length - 1];
    const imgExts = ["jpg", "jpeg", "png", "gif", "svg"];
    return imgExts.includes(ext);
}

export const urlify = (text: string) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.replaceAll(urlRegex, (url) => {
        return `<a href="${url}" target="_blank">${url}</a>`;
    });
};
