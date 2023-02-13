import { createContext } from "solid-js";
import type { Context } from "solid-js";

// Dashboard

export interface Day {
    date: number;
    month: number;
    events?: {
        _id: string;
        title: string;
        description: string;
        eventOn: string;
    }[];
}

export type TimetableClass = {
    subjectname: string;
    subjectcode: string;
    roomnumber: string;
    teachername: string;
    startat: string;
    endat: string;
    subGroup?: number;
};

export interface DashboardContext {
    subjects: {
        _id: string;
        subjectName: string;
        subjectTheme: string;
    }[];
    setSubjects: (subjects: DashboardContext["subjects"]) => void;

    files: {
        _id: string;
        filename: string;
        subject: string;
        size: number;
        description: string;
        subjectName?: string;
        thumbnailUrl?: string;
        createdAt?: string;
    }[];
    setFiles: (files: DashboardContext["files"]) => void;

    announcements: {
        _id: string;
        filename: string;
        size: number;
        description: string;
        createdAt: string;
        thumbnailUrl?: string;
    }[];
    setAnnouncements: (files: DashboardContext["announcements"]) => void;

    groups: {
        _id: string;
        groupname: string;
    }[];
    setGroups: (groups: DashboardContext["groups"]) => void;

    overviewData: {
        files: DashboardContext["files"];
        announcements: DashboardContext["announcements"];
        events?: Day["events"];
        todayClasses?: TimetableClass[];
    };
    setOverviewData: (overviewData: DashboardContext["overviewData"]) => void;
}

export const DashboardContext: Context<DashboardContext> =
    createContext<DashboardContext>({
        subjects: [],
        setSubjects: (subjects: DashboardContext["subjects"]) => {
            console.log(subjects);
        },
        files: [],
        setFiles: (files: DashboardContext["files"]) => {
            console.log(files);
        },
        announcements: [],
        setAnnouncements: (
            announcements: DashboardContext["announcements"]
        ) => {
            console.log(announcements);
        },
        groups: [],
        setGroups: (groups: DashboardContext["groups"]) => {
            console.log(groups);
        },
        overviewData: null,
        setOverviewData: (overviewData: DashboardContext["overviewData"]) => {},
    });

export const DashboardProvider = DashboardContext.Provider;

// PdfViewer

export interface PdfViewerContext {
    pdfViewer: {
        pdfSrcUrl: string;
        fileName: string;
    };
    setPdfViewer: (pdf: PdfViewerContext["pdfViewer"]) => void;
}

export const PdfViewerContext: Context<PdfViewerContext> =
    createContext<PdfViewerContext>({
        pdfViewer: {
            pdfSrcUrl: "",
            fileName: "",
        },
        setPdfViewer: (pdfSrcUrl: PdfViewerContext["pdfViewer"]) => {
            console.log(pdfSrcUrl);
        },
    });

export const PdfViewerProvider = PdfViewerContext.Provider;

export interface EmbedViewerContext {
    embedViewer: {
        srcUrl: string;
        fileName: string;
    };
    setEmbedViewer: (pdf: EmbedViewerContext["embedViewer"]) => void;
}

export const EmbedViewerContext: Context<EmbedViewerContext> =
    createContext<EmbedViewerContext>({
        embedViewer: {
            srcUrl: "",
            fileName: "",
        },
        setEmbedViewer: (srcUrl: EmbedViewerContext["embedViewer"]) => {
            console.log(srcUrl);
        },
    });

export const EmbedViewerProvider = EmbedViewerContext.Provider;

// Fetched file blobs

export interface FileBlobsContext {
    fileBlobs: Map<string, Blob>;
}

export const FileBlobsContext: Context<FileBlobsContext> =
    createContext<FileBlobsContext>({
        fileBlobs: new Map(),
    });

export const FileBlobsProvider = FileBlobsContext.Provider;

// User Context

export interface UserContext {
    profile: {
        _id: string;
        name: string;
        email: string;
        batchId: string;
    };
    setProfile: (profile: UserContext["profile"]) => void;
}

export const UserContext: Context<UserContext> = createContext<UserContext>({
    profile: {
        _id: "",
        name: "",
        email: "",
        batchId: "",
    },
    setProfile: (profile: UserContext["profile"]) => {
        console.log(profile);
    },
});

export const UserProvider = UserContext.Provider;

// Offline Store

export interface OfflineStoreContext {
    offlineStore: {
        subjects: DashboardContext["subjects"];
        files: DashboardContext["files"];
        announcements: DashboardContext["announcements"];
    };
    setOfflineStore: (data: {
        subjects: DashboardContext["subjects"];
        files: DashboardContext["files"];
        announcements: DashboardContext["announcements"];
    }) => void;
}

export const OfflineStoreContext: Context<OfflineStoreContext> =
    createContext<OfflineStoreContext>({
        offlineStore: {
            subjects: [],
            files: [],
            announcements: [],
        },
        setOfflineStore: (data: {
            subjects: DashboardContext["subjects"];
            files: DashboardContext["files"];
            announcements: DashboardContext["announcements"];
        }) => {
            console.log(data);
        },
    });

export const OfflineStoreProvider = OfflineStoreContext.Provider;
