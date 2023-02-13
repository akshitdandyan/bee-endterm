import { Component, createSignal, onCleanup, Show, useContext } from "solid-js";
import { axiosAuth } from "../../@utils/axios";
import { saveFile } from "../../@utils/dexie";
import { VITE_API_SERVER } from "../../@utils/envs";
import { DownloadedIcon, DownloadIcon, PreviewFileIcon } from "../icons";

type Props = {
    file: {
        _id: string;
        filename: string;
        subject?: string;
        size: number;
        description: string;
    };
    actionType: "download" | "view";
    getBlob: (blob: Blob) => void;
    downloaded: boolean;
    downloadedBlob?: Blob;
};

const DownloadButton: Component<Props> = (props) => {
    const [downloading, setDownloading] = createSignal(false);
    const [downloaded, setDownloaded] = createSignal(props.downloaded);
    const [percent, setPercent] = createSignal(0);
    const [fileBlob, setFileBlob] = createSignal<Blob | null>(
        props.downloadedBlob || null
    );
    const circumference = 2 * Math.PI * 14;

    const viewFileWithBlob = async () => {
        if (!fileBlob()) {
            console.log("No file blob");
            return;
        }

        props.getBlob(fileBlob());
    };

    const connectSse = async () => {
        return new Promise((resolve, reject) => {
            const sse = new EventSource(
                VITE_API_SERVER +
                    "/dashboard/downloadfile-sse?fileId=".concat(props.file._id)
            );
            sse.onmessage = (event) => {
                const data = JSON.parse(event.data);
                console.log("[SSE]", data);
                if (data.reqId) {
                    window.addEventListener("message", (e) => {
                        const windowMsgData = e.data;
                        if (
                            windowMsgData.type === "closeSse" &&
                            windowMsgData.reqId === data.reqId
                        ) {
                            console.log("Closing SSE");
                            sse.close();
                        }
                    });

                    resolve(data.reqId);
                }
                if (data.progress) {
                    // server fetching file
                    const firstHalfProgress = Number(
                        (data.progress / 2).toFixed(0)
                    );
                    console.log(firstHalfProgress);
                    setPercent(firstHalfProgress);
                }
            };
            sse.onerror = (error) => {
                console.log(error);
                reject("null");
            };
        });
    };

    const downloadFile = async () => {
        if (downloading()) {
            return;
        }
        if (fileBlob()) {
            viewFileWithBlob();
            return;
        }
        setDownloading(true);
        try {
            const reqId = await connectSse();
            console.log(reqId);
            if (typeof reqId !== "string") {
                alert("Not able to download file");
                return;
            }
            const file = props.file;
            setPercent(1);
            const res = await axiosAuth(
                "/dashboard/downloadfile?fileId="
                    .concat(file._id)
                    .concat("&reqId=")
                    .concat(reqId),
                {
                    responseType: "arraybuffer",
                    onDownloadProgress: async (progressEvent) => {
                        console.log(progressEvent, new Date().getTime());
                        const percentCompleted = Math.round(
                            (progressEvent.loaded * 100) / progressEvent.total
                        );
                        const secondHalfProgress = Number(
                            (percentCompleted / 2 + 50).toFixed(0)
                        );
                        console.log(secondHalfProgress);
                        setPercent(secondHalfProgress);
                    },
                }
            );

            window.postMessage({
                type: "closeSse",
                reqId,
            });

            setDownloading(false);

            console.log("bytelength:", res.data.byteLength);

            // if less then 1 kb, then it is an error
            if (res.data.byteLength < 1024) {
                const error = new TextDecoder().decode(res.data);
                console.log("data too small", error);
                return;
            }

            if (res.status === 200) {
                setDownloaded(true);
                const src = res.data;
                console.log(src);
                const blob = new Blob([src], { type: "application/pdf" });
                setFileBlob(blob);
                console.log("actionType: ", props.actionType);

                if (props.actionType === "view") {
                    props.getBlob(blob);
                } else if (props.actionType === "download") {
                    await saveFile({
                        ...file,
                        src: blob,
                    });
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    onCleanup(() => {
        if (fileBlob()) {
            setFileBlob(null);
        }
    });

    return (
        <abbr
            title={
                props.actionType === "download" ? "Download File" : "Quick View"
            }
        >
            <div
                onclick={() => downloadFile()}
                class={`${
                    (!downloading() && !downloaded()) ||
                    (fileBlob() && props.actionType === "view")
                        ? "bg-blue-700"
                        : downloaded() && props.actionType === "download"
                        ? "bg-green-100"
                        : ""
                } flex active:opacity-70 duration-75 items-center justify-center cursor-pointer aspect-square rounded-full p-1 download-button`}
            >
                <Show
                    when={
                        props.actionType === "download" &&
                        !downloading() &&
                        !downloaded()
                    }
                >
                    <DownloadIcon />
                </Show>
                <Show when={props.actionType === "view" && !downloading()}>
                    <PreviewFileIcon />
                </Show>
                <Show when={downloading() && !downloaded()}>
                    <div class="flex items-center justify-center rounded-full">
                        <svg class="w-8 h-8">
                            <circle
                                class="text-gray-300"
                                stroke-width="2"
                                stroke="currentColor"
                                fill="transparent"
                                r="14"
                                cx="16"
                                cy="16"
                            />
                            <circle
                                class="text-green-600"
                                stroke-width="2"
                                stroke-dasharray={`${circumference}`}
                                stroke-dashoffset={
                                    circumference -
                                    (percent() / 100) * circumference
                                }
                                stroke-linecap="round"
                                stroke="currentColor"
                                fill="transparent"
                                r="14"
                                cx="16"
                                cy="16"
                            />
                        </svg>
                    </div>
                </Show>
                <Show
                    when={
                        props.actionType === "download" &&
                        (downloaded() || fileBlob())
                    }
                >
                    <DownloadedIcon />
                </Show>
            </div>
        </abbr>
    );
};

export default DownloadButton;
