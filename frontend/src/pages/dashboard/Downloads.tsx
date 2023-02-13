import {
    createEffect,
    createSignal,
    For,
    onMount,
    Show,
    useContext,
} from "solid-js";
import { FileBlobsContext, PdfViewerContext } from "../../@utils/context";
import { deleteFile, DexieFile, getFiles } from "../../@utils/dexie";
import { CloseIcon } from "../../components/icons";

const Downloads = () => {
    const { pdfViewer, setPdfViewer } = useContext(PdfViewerContext);
    const { fileBlobs } = useContext(FileBlobsContext);

    const [fetching, setFetching] = createSignal(true);

    const [files, setFiles] = createSignal<DexieFile[]>([]);

    const deleteFromDownloads = async (e: MouseEvent, file: DexieFile) => {
        e.stopPropagation();
        setFiles(files().filter((f) => f._id !== file._id));
        await deleteFile(file._id);
        fileBlobs.delete(file._id);
    };

    onMount(async () => {
        const offlineIndicatorId = localStorage.getItem("offlineIndicatorId");
        if (!offlineIndicatorId) {
            return;
        }
        const offlineIndicator = document.getElementById(offlineIndicatorId);
        if (!offlineIndicator) {
            return;
        }
        offlineIndicator.style.bottom = "-4rem";

        const files = await getFiles();
        if (typeof files === "object" && files.length > 0) {
            setFiles(files);
        }
        setFetching(false);
    });

    return (
        <div>
            <Show when={files().length === 0 && fetching() === false}>
                <div class="p-4 text-center text-gray-500 ">
                    No files downloaded yet
                </div>
            </Show>
            <div class=" sm:grid grid-cols-4 gap-4 p-4 duration-200">
                <For each={files()}>
                    {(file) => (
                        <div
                            onclick={() => {
                                // revoke the url when the fileToShow changes
                                if (pdfViewer.pdfSrcUrl) {
                                    console.log(
                                        "revoking",
                                        pdfViewer.pdfSrcUrl
                                    );
                                    URL.revokeObjectURL(pdfViewer.pdfSrcUrl);
                                }
                                // convert file.src to a url
                                const url = URL.createObjectURL(file.src);
                                setPdfViewer({
                                    pdfSrcUrl: url,
                                    fileName: file.filename,
                                });
                            }}
                            class="mb-4 sm:mb-0 p-4 rounded-md bg-blue-100 cursor-pointer hover:bg-blue-50 duration-200 flex items-center justify-between gap-2"
                        >
                            <div
                                class="text-blue-800 text-sm"
                                style={{
                                    "box-shadow":
                                        "0px 6px 16px 4px rgba(219, 234, 254,0.1)",
                                }}
                            >
                                {file.filename}
                            </div>
                            <abbr title="Delete from downloads">
                                <div
                                    onclick={(e) => {
                                        deleteFromDownloads(e, file);
                                    }}
                                    class="rounded-full bg-gray-100 hover:bg-red-200 aspect-square p-1"
                                >
                                    <CloseIcon />
                                </div>
                            </abbr>
                        </div>
                    )}
                </For>
            </div>
        </div>
    );
};

export default Downloads;
