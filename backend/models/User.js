import mongoose from "mongoose";

const userSchema = mongoose.Schema(
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
        signupType: {
            type: String,
            required: true,
            enum: ["email", "google"],
        },
        name: {
            type: String,
            required: true,
        },
        batchId: {
            type: String,
            required: true,
            ref: "batch",
        },
        emailOtp: {
            type: String,
        },
        verified: {
            type: Boolean,
            default: false,
        },
        verification: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "verification",
        },
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model("user", userSchema);

export default User;
