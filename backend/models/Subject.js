import mongoose from "mongoose";

const subjectSchema = mongoose.Schema(
    {
        subjectName: {
            type: String,
            required: true,
        },
        subjectTheme: {
            type: String,
            required: true,
        },
        publisherId: {
            type: mongoose.Types.ObjectId,
            required: true,
            ref: "admin",
        },
        status: {
            type: String,
            enum: ["active", "inactive", "deleted"],
            default: "active",
        },
        batchId: {
            type: String,
            required: true,
            ref: "batch",
        },
    },
    {
        timestamps: true,
    }
);

const Subject = mongoose.model("subject", subjectSchema);

export default Subject;
