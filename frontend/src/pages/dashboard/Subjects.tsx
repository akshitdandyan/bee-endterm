import { useNavigate } from "solid-app-router";
import {
    createEffect,
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
    FileBlobsContext,
    OfflineStoreContext,
    PdfViewerContext,
} from "../../@utils/context";
import DownloadButton from "../../components/DownloadButton/DownloadButton";
import { PreviewFileIcon } from "../../components/icons";
import SubjectsSkeleton from "../../components/Skeletons/SubjectsSkeleton";

const Subjects = () => {
    const navigate = useNavigate();
    const { subjects, setSubjects } = useContext(DashboardContext);
    const { offlineStore } = useContext(OfflineStoreContext);
    const { pdfViewer, setPdfViewer } = useContext(PdfViewerContext);
    const { fileBlobs } = useContext(FileBlobsContext);

    const [filesViewMenu, setFilesViewMenu] = createSignal({
        top: "0px",
        left: "0px",
        subjectName: "",
    });
    const [filesToShowInMenu, setFilesToShowInMenu] = createSignal([]);
    const [fetchingFiles, setFetchingFiles] = createSignal(false);

    onMount(async () => {
        if (subjects.length > 0) {
            return;
        }
        try {
            const res = await axiosAuth("/dashboard/getsubjects");
            console.log("new subjects", res);
            if (res.data.success) {
                setSubjects(res.data.payload.subjects);
                localStorage.setItem("data-from-offline", "false");
            }
        } catch (error) {
            console.log(error);
        }
    });

    createEffect(() => {
        if (offlineStore.subjects.length) {
            console.log("offline subjects", offlineStore.subjects);
            if (subjects.length === 0) {
                setSubjects(offlineStore.subjects);
            }
        }
    });

    const fetchFiles = async (
        e: MouseEvent,
        subjectId: string,
        subjectName: string
    ) => {
        e.stopPropagation();
        if (fetchingFiles()) {
            return;
        }
        setFetchingFiles(true);
        try {
            const res = await axiosAuth(
                "/dashboard/getfiles?subjectId=".concat(subjectId)
            );
            console.log(res);
            if (res.data.success) {
                setFilesToShowInMenu(res.data.payload.files);
                // read x and y position of the element
                const x = e.clientX;
                const y = e.clientY;
                // set the position of the menu, it should be within the screen
                if (window.innerWidth - x < 200) {
                    setFilesViewMenu({
                        top: y + "px",
                        left: x - 200 + "px",
                        subjectName,
                    });
                } else if (window.innerHeight - y < 300) {
                    setFilesViewMenu({
                        top: y - 300 + "px",
                        left: x + "px",
                        subjectName,
                    });
                } else {
                    setFilesViewMenu({
                        top: y + "px",
                        left: x + "px",
                        subjectName,
                    });
                }
            }
        } catch (error) {
            console.log(error);
        }
        setFetchingFiles(false);
    };

    function closeMenu(e: MouseEvent) {
        // close the menu if the user clicks outside the menu

        if (
            (e.target instanceof HTMLElement &&
                e.target.closest(".files-view-menu")) ||
            (e.target instanceof HTMLElement &&
                e.target.closest(".download-button"))
        ) {
            return;
        }
        setFilesViewMenu({
            top: "0px",
            left: "0px",
            subjectName: "",
        });
    }

    function isDownloaded(fileId: string) {
        return fileBlobs.has(fileId);
    }

    onMount(() => {
        window.addEventListener("click", closeMenu);
    });

    onCleanup(() => {
        document.removeEventListener("click", closeMenu);
    });

    return (
        <>
            <Show when={subjects.length === 0}>
                <SubjectsSkeleton />
            </Show>
            <Show when={subjects.length}>
                <div class="p-4">
                    <div class="sm:grid grid-cols-4 gap-4 ">
                        <Show when={filesViewMenu().subjectName}>
                            <div
                                class="fixed bg-white rounded-md shadow-lg z-10 p-2 files-view-menu duration-200"
                                style={{
                                    top: filesViewMenu().top,
                                    left: filesViewMenu().left,
                                }}
                            >
                                <div class="text-blue-900 font-semibold px-2">
                                    {filesViewMenu().subjectName}
                                </div>
                                <div class="border-b-2 border-blue-900"></div>
                                <div class="max-h-72 overflow-y-auto custom-sc">
                                    <For each={filesToShowInMenu()}>
                                        {(file) => (
                                            <div
                                                class="grid grid-cols-[1fr_5fr] gap-2 p-3 items-center border-blue-900 cursor-pointer duration-100"
                                                style={{
                                                    "box-shadow":
                                                        "0px 6px 16px 4px rgba(219, 234, 254,0.1)",
                                                }}
                                            >
                                                <DownloadButton
                                                    actionType="download"
                                                    file={file}
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
                                                    }}
                                                    downloaded={isDownloaded(
                                                        file._id
                                                    )}
                                                    downloadedBlob={fileBlobs.get(
                                                        file._id
                                                    )}
                                                />
                                                <abbr title={file.filename}>
                                                    <div class="text-blue-800 text-sm">
                                                        {
                                                            // shorten the file name if it is too long
                                                            file.filename
                                                                .length > 20
                                                                ? file.filename.slice(
                                                                      0,
                                                                      20
                                                                  ) + "..."
                                                                : file.filename
                                                        }
                                                    </div>
                                                </abbr>
                                            </div>
                                        )}
                                    </For>
                                </div>
                            </div>
                        </Show>
                        <For each={subjects}>
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
                                    }}
                                >
                                    <div class="text-blue-800 text-sm">
                                        {subject.subjectName}
                                    </div>
                                    <div>
                                        <abbr title="Quick Files View">
                                            <div
                                                onclick={(e) =>
                                                    fetchFiles(
                                                        e,
                                                        subject._id,
                                                        subject.subjectName
                                                    )
                                                }
                                                class="aspect-square bg-blue-900 rounded-full flex items-center justify-center"
                                            >
                                                <div class="scale-75 pl-[2px]">
                                                    <PreviewFileIcon />
                                                </div>
                                            </div>
                                        </abbr>
                                    </div>
                                </div>
                            )}
                        </For>
                    </div>
                </div>
            </Show>
        </>
    );
};

export default Subjects;
