import { useNavigate, useParams } from "solid-app-router";
import { createSignal, For, onMount, Show, useContext } from "solid-js";
import { axiosAuth } from "../../@utils/axios";
import {
    EmbedViewerContext,
    FileBlobsContext,
    PdfViewerContext,
} from "../../@utils/context";
import { timeSince, urlify } from "../../@utils/helpers";
import DownloadButton from "../../components/DownloadButton/DownloadButton";
import { ArrowIcon } from "../../components/icons";
import FilesSkeleton from "../../components/Skeletons/FilesSkeleton";

const Files = () => {
    const navigate = useNavigate();
    const params = useParams();
    const subjectName = params.resourceId
        .split("---")[0]
        .replaceAll("<slash>", "/");
    const subjectId = params.resourceId.split("---")[1];
    const [files, setFiles] = createSignal([]);

    const { pdfViewer, setPdfViewer } = useContext(PdfViewerContext);
    const { embedViewer, setEmbedViewer } = useContext(EmbedViewerContext);
    const { fileBlobs } = useContext(FileBlobsContext);

    function isDownloaded(fileId: string) {
        return fileBlobs.has(fileId);
    }

    onMount(async () => {
        try {
            const res = await axiosAuth(
                "/dashboard/getfiles?subjectId=".concat(subjectId)
            );
            console.log(res);
            if (res.data.success) {
                setFiles(res.data.payload.files);
            }
        } catch (error) {
            console.log(error);
        }
    });

    return (
        <div class="p-4">
            <div class="flex gap-2 items-center">
                <div
                    onclick={() => {
                        navigate("/dashboard/resources");
                    }}
                    class="cursor-pointer rounded-full aspect-square p-1 bg-gray-300 opacity-60 rotate-180 hover:opacity-100 duration-75 active:scale-95"
                >
                    <ArrowIcon />
                </div>
                <h1 class="text-2xl text-blue-700 font-semibold">
                    {subjectName}
                </h1>
            </div>
            <Show when={files().length === 0}>
                <FilesSkeleton />
            </Show>
            <Show when={files().length}>
                <div class="sm:p-4">
                    <For each={files()}>
                        {(file) => (
                            <div class="bg-white rounded-lg shadow p-4 mb-4">
                                <Show when={file.description}>
                                    <pre
                                        innerHTML={urlify(file.description)}
                                        class="mb-2 text-sm text-gray-600 whitespace-pre-wrap break-words"
                                    ></pre>
                                </Show>
                                <Show when={file.filename}>
                                    <div
                                        class={`w-max bg-blue-100 p-1 pr-2 ${
                                            file.thumbnailUrl
                                                ? "rounded-lg"
                                                : "rounded-full"
                                        }`}
                                    >
                                        {" "}
                                        <Show when={file.thumbnailUrl}>
                                            <div
                                                class="mx-auto h-28 rounded-lg mb-2"
                                                style={{
                                                    "background-image": `url(${file.thumbnailUrl})`,
                                                    "background-size": "cover",
                                                    "background-position":
                                                        "top",
                                                    "background-repeat":
                                                        "no-repeat",
                                                    "min-width": "250px",
                                                }}
                                            ></div>
                                        </Show>
                                        <div class="flex justify-between items-center gap-2 w-max bg-blue-100 p-1 pr-2 rounded-full">
                                            <div class="flex  items-center gap-2">
                                                <DownloadButton
                                                    file={file}
                                                    actionType="view"
                                                    getBlob={(blob: Blob) => {
                                                        // revoke the url when the fileToShow changes
                                                        if (
                                                            pdfViewer.pdfSrcUrl
                                                        ) {
                                                            console.log(
                                                                "revoking",
                                                                pdfViewer.pdfSrcUrl
                                                            );
                                                            URL.revokeObjectURL(
                                                                pdfViewer.pdfSrcUrl
                                                            );
                                                        }
                                                        fileBlobs.set(
                                                            file._id,
                                                            blob
                                                        );
                                                        const url =
                                                            URL.createObjectURL(
                                                                blob
                                                            );
                                                        // doc
                                                        if (
                                                            file.filename.includes(
                                                                ".doc"
                                                            ) ||
                                                            file.filename.includes(
                                                                ".docx"
                                                            )
                                                        ) {
                                                            setEmbedViewer({
                                                                srcUrl: url,
                                                                fileName:
                                                                    file.filename,
                                                            });
                                                            return;
                                                        }
                                                        setPdfViewer({
                                                            pdfSrcUrl: url,
                                                            fileName:
                                                                file.filename,
                                                        });
                                                    }}
                                                    downloaded={isDownloaded(
                                                        file._id
                                                    )}
                                                    downloadedBlob={fileBlobs.get(
                                                        file._id
                                                    )}
                                                />
                                                <Show
                                                    when={file.filename.includes(
                                                        ".pdf"
                                                    )}
                                                >
                                                    <DownloadButton
                                                        file={file}
                                                        actionType="download"
                                                        getBlob={(
                                                            blob: Blob
                                                        ) => {
                                                            // revoke the url when the fileToShow changes
                                                            if (
                                                                pdfViewer.pdfSrcUrl
                                                            ) {
                                                                console.log(
                                                                    "revoking",
                                                                    pdfViewer.pdfSrcUrl
                                                                );
                                                                URL.revokeObjectURL(
                                                                    pdfViewer.pdfSrcUrl
                                                                );
                                                            }
                                                            fileBlobs.set(
                                                                file._id,
                                                                blob
                                                            );
                                                            const url =
                                                                URL.createObjectURL(
                                                                    blob
                                                                );
                                                            setPdfViewer({
                                                                pdfSrcUrl: url,
                                                                fileName:
                                                                    file.filename,
                                                            });
                                                        }}
                                                        downloaded={isDownloaded(
                                                            file._id
                                                        )}
                                                        downloadedBlob={fileBlobs.get(
                                                            file._id
                                                        )}
                                                    />
                                                </Show>
                                                <div class="text-xs text-blue-700">
                                                    {file.filename.length > 20
                                                        ? file.filename
                                                              .slice(0, 20)
                                                              .concat("...")
                                                              .concat(
                                                                  file.filename
                                                                      .split(
                                                                          "."
                                                                      )
                                                                      .pop()
                                                              )
                                                        : file.filename}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Show>
                                <abbr
                                    title={new Date(
                                        file.createdAt
                                    ).toLocaleString()}
                                >
                                    <div class="text-gray-400 relative top-2 text-xs">
                                        {timeSince(
                                            new Date(file.createdAt).getTime()
                                        )}
                                    </div>
                                </abbr>
                            </div>
                        )}
                    </For>
                </div>
            </Show>
        </div>
    );
};

export default Files;
