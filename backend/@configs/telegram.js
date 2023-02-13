import axios from "axios";
import TelegramBot from "node-telegram-bot-api";
import Admin from "../models/Admin";
import File from "../models/File";
import Subject from "../models/Subject";
import { uploadFileToCloudinaryWithAxios } from "./cloud";
import { TELEGRAM_BOT_TOKEN } from "./envs";

const IDS = {
    FEEDBACK: "-836816519",
};

export const telegramBot = new TelegramBot(TELEGRAM_BOT_TOKEN, {
    polling: true,
});

console.log("Telegram bot started...");

const documentMap = new Map(); // admin username & {telegramFileId, fileName, size, description, subject,admin,chatId}

telegramBot.on("message", async (message) => {
    // remove keyboard
    console.log(message);
    if (
        !(
            message.chat.title.includes("2022-2026") ||
            message.chat.title.includes("2020-2024")
        )
    ) {
        console.log("not a group for uploading...");
        return;
    } else {
        console.log("group for uploading...");
    }
    const username = message.from.username;
    if (!username) {
        telegramBot.sendMessage(
            message.chat.id,
            "I am unable to see your username. Please fix it and try again.",
            {
                reply_to_message_id: message.message_id,
            }
        );
        return;
    }

    const admin = await Admin.findOne({ telegramUsername: username });

    if (!admin) {
        telegramBot.sendMessage(
            message.chat.id,
            "Unable to verify you. @askception please fix it.",
            {
                reply_to_message_id: message.message_id,
            }
        );
        return;
    }

    // with file
    if (message.document) {
        const fileId = message.document.file_id;
        documentMap.set(username, {
            telegramFileId: fileId,
            description: message.caption,
            subject: null,
            fileName: message.document.file_name,
            size: message.document.file_size,
            admin: admin,
            chatId: message.chat.id,
        });
        console.log("documentMap:", documentMap);

        const subjects = await Subject.find({ status: "active" }).select(
            "subjectName"
        );

        const inline_keyboard = [
            [
                {
                    text: "Announcement 🔔",
                    callback_data:
                        username + "-handleDocumentUpload-announcement",
                },
            ],
        ];

        for (let i = 0; i < subjects.length; i += 2) {
            if (i + 1 >= subjects.length) {
                inline_keyboard.push([
                    {
                        text: subjects[i].subjectName,
                        callback_data:
                            username +
                            "-handleDocumentUpload-" +
                            subjects[i]._id,
                    },
                ]);
                break;
            }
            inline_keyboard.push([
                {
                    text: subjects[i].subjectName,
                    callback_data:
                        username + "-handleDocumentUpload-" + subjects[i]._id,
                },
                {
                    text: subjects[i + 1].subjectName,
                    callback_data:
                        username +
                        "-handleDocumentUpload-" +
                        subjects[i + 1]._id,
                },
            ]);
        }

        telegramBot.sendMessage(message.chat.id, "Select channel", {
            reply_to_message_id: message.message_id,
            reply_markup: {
                inline_keyboard,
            },
        });

        return;
    }

    // only text
    if (message.text) {
        documentMap.set(username, {
            description: message.text,
            subject: null,
            admin: admin,
            chatId: message.chat.id,
        });
        console.log("documentMap:", documentMap);

        const subjects = await Subject.find({
            status: "active",
        }).select("subjectName");

        const inline_keyboard = [
            [
                {
                    text: "Announcement 🔔",
                    callback_data: username + "-handleTextUpload-announcement",
                },
            ],
        ];

        for (let i = 0; i < subjects.length; i += 2) {
            if (i + 1 >= subjects.length) {
                inline_keyboard.push([
                    {
                        text: subjects[i].subjectName,
                        callback_data:
                            username + "-handleTextUpload-" + subjects[i]._id,
                    },
                ]);
                break;
            }
            inline_keyboard.push([
                {
                    text: subjects[i].subjectName,
                    callback_data:
                        username + "-handleTextUpload-" + subjects[i]._id,
                },
                {
                    text: subjects[i + 1].subjectName,
                    callback_data:
                        username + "-handleTextUpload-" + subjects[i + 1]._id,
                },
            ]);
        }

        telegramBot.sendMessage(message.chat.id, "Select channel", {
            reply_to_message_id: message.message_id,
            reply_markup: {
                inline_keyboard,
            },
        });
    }
});

