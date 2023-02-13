import mongoose from "mongoose";
import fs from "fs";
import { DB_URI } from "./envs.js";
import Subject from "../models/Subject.js";
import File from "../models/File.js";
import UniversalEvent from "../models/UniversalEvent.js";
import User from "../models/User.js";
import { extractNameFromEmail } from "./helper.js";
import TimeTable from "../models/TimeTable.js";

// mongoose.set("debug", true);

export async function connecDatabase() {
    return new Promise((resolve, reject) => {
        mongoose
            .connect(DB_URI)
            .then((res, err) => {
                if (err) {
                    return reject(err);
                }
                console.log("\n✅ Database connected");
                resolve();
            })
            .catch((err) => {
                console.log(err);
                reject(err);
            });
    });
}

async function renameField() {
    //1
    // await Subject.updateMany(
    //     {},
    //     {
    //         $rename: {
    //             subjectname: "subjectName",
    //             subjecttheme: "subjectTheme",
    //             publisher_id: "publisherId",
    //         },
    //     }
    // );
    //2
    // await File.updateMany(
    //     {},
    //     {
    //         $rename: {
    //             subject_id: "subject",
    //             file_url: "fileUrl",
    //             uploader_id: "uploaderId",
    //         },
    //     }
    // );
    //2
    // await UniversalEvent.updateMany(
    //     {},
    //     {
    //         $rename: {
    //             publisher_id: "publisherId",
    //             event_on: "eventOn",
    //         },
    //     }
    // );
    console.log("✅ Renamed fields");
}

async function deleteFields() {
    // 1 remove subject code, cho, totalFiles field from subjects

    await Subject.collection.updateMany(
        {},
        { $unset: { cho: 1, subjectcode: 1, totalFiles: 1 } }
    );
    // 1 remove saved field from users

    await User.collection.updateMany({}, { $unset: { saved: 1, batch: 1 } });
    console.log("✅ Deleted fields");
}

async function updateFields() {
    //1 convert subjectId string to ObjectId and add status field

    const files = await File.find();
    const updatedFiles = JSON.parse(JSON.stringify(files)).map((file) => {
        return {
            ...file,
            subject: file.subject
                ? mongoose.Types.ObjectId(file.subject)
                : null,
            _id: mongoose.Types.ObjectId(file._id),
            uploaderId: mongoose.Types.ObjectId(file.uploaderId),
            status: "active",
        };
    });
    console.log(updatedFiles[0]);
    // delete all files
    await File.collection.deleteMany({});
    // insert all files
    await File.collection.insertMany(updatedFiles);

    //2 convert eventOn string to Date, add batchId

    /*
    const events = await UniversalEvent.find();
    const updatedEvents = JSON.parse(JSON.stringify(events)).map((event) => {
        return {
            ...event,
            eventOn: new Date(event.eventOn),
            _id: mongoose.Types.ObjectId(event._id),
            publisherId: mongoose.Types.ObjectId(event.publisherId),
            batchId: "Chitkara University-CSE-2020-2024",
        };
    });
    console.log(updatedEvents[0]);
    // delete all events
    await UniversalEvent.collection.deleteMany({});
    // insert all events
    await UniversalEvent.collection.insertMany(updatedEvents);
    */

    //3 add batchId, signUpType field in users
    /**
    const users = await User.find();
    const updatedUsers = JSON.parse(JSON.stringify(users)).map((user) => {
        return {
            ...user,
            _id: mongoose.Types.ObjectId(user._id),
            signupType: "email",
            batchId: "Chitkara University-CSE-2020-2024",
            name: extractNameFromEmail(user.email),
        };
    });
    // delete all files
    await User.collection.deleteMany({});
    // insert all files
    await User.collection.insertMany(updatedUsers);
    */

    //4 publishedId to mongoose.Types.ObjectId & convert subjectTheme to to hex
    /**
    const subjects = await Subject.find();
    const updatedSubjects = JSON.parse(JSON.stringify(subjects)).map(
        (subject) => {
            return {
                ...subject,
                _id: mongoose.Types.ObjectId(subject._id),
                publisherId: mongoose.Types.ObjectId(subject.publisherId),
                subjectTheme: "#DBEAFE",
                batchId: "Chitkara University-CSE-2020-2024",
            };
        }
    );
    // delete all files
    await Subject.collection.deleteMany({});
    // insert all files
    await Subject.collection.insertMany(updatedSubjects);
 */

    //4 batchId in Timetable
    /**
    const timetables = await TimeTable.find();
    const updatedTimetables = JSON.parse(JSON.stringify(timetables)).map(
        (timetable) => {
            return {
                ...timetable,
                _id: mongoose.Types.ObjectId(timetable._id),
                addedByAdminId: mongoose.Types.ObjectId(
                    "63a721b5b1e4a71ee04a50a1"
                ),
                batchId: "Chitkara University-CSE-2020-2024",
            };
        }
    );
    // delete all files
    await TimeTable.collection.deleteMany({});
    // insert all files
    await TimeTable.collection.insertMany(updatedTimetables);
 */

    console.log("✅ Updated fields");
}

