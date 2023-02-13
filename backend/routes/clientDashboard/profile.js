import { Router } from "express";
import { FRONTEND_APP_URL } from "../../@configs/envs";
import { isBatchIdValid } from "../../@configs/helper";
import webPush from "../../@configs/web-push";
import Activity from "../../models/Activity";
import Batch from "../../models/Batch";
import WebPush from "../../models/WebPush";

const profileRouter = Router();

profileRouter.get("/getprofile", async (req, res) => {
    try {
        const user = req.user;
        if (!user) {
            return res
                .status(200)
                .json({ success: false, message: "Something went wrong" });
        }

        let payload = {
            name: user.name,
            email: user.email,
            batchId: user.batchId,
            _id: user._id,
        };

        if (req.query.fullProfile === "true") {
            const [loginActivity, hasPushSubscription, batches] =
                await Promise.all([
                    Activity.find({ user: user._id, type: "login" })
                        .sort({
                            createdAt: -1,
                        })
                        .select("createdAt browserName osName device"),
                    WebPush.findOne({
                        user: user._id,
                        deviceType:
                            req.headers["x-machine-t"] === "sm"
                                ? "mobile"
                                : "desktop",
                    }),
                    Batch.find({}).select("batchId"),
                ]);
            payload = {
                ...payload,
                loginActivity,
                hasPushSubscription: !!hasPushSubscription,
                batches: batches
                    .sort((a, b) => a.batchId.localeCompare(b.batchId))
                    .map((batch) => batch.batchId),
            };
        }

        res.status(200)
            .json({
                success: true,
                message: "OK",
                payload,
            })
            .end();
    } catch (error) {
        console.log(error);
        res.status(200)
            .json({
                success: false,
                message: "Something went wrong",
            })
            .end();
    }
});

profileRouter.post("/change-batch", async (req, res) => {
    try {
        const user = req.user;

        const batchValid = await isBatchIdValid(req.body.batchId);
        if (!batchValid) {
            return res
                .status(200)
                .json({
                    success: false,
                    message: "Invalid batch id",
                })
                .end();
        }

        user.batchId = req.body.batchId;
        await user.save();
        res.status(200)
            .json({
                success: true,
                message: "OK",
                payload: {
                    _id: user._id,
                    batchId: user.batchId,
                    email: user.email,
                    name: user.name,
                },
            })
            .end();
    } catch (error) {
        console.log(error);
        res.status(200)
            .json({
                success: false,
                message: "Something went wrong",
            })
            .end();
    }
});

profileRouter.post("/subscribe-push", async (req, res) => {
    try {
        const clientScreenSize = req.headers["x-machine-t"];
        const { endpoint, keys } = req.body.subscriptionCredentials;
        console.log("clientScreenSize:", clientScreenSize);
        console.log("endpoint:", endpoint);
        console.log("keys:", keys);
        const user = req.user;
        if (!endpoint || !keys) {
            return res
                .status(200)
                .json({ success: false, message: "Something went wrong" });
        }
        // delete previous subscription
        await WebPush.deleteMany({
            user: user._id,
            deviceType: clientScreenSize === "sm" ? "mobile" : "desktop",
        });
        const newWebPush = await WebPush.create({
            endpoint,
            keys,
            user: user._id,
            deviceType: clientScreenSize === "sm" ? "mobile" : "desktop",
        });
        webPush
            .sendNotification(
                {
                    endpoint,
                    keys,
                },
                JSON.stringify({
                    title: "Hi from Crew",
                    body: "Glad to see you are using every feature of Crew😸",
                    icon: "https://ik.imagekit.io/csecrew/csecrew-neon-icon_A4FXMRCpL.png",
                    url: FRONTEND_APP_URL + "/dashboard",
                })
            )
            .then((r) => {
                console.log("sent to new webpush");
            })
            .catch((err) => {
                console.log(err);
            });
        res.status(200)
            .json({
                success: true,
                message: "OK",
            })
            .end();
    } catch (error) {
        console.log(error);
        res.status(200)
            .json({
                success: false,
                message: "Something went wrong",
            })
            .end();
    }
});

profileRouter.get("/test-push", async (req, res) => {
    try {
        const user = req.user;
        const doc = await WebPush.findOne({
            user: user._id,
            deviceType:
                req.headers["x-machine-t"] === "sm" ? "mobile" : "desktop",
        });
        if (!doc) {
            return res
                .status(200)
                .json({
                    success: false,
                    message: "No subscription found",
                })
                .end();
        }
        webPush
            .sendNotification(
                {
                    endpoint: doc.endpoint,
                    keys: doc.keys,
                },
                JSON.stringify({
                    title: "Hi from Crew",
                    body: "Glad to see that it's working for you",
                    icon: "https://ik.imagekit.io/csecrew/csecrew-neon-icon_A4FXMRCpL.png",
                    url: FRONTEND_APP_URL + "/dashboard",
                })
            )
            .then((response) => {
                console.log("[test-push-1]", response);
                res.status(200)
                    .json({
                        success: true,
                        message: "OK",
                    })
                    .end();
                return;
            })
            .catch((error) => {
                console.log("[test-push-2]", error);
                // delete the subscription
                WebPush.deleteOne({
                    _id: doc._id,
                });
                console.log("Subscription deleted");
                res.status(200)
                    .json({
                        success: false,
                        message: "Something went wrong",
                    })
                    .end();
                return;
            });
    } catch (error) {
        console.log("[test-push-3]", error);
        res.status(200)
            .json({
                success: false,
                message: "Something went wrong",
            })
            .end();
    }
});

export default profileRouter;
