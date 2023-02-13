import mongoose from "mongoose";

const TimeTableClass = mongoose.Schema(
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

const TimeTable = mongoose.model("timetable", TimeTableSchema);

export default TimeTable;
