import mongoose from "mongoose";

const ActivitySchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
            required: true,
        },
        userEmail: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            required: true,
            enum: ["login", "admin-upload"],
        },
        browserName: String,
        osName: String,
        device: String,
        message: String,
    },
    {
        timestamps: true,
    }
);

const Activity = mongoose.model("activity", ActivitySchema);

export default Activity;
