import axios from "axios";
import { fileTypeByExtension, getThumbnailUrl } from "./helper";
import cloudinary from "cloudinary";
import {
    CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET,
    CLOUDINARY_CLOUD_NAME,
} from "./envs";

export async function uploadFileToCloudinaryWithAxios(
    file,
    filename,
    type,
    onUploadProgressCallback
) {
    try {
        const formData = new URLSearchParams();
        const decodedFileURI = decodeURI(file).toString();
        formData.append("file", decodedFileURI);
        formData.append("api_key", CLOUDINARY_API_KEY);
        const timestamp = Math.round(new Date().getTime() / 1000);
        formData.append("timestamp", timestamp);
        formData.append(
            "folder",
            type === "resource"
                ? "Content/Resources"
                : type === "announcement"
                ? "Content/Announcements"
                : "Content/Others"
        );
        const signature = cloudinary.v2.utils.sign_request(
            {
                timestamp: timestamp,
                folder:
                    type === "resource"
                        ? "Content/Resources"
                        : type === "announcement"
                        ? "Content/Announcements"
                        : "Content/Others",
            },
            {
                api_secret: CLOUDINARY_API_SECRET,
                api_key: CLOUDINARY_API_KEY,
            }
        );
        formData.append("signature", signature.signature);
        const res = await axios.post(
            `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/auto/upload`,
            formData,
            {
                headers: {
                    "Accept-Encoding": "gzip,deflate,compress",
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                onUploadProgress: (progressEvent) => {
                    const percent = Math.round(
                        (progressEvent.loaded / progressEvent.total) * 100
                    );
                    console.log("Upload Progress: " + percent + "%");
                    onUploadProgressCallback(percent > 95 ? 95 : percent);
                },
            }
        );

        console.log(res.data);

        return {
            success: true,
            message: "File uploaded successfully",
            data: {
                url: res.data.secure_url,
                fileType: fileTypeByExtension(
                    filename.split(".").pop().toLowerCase()
                ),
                publicId: res.data.public_id,
                thumbnailUrl: getThumbnailUrl(res.data.public_id),
            },
        };
    } catch (error) {
        console.log("uploadFileToCloudinaryWithAxios", error.message);
        return {
            success: false,
            message: "Something went wrong",
        };
    }
}
