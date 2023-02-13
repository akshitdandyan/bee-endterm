import mongoose from "mongoose";

const batchSchema = mongoose.Schema(
    {
        instituteName: {
            type: String,
            required: true,
        },
        batchName: {
            type: String,
            required: true,
        },
        batchStartYear: {
            type: Number,
            required: true,
        },
        batchEndYear: {
            type: Number,
            required: true,
        },
        batchId: {
            type: String,
            required: true,
            unique: true,
            index: true,
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "admin",
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Batch = mongoose.model("batch", batchSchema);

export default Batch;
