import axios from "axios";
import { VITE_API_SERVER } from "./envs";

export const axiosNormal = axios.create({
    baseURL: VITE_API_SERVER,
});

export const axiosAuth = axios.create({
    baseURL: VITE_API_SERVER,
});

axiosAuth.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    // set custom header
    config.headers["x-machine-t"] = window.innerWidth <= 640 ? "sm" : "lg";
    return config;
});

axiosAuth.interceptors.response.use((response) => {
    if (response.data.signOut === true) {
        localStorage.removeItem("token");
        window.location.href = "/auth/login";
    }

    return response;
});
