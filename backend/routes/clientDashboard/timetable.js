import { Router } from "express";
import { getCommonBreaks } from "../../@configs/helper.js";
import TimeTable from "../../models/TimeTable.js";

const timetableRouter = Router();

timetableRouter.get("/getgroups", async (req, res) => {
    try {
        const groups = await TimeTable.find({
            status: "published",
            batchId: req.user.batchId,
        }).select("groupname");
        res.status(200)
            .json({
                success: true,
                message: "OK",
                payload: {
                    groups: groups.sort(),
                },
            })
            .end();
    } catch (error) {
        console.log(error);
        res.status(200)
            .json({
                success: false,
                message: "Something went wrong",
            })
            .end();
    }
});

timetableRouter.get("/gettimetable", async (req, res) => {
    try {
        const group = req.query.group;
        const timetable = await TimeTable.findOne({
            groupname: group,
            status: "published",
            batchId: req.user.batchId,
        }).select("-status -addedByAdminId");
        res.status(200)
            .json({
                success: true,
                message: "OK",
                payload: {
                    timetable,
                },
            })
            .end();
    } catch (error) {
        console.log(error);
        res.status(200)
            .json({
                success: false,
                message: "Something went wrong",
            })
            .end();
    }
});

/**
 * const TimeTableClass = mongoose.Schema(
    {
        subjectname: {
            type: String,
            required: true,
        },
        subjectcode: String,
        roomnumber: String,
        teachername: String,
        startat: {
            type: String,
            required: true,
        },
        endat: {
            type: String,
            required: true,
        },
        subGroup: Number,
    },
    { timestamps: true }
);

const TimeTableDaySchema = mongoose.Schema({
    dayname: {
        type: String,
        required: true,
    },
    dayindex: {
        type: Number,
        required: true,
    },
    classes: [TimeTableClass],
});

const TimeTableSchema = mongoose.Schema({
    groupname: {
        type: String,
        required: true,
    },
    groupnumber: Number,
    addedByAdminId: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ["published", "unpublished"],
        default: "published",
    },
    days: [TimeTableDaySchema],
    batchId: {
        type: String,
        required: true,
        ref: "batch",
    },
});
 */

