import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { JWT_SECRET } from "./envs.js";
import Admin from "../models/Admin.js";

export const attachUser = async (req, res, next) => {
    try {
        if (!req.headers.authorization) {
            console.log("[No authorization header] req url: ", req.url);
            next();
            return;
        }
        const token = req.headers.authorization.split(" ")[1];
        let decodedData;
        if (typeof token === "string" && token !== "null") {
            decodedData = jwt.verify(token, JWT_SECRET);
            if (!mongoose.Types.ObjectId.isValid(decodedData.id)) {
                console.log("Invalid user id", decodedData.id);
                return res
                    .status(200)
                    .json({ message: "OK", signOut: true })
                    .end();
            }
            const user = await User.findById(
                mongoose.Types.ObjectId(decodedData.id)
            );
            req.user = user;
        }
    } catch (error) {
        console.log("[attachUser]", error);
        return res.status(200).json({ message: "OK", signOut: true }).end();
    }
    next();
};

export const blockForUnauthenticated = (req, res, next) => {
    // let event sse client to pass
    if (
        req.url.startsWith("/downloadfile-sse?fileId=") ||
        req.url.includes("/image")
    ) {
        next();
        return;
    }
    if (!req.user) {
        console.log("[blockForUnauthenticated] User blocked");
        return res
            .status(200)
            .json({ message: "OK", success: true, signOut: true });
    }
    if (req.user.verified === false) {
        console.log(
            "[blockForUnauthenticated] User blocked, not verified:",
            req.user.email
        );
        return res.status(200).json({
            message: "Email not verified",
            success: false,
            signOut: true,
        });
    }
    next();
};

export const attachAdmin = async (req, res, next) => {
    try {
        if (!req.headers.authorization) {
            console.log("[No authorization header] req url: ", req.url);
            next();
            return;
        }
        const token = req.headers.authorization.split(" ")[1];
        let decodedData;
        if (typeof token === "string" && token !== "null") {
            decodedData = jwt.verify(token, JWT_SECRET);
            if (!mongoose.Types.ObjectId.isValid(decodedData.id)) {
                console.log("Invalid user id", decodedData.id);
                return res.status(200).json({ message: "OK" }).end();
            }
            const user = await Admin.findById(
                mongoose.Types.ObjectId(decodedData.id)
            );
            req.user = user;
        }
    } catch (error) {
        console.log("[attachUser]", error);
    }
    next();
};

export const blockNonAdminUsers = (req, res, next) => {
    // let event sse client to pass
    // console.log("req.url", req.url);
    if (
        req.url.startsWith("/downloadfile-sse?fileId=") ||
        req.url.startsWith("/uploadfile-sse?adminId=")
    ) {
        next();
        return;
    }
    if (!(req.user.role === "admin" || req.user.role === "super-admin")) {
        console.log("[blockNonAdminUsers] User blocked from admin requests");
        return res.status(200).json({ message: "OK", success: true });
    }
    if (req.user.status === "activated") {
        next();
        return;
    }

    console.log(
        "[blockNonAdminUsers] User blocked from admin requests because status:",
        req.user.status
    );
    res.status(200).json({ message: "OK", success: true }).end();
};

export const blockNonSuperAdminUsers = (req, res, next) => {
    // let event sse client to pass
    if (req.url.startsWith("/downloadfile-sse?fileId=")) {
        next();
        return;
    }
    if (!(req.user.role === "super-admin")) {
        console.log(
            "[blockNonSuperAdminUsers] User blocked from superadmin requests"
        );
        return res.status(200).json({ message: "OK", success: true });
    }
    next();
};
