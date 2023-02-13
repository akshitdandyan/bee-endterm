import { Router } from "express";
import Subject from "../../models/Subject.js";

const subjectRouter = Router();

subjectRouter.get("/getsubjects", async (req, res) => {
    try {
        const subjects = await Subject.find({
            batchId: req.user.batchId,
            status: "active",
        }).select("subjectName subjectTheme");
        res.status(200).json({
            success: true,
            message: "OK",
            payload: {
                subjects,
            },
        });
    } catch (error) {
        res.status(200).json({ message: error.message });
    }
});

export default subjectRouter;