const group1 = {
    _id: "63c7105e588d357f30d1b7b5",
    groupname: "CSE-5-G22",
    groupnumber: 22,
    days: [
        {
            dayname: "Monday",
            dayindex: 0,
            classes: [
                {
                    subjectname: "SD",
                    roomnumber: "TG-510",
                    teachername: "CSE-T-27",
                    startat: "9:00",
                    endat: "9:45",
                    subGroup: 0,
                    _id: "63c7105e588d357f30d1b7b7",
                },
                {
                    subjectname: "ADI",
                    roomnumber: "TG-509",
                    teachername: "CSE-T-26",
                    startat: "12:00",
                    endat: "14:15",
                    subGroup: 0,
                    _id: "63c7105e588d357f30d1b7b8",
                },
                {
                    subjectname: "NALR",
                    roomnumber: "TG-411",
                    teachername: "T-NALR-6",
                    startat: "15:00",
                    endat: "16:30",
                    subGroup: 0,
                    _id: "63c7105e588d357f30d1b7b9",
                },
            ],
            _id: "63c7105e588d357f30d1b7b6",
        },
        {
            dayname: "Tuesday",
            dayindex: 1,
            classes: [
                {
                    subjectname: "NALR",
                    roomnumber: "TG-510",
                    teachername: "T-NALR-6",
                    startat: "11:15",
                    endat: "12:45",
                    subGroup: 0,
                    _id: "63c7105e588d357f30d1b7bb",
                },
                {
                    subjectname: "SD",
                    roomnumber: "TG-311",
                    teachername: "CSE-T-27",
                    startat: "13:30",
                    endat: "14:15",
                    subGroup: 0,
                    _id: "63c7105e588d357f30d1b7bc",
                },
                {
                    subjectname: "ADI",
                    roomnumber: "TG-510",
                    teachername: "CSE-T-26",
                    startat: "14:15",
                    endat: "16:30",
                    subGroup: 0,
                    _id: "63c7105e588d357f30d1b7bd",
                },
            ],
            _id: "63c7105e588d357f30d1b7ba",
        },
        {
            dayname: "Wednesday",
            dayindex: 2,
            classes: [
                {
                    subjectname: "ADI",
                    roomnumber: "TG-510",
                    teachername: "CSE-T-26",
                    startat: "11:15",
                    endat: "14:15",
                    subGroup: 0,
                    _id: "63c7105e588d357f30d1b7bf",
                },
                {
                    subjectname: "BEE",
                    roomnumber: "TG-420",
                    teachername: "CSE-T-27",
                    startat: "14:15",
                    endat: "16:30",
                    subGroup: 0,
                    _id: "63c7105e588d357f30d1b7c0",
                },
            ],
            _id: "63c7105e588d357f30d1b7be",
        },
        {
            dayname: "Thursday",
            dayindex: 3,
            classes: [
                {
                    subjectname: "ADI",
                    roomnumber: "TG-318",
                    teachername: "CSE-T-26",
                    startat: "9:00",
                    endat: "11:15",
                    subGroup: 0,
                    _id: "63c7105e588d357f30d1b7c2",
                },
                {
                    subjectname: "BEE",
                    roomnumber: "TG-501",
                    teachername: "CSE-T-27",
                    startat: "12:00",
                    endat: "14:15",
                    subGroup: 0,
                    _id: "63c7105e588d357f30d1b7c3",
                },
                {
                    subjectname: "SD",
                    roomnumber: "TG-501A",
                    teachername: "CSE-T-27",
                    startat: "15:00",
                    endat: "15:45",
                    subGroup: 0,
                    _id: "63c7105e588d357f30d1b7c4",
                },
            ],
            _id: "63c7105e588d357f30d1b7c1",
        },
        {
            dayname: "Friday",
            dayindex: 4,
            classes: [
                {
                    subjectname: "NALR",
                    roomnumber: "TG-502",
                    teachername: "T-NALR-6",
                    startat: "9:00",
                    endat: "11:15",
                    subGroup: 0,
                    _id: "63c7105e588d357f30d1b7c6",
                },
                {
                    subjectname: "BEE",
                    roomnumber: "TG-409",
                    teachername: "CSE-T-27",
                    startat: "11:15",
                    endat: "14:15",
                    subGroup: 0,
                    _id: "63c7105e588d357f30d1b7c7",
                },
                {
                    subjectname: "SD",
                    roomnumber: "TG-501",
                    teachername: "CSE-T-27",
                    startat: "15:00",
                    endat: "15:45",
                    subGroup: 0,
                    _id: "63c7105e588d357f30d1b7c8",
                },
            ],
            _id: "63c7105e588d357f30d1b7c5",
        },
    ],
    batchId: "Chitkara University-CSE-2020-2024",
    __v: 0,
};

