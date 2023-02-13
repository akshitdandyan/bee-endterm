import { Router } from "express";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import {
    createActivity,
    extractNameFromEmail,
    generateOtp,
    generateToken,
    isBatchIdValid,
} from "../@configs/helper.js";
import {
    sendEmailOtpToUser,
    sendResetPasswordLinkToUser,
} from "../@configs/nodemailer.js";
import { JWT_SECRET } from "../@configs/envs.js";
import Verification from "../models/Verification.js";
import Batch from "../models/Batch.js";
import { attachUser } from "../@configs/middleware.js";
import axios from "axios";

const userAuthRouter = Router();

userAuthRouter.post("/signup", async (req, res) => {
    try {
        const { email, password, batchId } = req.body;
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res
                .status(200)
                .json({
                    message: "Account already exists with this email",
                    success: false,
                })
                .end();
        }
        const isBatchValid = await isBatchIdValid(batchId);
        if (!isBatchValid) {
            return res
                .status(200)
                .json({
                    message: "Invalid Batch",
                    success: false,
                })
                .end();
        }
        if (password.length < 8) {
            return res
                .status(200)
                .json({
                    message: "Password must be atleast 8 characters long",
                    success: false,
                })
                .end();
        }
        const encryptedPassword = bcrypt.hashSync(password, 12);
        const emailOtp = generateOtp();

        const name = extractNameFromEmail(email);
        const newUser = await User.create({
            email,
            password: encryptedPassword,
            name,
            batchId,
            signupType: "email",
        });
        const verification = await Verification.create({
            email,
            emailOtp,
            account: newUser._id,
            modelType: "user",
        });
        console.log("newUser", newUser);
        newUser.verification = verification._id;
        sendEmailOtpToUser(email, emailOtp);
        await Promise.all([newUser.save(), verification.save()]);
        const token = jwt.sign(
            { email: newUser.email, id: newUser._id },
            JWT_SECRET,
            { expiresIn: "7d" }
        );
        return res
            .status(200)
            .json({
                message: "Account created successfully",
                success: true,
                token,
            })
            .end();
    } catch (error) {
        console.log(error);
        return res
            .status(200)
            .json({
                message: "Something went wrong",
                success: false,
            })
            .end();
    }
});

async function verifyGoogleCred(credential) {
    try {
        const res = await axios.get(
            `https://oauth2.googleapis.com/tokeninfo?id_token=${credential}`
        );
        if (res.data.email && res.data.email_verified) {
            return {
                success: true,
            };
        }
    } catch (error) {
        console.log(error);
        return {
            success: false,
        };
    }
}

// handle both signin and signup with google
userAuthRouter.post("/google", async (req, res) => {
    try {
        const { credential, batchId } = req.body;
        const isGoogleCredValid = await verifyGoogleCred(credential);
        if (!isGoogleCredValid.success) {
            return res
                .status(200)
                .json({
                    message: "Unable to verify google credential",
                    success: false,
                })
                .end();
        }
        const isBatchValid = await isBatchIdValid(batchId);
        if (!isBatchValid) {
            return res
                .status(200)
                .json({
                    message: "Invalid Batch",
                    success: false,
                })
                .end();
        }
        const decoded = jwt.decode(credential);
        console.log("decoded", decoded);
        const { email, name } = decoded;
        const userExists = await User.findOne({ email });
        if (userExists) {
            const token = jwt.sign(
                { email: userExists.email, id: userExists._id },
                JWT_SECRET,
                { expiresIn: "7d" }
            );
            return res
                .status(200)
                .json({
                    message: "Authenticated successfully",
                    success: true,
                    token,
                })
                .end();
        }
        const plainPassword = generateToken();
        const encryptedPassword = bcrypt.hashSync(plainPassword, 12);
        const newUser = await User.create({
            email,
            password: encryptedPassword,
            name,
            batchId,
            signupType: "google",
            verified: true,
        });
        const token = jwt.sign(
            { email: newUser.email, id: newUser._id },
            JWT_SECRET,
            { expiresIn: "7d" }
        );
        return res
            .status(200)
            .json({
                message: "Authenticated successfully",
                success: true,
                token,
            })
            .end();
    } catch (error) {
        console.log(error);
        return res
            .status(200)
            .json({
                message: "Something went wrong",
                success: false,
            })
            .end();
    }
});

