import { Link } from "solid-app-router";
import {
    createSignal,
    createUniqueId,
    For,
    onMount,
    Show,
    useContext,
} from "solid-js";
import { axiosAuth } from "../../@utils/axios";
import { dashboardNavItems } from "../../@utils/constants";
import {
    EmbedViewerContext,
    PdfViewerContext,
    UserContext,
} from "../../@utils/context";
import {
    AndroidIcon,
    AnnouncementsIcon,
    AppStoreIcon,
    DownloadIcon,
    EventsIcon,
    FileIcon,
    OverviewIcon,
    SettingIcons,
    TimetableIcon,
} from "../icons";

const Sidebar = () => {
    const offlineIndicatorId = createUniqueId();
    const [selectedLink, setSelectedLink] = createSignal(
        dashboardNavItems.findIndex(
            (item) =>
                window.location.pathname === "/dashboard".concat(item.path)
        )
    );
    const { profile, setProfile } = useContext(UserContext);
    const { pdfViewer, setPdfViewer } = useContext(PdfViewerContext);
    const { setEmbedViewer } = useContext(EmbedViewerContext);

    onMount(async () => {
        try {
            const res = await axiosAuth.get("/dashboard/getprofile");
            console.log(res);
            if (res.data.success) {
                setProfile(res.data.payload);
                document.title = `Dashboard | ${res.data.payload.name}`;
            }
        } catch (error) {
            console.log(error);
        }
    });

    // offline indicator
    onMount(() => {
        if (!("onLine" in navigator)) {
            return;
        }
        const offlineIndicator = document.getElementById(
            "offline-indicator" + offlineIndicatorId
        );
        localStorage.setItem(
            "offlineIndicatorId",
            "offline-indicator" + offlineIndicatorId
        );
        if (!navigator.onLine) {
            offlineIndicator.style.bottom = "2rem";
        }
        window.addEventListener("offline", () => {
            console.log("Offline");
            offlineIndicator.style.bottom = "2rem";
        });
        window.addEventListener("online", () => {
            console.log("Online");
            offlineIndicator.style.bottom = "-4rem";
        });
    });
    return (
        <>
            {" "}
            <div class="w-60 bg-blue-900 shadow-xl h-screen text-white z-20 relative">
                <div class="p-5 pr-0 sm:p-4 sm:pr-0 flex items-center">
                    <div class="text">👋 Hello {profile.name}!</div>
                    <div class="duration-200 hover:rotate-45 ml-2 scale-75">
                        <Link href="/dashboard/me">
                            <SettingIcons />
                        </Link>
                    </div>
                </div>
                <div class="border-b-2 border-white"></div>
                <For each={dashboardNavItems}>
                    {(item, i) => (
                        <Link
                            href={"/dashboard".concat(item.path)}
                            onclick={() => {
                                setSelectedLink(i());
                                URL.revokeObjectURL(pdfViewer.pdfSrcUrl);
                                setPdfViewer({
                                    fileName: "",
                                    pdfSrcUrl: "",
                                });
                                setEmbedViewer({
                                    srcUrl: "",
                                    fileName: "",
                                });
                            }}
                            class={`p-4 hover:bg-blue-700 duration-150 flex items-center gap-2 ${
                                selectedLink() === i() ? "bg-blue-600" : ""
                            }`}
                        >
                            <div class="scale-90">
                                <item.icon />
                            </div>
                            <div class="">{item.key}</div>
                        </Link>
                    )}
                </For>

                <div>
                    <div
                        id="pwa-install"
                        class="pwa-install p-4 m-4 rounded-xl sm:hidden bg-black hover:bg-zinc-900 active:bg-zinc-800 duration-150 flex items-center gap-2 cursor-pointer"
                    >
                        <div class="scale-110">
                            {navigator.userAgent
                                .toLowerCase()
                                .indexOf("android") > -1 ? (
                                <AndroidIcon />
                            ) : (
                                <AppStoreIcon />
                            )}
                        </div>
                        <div class="">Install Mobile App</div>
                    </div>
                </div>
            </div>
            <div class="sm:hidden z-10 flex justify-evenly items-center fixed bottom-0 left-0 w-screen py-1 bg-white bg-opacity-90 backdrop-blur-sm">
                <Link
                    onclick={() => {
                        setSelectedLink(0);
                        URL.revokeObjectURL(pdfViewer.pdfSrcUrl);
                        setPdfViewer({
                            fileName: "",
                            pdfSrcUrl: "",
                        });
                        setEmbedViewer({
                            srcUrl: "",
                            fileName: "",
                        });
                    }}
                    href="/dashboard"
                >
                    <div
                        class={`flex justify-center items-center aspect-square p-3 rounded-full duration-100 ${
                            selectedLink() === 0 ? "scale-150 bg-gray-300" : ""
                        }`}
                    >
                        <OverviewIcon color="#2563EB" />
                    </div>
                </Link>
                <Link
                    onclick={() => {
                        setSelectedLink(2);
                        URL.revokeObjectURL(pdfViewer.pdfSrcUrl);
                        setPdfViewer({
                            fileName: "",
                            pdfSrcUrl: "",
                        });
                        setEmbedViewer({
                            srcUrl: "",
                            fileName: "",
                        });
                    }}
                    href="/dashboard/announcements"
                >
                    <div
                        class={`flex justify-center items-center aspect-square p-3 rounded-full duration-100 ${
                            selectedLink() === 2 ? "scale-150 bg-gray-300" : ""
                        }`}
                    >
                        <AnnouncementsIcon color="#2563EB" />
                    </div>
                </Link>
                <Link
                    onclick={() => {
                        setSelectedLink(3);
                        URL.revokeObjectURL(pdfViewer.pdfSrcUrl);
                        setPdfViewer({
                            fileName: "",
                            pdfSrcUrl: "",
                        });
                        setEmbedViewer({
                            srcUrl: "",
                            fileName: "",
                        });
                    }}
                    href="/dashboard/events"
                >
                    <div
                        class={`flex justify-center items-center aspect-square p-3 rounded-full duration-100 ${
                            selectedLink() === 3 ? "scale-150 bg-gray-300" : ""
                        }`}
                    >
                        <EventsIcon color="#2563EB" />
                    </div>
                </Link>
                <Link
                    onclick={() => {
                        setSelectedLink(4);
                        URL.revokeObjectURL(pdfViewer.pdfSrcUrl);
                        setPdfViewer({
                            fileName: "",
                            pdfSrcUrl: "",
                        });
                        setEmbedViewer({
                            srcUrl: "",
                            fileName: "",
                        });
                    }}
                    href="/dashboard/timetable"
                >
                    <div
                        class={`flex justify-center items-center aspect-square p-3 rounded-full duration-100 ${
                            selectedLink() === 4 ? "scale-150 bg-gray-300" : ""
                        }`}
                    >
                        <TimetableIcon color="#2563EB" />
                    </div>
                </Link>
                <Link
                    onclick={() => {
                        setSelectedLink(5);
                        URL.revokeObjectURL(pdfViewer.pdfSrcUrl);
                        setPdfViewer({
                            fileName: "",
                            pdfSrcUrl: "",
                        });
                        setEmbedViewer({
                            srcUrl: "",
                            fileName: "",
                        });
                    }}
                    href="/dashboard/downloads"
                >
                    <div
                        class={`flex justify-center items-center aspect-square p-3 rounded-full duration-100 ${
                            selectedLink() === 5 ? "scale-150 bg-gray-300" : ""
                        }`}
                    >
                        <DownloadIcon color="#2563EB" />
                    </div>
                </Link>
            </div>
            <div
                id={"offline-indicator" + offlineIndicatorId}
                class={`fixed -bottom-14 left-0 sm:left-5 duration-100 w-screen flex justify-center sm:justify-start sm:z-20 items-center`}
            >
                <Link href="/dashboard/downloads">
                    <div class="px-4 pt-1 pb-6 sm:pb-1 text-xs bg-yellow-200 text-yellow-700 rounded-full">
                        You are offline, see Downloads
                    </div>
                </Link>
            </div>
        </>
    );
};

export default Sidebar;
