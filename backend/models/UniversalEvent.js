import mongoose from "mongoose";

const UniversalEventSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: String,
        publisherId: {
            type: String,
            required: true,
        },
        eventOn: {
            type: Date,
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

const UniversalEvent = mongoose.model("universal_event", UniversalEventSchema);

export default UniversalEvent;
