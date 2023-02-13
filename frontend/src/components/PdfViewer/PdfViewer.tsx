import {
    Component,
    createSignal,
    createUniqueId,
    onCleanup,
    onMount,
    Show,
    useContext,
} from "solid-js";
import { PdfViewerContext } from "../../@utils/context";
import { injectPdfjsIfNotPresent } from "../../@utils/pdf";
import { CloseIcon, FullScreenIcon } from "../icons";
import "./textLayer.css";

const PdfViewer: Component = () => {
    const { pdfViewer, setPdfViewer } = useContext(PdfViewerContext);
    const pdfViewerComponentId = createUniqueId();

    let leftArrowBtnRef;
    let rightArrowBtnRef;

    const [pdfDoc, setPdfDoc] = createSignal(null);
    const [pageNum, setPageNum] = createSignal(1);
    const [pageIsRendering, setPageIsRendering] = createSignal(true);
    const [pageNumIsPending, setPageNumIsPending] = createSignal(null);
    const [scale, setScale] = createSignal(1);
    //@ts-ignore
    const [canvas, setCanvas] = createSignal<HTMLCanvasElement | null>();
    const [ctx, setCtx] = createSignal<CanvasRenderingContext2D | null>();
    const [showLoader, setShowLoader] = createSignal(true);

    const getDocument = () => {
        return new Promise((resolve, reject) => {
            // @ts-ignore
            if (!pdfjsLib) {
                reject("pdfjsLib is null");
                return console.log("pdfjsLib is null");
            }

            // @ts-ignore
            pdfjsLib
                .getDocument(pdfViewer.pdfSrcUrl)
                .promise.then((_pdfDoc) => {
                    setPdfDoc(_pdfDoc);
                    resolve("done");
                });
        });
    };

    const renderText = (page, viewport) => {
        if (window.innerWidth < 640) {
            return console.log("Not rendering text on mobile devices");
        }
        console.log("Rendering text...");
        page.getTextContent().then((textContent) => {
            console.log("textContent -", textContent);
            const textLayer: HTMLElement = document.querySelector(".textLayer");

            // remove all the text divs from the text layer
            while (textLayer.firstChild) {
                textLayer.removeChild(textLayer.firstChild);
            }

            textLayer.style.left = canvas().offsetLeft + "px";
            textLayer.style.top = canvas().offsetTop + "px";
            textLayer.style.height = canvas().offsetHeight + "px";
            textLayer.style.width = canvas().offsetWidth + "px";

            // Pass the data to the method for rendering of text over the pdf canvas.
            // @ts-ignore
            pdfjsLib.renderTextLayer({
                textContent: textContent,
                container: textLayer,
                viewport: viewport,
                textDivs: [],
            });
        });
    };

    const renderPage = (numPages: number) => {
        console.log("[renderPage] numPages:", numPages);
        setPageIsRendering(true);

        pdfDoc()
            .getPage(numPages)
            .then((page) => {
                const viewPort = page.getViewport({
                    scale: scale(),
                });
                console.log("viewPort -", viewPort);

                setCanvas((c) => ({ ...c, height: viewPort.height }));
                setCanvas((c) => ({ ...c, width: viewPort.width }));

                console.log("canvas -", canvas());
                console.log("devicePixelRatio ", devicePixelRatio);

                // if (window.devicePixelRatio > 1 && canvas()) {
                //     var canvasWidth = canvas().width;
                //     var canvasHeight = canvas().height;

                //     canvas().width = canvasWidth * window.devicePixelRatio;
                //     canvas().height = canvasHeight * window.devicePixelRatio;

                //     ctx().scale(
                //         window.devicePixelRatio,
                //         window.devicePixelRatio
                //     );
                // }

                const renderCtx = {
                    canvasContext: ctx(),
                    viewport: viewPort,
                };

                page.render(renderCtx)
                    .promise.then((e) => {
                        console.log("page render -", e);
                        renderText(page, viewPort);

                        setPageIsRendering(false);
                        console.log("pageNumIsPending -", pageNumIsPending());
                        if (pageNumIsPending() !== null) {
                            renderPage(pageNumIsPending());
                            setPageNumIsPending(null);
                        }
                    })
                    .catch((error) =>
                        console.log("error in rendering -", error)
                    )
                    .finally(() => {
                        setShowLoader(false);
                    });
            });
    };

    function isElementInViewport(el) {
        var rect = el.getBoundingClientRect();

        // return (
        //     rect.top >= 0 &&
        //     rect.left >= 0 &&
        //     rect.bottom <=
        //         (window.innerHeight ||
        //             document.documentElement
        //                 .clientHeight) /* or $(window).height() */ &&
        //     rect.right <=
        //         (window.innerWidth ||
        //             document.documentElement
        //                 .clientWidth) /* or $(window).width() */
        // );
        // detect if top of element is visible
        return rect.top >= 0 && rect.top <= window.innerHeight;
    }

    function onVisibilityChange(el, callback) {
        var old_visible;
        return function () {
            var visible = isElementInViewport(el);
            if (visible != old_visible) {
                old_visible = visible;
                if (typeof callback == "function") {
                    callback();
                }
            }
        };
    }

    // const handleScroll = onVisibilityChange(
    //     document.getElementById("pdf-canvas-2"),
    //     function () {
    //         /* Your code go here */
    //         console.log("element is visible");
    //     }
    // );

    let currPage = 1; //Pages are 1-based not 0-based
    let numPages = 0;

    async function handleMultiPageRender(page) {
        //This gives us the page's dimensions at full scale
        console.count("PAGE RENDERING");

        let viewPort = page.getViewport({
            scale: 1,
        });
        const scale =
            document.getElementById("pdf-contents-wrapper").clientWidth /
            viewPort.width;

        console.log("scale -", scale);

        viewPort = page.getViewport({
            scale: scale,
        });

        const PRINT_RESOLUTION = 150;
        const PRINT_UNITS = PRINT_RESOLUTION / 72.0;

        //We'll create a canvas for each page to draw it on
        const canvas = document.createElement("canvas");
        canvas.style.display = "block";
        const context = canvas.getContext("2d");
        canvas.height = Math.floor(viewPort.height * PRINT_UNITS);
        canvas.width = Math.floor(viewPort.width * PRINT_UNITS);

        // canvas.width = viewPort.width * window.devicePixelRatio;
        // canvas.height = viewPort.height * window.devicePixelRatio;
        canvas.style.width = "100%";
        canvas.classList.add("rounded-lg");
        const canvasWrapper = document.createElement("div");
        canvasWrapper.id = `pdf-canvasWrapper-${page.pageNumber}`;
        canvasWrapper.classList.add("pdf-canvas");
        canvasWrapper.style.position = "relative";

        // canvasWrapper.classList.add(
        //     ...[
        //         "w-max",
        //         "mx-auto",
        //         "relative",
        //         "shadow-xl",
        //         "rounded-lg",
        //         "mt-6",
        //     ]
        // );
        canvasWrapper.appendChild(canvas);
        const abbr = document.createElement("abbr");
        abbr.title = `Page ${page.pageNumber}`;

        abbr.appendChild(canvasWrapper);

        document.getElementById("pdf-contents-wrapper").appendChild(abbr);

        console.count("CANVAS CREATED");

        //Draw it on the canvas
        page.render({
            canvasContext: context,
            viewport: viewPort,
            transform: [PRINT_UNITS, 0, 0, PRINT_UNITS, 0, 0],
        }).promise.then(() => {
            //Move to next page
            currPage++;
            if (pdfDoc() !== null && currPage <= numPages) {
                pdfDoc().getPage(currPage).then(handleMultiPageRender);
            }
        });
    }

    // const queueRenderPage = (num: number) => {
    //     if (pageIsRendering()) {
    //         setPageNumIsPending(num);
    //     } else {
    //         renderPage(num);
    //     }
    // };

    // const prevPage = () => {
    //     console.log(
    //         "pageNum -",
    //         pageNum(),
    //         "pdfDoc().numPages -",
    //         pdfDoc().numPages
    //     );

    //     if (pageNum() <= 1) {
    //         return;
    //     }
    //     queueRenderPage(pageNum() - 1);
    //     setPageNum((p) => p - 1);
    // };

    // const nextPage = () => {
    //     console.log(
    //         "pageNum -",
    //         pageNum(),
    //         "pdfDoc().numPages -",
    //         pdfDoc().numPages
    //     );
    //     if (pageNum() >= pdfDoc().numPages) {
    //         return;
    //     }
    //     queueRenderPage(pageNum() + 1);
    //     setPageNum((p) => p + 1);
    // };

    // const addButtonClickEvents = (e: KeyboardEvent) => {
    //     if (e.code.toLowerCase() === "arrowright") {
    //         rightArrowBtnRef.current?.click();
    //     } else if (e.code.toLowerCase() === "arrowleft") {
    //         leftArrowBtnRef.current?.click();
    //     }
    // };

    function detectCanvasNumberInViewport() {
        const canvases = document.querySelectorAll(".pdf-canvas");
        const canvasesArray = Array.from(canvases);
        const canvasInViewport = canvasesArray.find((canvas) =>
            isElementInViewport(canvas)
        );
        if (canvasInViewport) {
            const canvasNumber = canvasInViewport.id.split("-")[2];
            setPageNum(Number(canvasNumber));
        }
    }

    onMount(async () => {
        if (!document) {
            return console.log("Doc not found");
        }
        // // setScale based on devicePixelRatio & window.innerWidth
        // setScale((s) => {
        //     if (window.innerWidth < 300) {
        //         return 0.35;
        //     } else if (window.innerWidth < 400) {
        //         return 0.4;
        //     } else if (window.innerWidth < 768) {
        //         return 0.5;
        //     } else if (window.innerWidth < 1024) {
        //         return 0.75;
        //     } else if (window.innerWidth < 1280) {
        //         return 1;
        //     } else if (window.innerWidth < 1440) {
        //         return 1.25;
        //     } else if (window.innerWidth < 1600) {
        //         return 1.5;
        //     } else if (window.innerWidth < 1920) {
        //         return 1.75;
        //     } else {
        //         return 2;
        //     }
        // });
        // window.addEventListener("keydown", addButtonClickEvents);
        // check if script is already exist

        await injectPdfjsIfNotPresent();
        await getDocument();
        setShowLoader(false);
        if (pdfDoc()._pdfInfo.numPages > 0) {
            // renderPage(1);
            const page = await pdfDoc().getPage(1);
            console.log("[onMount] page:", page);
            handleMultiPageRender(page);
            numPages = pdfDoc()._pdfInfo.numPages;
        }

        document
            .getElementById("pdf-contents-wrapper")
            .addEventListener("scroll", detectCanvasNumberInViewport);
    });

    return (
        <div class="relative bg-gray-100" id={pdfViewerComponentId}>
            <div class="flex bg-blue-100 p-2 items-center">
                <div
                    onclick={() => {
                        URL.revokeObjectURL(pdfViewer.pdfSrcUrl);
                        setPdfViewer({
                            fileName: "",
                            pdfSrcUrl: "",
                        });
                    }}
                    class="aspect-square cursor-pointer duration-75 active:scale-95 rounded-full p-1 ring-2 ring-blue-700"
                >
                    <CloseIcon />
                </div>
                <div
                    onclick={() => {
                        const pdfViewerElement =
                            document.getElementById(pdfViewerComponentId);
                        if (pdfViewerElement) {
                            pdfViewerElement.requestFullscreen();
                            setScale(1.5);
                            // nextPage();
                        }
                    }}
                    class="hidden sm:block aspect-square ml-2 cursor-pointer duration-75 active:scale-95 rounded-full p-1 ring-2 ring-blue-700"
                >
                    <FullScreenIcon />
                </div>
                <div class="flex justify-evenly items-center gap-2 px-2 border-l-2 border-l-gray-400 ml-2">
                    <div class="text-sm text-blue-500"> Page</div>
                    <div class="h-8 w-8 text-center pt-1 aspect-square rounded-full bg-blue-700 text-white">
                        {pageNum()}
                    </div>
                    <div class="text-sm text-blue-500">of</div>
                    <div>{pdfDoc()?._pdfInfo?.numPages}</div>
                </div>
                {/* <button
                    ref={leftArrowBtnRef}
                    class="rotate-180 rounded-full p-1 aspect-square active:scale-95 duration-75 ring-2 ring-blue-700"
                    onClick={prevPage}
                >
                    <ArrowIcon />
                </button> */}
                {/* <button
                    ref={rightArrowBtnRef}
                    class="rounded-full p-1 aspect-square active:scale-95 duration-75 ring-2 ring-blue-700 ml-6"
                    onClick={nextPage}
                >
                    <ArrowIcon />
                </button> */}

                <div class="text-sm ml-auto pl-2 text-blue-500">
                    {pdfViewer.fileName}
                </div>
            </div>

            <Show when={showLoader()}>
                <div class="flex justify-center items-center flex-col mt-32 w-max mx-auto p-4 rounded-lg ring-1">
                    <div class="animate-spin rounded-full h-8 w-8 border-4 border-b-transparent border-gray-500"></div>
                    <div class="text-gray-500 mt-4">Just a sec</div>
                </div>
            </Show>

            <div
                id="pdf-contents-wrapper"
                class="overflow-y-auto custom-sc"
                style={{
                    height: "calc(100vh - 4rem)",
                }}
            ></div>
        </div>
    );
};

export default PdfViewer;
