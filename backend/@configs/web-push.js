import webPush from "web-push";

const WebPushKeys = {
    publicKey:
        "BOMv3b97fUtgzUEWV1vEMlxDoSjM5pLFHqfRC3PWEksWgFphMlwInB1cKkAFTXzDvIDXTclj6-VEw43o8-iIakw",
    privateKey: "3gn9GnaGvcYg7pE_BsrQ3RkIFzZ7LDoKjVy3-Taeb1w",
};

webPush.setVapidDetails(
    "mailto:info.csecrew@gmail.com",
    WebPushKeys.publicKey,
    WebPushKeys.privateKey
);

export default webPush;
