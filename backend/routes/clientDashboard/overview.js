import { Router } from "express";
import File from "../../models/File.js";
import Subject from "../../models/Subject.js";
import TimeTable from "../../models/TimeTable.js";
import UniversalEvent from "../../models/UniversalEvent.js";

const overviewRouter = Router();

overviewRouter.get("/getoverviewdetails", async (req, res) => {
    try {
        const groupname = req.query.groupname ?? "";
        const year = new Date().getFullYear();
        const month = new Date().getMonth() + 1;
        const day = new Date().getDate();
        const startDate = "".concat(year, "-", month, "-", day);
        // create endDate by adding 14 days to startDate
        const endDate = new Date(startDate);
        endDate.setDate(endDate.getDate() + 14);

        console.log("send events:", startDate, endDate);
        const [files, announcements, events, todayClasses] = await Promise.all([
            File.find({
                subject: { $ne: null },
                batchId: req.user.batchId,
                status: "active",
            })
                .sort({ createdAt: -1 })
                .limit(5)
                .populate("subject", "subjectName status")
                .select(
                    "subject filename size description createdAt thumbnailUrl"
                ),
            File.find({
                subject: null,
                batchId: req.user.batchId,
                status: "active",
            })
                .sort({
                    createdAt: -1,
                })
                .limit(5)
                .select("filename size description createdAt"),
            UniversalEvent.find({
                eventOn: {
                    $gte: startDate,
                    $lte: endDate,
                },
                batchId: req.user.batchId,
            }).select("title description eventOn"),
            TimeTable.findOne({ groupname, batchId: req.user.batchId }).select(
                "days"
            ),
        ]);

        res.status(200)
            .json({
                success: true,
                message: "OK",
                payload: {
                    files: files
                        .map((file) => ({
                            ...file._doc,
                            subjectName: file.subject.subjectName,
                        }))
                        .filter((file) => file.subject.status === "active")
                        .map((file) => ({
                            ...file,
                            subject: file.subject._id,
                        })),
                    announcements,
                    // sort events by eventOn
                    events: events.sort((a, b) => {
                        const aDate = new Date(a.eventOn);
                        const bDate = new Date(b.eventOn);
                        return aDate - bDate;
                    }),
                    todayClasses:
                        todayClasses?.days[new Date().getDay() - 1]?.classes ??
                        [],
                },
            })
            .end();
    } catch (error) {
        console.log(error);
        res.status(200).json({
            success: false,
            message: "Something went wrong",
        });
    }
});

overviewRouter.get("/search", async (req, res) => {
    try {
        const user = req.user;

        let payload = {
            announcements: [],
            files: [],
            events: [],
            subjects: [],
        };

        const { q } = req.query;

        const [announcements, files, events, subjects] = await Promise.all([
            File.find({
                batchId: user.batchId,
                status: "active",
                subject: null,
                $or: [
                    { filename: { $regex: q, $options: "i" } },
                    { description: { $regex: q, $options: "i" } },
                ],
            })
                .sort({ createdAt: -1 })
                .limit(3),
            File.find({
                batchId: user.batchId,
                status: "active",
                subject: { $ne: null },
                $or: [
                    { filename: { $regex: q, $options: "i" } },
                    { description: { $regex: q, $options: "i" } },
                ],
            })
                .sort({ createdAt: -1 })
                .limit(3)
                .populate("subject"),
            UniversalEvent.find({
                batchId: user.batchId,
                $or: [
                    { title: { $regex: q, $options: "i" } },
                    { description: { $regex: q, $options: "i" } },
                ],
            })
                .sort({ createdAt: -1 })
                .limit(3),
            Subject.find({
                batchId: user.batchId,
                status: "active",
                subjectName: { $regex: q, $options: "i" },
            })
                .sort({ createdAt: -1 })
                .limit(3),
        ]);

        payload.announcements = announcements;
        payload.files = files;
        payload.events = events;
        payload.subjects = subjects;

        res.status(200)
            .json({
                success: true,
                message: "OK",
                payload,
            })
            .end();
    } catch (error) {
        console.log(error);
        res.status(200).json({
            success: false,
            message: "Something went wrong",
            payload: null,
        });
    }
});

export default overviewRouter;