const group2 = {
    _id: "63c7105e588d357f30d1b751",
    groupname: "CSE-5-G17",
    groupnumber: 17,
    days: [
        {
            dayname: "Monday",
            dayindex: 0,
            classes: [
                {
                    subjectname: "SD",
                    roomnumber: "TG-509",
                    teachername: "CSE-T-12",
                    startat: "9:00",
                    endat: "9:45",
                    subGroup: 0,
                    _id: "63c7105e588d357f30d1b753",
                },
                {
                    subjectname: "BEE",
                    roomnumber: "TG-509",
                    teachername: "CSE-T-8",
                    startat: "9:45",
                    endat: "12:00",
                    subGroup: 0,
                    _id: "63c7105e588d357f30d1b754",
                },
                {
                    subjectname: "ADI",
                    roomnumber: "TG-421",
                    teachername: "CSE-T-10",
                    startat: "12:45",
                    endat: "15:45",
                    subGroup: 0,
                    _id: "63c7105e588d357f30d1b755",
                },
            ],
            _id: "63c7105e588d357f30d1b752",
        },
        {
            dayname: "Tuesday",
            dayindex: 1,
            classes: [
                {
                    subjectname: "BEE",
                    roomnumber: "TG-509",
                    teachername: "CSE-T-8",
                    startat: "9:00",
                    endat: "12:00",
                    subGroup: 0,
                    _id: "63c7105e588d357f30d1b757",
                },
                {
                    subjectname: "ADI",
                    roomnumber: "TG-409",
                    teachername: "CSE-T-10",
                    startat: "12:45",
                    endat: "15:00",
                    subGroup: 0,
                    _id: "63c7105e588d357f30d1b758",
                },
                {
                    subjectname: "SD",
                    roomnumber: "TG-509",
                    teachername: "CSE-T-12",
                    startat: "15:45",
                    endat: "16:30",
                    subGroup: 0,
                    _id: "63c7105e588d357f30d1b759",
                },
            ],
            _id: "63c7105e588d357f30d1b756",
        },
        {
            dayname: "Wednesday",
            dayindex: 2,
            classes: [
                {
                    subjectname: "NALR",
                    roomnumber: "TG-510",
                    teachername: "T-NALR-1",
                    startat: "9:00",
                    endat: "10:30",
                    subGroup: 0,
                    _id: "63c7105e588d357f30d1b75b",
                },
                {
                    subjectname: "BEE",
                    roomnumber: "TG-420",
                    teachername: "CSE-T-8",
                    startat: "12:00",
                    endat: "14:15",
                    subGroup: 0,
                    _id: "63c7105e588d357f30d1b75c",
                },
            ],
            _id: "63c7105e588d357f30d1b75a",
        },
        {
            dayname: "Thursday",
            dayindex: 3,
            classes: [
                {
                    subjectname: "ADI",
                    roomnumber: "TG-509",
                    teachername: "CSE-T-10",
                    startat: "9:00",
                    endat: "11:15",
                    subGroup: 0,
                    _id: "63c7105e588d357f30d1b75e",
                },
                {
                    subjectname: "NALR",
                    roomnumber: "TG-502",
                    teachername: "T-NALR-1",
                    startat: "12:00",
                    endat: "14:15",
                    subGroup: 0,
                    _id: "63c7105e588d357f30d1b75f",
                },
                {
                    subjectname: "SD",
                    roomnumber: "TG-509",
                    teachername: "CSE-T-12",
                    startat: "15:00",
                    endat: "15:45",
                    subGroup: 0,
                    _id: "63c7105e588d357f30d1b760",
                },
            ],
            _id: "63c7105e588d357f30d1b75d",
        },
        {
            dayname: "Friday",
            dayindex: 4,
            classes: [
                {
                    subjectname: "SD",
                    roomnumber: "TG-509",
                    teachername: "CSE-T-12",
                    startat: "9:00",
                    endat: "9:45",
                    subGroup: 0,
                    _id: "63c7105e588d357f30d1b762",
                },
                {
                    subjectname: "NALR",
                    roomnumber: "TG-509",
                    teachername: "T-NALR-1",
                    startat: "12:00",
                    endat: "13:30",
                    subGroup: 0,
                    _id: "63c7105e588d357f30d1b763",
                },
                {
                    subjectname: "ADI",
                    roomnumber: "TG-502",
                    teachername: "CSE-T-10",
                    startat: "14:15",
                    endat: "16:30",
                    subGroup: 0,
                    _id: "63c7105e588d357f30d1b764",
                },
            ],
            _id: "63c7105e588d357f30d1b761",
        },
    ],
    batchId: "Chitkara University-CSE-2020-2024",
    __v: 0,
};

timetableRouter.get("/getcommonbreaks", async (req, res) => {
    try {
        const group1 = req.query.group1;
        const group2 = req.query.group2;
        const [timetable1, timetable2] = await Promise.all([
            TimeTable.findOne({
                groupname: group1,
                status: "published",
                batchId: req.user.batchId,
            }).select("-status -addedByAdminId"),
            TimeTable.findOne({
                groupname: group2,
                status: "published",
                batchId: req.user.batchId,
            }).select("-status -addedByAdminId"),
        ]);

        if (!timetable1 || !timetable2) {
            return res.status(400).json({
                error: "Invalid group name",
            });
        }
        const commonBreaks = getCommonBreaks(timetable1, timetable2);
        res.status(200)
            .json({
                success: true,
                message: "Common breaks fetched successfully",
                payload: { commonBreaks },
            })
            .end();
    } catch (error) {
        console.log(error);
        res.status(200)
            .json({
                success: false,
                message: "Something went wrong",
            })
            .end();
    }
});

export default timetableRouter;
