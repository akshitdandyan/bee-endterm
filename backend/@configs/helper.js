import Batch from "../models/Batch";
import { CLOUDINARY_CLOUD_NAME, FRONTEND_APP_URL } from "./envs";
import UAParser from "ua-parser-js";
import Activity from "../models/Activity";
import WebPush from "../models/WebPush";
import webPush from "./web-push";

export const generateOtp = () => {
    let otp = "";
    for (let i = 0; i < 6; i++) {
        otp += Math.floor(Math.random() * 10);
    }
    return otp;
};

export const generateToken = () => {
    let text = "";
    const possible =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < 30; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text + Date.now();
};

export const extractNameFromEmail = (email) => {
    // if there is .be22 or .be23 or .be24 in email, regex will remove it ;
    const name = email
        .split("@")[0]
        .replace(/\.be\d{2}/, "")
        .replace(/\d/g, "");
    const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);
    return capitalizedName;
};

export async function isBatchIdValid(batchId) {
    try {
        const batch = await Batch.findOne({ batchId });
        if (batch) {
            return true;
        }
        return false;
    } catch (error) {
        console.log(error);
        return false;
    }
}

export function fileTypeByExtension(extension) {
    switch (extension) {
        case "pdf":
            return "pdf";
        case "ppt":
        case "pptx":
            return "ppt";
        case "doc":
        case "docx":
            return "doc";
        case "jpg":
        case "jpeg":
        case "png":
        case "gif":
        case "svg":
        case "webp":
            return "image";
        case "mp4":
        case "mkv":
        case "avi":
        case "mov":
            return "video";
        case "zip":
        case "rar":
        case "tar":
        case "gz":
            return "zip";
        default:
            return "other";
    }
}

