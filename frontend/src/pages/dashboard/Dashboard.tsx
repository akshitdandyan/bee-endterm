import { Link, Outlet, useNavigate } from "solid-app-router";
import { createEffect, createSignal, onMount, Show } from "solid-js";
import { createStore } from "solid-js/store";
import { axiosAuth } from "../../@utils/axios";
import {
    DashboardContext,
    DashboardProvider,
    Day,
    EmbedViewerProvider,
    FileBlobsProvider,
    OfflineStoreContext,
    OfflineStoreProvider,
    PdfViewerProvider,
    UserContext,
    UserProvider,
} from "../../@utils/context";
import {
    getFiles,
    getOfflineAnnouncements,
    getOfflineFiles,
    getOfflineSubjects,
    updateOfflineAnnouncements,
    updateOfflineFiles,
    updateOfflineSubjects,
} from "../../@utils/dexie";
import EmbedViewer from "../../components/EmbedViewer/EmbedViewer";
import { MenuIcon, UserIcon } from "../../components/icons";
import PdfViewer from "../../components/PdfViewer/PdfViewer";
import SearchModal from "../../components/SearchModal/SearchModal";
import Sidebar from "../../components/Sidebar/Sidebar";

const Dashboard = () => {
    const navigate = useNavigate();

    if (
        !localStorage.getItem("token") ||
        localStorage.getItem("token") === "undefined" ||
        localStorage.getItem("token") === "null"
    ) {
        localStorage.clear();
        navigate("/auth/login");
        console.log("Redirecting to login");
    } else {
        const [showSidebar, setShowSidebar] = createSignal(false);

        const [searchQuery, setSearchQuery] = createSignal("");
        const [searchData, setSearchData] = createSignal<{
            announcements: DashboardContext["announcements"];
            files: DashboardContext["files"];
            events: Day["events"];
            subjects: DashboardContext["subjects"];
        }>({
            announcements: [],
            files: [],
            events: [],
            subjects: [],
        });

        const [subjects, setSubjects] = createStore([]);
        const [files, setFiles] = createStore([]);
        const [announcements, setAnnouncements] = createStore([]);
        const [groups, setGroups] = createStore([]);
        const [overviewData, setOverviewData] = createStore<
            DashboardContext["overviewData"]
        >({
            announcements: [],
            files: [],
        });
        const [pdfViewer, setPdfViewer] = createStore({
            pdfSrcUrl: "",
            fileName: "",
        });
        const [embedViewer, setEmbedViewer] = createStore({
            srcUrl: "",
            fileName: "",
        });
        const fileBlobsMap = new Map();
        const [userProfile, setUserProfile] = createStore<
            UserContext["profile"]
        >({
            _id: "",
            name: "",
            email: "",
            batchId: "",
        });
        const [offlineStore, setOfflineStore] = createStore<
            OfflineStoreContext["offlineStore"]
        >({
            subjects: [],
            files: [],
            announcements: [],
        });

        const dashboardProviderValue = {
            subjects,
            setSubjects: (subjects: DashboardContext["subjects"]) => {
                setSubjects(subjects);
                updateOfflineSubjects(subjects);
            },
            files,
            setFiles: (files: DashboardContext["files"]) => {
                setFiles(files);
                updateOfflineFiles(files);
            },
            announcements,
            setAnnouncements: (
                announcements: DashboardContext["announcements"]
            ) => {
                setAnnouncements(announcements);
                updateOfflineAnnouncements(announcements);
            },
            groups,
            setGroups,
            overviewData,
            setOverviewData,
        };

        const pdfViewerProviderValue = {
            pdfViewer,
            setPdfViewer,
        };

        const embedViewerProviderValue = {
            embedViewer,
            setEmbedViewer,
        };

        const fileBlobsProviderValue = {
            fileBlobs: fileBlobsMap,
        };

        const userProviderValue = {
            profile: userProfile,
            setProfile: setUserProfile,
        };

        const offlineStoreProviderValue = {
            offlineStore,
            setOfflineStore,
        };

        function closeSidebar() {
            console.log("Closing sidebar");
            setShowSidebar(false);
            window.removeEventListener("click", closeSidebar);
        }

        function openSidebar() {
            console.log("Opening sidebar");
            setShowSidebar(true);
            setTimeout(() => {
                window.addEventListener("click", closeSidebar);
            }, 100);
        }

        function debounce(func: (...args: any[]) => void, timeout = 300) {
            let timer: number;
            return (...args: any[]) => {
                clearTimeout(timer);
                timer = setTimeout(() => {
                    func.apply(this, args);
                }, timeout);
            };
        }

        async function search() {
            const q = searchQuery();
            if (q.length > 0) {
                const searchResults = await axiosAuth.get(
                    "/dashboard/search?q=" + q
                );
                if (searchResults.data.success) {
                    setSearchData(searchResults.data.payload);
                }
            }
        }

        const handleSearch = debounce((e) => search());

        createEffect(() => {
            if (searchQuery() === "") {
                setSearchData({
                    announcements: [],
                    files: [],
                    events: [],
                    subjects: [],
                });
                return;
            }
            handleSearch();
        });

        // get offline data
        onMount(async () => {
            //add downloaded files in fileBlobsMap
            const files = await getFiles();
            files.forEach((file) => {
                fileBlobsMap.set(file._id, file.src);
            });
            console.log(fileBlobsMap);
            // const srcUrl = URL.createObjectURL(files[0].src);
            // setPdfViewer({
            //     fileName: files[0].filename,
            //     pdfSrcUrl: srcUrl,
            // });

            // set offline data
            const offlineData = await Promise.all([
                getOfflineSubjects(),
                getOfflineFiles(),
                getOfflineAnnouncements(),
            ]);

            setOfflineStore({
                subjects: offlineData[0],
                files: offlineData[1],
                announcements: offlineData[2],
            });

            console.log(offlineData);
        });

        // logrocket user tracking
        onMount(() => {
            setTimeout(() => {
                // @ts-ignore
                if (LogRocket) {
                    // @ts-ignore
                    LogRocket.identify(userProfile._id, {
                        name: userProfile.name,
                        email: userProfile.email,
                    });
                    console.log("Logrocket user tracked");
                } else {
                    console.log("Logrocket not found");
                }
            }, 3000);
        });

        // service worker
        onMount(async () => {
            document.title = `Dashboard | Cse Crew`;
            const registration =
                await navigator.serviceWorker.getRegistrations();
            console.log("Service worker registration", registration);
            if (registration.length === 0) {
                console.log("Registering service worker");
                (window as any).installServiceWorker();
            } else {
                console.log("Service worker already registered");
            }
        });

        return (
            <DashboardProvider value={dashboardProviderValue}>
                <PdfViewerProvider value={pdfViewerProviderValue}>
                    <EmbedViewerProvider value={embedViewerProviderValue}>
                        <FileBlobsProvider value={fileBlobsProviderValue}>
                            <UserProvider value={userProviderValue}>
                                <OfflineStoreProvider
                                    value={offlineStoreProviderValue}
                                >
                                    <div class="sm:grid grid-cols-[1fr_5fr]">
                                        <div
                                            class={`sm:hidden z-40 absolute duration-200 ${
                                                showSidebar()
                                                    ? "left-0"
                                                    : "-left-full"
                                            }`}
                                        >
                                            <Sidebar />
                                        </div>
                                        <Show when={showSidebar()}>
                                            <div class="h-screen w-screen bg-black bg-opacity-30 blur-sm fixed top-0 left-0 z-10"></div>
                                        </Show>
                                        <div class="hidden sm:block">
                                            <Sidebar />
                                        </div>
                                        <div>
                                            {/* Dashboard Header */}
                                            <div
                                                id="dashboard-header"
                                                class="p-4 border-b-2 border-blue-900 flex justify-between items-center relative"
                                            >
                                                <div
                                                    class="sm:hidden mr-4 bg-gray-300 rounded-full p-1 aspect-square"
                                                    onclick={() =>
                                                        openSidebar()
                                                    }
                                                >
                                                    <MenuIcon />
                                                </div>
                                                <input
                                                    class="outline-none flex-1  sm:w-[80%] text-blue-500"
                                                    type="text"
                                                    placeholder="Search..."
                                                    onInput={(e) => {
                                                        setSearchQuery(
                                                            e.currentTarget
                                                                .value
                                                        );
                                                    }}
                                                    value={searchQuery()}
                                                />
                                                <Show
                                                    when={
                                                        searchQuery &&
                                                        (searchData().events
                                                            .length > 0 ||
                                                            searchData()
                                                                .announcements
                                                                .length > 0 ||
                                                            searchData().files
                                                                .length > 0 ||
                                                            searchData()
                                                                .subjects
                                                                .length > 0)
                                                    }
                                                >
                                                    <SearchModal
                                                        events={
                                                            searchData().events
                                                        }
                                                        announcements={
                                                            searchData()
                                                                .announcements
                                                        }
                                                        files={
                                                            searchData().files
                                                        }
                                                        subjects={
                                                            searchData()
                                                                .subjects
                                                        }
                                                        close={() =>
                                                            setSearchQuery("")
                                                        }
                                                    />
                                                </Show>
                                                <div class="sm:hidden">
                                                    <Link href="/dashboard/me">
                                                        <UserIcon />
                                                    </Link>
                                                </div>
                                                <Show
                                                    when={userProfile.batchId}
                                                >
                                                    <div class="bg-yellow-100 text-yellow-600 px-2 rounded-md hidden md:block">
                                                        Batch{" "}
                                                        {
                                                            userProfile.batchId.split(
                                                                "-"
                                                            )[2]
                                                        }{" "}
                                                        -{" "}
                                                        {
                                                            userProfile.batchId.split(
                                                                "-"
                                                            )[3]
                                                        }
                                                    </div>
                                                </Show>
                                            </div>
                                            {/* Dashboard Body */}
                                            <div
                                                id="dashboard-body"
                                                // pb due to bottom nav on mobile
                                                class={`overflow-y-auto custom-sc pb-16 sm:pb-0 relative`}
                                                style={{
                                                    height: `calc(100vh - ${
                                                        (document.getElementById(
                                                            "dashboard-header"
                                                        )?.clientHeight ?? 70) +
                                                        5
                                                    }px)`,
                                                }}
                                            >
                                                <Outlet />
                                                <Show
                                                    when={pdfViewer.pdfSrcUrl}
                                                >
                                                    <div class="fixed w-screen h-screen sm:w-[calc(100vw_-_15rem)] sm:h-auto top-0 sm:top-[58px] right-0 shadow-2xl bg-gray-100">
                                                        <PdfViewer />
                                                    </div>
                                                </Show>
                                                <Show when={embedViewer.srcUrl}>
                                                    <div class="fixed w-screen h-screen sm:w-[calc(100vw_-_15rem)] sm:h-auto top-0 sm:top-[58px] right-0 shadow-2xl bg-gray-100">
                                                        <EmbedViewer
                                                            url={
                                                                embedViewer.srcUrl
                                                            }
                                                        />
                                                    </div>
                                                </Show>
                                            </div>
                                        </div>
                                    </div>
                                </OfflineStoreProvider>
                            </UserProvider>
                        </FileBlobsProvider>
                    </EmbedViewerProvider>
                </PdfViewerProvider>
            </DashboardProvider>
        );
    }
};

export default Dashboard;
