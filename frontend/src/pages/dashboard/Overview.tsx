import { Link } from "solid-app-router";
import { createEffect, For, onMount, Show, useContext } from "solid-js";
import { axiosAuth } from "../../@utils/axios";
import {
    DashboardContext,
    EmbedViewerContext,
    FileBlobsContext,
    PdfViewerContext,
} from "../../@utils/context";
import { VITE_API_SERVER } from "../../@utils/envs";
import { isImage, timeSince, urlify } from "../../@utils/helpers";
import DownloadButton from "../../components/DownloadButton/DownloadButton";
import OverviewSkeleton from "../../components/Skeletons/OverviewSkeleton";

const Overview = () => {
    const { overviewData, setOverviewData } = useContext(DashboardContext);
    const { pdfViewer, setPdfViewer } = useContext(PdfViewerContext);
    const { embedViewer, setEmbedViewer } = useContext(EmbedViewerContext);

    const { fileBlobs } = useContext(FileBlobsContext);

    function isDownloaded(fileId: string) {
        return fileBlobs.has(fileId);
    }

    onMount(async () => {
        try {
            const res = await axiosAuth.get(
                "/dashboard/getoverviewdetails?groupname=".concat(
                    localStorage.getItem("selectedGroup") || ""
                )
            );
            console.log(res.data);
            if (res.data.success && res.data.payload) {
                setOverviewData(res.data.payload);
                console.log("overview data fetched");
            }
        } catch (error) {}
    });

    createEffect(() => {
        console.log("Overview", overviewData);
    });

    return (
        <>
            <Show when={overviewData.announcements.length === 0}>
                <OverviewSkeleton />
            </Show>
            <Show when={overviewData.announcements.length}>
                <div class="p-4">
                    <div class="sm:grid grid-cols-[1fr_3fr_3fr] gap-8">
                        {/* Classes */}

                        <Show when={!localStorage.getItem("selectedGroup")}>
                            <div>
                                <div class="text-green-800 text-sm">
                                    Select a group to see class schedule
                                </div>
                                <Link
                                    class="text-white bg-green-600 mt-2 block text-center w-28 rounded-full px-2 py-2 sm:py-1 text-xs duration-200 active:scale-90"
                                    href="/dashboard/timetable"
                                >
                                    View Groups
                                </Link>
                            </div>
                        </Show>
                        <Show when={localStorage.getItem("selectedGroup")}>
                            <div>
                                <div class="text-green-800 text-sm">
                                    Classes Today for{" "}
                                    {localStorage.getItem("selectedGroup")}
                                </div>
                                <Show when={overviewData?.todayClasses?.length}>
                                    <div>
                                        <For each={overviewData.todayClasses}>
                                            {(todayClass) => (
                                                <div class="my-4 border-l-4 border-green-600 bg-green-100 rounded-md py-1 px-4">
                                                    <div class="text-sm text-green-600 font-semibold">
                                                        {todayClass.startat}
                                                    </div>
                                                    <div class="ml-4 text-green-700 font-semibold">
                                                        {todayClass.subjectname}
                                                    </div>
                                                    <div class="text-sm text-green-600 font-semibold">
                                                        {todayClass.endat}
                                                    </div>
                                                </div>
                                            )}
                                        </For>
                                    </div>
                                </Show>
                                <Show
                                    when={!overviewData?.todayClasses?.length}
                                >
                                    <div class="text-green-600 text-sm py-2">
                                        No classes today
                                    </div>
                                </Show>
                                <Link
                                    class="text-white bg-green-600 rounded-full px-2 py-2 sm:py-1 text-xs duration-200 active:scale-90"
                                    href="/dashboard/timetable"
                                >
                                    View Timetable
                                </Link>
                            </div>
                        </Show>

                        {/* Announcements */}
                        <div class="border-blue-400 sm:border-2 rounded-md relative pt-4 mt-10 sm:mt-5">
                            <div class="absolute -top-[2px] left-0 w-full">
                                <div class="bg-blue-400 rounded-full p-1 text-white absolute -top-[320%] px-2 left-2 text-sm">
                                    Latest Notices
                                </div>
                                <div class="h-1 bg-blue-400 rounded-lg"></div>
                            </div>
                            <div class="sm:max-h-80 overflow-y-auto hide-sc sm:px-2">
                                <For each={overviewData.announcements}>
                                    {(announcement) => (
                                        <div class="bg-white rounded-lg shadow p-2 mb-4">
                                            <Show
                                                when={announcement.description}
                                            >
                                                <pre
                                                    innerHTML={urlify(
                                                        announcement.description
                                                    )}
                                                    class="mb-2 text-sm text-gray-600 whitespace-pre-wrap break-words sm:max-w-sm"
                                                ></pre>
                                            </Show>
                                            <Show when={announcement.filename}>
                                                <div
                                                    class={`w-max  p-1 pr-2 ${
                                                        announcement.thumbnailUrl ||
                                                        isImage(
                                                            announcement.filename
                                                        )
                                                            ? "rounded-lg bg-transparent"
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
                                                            alt={
                                                                announcement.filename
                                                            }
                                                            width="300"
                                                            class="rounded-lg"
                                                            style={{
                                                                "max-width":
                                                                    "80%",
                                                            }}
                                                        />
                                                    </Show>
                                                    <Show
                                                        when={
                                                            announcement.thumbnailUrl
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
                                                                "min-width":
                                                                    "250px",
                                                            }}
                                                        ></div>
                                                    </Show>
                                                    <Show
                                                        when={announcement.filename.includes(
                                                            ".pdf"
                                                        )}
                                                    >
                                                        <div class="flex  items-center gap-2">
                                                            <DownloadButton
                                                                file={
                                                                    announcement
                                                                }
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
                                                                        setEmbedViewer(
                                                                            {
                                                                                srcUrl: url,
                                                                                fileName:
                                                                                    announcement.filename,
                                                                            }
                                                                        );
                                                                        return;
                                                                    }
                                                                    setPdfViewer(
                                                                        {
                                                                            pdfSrcUrl:
                                                                                url,
                                                                            fileName:
                                                                                announcement.filename,
                                                                        }
                                                                    );
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
                                                                    file={
                                                                        announcement
                                                                    }
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
                                                                        setPdfViewer(
                                                                            {
                                                                                pdfSrcUrl:
                                                                                    url,
                                                                                fileName:
                                                                                    announcement.filename,
                                                                            }
                                                                        );
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
                                                                {announcement
                                                                    .filename
                                                                    .length > 20
                                                                    ? announcement.filename
                                                                          .slice(
                                                                              0,
                                                                              20
                                                                          )
                                                                          .concat(
                                                                              "..."
                                                                          )
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
                                    )}
                                </For>
                            </div>
                            <Link
                                href="/dashboard/announcements"
                                class=" bg-blue-600 text-white rounded-full py-2 px-4 sm:py-1 sm:px-2 sm:text-xs absolute bottom-2 right-2 active:scale-90 duration-200"
                            >
                                View all
                            </Link>
                        </div>

                        {/* Events mobile */}
                        <div class="my-8 sm:hidden">
                            <div class="text-green-800 text-sm">
                                Upcoming Events
                            </div>
                            <Show when={overviewData.events.length === 0}>
                                <div class="text-gray-400 text-xs my-2">
                                    No upcoming events
                                </div>
                            </Show>
                            <div class="sm:grid grid-cols-2 sm:grid-cols-5 gap-2">
                                <For each={overviewData.events}>
                                    {(event) => (
                                        <div class="my-4 flex-wrap border-l-4 border-green-600 bg-green-100 rounded-md py-1 px-4">
                                            <div class="text-sm text-green-600 font-semibold whitespace-nowrap">
                                                {new Date(
                                                    event.eventOn
                                                ).toDateString()}
                                            </div>
                                            <div class=" text-green-700 text-xs font-semibold mt-1 whitespace-nowrap sm:whitespace-normal">
                                                {event.title}
                                            </div>
                                        </div>
                                    )}
                                </For>
                            </div>
                            <Link
                                class="text-white bg-green-600 rounded-full p-2 text-xs duration-200 active:scale-90"
                                href="/dashboard/events"
                            >
                                View All Events
                            </Link>
                        </div>

                        {/* Resources */}
                        <div class="border-blue-400 sm:border-2 rounded-md relative pt-4 mt-10 sm:mt-5">
                            <div class="absolute -top-[2px] left-0 w-full">
                                <div class="bg-blue-400 rounded-full p-1 text-white absolute -top-[320%] px-2 left-2 text-sm">
                                    Latest Resources
                                </div>
                                <div class="h-1 bg-blue-400 rounded-lg"></div>
                            </div>
                            <div class="sm:max-h-80 overflow-y-auto hide-sc px-2">
                                <For each={overviewData.files}>
                                    {(file) => (
                                        <div class="bg-white rounded-lg shadow p-2 mb-4">
                                            <div class="flex justify-between items-center">
                                                <Show when={file.description}>
                                                    <pre
                                                        innerHTML={urlify(
                                                            file.description
                                                        )}
                                                        class="mb-2 text-sm text-gray-600 whitespace-pre-wrap break-words"
                                                    ></pre>
                                                </Show>
                                                <div class="bg-purple-100 rounded-full text-purple-500 px-2 py-1 font-semibold  text-xs">
                                                    {file.subjectName}
                                                </div>
                                            </div>
                                            <div class="flex justify-between">
                                                <Show when={file.filename}>
                                                    <div class="flex justify-between items-center gap-2 w-max bg-blue-100  p-1 rounded-full">
                                                        <DownloadButton
                                                            file={file}
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
                                                                    setEmbedViewer(
                                                                        {
                                                                            srcUrl: url,
                                                                            fileName:
                                                                                file.filename,
                                                                        }
                                                                    );
                                                                    return;
                                                                }
                                                                setPdfViewer({
                                                                    pdfSrcUrl:
                                                                        url,
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
                                                                    setPdfViewer(
                                                                        {
                                                                            pdfSrcUrl:
                                                                                url,
                                                                            fileName:
                                                                                file.filename,
                                                                        }
                                                                    );
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
                                                            {file.filename}
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
                                                            new Date(
                                                                file.createdAt
                                                            ).getTime()
                                                        )}
                                                    </div>
                                                </abbr>
                                            </div>
                                        </div>
                                    )}
                                </For>
                            </div>
                            <Link
                                href="/dashboard/resources"
                                class=" bg-blue-600 text-white rounded-full py-2 px-4 sm:py-1 sm:px-2 sm:text-xs absolute bottom-2 right-2 active:scale-90 duration-200"
                            >
                                View all
                            </Link>
                        </div>
                    </div>

                    {/* Events desktop */}
                    <div class="mt-2 hidden sm:block">
                        <div class="text-green-800 text-sm">
                            Upcoming Events
                        </div>
                        <Show when={overviewData.events.length === 0}>
                            <div class="text-gray-400 text-xs my-2">
                                No upcoming events
                            </div>
                        </Show>
                        <div class="sm:grid grid-cols-2 sm:grid-cols-5 gap-2">
                            <For each={overviewData.events}>
                                {(event) => (
                                    <div class="my-4 flex-wrap border-l-4 border-green-600 bg-green-100 rounded-md py-1 px-4">
                                        <div class="text-sm text-green-600 font-semibold whitespace-nowrap">
                                            {new Date(
                                                event.eventOn
                                            ).toDateString()}
                                        </div>
                                        <div class=" text-green-700 text-xs font-semibold mt-1 whitespace-nowrap sm:whitespace-normal">
                                            {event.title}
                                        </div>
                                    </div>
                                )}
                            </For>
                        </div>
                        <Link
                            class="text-white bg-green-600 rounded-full px-2 py-1 text-xs duration-200 active:scale-90"
                            href="/dashboard/events"
                        >
                            View All Events
                        </Link>
                    </div>
                </div>
            </Show>
        </>
    );
};

export default Overview;
