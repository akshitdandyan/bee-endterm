import mongoose from "mongoose";

const adminSchema = mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            index: true,
        },
        password: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        batchId: {
            type: String,
        },
        emailOtp: {
            type: String,
        },
        status: {
            type: String,
            enum: [
                "invitation-sent",
                "invitation-opened",
                "activated",
                "deactivated",
            ],
            required: true,
        },
        role: {
            type: String,
            enum: ["admin", "super-admin"],
            required: true,
        },
        verification: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "verification",
        },
        addedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "admin",
        },
        telegramUsername: {
            type: String,
            unique: true,
        },
    },
    {
        timestamps: true,
    }
);

const Admin = mongoose.model("admin", adminSchema);

export default Admin;