export function getThumbnailUrl(public_id) {
    return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/w_200,h_250,c_fill,pg_1/${public_id}.png`;
}

export function parseUserAgent(userAgent) {
    const parser = new UAParser(userAgent);
    const result = parser.getResult();
    return {
        browserName: result.browser.name,
        osName: result.os.name,
        device: `${result.device.vendor}:${result.device.model}`,
    };
}

export function getActivityMessage(req, type, helperText) {
    switch (type) {
        case "login":
            return `${req.user.email} logged in`;
        case "admin-upload":
            return `${req.user.email} uploaded ${helperText}`;
        default:
            return "Type not found";
    }
}

export async function createActivity(req, type, helperText = "") {
    try {
        const userAgent = req.headers["user-agent"];
        const { browserName, osName, device } = parseUserAgent(userAgent);
        const newActivity = Activity.create({
            user: req.user._id,
            userEmail: req.user.email,
            type,
            browserName,
            osName,
            device,
            message: getActivityMessage(req, type, helperText),
        });
        return {
            success: true,
            message: "Activity added",
        };
    } catch (error) {
        console.log(error);
        return {
            success: false,
            message: "Something went wrong",
        };
    }
}

export async function sendPushNotificationToAllUsers({
    title,
    body,
    icon = "https://ik.imagekit.io/csecrew/csecrew-neon-icon_A4FXMRCpL.png",
    url = FRONTEND_APP_URL + "/dashboard",
    image,
    batchId,
}) {
    try {
        let success = 0,
            failed = 0;
        const webPushes = await WebPush.find({}).populate("user", "batchId");

        console.log("webPushes[0]", webPushes[0]);

        const filteredWebPushes = webPushes.filter((webPush) => {
            if (batchId) {
                return webPush.user.batchId === batchId;
            }
            return false;
        });

        // send push notification to all users, if any error occurs, just ignore it, if endoint is invalid, remove it from db
        filteredWebPushes.map((doc) => {
            try {
                webPush
                    .sendNotification(
                        doc,
                        JSON.stringify({ title, body, icon, url, image })
                    )
                    .then((r) => {
                        success++;
                    })
                    .catch((error) => {
                        console.log("err-> ", error);
                        failed++;
                        WebPush.findByIdAndDelete(doc._id);
                    });
            } catch (error) {
                WebPush.findByIdAndDelete(webPush._id);
                failed++;
            }
        });
        console.log(
            `Push notification sent to ${success} users, ${failed} failed`
        );
    } catch (error) {
        console.log("[sendPushNotificationToAllUsers] error:", error);
    }
}

function isLarge(t1, t2) {
    return Number(t1.replace(":", "")) > Number(t2.replace(":", ""));
}

export function getCommonBreaks(timetable1, timetable2) {
    const commonBreaks = [];

    timetable1.days.map((day) => {
        const dayIndex = day.dayindex;
        const dayName = day.dayname;
        const classes = day.classes;
        const classes2 = timetable2.days[dayIndex].classes;

        const breaks1 = [];
        const breaks2 = [];

        for (let i = 0; i < classes.length - 1; i++) {
            const currClass = classes[i];
            const nextClass = classes[i + 1];
            const breakStart = currClass.endat;
            const breakEnd = nextClass.startat;
            if (breakStart !== breakEnd) {
                breaks1.push({
                    startat: breakStart,
                    endat: breakEnd,
                });
            }
        }
        if (classes[0].startat !== "9:00") {
            breaks1.push({
                startat: "9:00",
                endat: classes[0].startat,
            });
        }
        if (classes[classes.length - 1].endat !== "16:30") {
            breaks1.push({
                startat: classes[classes.length - 1].endat,
                endat: "16:30",
            });
        }

        for (let i = 0; i < classes2.length - 1; i++) {
            const currClass = classes2[i];
            const nextClass = classes2[i + 1];
            const breakStart = currClass.endat;
            const breakEnd = nextClass.startat;
            if (breakStart !== breakEnd) {
                breaks2.push({
                    startat: breakStart,
                    endat: breakEnd,
                });
            }
        }
        if (classes2[0].startat !== "9:00") {
            breaks2.push({
                startat: "9:00",
                endat: classes2[0].startat,
            });
        }
        if (classes2[classes2.length - 1].endat !== "16:30") {
            breaks2.push({
                startat: classes2[classes2.length - 1].endat,
                endat: "16:30",
            });
        }

        // console.log(dayName);
        // console.log(breaks1);
        // console.log(breaks2);
        // console.log("-----");

        breaks1.map((break1) => {
            breaks2.map((break2) => {
                if (
                    break1.startat === break2.startat &&
                    break1.endat === break2.endat
                ) {
                    commonBreaks.push({
                        dayname: dayName,
                        dayindex: dayIndex,
                        startat: break1.startat,
                        endat: break1.endat,
                    });
                    return true;
                }

                if (break1.startat === break2.startat) {
                    if (
                        isLarge(break1.endat, break2.endat) &&
                        isLarge(break2.endat, break1.startat)
                    ) {
                        commonBreaks.push({
                            dayname: dayName,
                            dayindex: dayIndex,
                            startat: break1.startat,
                            endat: break2.endat,
                        });
                    } else {
                        commonBreaks.push({
                            dayname: dayName,
                            dayindex: dayIndex,
                            startat: break1.startat,
                            endat: break1.endat,
                        });
                    }
                    return true;
                }

                if (break1.endat === break2.endat) {
                    if (
                        isLarge(break1.startat, break2.startat) &&
                        isLarge(break2.startat, break1.endat)
                    ) {
                        commonBreaks.push({
                            dayname: dayName,
                            dayindex: dayIndex,
                            startat: break2.startat,
                            endat: break1.endat,
                        });
                    } else {
                        commonBreaks.push({
                            dayname: dayName,
                            dayindex: dayIndex,
                            startat: break1.startat,
                            endat: break1.endat,
                        });
                    }
                    return true;
                }

                if (
                    isLarge(break1.startat, break2.startat) &&
                    isLarge(break1.endat, break2.endat) &&
                    isLarge(break2.endat, break1.startat)
                ) {
                    commonBreaks.push({
                        dayname: dayName,
                        dayindex: dayIndex,
                        startat: break1.startat,
                        endat: break2.endat,
                    });
                    return true;
                }

                if (
                    isLarge(break2.startat, break1.startat) &&
                    isLarge(break2.endat, break1.endat) &&
                    isLarge(break1.endat, break2.startat)
                ) {
                    commonBreaks.push({
                        dayname: dayName,
                        dayindex: dayIndex,
                        startat: break2.startat,
                        endat: break1.endat,
                    });
                }

                return true;
            });
        });
    });

    // filter out those who have same start and same day
    const filteredCommonBreaks = [];
    commonBreaks.map((commonBreak) => {
        const isPresent = filteredCommonBreaks.find(
            (filteredCommonBreak) =>
                filteredCommonBreak.dayindex === commonBreak.dayindex &&
                filteredCommonBreak.startat === commonBreak.startat
        );
        if (!isPresent) {
            filteredCommonBreaks.push(commonBreak);
        }
        return true;
    });

    return filteredCommonBreaks;
}
