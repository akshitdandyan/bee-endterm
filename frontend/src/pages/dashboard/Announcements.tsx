import {
    createSignal,
    For,
    onCleanup,
    onMount,
    Show,
    useContext,
} from "solid-js";
import { axiosAuth } from "../../@utils/axios";
import {
    DashboardContext,
    EmbedViewerContext,
    FileBlobsContext,
    OfflineStoreContext,
    PdfViewerContext,
} from "../../@utils/context";
import { VITE_API_SERVER } from "../../@utils/envs";
import { isImage, timeSince, urlify } from "../../@utils/helpers";
import DownloadButton from "../../components/DownloadButton/DownloadButton";
import FilesSkeleton from "../../components/Skeletons/FilesSkeleton";

const Announcements = () => {
    const { announcements, setAnnouncements, overviewData } =
        useContext(DashboardContext);
    const { pdfViewer, setPdfViewer } = useContext(PdfViewerContext);
    const { embedViewer, setEmbedViewer } = useContext(EmbedViewerContext);

    const { fileBlobs } = useContext(FileBlobsContext);
    const { offlineStore } = useContext(OfflineStoreContext);

    const [page, setPage] = createSignal(0);
    const [fetchingMore, setFetchingMore] = createSignal(false);

    onMount(async () => {
        if (announcements.length > 0) {
            console.log("announcements already fetched");
            return;
        }
        if (overviewData.announcements.length > 0) {
            setAnnouncements(overviewData.announcements);
        }
        try {
            const res = await axiosAuth("/dashboard/getannouncements?page=0");
            if (res.data.success) {
                setAnnouncements(res.data.payload.announcements);
                console.log(
                    "announcements fetched",
                    res.data.payload.announcements
                );
            }
        } catch (error) {
            console.log(error);
        }
    });

    const fetchMoreAnnouncements = async () => {
        setFetchingMore(true);
        try {
            const res = await axiosAuth(
                `/dashboard/getannouncements?page=${page() + 1}`
            );
            if (res.data.success) {
                const newAnnouncements = res.data.payload.announcements;
                setAnnouncements([...announcements, ...newAnnouncements]);
                setPage(page() + 1);
            }
        } catch (error) {
            console.log(error);
        }
        setFetchingMore(true);
    };

    function detectBottom() {
        const dashboardBody = document.getElementById("dashboard-body");
        if (
            Math.floor(dashboardBody.scrollHeight - dashboardBody.scrollTop) ===
            dashboardBody.clientHeight
        ) {
            console.log("you're at the bottom of the page");
            fetchMoreAnnouncements();
        }
    }

    function isDownloaded(fileId: string) {
        return fileBlobs.has(fileId);
    }

    onMount(() => {
        document
            .getElementById("dashboard-body")
            .addEventListener("scroll", detectBottom);
    });

    onCleanup(() => {
        document
            .getElementById("dashboard-body")
            .removeEventListener("scroll", detectBottom);
    });
    return (
        <>
            <Show
                when={
                    announcements.length === 0 &&
                    offlineStore.announcements.length === 0
                }
            >
                <FilesSkeleton />
            </Show>
            <Show when={announcements.length || offlineStore.announcements}>
                <div class="p-4">
                    <For each={announcements || offlineStore.announcements}>
                        {(announcement) => (
                            <Show
                                when={
                                    !announcement.filename ||
                                    announcement.filename.includes(".pdf") ||
                                    announcement.filename.includes(".doc") ||
                                    announcement.filename.includes(".docx") ||
                                    isImage(announcement.filename)
                                }
                            >
                                <div
                                    class={`bg-gray-100 rounded-lg shadow p-4 mb-4`}
                                >
                                    <Show when={announcement.description}>
                                        <pre
                                            innerHTML={urlify(
                                                announcement.description
                                            )}
                                            class="mb-2 text-sm text-gray-600 whitespace-pre-wrap break-words"
                                        ></pre>
                                    </Show>
                                    <Show when={announcement.filename}>
                                        <div
                                            class={`w-max  p-1 pr-2 ${
                                                announcement.thumbnailUrl ||
                                                isImage(announcement.filename)
                                                    ? "rounded-lg bg-white"
                                                    : "rounded-full bg-blue-100"
                                            }`}
                                        >
                                            <Show
                                                when={isImage(
                                                    announcement.filename
                                                )}
                                            >
                                                <img
                                                    src={`${VITE_API_SERVER}/dashboard/image/${announcement._id}`}
                                                    alt={announcement.filename}
                                                    width="300"
                                                    class="rounded-lg"
                                                    style={{
                                                        "max-width": "80%",
                                                    }}
                                                />
                                            </Show>
                                            <Show
                                                when={
                                                    announcement.thumbnailUrl &&
                                                    !isImage(
                                                        announcement.filename
                                                    )
                                                }
                                            >
                                                <div
                                                    class="mx-auto h-28 rounded-lg mb-2"
                                                    style={{
                                                        "background-image": `url(${announcement.thumbnailUrl})`,
                                                        "background-size":
                                                            "cover",
                                                        "background-position":
                                                            "top",
                                                        "background-repeat":
                                                            "no-repeat",
                                                        "min-width": "250px",
                                                    }}
                                                ></div>
                                            </Show>
                                            <Show
                                                when={
                                                    announcement.filename.includes(
                                                        ".pdf"
                                                    ) ||
                                                    announcement.filename.includes(
                                                        ".doc"
                                                    ) ||
                                                    announcement.filename.includes(
                                                        ".docx"
                                                    )
                                                }
                                            >
                                                <div class="flex  rounded-full p-[2px]  items-center gap-2">
                                                    <DownloadButton
                                                        file={announcement}
                                                        actionType="view"
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
                                                                announcement._id,
                                                                blob
                                                            );
                                                            const url =
                                                                URL.createObjectURL(
                                                                    blob
                                                                );
                                                            // doc
                                                            if (
                                                                announcement.filename.includes(
                                                                    ".doc"
                                                                ) ||
                                                                announcement.filename.includes(
                                                                    ".docx"
                                                                )
                                                            ) {
                                                                setEmbedViewer({
                                                                    srcUrl: url,
                                                                    fileName:
                                                                        announcement.filename,
                                                                });
                                                                return;
                                                            }
                                                            setPdfViewer({
                                                                pdfSrcUrl: url,
                                                                fileName:
                                                                    announcement.filename,
                                                            });
                                                        }}
                                                        downloaded={isDownloaded(
                                                            announcement._id
                                                        )}
                                                        downloadedBlob={fileBlobs.get(
                                                            announcement._id
                                                        )}
                                                    />
                                                    <Show
                                                        when={announcement.filename.includes(
                                                            ".pdf"
                                                        )}
                                                    >
                                                        <DownloadButton
                                                            file={announcement}
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
                                                                    announcement._id,
                                                                    blob
                                                                );
                                                                const url =
                                                                    URL.createObjectURL(
                                                                        blob
                                                                    );
                                                                setPdfViewer({
                                                                    pdfSrcUrl:
                                                                        url,
                                                                    fileName:
                                                                        announcement.filename,
                                                                });
                                                            }}
                                                            downloaded={isDownloaded(
                                                                announcement._id
                                                            )}
                                                            downloadedBlob={fileBlobs.get(
                                                                announcement._id
                                                            )}
                                                        />
                                                    </Show>
                                                    <div class="text-xs text-blue-700">
                                                        {announcement.filename
                                                            .length > 20
                                                            ? announcement.filename
                                                                  .slice(0, 20)
                                                                  .concat("...")
                                                                  .concat(
                                                                      announcement.filename
                                                                          .split(
                                                                              "."
                                                                          )
                                                                          .pop()
                                                                  )
                                                            : announcement.filename}
                                                    </div>
                                                </div>
                                            </Show>
                                        </div>
                                    </Show>
                                    <abbr
                                        title={new Date(
                                            announcement.createdAt
                                        ).toLocaleString()}
                                    >
                                        <div class="text-gray-400 relative top-2 text-xs">
                                            {timeSince(
                                                new Date(
                                                    announcement.createdAt
                                                ).getTime()
                                            )}
                                        </div>
                                    </abbr>
                                </div>
                            </Show>
                        )}
                    </For>
                    <Show when={fetchingMore()}>
                        <div class="text-center text-gray-500 text-sm">
                            Fetching More...
                        </div>
                    </Show>
                </div>
            </Show>
        </>
    );
};

export default Announcements;
