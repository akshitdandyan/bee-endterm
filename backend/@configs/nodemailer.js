import nodemailer from "nodemailer";
import {
    ADMIN_APP_URL,
    EMAIL_KEY,
    EMAIL_USER,
    FRONTEND_APP_URL,
} from "./envs.js";

const frontendUrl = FRONTEND_APP_URL;
const adminUrl = ADMIN_APP_URL;

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: EMAIL_USER,
        pass: EMAIL_KEY,
    },
});

export const sendEmailOtpToUser = (email, otp) => {
    const mailOptions = {
        from: EMAIL_USER,
        to: email,
        subject: "[Action Required] Cse Crew Email Verification Otp",
        html: `
            <b>Welcome to Cse Crew!</b>
            <p>Use the following OTP to verify your email address</p>
            <br />
            <h2>${otp}</h2>
            <br />
            <p>OTP is valid for 10 minutes</p>
            <br />
            <p>Do not reply to this email.</p>
        `,
    };

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log(err);
        } else {
            console.log(info);
        }
    });
};

export const sendResetPasswordLinkToUser = (email, token) => {
    const mailOptions = {
        from: EMAIL_USER,
        to: email,
        subject: "[Action Required] Cse Crew Reset Password Link",
        html: `
            <b>Welcome to Cse Crew!</b>
            <p>Use the following link to reset your password</p>
            <br />
            <a href="${frontendUrl}/auth/reset-password/${token}">Reset Password</a>
            <p>If you cannot click the link, copy and paste the following link in your browser</p>
            <a href="${frontendUrl}/auth/reset-password/${token}">${frontendUrl}/auth/reset-password/${token}</a>
            <br />
            <p>Link is valid for 10 minutes</p>
            <p>If you did not request a password reset, please ignore this email.</p>
            <p>Do not reply to this email.</p>
        `,
    };

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log(err);
        } else {
            console.log(info);
        }
    });
};

export const sendAdminInviteLinkToUser = (email, token) => {
    const mailOptions = {
        from: EMAIL_USER,
        to: email,
        subject: "Kudos🥳! You have been invited to join Cse Crew Team",
        html: `
            <b>Welcome to Cse Crew!</b>
            <p>Use the following link to accept the admin account invitation</p>
            <br />
            <a href="${adminUrl}/admin/invite/${token}">Accept Invite</a>
            <p>If you cannot click the link, copy and paste the following link in your browser</p>
            <a href="${adminUrl}/admin/invite/${token}">${adminUrl}/admin/invite/${token}</a>
            <br />
            <p>In any case of query, drop an email to</p>
            <a href="mailto:info.csecrew@gmail.com">
            info.csecrew@gmail.com
            </a>
        `,
    };

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log(err);
        } else {
            console.log(info);
        }
    });
};

export const sendAdminPasswordResetLink = (email, token) => {
    const mailOptions = {
        from: EMAIL_USER,
        to: email,
        subject: "[Action Required] Reset you Admin account password 🔒",
        html: `
            <b>Admin account password reset on Cse Crew!</b>
            <p>Use the following link to accept the admin account invitation</p>
            <br />
            <a href="${adminUrl}/admin/resetpassword/${token}">Reset Password</a>
            <p>If you cannot click the link, copy and paste the following link in your browser</p>
            <a href="${adminUrl}/admin/resetpassword/${token}">${adminUrl}/admin/resetpassword/${token}</a>
            <br />
            <p>In any case of query, drop an email to</p>
            <a href="mailto:info.csecrew@gmail.com">
            info.csecrew@gmail.com
            </a>
        `,
    };

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log(err);
        } else {
            console.log(info);
        }
    });
};
