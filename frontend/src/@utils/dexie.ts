import Dexie from "dexie";

export interface DexieFile {
    _id: string;
    filename: string;
    subject?: string;
    size: number;
    description: string;
    src: Blob;
}

//  For Downloads
class CustomDexie extends Dexie {
    files!: Dexie.Table<DexieFile, string>;
    constructor() {
        super("cseweekend");
        this.version(1).stores({
            files: "_id, filename, subject, size, description, src",
        });
        this.files = this.table("files");
    }
}

const dexieDb = new CustomDexie();

export const saveFile = async (file: DexieFile) => {
    console.log("Saving file", file);
    await dexieDb.files.put({ ...file, subject: file.subject || "none" });
    console.log("File saved");
};

export const getFiles = async () => {
    return await dexieDb.files.toArray();
};

export const getFile = async (id: string) => {
    return await dexieDb.files.get(id);
};

export const deleteFile = async (id: string) => {
    await dexieDb.files.delete(id);
};

// For data used by cache when offline

interface Subject {
    _id: string;
    subjectName: string;
    subjectTheme: string;
}

interface File {
    _id: string;
    filename: string;
    subject: string;
    size: number;
    description: string;
    subjectName?: string;
    thumbnailUrl?: string;
    createdAt?: string;
}

interface Announcement {
    _id: string;
    filename: string;
    size: number;
    description: string;
    createdAt: string;
    thumbnailUrl?: string;
}

interface Group {
    _id: string;
    groupname: string;
}

interface Day {
    date: number;
    month: number;
    events?: {
        _id: string;
        title: string;
        description: string;
        eventOn: string;
    }[];
}

interface TimetableClass {
    subjectname: string;
    subjectcode: string;
    roomnumber: string;
    teachername: string;
    startat: string;
    endat: string;
}

class OfflineDataDexie extends Dexie {
    subjects!: Dexie.Table<Subject, string>;
    files!: Dexie.Table<File, string>;
    announcements!: Dexie.Table<Announcement, string>;
    constructor() {
        super("cseweekend-offline");
        this.version(1).stores({
            subjects: "_id, subjectName, subjectTheme",
            files: "_id, filename, subject, size, description, subjectName, thumbnailUrl, createdAt",
            announcements:
                "_id, filename, size, description, createdAt, thumbnailUrl",
        });
        this.subjects = this.table("subjects");
        this.files = this.table("files");
        this.announcements = this.table("announcements");
    }
}

const offlineDataDexie = new OfflineDataDexie();

export const updateOfflineSubjects = async (subjects: Subject[]) => {
    await offlineDataDexie.subjects.clear();
    await offlineDataDexie.subjects.bulkAdd(subjects);
    console.log("Subjects updated", subjects.length);
};

export const getOfflineSubjects = async () => {
    return await offlineDataDexie.subjects.toArray();
};

export const updateOfflineFiles = async (files: File[]) => {
    await offlineDataDexie.files.clear();
    await offlineDataDexie.files.bulkAdd(files);
    console.log("Files updated", files.length);
};

export const getOfflineFiles = async () => {
    return await offlineDataDexie.files.toArray();
};

export const updateOfflineAnnouncements = async (
    announcements: Announcement[]
) => {
    await offlineDataDexie.announcements.clear();
    await offlineDataDexie.announcements.bulkAdd(announcements);
    console.log("Announcements updated", announcements.length);
};

export const getOfflineAnnouncements = async () => {
    return await offlineDataDexie.announcements.toArray();
};