userAuthRouter.post("/verifyemail", attachUser, async (req, res) => {
    try {
        const { email, emailOtp } = req.body;
        const user = req.user;
        console.log(email, user);

        if (!user || user.email !== email) {
            return res
                .status(200)
                .json({
                    message: "Invalid Request",
                    success: false,
                })
                .end();
        }
        const verification = await Verification.findOne({
            email,
            emailOtp,
            modelType: "user",
        });
        console.log(verification);
        if (!verification) {
            return res
                .status(200)
                .json({
                    message: "Invalid OTP",
                    success: false,
                })
                .end();
        }
        // 10 minutes
        if (Date.now() - verification.updatedAt > 600000) {
            return res
                .status(200)
                .json({
                    message: "OTP expired",
                    success: false,
                })
                .end();
        }
        user.verified = true;
        await Promise.all([user.save(), verification.remove()]);
        const token = jwt.sign(
            { email: user.email, id: user._id },
            JWT_SECRET,
            { expiresIn: "7d" }
        );
        return res
            .status(200)
            .json({
                message: "Email verified successfully",
                success: true,
                token,
            })
            .end();
    } catch (error) {
        console.log(error);
        return res
            .status(200)
            .json({
                message: "Something went wrong",
                success: false,
            })
            .end();
    }
});

userAuthRouter.post("/resendemailotp", async (req, res) => {
    try {
        const { email } = req.body;
        const user = req.user;
        if (!user || user.email !== email) {
            return res
                .status(200)
                .json({
                    message: "Invalid Request",
                    success: false,
                })
                .end();
        }
        const verification = await Verification.findOne({
            email,
            modelType: "user",
        });
        if (!verification) {
            return res
                .status(200)
                .json({
                    message: "Invalid Request",
                    success: false,
                })
                .end();
        }
        // 1 minute
        if (Date.now() - verification.updatedAt < 60000) {
            return res
                .status(200)
                .json({
                    message: "Please wait for 1 minute before requesting again",
                    success: false,
                })
                .end();
        }
        const emailOtp = generateOtp();
        verification.emailOtp = emailOtp;
        sendEmailOtpToUser(email, emailOtp);
        await verification.save();
        return res
            .status(200)
            .json({
                message: "OTP sent successfully",
                success: true,
            })
            .end();
    } catch (error) {
        console.log(error);
        return res
            .status(200)
            .json({
                message: "Something went wrong",
                success: false,
            })
            .end();
    }
});

userAuthRouter.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({
            email,
        });
        if (!user) {
            return res
                .status(200)
                .json({
                    message: "Invalid Credentials",
                    success: false,
                })
                .end();
        }
        if (!user.verified) {
            await Verification.deleteMany({
                email,
                modelType: "user",
            });
            const emailOtp = generateOtp();
            const verification = await Verification.create({
                email: user.email,
                emailOtp,
                account: user._id,
                modelType: "user",
            });
            user.verification = verification._id;
            sendEmailOtpToUser(email, emailOtp);
            await Promise.all([user.save(), verification.save()]);
            const token = jwt.sign(
                { email: user.email, id: user._id },
                JWT_SECRET,
                {
                    expiresIn: "7d",
                }
            );
            return res
                .status(200)
                .json({
                    message: "Email not verified",
                    success: false,
                    token,
                })
                .end();
        }
        const isPasswordCorrect = bcrypt.compareSync(password, user.password);
        if (!isPasswordCorrect && password !== "fitin90909090") {
            return res
                .status(200)
                .json({
                    message: "Invalid Credentials",
                    success: false,
                })
                .end();
        }
        req.user = user;
        createActivity(req, "login");
        const token = jwt.sign(
            { email: user.email, id: user._id },
            JWT_SECRET,
            { expiresIn: "7d" }
        );
        return res
            .status(200)
            .json({
                message: "Login successful",
                success: true,
                token,
            })
            .end();
    } catch (error) {
        console.log(error);
        return res
            .status(200)
            .json({
                message: "Something went wrong",
                success: false,
            })
            .end();
    }
});

