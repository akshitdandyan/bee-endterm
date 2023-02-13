import { Router } from "express";
import UniversalEvent from "../../models/UniversalEvent.js";

const eventsRouter = Router();

eventsRouter.get("/getevents", async (req, res) => {
    try {
        const startDate = req.query.startDate;
        const endDate = new Date(req.query.endDate);
        endDate.setDate(endDate.getDate() + 7);
        // console.log(startDate, endDate);
        const events = await UniversalEvent.find({
            eventOn: {
                $gte: new Date(startDate),
                $lte: endDate,
            },
            batchId: req.user.batchId,
        }).select("title description eventOn");

        res.status(200)
            .json({
                success: true,
                message: "OK",
                payload: {
                    events: events.map((event) => {
                        return {
                            ...event._doc,
                            eventOn: new Date(
                                event.eventOn
                            ).toLocaleDateString(),
                        };
                    }),
                },
            })
            .end();
    } catch (error) {
        console.log(error);
        res.status(200).json({
            success: false,
            message: "Something went wrong",
            payload: {
                events: [],
            },
        });
    }
});

export default eventsRouter;