const BATCH_ID_22 = "Chitkara University-CSE-2022-2026";

async function importUsers() {
    console.log("Importing new users");
    const users = fs.readFileSync("dump22/users.json");
    const parsedUsers = JSON.parse(users);
    const updatedUsers = parsedUsers.map((user) => {
        return {
            ...user,
            _id: mongoose.Types.ObjectId(user._id),
            signupType: "email",
            batchId: BATCH_ID_22,
            name: extractNameFromEmail(user.email),
        };
    });

    // upsert users
    await User.collection.insertMany(updatedUsers, {
        ordered: false,
        writeConcern: {
            w: "majority",
            j: true,
            wtimeout: 1000,
        },
    });
    console.log("✅ Imported new users");
}

async function importSubjects() {
    console.log("Importing new subjects");
    const docs = fs.readFileSync("dump22/subject.json");
    const parsedDocs = JSON.parse(docs);
    const updatedDocs = parsedDocs.map((doc) => {
        return {
            ...doc,
            _id: mongoose.Types.ObjectId(doc._id),
            subjectName: doc.subjectname,
            subjectTheme: "#DBEAFE",
            publisherId: mongoose.Types.ObjectId(doc.published_id),
            batchId: BATCH_ID_22,
        };
    });

    // upsert subjects
    await Subject.collection.insertMany(updatedDocs, {
        ordered: false,
        writeConcern: {
            w: "majority",
            j: true,
            wtimeout: 1000,
        },
    });
    console.log("✅ Imported new subjects");
}

async function importFiles() {
    console.log("Importing new files");
    await File.collection.deleteMany({ batchId: BATCH_ID_22 });
    const docs = fs.readFileSync("dump22/files.json");
    const parsedDocs = JSON.parse(docs);
    const updatedDocs = parsedDocs.map((doc) => {
        return {
            ...doc,
            _id: mongoose.Types.ObjectId(doc._id),
            subject: doc.subject_id
                ? mongoose.Types.ObjectId(doc.subject_id)
                : null,
            fileUrl: doc.file_url,
            status: "active",
            uploaderId: mongoose.Types.ObjectId(doc.uploader_id),
            batchId: BATCH_ID_22,
        };
    });

    // delete those whose fileUrl is null
    await File.collection.deleteMany({ fileUrl: null });

    // upsert files
    await File.collection.insertMany(updatedDocs, {
        ordered: false,
        writeConcern: {
            w: "majority",
            j: true,
            wtimeout: 1000,
        },
    });
    console.log("✅ Imported new files");
}

async function importEvents() {
    console.log("Importing new events");
    const docs = fs.readFileSync("dump22/events.json");
    const parsedDocs = JSON.parse(docs);
    const updatedDocs = parsedDocs.map((doc) => {
        return {
            ...doc,
            _id: mongoose.Types.ObjectId(doc._id),
            publisherId: mongoose.Types.ObjectId(doc.publisher_id),
            eventOn: new Date(doc.event_on),
            batchId: BATCH_ID_22,
        };
    });

    // upsert events
    await UniversalEvent.collection.insertMany(updatedDocs, {
        ordered: false,
        writeConcern: {
            w: "majority",
            j: true,
            wtimeout: 1000,
        },
    });
    console.log("✅ Imported new events");
}

async function importTimetables() {
    console.log("Importing new timetables");
    const docs = fs.readFileSync("dump22/timetables.json");
    const parsedDocs = JSON.parse(docs);
    const updatedDocs = parsedDocs.map((doc) => {
        return {
            ...doc,
            _id: mongoose.Types.ObjectId(doc._id),
            addedByAdminId: mongoose.Types.ObjectId(doc.added_by_admin_id),
            batchId: BATCH_ID_22,
        };
    });

    // upsert timetables
    await TimeTable.collection.insertMany(updatedDocs, {
        ordered: false,
        writeConcern: {
            w: "majority",
            j: true,
            wtimeout: 1000,
        },
    });
    console.log("✅ Imported new timetables");
}

export async function dbFixes() {
    // await updateFields();
    // await renameField();
    // await deleteFields();
    // await importsers();
    // await importSubjects();
    // await importFiles();
    // await importEvents();
    // importTimetables();
}