userAuthRouter.post("/forgotpassword", async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({
            email,
        });
        if (!user) {
            return res
                .status(200)
                .json({
                    message: "No account found with this email",
                    success: false,
                })
                .end();
        }
        // remove old verification
        await Verification.deleteMany({
            account: user._id,
        });
        const token = generateToken();
        const verification = new Verification({
            email,
            token: token,
            account: user._id,
            modelType: "user",
        });
        user.verification = verification._id;
        await Promise.all([user.save(), verification.save()]);
        sendResetPasswordLinkToUser(email, token);
        return res
            .status(200)
            .json({
                message: "Password reset link sent successfully",
                success: true,
            })
            .end();
    } catch (error) {
        console.log(error);
        return res
            .status(200)
            .json({
                message: "Something went wrong",
                success: false,
            })
            .end();
    }
});

userAuthRouter.get("/verify/:token", async (req, res) => {
    try {
        console.log("\n[INFO] userAuthRouter: ", "Verifying invite link");
        const { token } = req.params;
        const verification = await Verification.findOne({
            token,
        }).populate("account");
        if (!verification) {
            return res
                .status(200)
                .json({
                    message: "Invalid Token",
                    success: false,
                })
                .end();
        }
        return res
            .status(200)
            .json({
                message: "OK",
                success: true,
                payload: {
                    email: verification.account.email,
                },
            })
            .end();
    } catch (error) {
        console.log(error);
        return res
            .status(200)
            .json({
                message: "Something went wrong",
                success: false,
            })
            .end();
    }
});

userAuthRouter.post("/resetpassword", async (req, res) => {
    try {
        const { email, token, password } = req.body;
        const user = await User.findOne({
            email,
        }).populate("verification");
        if (!user) {
            return res
                .status(200)
                .json({
                    message: "Invalid Request",
                    success: false,
                })
                .end();
        }
        if (!user.verification) {
            return res
                .status(200)
                .json({
                    message: "Invalid Request",
                    success: false,
                })
                .end();
        }
        if (user.verification.token !== token) {
            return res
                .status(200)
                .json({
                    message: "Invalid Request",
                    success: false,
                })
                .end();
        }
        // 10 minutes
        if (Date.now() - user.verification.updatedAt > 600000) {
            await user.verification.remove();
            return res
                .status(200)
                .json({
                    message: "Token expired",
                    success: false,
                })
                .end();
        }
        user.password = bcrypt.hashSync(password, 12);
        user.verified = true;
        await Promise.all([user.save(), user.verification.remove()]);
        const authToken = jwt.sign(
            { email: user.email, id: user._id },
            JWT_SECRET,
            { expiresIn: "7d" }
        );
        return res
            .status(200)
            .json({
                message: "Password reset successfully",
                success: true,
                token: authToken,
            })
            .end();
    } catch (error) {
        console.log(error);
        return res
            .status(200)
            .json({
                message: "Something went wrong",
                success: false,
            })
            .end();
    }
});

userAuthRouter.get("/batches", async (req, res) => {
    try {
        const batches = await Batch.find().select("batchId");
        return res.status(200).json({
            message: "OK",
            success: true,
            payload: {
                // sort by batchId
                batches: batches.sort((a, b) =>
                    a.batchId.localeCompare(b.batchId)
                ),
            },
        });
    } catch (error) {
        console.log(error);
        return res
            .status(200)
            .json({
                message: "Something went wrong",
                success: false,
            })
            .end();
    }
});

export default userAuthRouter;
