import rateLimit from "express-rate-limit";
import slowDown from "express-slow-down";

const IP_WHITELIST = (process.env.IP_WHITELIST || "")
    .split(",")
    .map((ip) => ip.trim());

const applyMiddleware = (middleware) => (request, response) =>
    new Promise((resolve, reject) => {
        middleware(request, response, (result) =>
            result instanceof Error ? reject(result) : resolve(result)
        );
    });

const getIP = (request) =>
    request.headers["x-real-ip"] ||
    (request.headers["x-forwarded-for"] || "").split(",")[0].trim() ||
    request.ip ||
    request.connection.remoteAddress;

export const getRateLimitMiddlewares = ({
    limit = 20, // 4 requests per minute
    windowMs = 60 * 1000,
    delayAfter = Math.round(10 / 2),
    delayMs = 500,
} = {}) => [
    slowDown({ keyGenerator: getIP, windowMs, delayAfter, delayMs }),
    rateLimit({ keyGenerator: getIP, windowMs, max: limit }),
];

const middlewares = getRateLimitMiddlewares();

async function applyRateLimit(request, response) {
    // Check for IP whitelist
    // console.log("getIP(request) - ", getIP(request));
    // console.log("request.ip - ", request.ip);
    // console.log(
    //     'request.headers["x-forwarded-for"]',
    //     request.headers["x-forwarded-for"]
    // );
    // console.log(
    //     'request.headers["x-real-ip"] - ',
    //     request.headers["x-real-ip"]
    // );
    // console.log(
    //     "request.connection.remoteAddress - ",
    //     request.connection.remoteAddress
    // );
    if (IP_WHITELIST.indexOf(getIP(request)) > -1) return;

    await Promise.all(
        middlewares
            .map(applyMiddleware)
            .map((middleware) => middleware(request, response))
    );
}

export default applyRateLimit;
