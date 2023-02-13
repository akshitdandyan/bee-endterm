import mongoose from "mongoose";

const FileSchema = mongoose.Schema(
    {
        filename: {
            type: String,
        },
        size: {
            type: Number,
        },
        description: {
            type: String,
            trim: true,
        },
        downloads: {
            type: Number,
            default: 0,
        },
        subject: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "subject",
        },
        status: {
            type: String,
            enum: ["active", "inactive", "deleted"],
            default: "active",
        },
        fileId: String,
        fileUrl: String,
        fileType: String,
        thumbnailUrl: String,
        uploaderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "admin",
            required: true,
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

const File = mongoose.model("file", FileSchema);

export default File;
