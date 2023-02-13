// service worker

const CACHE_NAME = "cache-v2";

const urlsToCache = [
    "/dashboard",
    "/dashboard/resources",
    "/dashboard/announcements",
    "/dashboard/events",
    "/dashboard/timetable",
    "/dashboard/downloads",
    "/dashboard/me",
    "https://mozilla.github.io/pdf.js/build/pdf.js",
    "https://mozilla.github.io/pdf.js/build/pdf.worker.js",
];

// Install a service worker
self.addEventListener("install", (event) => {
    // Perform install steps
    console.log("installing service worker");
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log("Opened cache");
            return cache.addAll(urlsToCache);
        })
    );
});

function shouldCache(request) {
    // avoid api requests
    if (
        request.url.includes("localhost:5000") ||
        request.url.includes("cseweekendv2") ||
        request.method !== "GET"
    ) {
        return false;
    }
    return true;
    // only cache .css, .js, or /dashboard requests
    return (
        request.url.includes("/dashboard") ||
        request.url.includes("assets") ||
        request.url.includes("pdf.js/build") ||
        request.url.includes("pwa") ||
        request.url.includes("favicon") ||
        request.url.includes("initSW") ||
        request.url.includes("serviceWorker") ||
        request.url.includes("/src/")
    );
}

// Cache and return requests
self.addEventListener("fetch", (event) => {
    event.respondWith(
        fetch(event.request)
            .then((response) => {
                // delete the old cache for the same url
                caches.open(CACHE_NAME).then((cache) => {
                    cache.delete(event.request).then((val) => {
                        if (shouldCache(event.request)) {
                            cache.put(event.request, response);
                        }
                    });
                });

                return response.clone();
            })
            .catch((err) => {
                //if network fails, return from cache
                console.log("Returning from cache");
                return caches.match(event.request);
            })
    );
});

// Update a service worker
self.addEventListener("activate", (e) => {
    e.waitUntil(
        caches.keys().then((keyList) => {
            return Promise.all(
                keyList.map((key) => {
                    if (key === CACHE_NAME) {
                        return;
                    }
                    return caches.delete(key);
                })
            );
        })
    );
});
// push notification
self.addEventListener("push", (event) => {
    const data = event.data.json();
    console.log("push event", data);
    const title = data.title;
    const options = {
        body: data.body,
        icon: data.icon,
        image: data.image,
        badge: data.badge,
        vibrate: data.vibrate,
        tag: data.tag,
        renotify: data.renotify,
        data: data.data,
        actions: data.actions,
    };
    const promiseChain = self.registration.showNotification(title, options);
    event.waitUntil(promiseChain);
});

// notification click
self.addEventListener("notificationclick", (event) => {
    const data = event.notification.data;
    console.log("notificationclick", data);
    event.notification.close();
    event.waitUntil(
        clients.openWindow(data.url).then((windowClient) => {
            // do something with the windowClient
            console.log("windowClient", windowClient);
        })
    );
});
