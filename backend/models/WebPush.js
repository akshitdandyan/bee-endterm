import mongoose from "mongoose";

const WebPushSchema = new mongoose.Schema(
    {
        endpoint: {
            type: String,
            required: true,
        },
        keys: {
            type: Object,
            required: true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        deviceType: {
            type: String,
            required: true,
            enum: ["desktop", "mobile"],
        },
    },
    {
        timestamps: true,
    }
);

const WebPush = mongoose.model("WebPush", WebPushSchema);

export default WebPush;
