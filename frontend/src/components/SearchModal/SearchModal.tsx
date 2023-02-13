import { useNavigate } from "solid-app-router";
import { Component, For, Show, useContext } from "solid-js";
import {
    DashboardContext,
    Day,
    FileBlobsContext,
    PdfViewerContext,
} from "../../@utils/context";
import { VITE_API_SERVER } from "../../@utils/envs";
import { isImage, timeSince } from "../../@utils/helpers";
import DownloadButton from "../DownloadButton/DownloadButton";

type Props = {
    announcements: DashboardContext["announcements"];
    files: DashboardContext["files"];
    events: Day["events"];
    subjects: DashboardContext["subjects"];
    close: () => void;
};

const SearchModal: Component<Props> = (props) => {
    const navigate = useNavigate();
    const { pdfViewer, setPdfViewer } = useContext(PdfViewerContext);
    const { fileBlobs } = useContext(FileBlobsContext);

    function isDownloaded(fileId: string) {
        return fileBlobs.has(fileId);
    }

    return (
        <div class="absolute top-[68px] z-10 bg-white p-2 min-h-20 w-[90%] shadow-2xl ring-2 ring-blue-700 rounded-lg custom-sc max-h-[80vh] ">
            <Show when={props.announcements.length}>
                <div class="text-gray-600 text-xs font-semibold">
                    Announcements
                </div>
                <div class="mt-1 text-xs">
                    <For each={props.announcements}>
                        {(announcement) => (
                            <div class="bg-white rounded-lg shadow p-1 mb-2">
                                <Show when={announcement.description}>
                                    <pre class="mb-2 text-xs text-gray-600 whitespace-pre-wrap break-words">
                                        {announcement.description}
                                    </pre>
                                </Show>
                                <Show when={announcement.filename}>
                                    <div
                                        class={`w-max  p-1 pr-2 ${
                                            announcement.thumbnailUrl ||
                                            isImage(announcement.filename)
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
                                                alt={announcement.filename}
                                                width="200"
                                                class="rounded-lg"
                                                style={{
                                                    "max-width": "80%",
                                                }}
                                            />
                                        </Show>
                                        <Show when={announcement.thumbnailUrl}>
                                            <div
                                                class="mx-auto h-28 rounded-lg mb-2"
                                                style={{
                                                    "background-image": `url(${announcement.thumbnailUrl})`,
                                                    "background-size": "cover",
                                                    "background-position":
                                                        "top",
                                                    "background-repeat":
                                                        "no-repeat",
                                                    "min-width": "250px",
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
                                                    file={announcement}
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
                                                            announcement._id,
                                                            blob
                                                        );
                                                        const url =
                                                            URL.createObjectURL(
                                                                blob
                                                            );
                                                        setPdfViewer({
                                                            pdfSrcUrl: url,
                                                            fileName:
                                                                announcement.filename,
                                                        });
                                                        props.close();
                                                    }}
                                                    downloaded={isDownloaded(
                                                        announcement._id
                                                    )}
                                                    downloadedBlob={fileBlobs.get(
                                                        announcement._id
                                                    )}
                                                />
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
                                    <div class="text-gray-400  text-xs">
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
            </Show>

            <Show when={props.events.length}>
                <div class="text-gray-600 text-xs font-semibold">Events</div>
                <div class="mt-1 text-xs">
                    <For each={props.events}>
                        {(event) => (
                            <div class="my-4 flex-wrap border-l-4 border-green-600 bg-green-100 rounded-md py-1 px-4">
                                <div class="text-sm text-green-600 font-semibold whitespace-nowrap">
                                    {new Date(event.eventOn).toDateString()}
                                </div>
                                <div class=" text-green-700 text-xs font-semibold mt-1 whitespace-pre-wrap break-words">
                                    {event.title}
                                </div>
                            </div>
                        )}
                    </For>
                </div>
            </Show>

            <Show when={props.files.length}>
                <div class="text-gray-600 text-xs font-semibold">Resources</div>
                <div class="mt-1 text-xs">
                    <For each={props.files}>
                        {(file) => (
                            <div class="bg-white rounded-lg shadow p-1 mb-2">
                                <Show when={file.description}>
                                    <pre class="mb-2 text-xs text-gray-600 whitespace-pre-wrap break-words">
                                        {file.description}
                                    </pre>
                                </Show>
                                <Show when={file.filename}>
                                    <div
                                        class={`w-max  p-1 pr-2 ${
                                            file.thumbnailUrl ||
                                            isImage(file.filename)
                                                ? "rounded-lg bg-transparent"
                                                : "rounded-full bg-blue-100"
                                        }`}
                                    >
                                        <Show when={isImage(file.filename)}>
                                            <img
                                                src={`${VITE_API_SERVER}/dashboard/image/${file._id}`}
                                                alt={file.filename}
                                                width="200"
                                                class="rounded-lg"
                                                style={{
                                                    "max-width": "80%",
                                                }}
                                            />
                                        </Show>
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
                                        <Show
                                            when={file.filename.includes(
                                                ".pdf"
                                            )}
                                        >
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
                                                        setPdfViewer({
                                                            pdfSrcUrl: url,
                                                            fileName:
                                                                file.filename,
                                                        });
                                                        props.close();
                                                    }}
                                                    downloaded={isDownloaded(
                                                        file._id
                                                    )}
                                                    downloadedBlob={fileBlobs.get(
                                                        file._id
                                                    )}
                                                />
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
                                        </Show>
                                    </div>
                                </Show>
                                <abbr
                                    title={new Date(
                                        file.createdAt
                                    ).toLocaleString()}
                                >
                                    <div class="text-gray-400  text-xs">
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

            <Show when={props.subjects.length}>
                <div class="text-gray-600 text-xs font-semibold">Subjects</div>
                <div class="mt-1 text-xs">
                    <For each={props.subjects}>
                        {(subject) => (
                            <div
                                class="mt-2 sm:mt-0 grid grid-cols-[5fr_1fr] items-center p-4 border-blue-900 rounded-md bg-blue-100 cursor-pointer hover:bg-blue-50 duration-100"
                                style={{
                                    "box-shadow":
                                        "0px 6px 16px 4px rgba(219, 234, 254,0.1)",
                                }}
                                onclick={() => {
                                    navigate(
                                        `/dashboard/resources/${subject.subjectName.replaceAll(
                                            "/",
                                            "<slash>"
                                        )}---${subject._id}`
                                    );
                                    props.close();
                                }}
                            >
                                <div class="text-blue-800 text-sm">
                                    {subject.subjectName}
                                </div>
                            </div>
                        )}
                    </For>
                </div>
            </Show>
        </div>
    );
};

export default SearchModal;
