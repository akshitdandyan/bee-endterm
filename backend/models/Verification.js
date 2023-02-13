import mongoose from "mongoose";

const userSchema = mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            ref: "user",
        },
        account: {
            type: mongoose.Schema.Types.ObjectId,
            refPath: "modelType",
        },
        modelType: { type: String, enum: ["user", "admin"], required: true },
        emailOtp: {
            type: String,
        },
        token: {
            type: String,
            unique: true,
            sparse: true,
        },
    },
    {
        timestamps: true,
    }
);

var Verification = mongoose.model("verification", userSchema);

export default Verification;