async function saveUploadDetailsInDB({
    subject,
    admin,
    fileName,
    size,
    description,
    fileId,
    fileUrl,
    thumbnailUrl,
    fileType,
    chatId,
}) {
    console.log("saveUploadDetailsInDB details:", {
        subject,
        admin,
        fileName,
        size,
        description,
        fileId,
        fileUrl,
        thumbnailUrl,
        fileType,
        chatId,
    });
    try {
        const newFile = await File.create({
            description,
            filename: fileName,
            size,
            subject,
            uploaderId: admin._id,
            batchId: admin.batchId,
            fileId,
            fileUrl,
            thumbnailUrl,
            fileType,
        });

        telegramBot.sendMessage(
            chatId,
            subject
                ? "Resource uploaded successfully"
                : "Announcement uploaded successfully"
        );
    } catch (error) {
        console.log(error);
    }
}

async function handleTelegramFileUpload({
    telegramFileId,
    subject,
    fileName,
    size,
    description,
    admin,
    chatId,
}) {
    try {
        const file = await telegramBot.getFile(telegramFileId);
        const fileLink = `https://api.telegram.org/file/bot${TELEGRAM_BOT_TOKEN}/${file.file_path}`;
        console.log("fileLink:", fileLink);
        const res = await axios.get(fileLink, {
            responseType: "arraybuffer",
        });
        // convert res.data in dataURL
        const dataURL = `data:${file.mime_type};base64,${Buffer.from(
            res.data,
            "binary"
        ).toString("base64")}`;

        console.log("Uploading to cloudinary...");

        const cloudinaryResponse = await uploadFileToCloudinaryWithAxios(
            dataURL,
            fileName,
            subject ? "resource" : "announcement",
            (e) => {}
        );
        console.log("cloudinaryResponse:", cloudinaryResponse);
        if (!cloudinaryResponse.success) {
            console.log("Telegram upload failed:", cloudinaryResponse);
            return;
        } else {
            saveUploadDetailsInDB({
                admin,
                description,
                chatId,
                fileName,
                size,
                subject,
                fileId: cloudinaryResponse.data.publicId,
                fileUrl: cloudinaryResponse.data.url,
                thumbnailUrl: cloudinaryResponse.data.thumbnailUrl,
                fileType: cloudinaryResponse.data.fileType,
            });
        }
    } catch (error) {
        console.log(error);
    }
}

telegramBot.on("callback_query", async (callbackQuery) => {
    console.log("documentMap:", documentMap);
    console.log("callbackQuery:", callbackQuery);

    const [username, activityName, type] = callbackQuery.data.split("-");
    const subject = type === "announcement" ? null : type;
    const message = callbackQuery.message;
    console.log("username:", username);
    const data = documentMap.get(username);
    if (!data) {
        telegramBot.sendMessage(
            message.chat.id,
            `Something went wrong. Please try again.`
        );
        return;
    }
    console.log("data:", { ...data, subject });
    telegramBot.sendMessage(message.chat.id, `Uploading...`);

    if (activityName === "handleTextUpload") {
        console.log("handleTextUpload");
        await saveUploadDetailsInDB({ ...data, subject });
        return;
    } else {
        console.log("handleTelegramFileUpload");
        await handleTelegramFileUpload({ ...data, subject });
    }
    documentMap.delete(username);
});

export const sendFeedback = async (message) => {
    try {
        const res = await telegramBot.sendMessage(
            IDS.FEEDBACK,
            "New Feedback 📩 \n\n" + message
        );
        if (res.message_id) {
            return {
                success: true,
            };
        }
    } catch (error) {
        console.log(error);
        return {
            success: false,
        };
    }
};
