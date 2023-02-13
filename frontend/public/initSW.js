// console.log(window.GTAG);
function installServiceWorker() {
    console.log("doing sw things...");
    if ("serviceWorker" in navigator) {
        navigator.serviceWorker.getRegistrations().then((registrations) => {
            for (let registration of registrations) {
                if (registration.active.scriptURL.includes("seviceworker.js")) {
                    console.log(
                        "unregistering old v1 service worker",
                        registration
                    );
                    registration.unregister();
                }
            }
        });
        // unregister old service worker
        navigator.serviceWorker.getRegistrations().then((registrations) => {
            for (let registration of registrations) {
                if (registration.active.scriptURL.includes("seviceworker.js")) {
                    console.log(
                        "unregistering old v1 service worker",
                        registration
                    );
                    registration.unregister();
                }
            }
            // register new service worker
            navigator.serviceWorker
                .register("/serviceWorker.js")
                .then(async (reg) => {
                    console.log("V2 Service Worker Registered");
                })
                .catch((err) => {
                    console.log("V2 Service Worker not Registered", err);
                });
        });
    }

    let deferredPrompt;

    window.addEventListener("beforeinstallprompt", (e) => {
        deferredPrompt = e;
        // console.log("beforeinstallprompt", e);
        e.userChoice.then(function (choiceResult) {
            if (choiceResult.outcome === "accepted") {
                deferredPrompt = null;
            }
        });
    });

    const installButtons = document.getElementsByClassName("pwa-install");
    if (!installButtons.length) {
        return console.log(" install button -ve");
    }
    console.log("installButton +ve");
    function installPwa() {
        console.log("deferredPrompt", deferredPrompt);
        if (deferredPrompt) {
            deferredPrompt.prompt();
            deferredPrompt.userChoice.then(function (choiceResult) {
                if (choiceResult.outcome === "accepted") {
                    deferredPrompt = null;
                }
            });
        }
    }

    for (let i = 0; i < installButtons.length; i++) {
        installButtons[i].addEventListener("click", installPwa);
    }
}

window.installServiceWorker = installServiceWorker;

function unregisterServiceWorkerAndClearCache() {
    navigator.serviceWorker.getRegistrations().then((registrations) => {
        for (let registration of registrations) {
            console.log("unregistering service worker", registration);
            registration.unregister();
        }
    });
    caches.delete("cache-v2").then((r) => console.log(r));
    console.log("unregistered service worker and cleared cache");
}

window.unregisterServiceWorkerAndClearCache =
    unregisterServiceWorkerAndClearCache;
