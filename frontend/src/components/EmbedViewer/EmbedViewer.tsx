import { useContext } from "solid-js";
import { EmbedViewerContext } from "../../@utils/context";
import { CloseIcon, FullScreenIcon } from "../icons";

const EmbedViewer = (props: { url: string }) => {
    const { embedViewer, setEmbedViewer } = useContext(EmbedViewerContext);
    console.log(props.url);

    return (
        <div class="relative bg-gray-100 " id="embed-viewer-csecrew">
            <div class="flex bg-blue-100 p-2 items-center">
                <div
                    onclick={() => {
                        setEmbedViewer({
                            srcUrl: "",
                            fileName: "",
                        });
                    }}
                    class="aspect-square cursor-pointer duration-75 active:scale-95 rounded-full p-1 ring-2 ring-blue-700"
                >
                    <CloseIcon />
                </div>
                <div
                    onclick={() => {
                        const pdfViewerElement = document.getElementById(
                            "embed-viewer-csecrew"
                        );
                        if (pdfViewerElement) {
                            pdfViewerElement.requestFullscreen();
                            // nextPage();
                        }
                    }}
                    class="hidden sm:block aspect-square ml-2 cursor-pointer duration-75 active:scale-95 rounded-full p-1 ring-2 ring-blue-700"
                >
                    <FullScreenIcon />
                </div>

                <div class="text-sm ml-auto pl-2 text-blue-500">
                    {embedViewer.fileName
                        ? embedViewer.fileName
                        : "Viewing Doc"}
                </div>
            </div>
            <div
                id="pdf-contents-wrapper"
                class="overflow-y-auto  custom-sc"
                style={{
                    height: "calc(100vh - 4rem)",
                }}
            >
                <iframe
                    src={
                        "https://view.officeapps.live.com/op/embed.aspx?src=" +
                        props.url
                    }
                    width="100%"
                    height="100%"
                ></iframe>{" "}
            </div>
        </div>
    );
};

export default EmbedViewer;
