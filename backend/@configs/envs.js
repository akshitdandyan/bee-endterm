import { config } from "dotenv";
config();

export const PORT = process.env.PORT;
export const EMAIL_USER = process.env.EMAIL_USER;
export const EMAIL_KEY = process.env.EMAIL_KEY;
export const DB_URI = process.env.DB_URI;
export const JWT_SECRET = process.env.JWT_SECRET;
export const FRONTEND_APP_URL = process.env.FRONTEND_APP_URL;
export const ADMIN_APP_URL = process.env.ADMIN_APP_URL;
export const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
export const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
export const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;
export const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
