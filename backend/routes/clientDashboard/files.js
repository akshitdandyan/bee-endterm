import { Router } from "express";
import File from "../../models/File.js";
import axios from "axios";
import crypto, { randomUUID } from "crypto";

const fileRouter = Router();

fileRouter.get("/getfiles", async (req, res) => {
    try {
        const subjectId = req.query.subjectId;
        console.log(req.user.batchId);
        console.log(subjectId);
        const files = await File.find({
            subject: subjectId,
            status: "active",
            batchId: req.user.batchId,
        })
            .sort({
                createdAt: -1,
            })
            .select("subject filename size description createdAt thumbnailUrl");
        res.status(200).json({
            success: true,
            message: "OK",
            payload: {
                files,
            },
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

fileRouter.get("/getannouncements", async (req, res) => {
    try {
        const page = req.query.page;
        const announcements = await File.find({
            subject: null,
            status: "active",
            batchId: req.user.batchId,
        })
            .sort({
                createdAt: -1,
            })
            .skip(page * 10)
            .limit(10)
            .select("filename size description createdAt thumbnailUrl");
        res.status(200)
            .json({
                success: true,
                message: "OK",
                payload: {
                    announcements,
                },
            })
            .end();
    } catch (error) {
        console.log(error);
        res.status(200).json({
            success: false,
            message: "Something went wrong",
        });
    }
});

function encrypt(algorithm, buffer, key, iv) {
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    const encrypted = Buffer.concat([cipher.update(buffer), cipher.final()]);
    return encrypted;
}

function decrypt(algorithm, buffer, key, iv) {
    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    const decrypted = Buffer.concat([
        decipher.update(buffer),
        decipher.final(),
    ]);
    return decrypted;
}

const fileDownloadSseClients = new Map();

function sendEventToClient(client, data) {
    client.res.write("data: " + JSON.stringify(data) + "\n\n");
}

fileRouter.get("/downloadfile-sse", async (req, res) => {
    try {
        // server sent events
        res.writeHead(200, {
            "Content-Type": "text/event-stream",
            "Cache-Control": "no-cache",
            Connection: "keep-alive",
        });
        // add in map
        const randomId = randomUUID();
        fileDownloadSseClients.set(
            randomId.concat("-").concat(req.query.fileId),
            {
                res,
            }
        );
        sendEventToClient(
            fileDownloadSseClients.get(
                randomId.concat("-").concat(req.query.fileId)
            ),
            {
                reqId: randomId,
                progress: 0,
            }
        );
    } catch (error) {
        console.log(error);
        res.status(200).json({
            success: false,
            message: "Error in sse",
        });
    }
});

fileRouter.get("/downloadfile", async (req, res) => {
    try {
        // console.log("req.headers", req.headers);
        const fileId = req.query.fileId;
        const reqId = req.query.reqId.concat("-").concat(fileId);
        console.log("reqId", reqId);
        const client = fileDownloadSseClients.get(reqId);
        if (!client) {
            console.log("Client not found in sse map");
            res.status(200)
                .send(new ArrayBuffer("%%PDF500\n1.0\n%content stream start%"))
                .end();
            return;
        }
        const file = await File.findById(fileId).select("fileUrl");
        const response = await axios.get(file.fileUrl, {
            responseType: "arraybuffer",
            onDownloadProgress: (progressEvent) => {
                sendEventToClient(client, {
                    progress: Math.round(
                        (progressEvent.loaded / progressEvent.total) * 100
                    ),
                });
            },
        });
        // const buffer = Buffer.from(response.data, "binary");
        // const key = crypto.randomBytes(32);
        // const iv = crypto.randomBytes(16);
        // const encrypted = encrypt("aes-256-cbc", buffer, key, iv);
        // const decrypted = decrypt("aes-256-cbc", encrypted, key, iv);
        res.status(200).send(response.data).end();
        // res.status(200)
        //     .send(new ArrayBuffer("%%PDF500\n1.0\n%content stream start%"))
        //     .end();
        // remove from map
        fileDownloadSseClients.delete(reqId);
        console.log("map size", fileDownloadSseClients.size);
    } catch (error) {
        console.log(error);
        res.status(200)
            .json({
                success: false,
                message: "Error in downloading file",
            })
            .end();
    }
});

fileRouter.get("/image/:id", async (req, res) => {
    try {
        const fileId = req.params.id;
        const file = await File.findById(fileId).select("fileUrl");
        const response = await axios.get(file.fileUrl, {
            responseType: "arraybuffer",
        });
        res.status(200).send(response.data).end();
    } catch (error) {
        console.log(error);
    }
});

export default fileRouter;
