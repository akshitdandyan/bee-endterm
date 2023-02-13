import { createSignal, For, onMount, Show, useContext } from "solid-js";
import { axiosAuth } from "../../@utils/axios";
import { UserContext } from "../../@utils/context";
import { urlBase64ToUint8Array } from "../../@utils/helpers";
import { DownloadedIcon } from "../../components/icons";

const Profile = () => {
    const { profile, setProfile } = useContext(UserContext);

    const [details, setDetails] = createSignal({
        name: profile.name,
        email: profile.email,
        batchId: profile.batchId,
    });

    const [batches, setBatches] = createSignal<string[]>([]);

    const [updating, setUpdating] = createSignal(false);
    const [passwordResetState, setPasswordResetState] = createSignal({
        message: "",
        isSuccess: false,
        processing: false,
    });
    const [notificationTestState, setNotificationTestState] = createSignal({
        message: "",
        isSuccess: false,
        processing: false,
    });

    const [loginActivity, setLoginActivity] = createSignal<
        {
            browserName: string;
            osName: string;
            createdAt: string;
            device: string;
        }[]
    >([]);

    const [notificationPermission, setNotificationPermission] =
        createSignal<NotificationPermission>(Notification.permission);

    async function changeBatch(batchId: string) {
        try {
            const res = await axiosAuth.post("/dashboard/change-batch", {
                batchId,
            });
            if (res.data.success) {
                setProfile(res.data.payload);
                setDetails({
                    name: res.data.payload.name,
                    email: res.data.payload.email,
                    batchId: res.data.payload.batchId,
                });
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleForgotPassword = async () => {
        if (passwordResetState().processing) {
            return;
        }
        setPasswordResetState({
            message: "",
            processing: true,
            isSuccess: false,
        });
        try {
            const res = await axiosAuth.post("/user/forgotpassword", {
                email: details().email,
            });
            setPasswordResetState({
                message: res.data.message,
                processing: false,
                isSuccess: res.data.success,
            });
        } catch (error) {
            console.log(error);
            setPasswordResetState({
                message: "Something went wrong",
                processing: false,
                isSuccess: false,
            });
        }

        setTimeout(() => {
            setPasswordResetState({
                message: "",
                processing: false,
                isSuccess: false,
            });
        }, 30000);
    };

    const requestNotificationPermission = async (subscribe: boolean) => {
        console.log("doing...");
        console.log(notificationPermission());

        const permission = await Notification.requestPermission();
        console.log(permission);

        setNotificationPermission(permission);
        console.log(permission);
        if (permission === "granted" && subscribe) {
            const subscribeOptions = {
                userVisibleOnly: true,
                applicationServerKey: urlBase64ToUint8Array(
                    "BOMv3b97fUtgzUEWV1vEMlxDoSjM5pLFHqfRC3PWEksWgFphMlwInB1cKkAFTXzDvIDXTclj6-VEw43o8-iIakw"
                ),
            };

            const registeration = await navigator.serviceWorker.register(
                "/serviceWorker.js"
            );

            console.log(registeration);

            const subscriptionCredentials =
                await registeration.pushManager.subscribe(subscribeOptions);

            if (subscriptionCredentials) {
                const res = await axiosAuth.post("/dashboard/subscribe-push", {
                    subscriptionCredentials,
                });
                if (res.data.success) {
                    console.log("subscribed ✅");
                }
            }
        }
    };

    const testNotification = async () => {
        // const notification = new Notification("Test Notification");
        if (notificationTestState().processing) {
            return;
        }
        setNotificationTestState({
            message: "Checking your notification settings...",
            processing: true,
            isSuccess: false,
        });
        try {
            const res = await axiosAuth.get("/dashboard/test-push");
            console.log(res);
            if (res.data.success) {
                setNotificationTestState({
                    message: "Test Notification Sent",
                    processing: false,
                    isSuccess: true,
                });
            } else {
                setNotificationTestState({
                    message: "Refreshing your notification settings...",
                    processing: true,
                    isSuccess: false,
                });
                const subscribeOptions = {
                    userVisibleOnly: true,
                    applicationServerKey: urlBase64ToUint8Array(
                        "BOMv3b97fUtgzUEWV1vEMlxDoSjM5pLFHqfRC3PWEksWgFphMlwInB1cKkAFTXzDvIDXTclj6-VEw43o8-iIakw"
                    ),
                };
                const registeration = await navigator.serviceWorker.register(
                    "/serviceWorker.js"
                );
                const exists =
                    await registeration.pushManager.getSubscription();
                if (exists) {
                    console.log("unsbscribing old subscription");
                    await exists.unsubscribe();
                }
                const subscriptionCredentials =
                    await registeration.pushManager.subscribe(subscribeOptions);

                if (subscriptionCredentials) {
                    const res = await axiosAuth.post(
                        "/dashboard/subscribe-push",
                        {
                            subscriptionCredentials,
                        }
                    );
                    if (res.data.success) {
                        console.log("subscribed ✅");
                        setNotificationTestState({
                            message:
                                "Test Notification Sent, usually it takes 5-10 seconds to arrive.",
                            processing: false,
                            isSuccess: true,
                        });
                    } else {
                        setNotificationTestState({
                            message: "Something went wrong",
                            processing: false,
                            isSuccess: true,
                        });
                    }
                }
            }
        } catch (error) {
            console.log(error);
            setNotificationTestState({
                message: "Something went wrong.",
                processing: false,
                isSuccess: true,
            });
        }
        setTimeout(() => {
            setNotificationTestState({
                message: "",
                processing: false,
                isSuccess: false,
            });
        }, 20000);
    };

    const checkNotificationEnabled = () => {
        if (Notification.permission === "granted") {
            console.log("Notification permission granted.");
            testNotification();
        } else if (Notification.permission !== "denied") {
            Notification.requestPermission().then((permission) => {
                if (permission === "granted") {
                    console.log("Notification permission granted.");
                    testNotification();
                }
            });
        }
    };

    onMount(async () => {
        // check if push subscription exists
        try {
            const res = await axiosAuth.get(
                "/dashboard/getprofile?fullProfile=true"
            );
            console.log(res);
            if (res.data.success) {
                setProfile({
                    _id: res.data.payload._id,
                    name: res.data.payload.name,
                    email: res.data.payload.email,
                    batchId: res.data.payload.batchId,
                });
                setDetails({
                    name: res.data.payload.name,
                    email: res.data.payload.email,
                    batchId: res.data.payload.batchId,
                });
                setLoginActivity(res.data.payload.loginActivity);
                setBatches(res.data.payload.batches);
            }
        } catch (error) {
            console.log(error);
        }
    });

    return (
        <div class="p-4">
            {/* Account Details */}
            <div class="relative mt-8">
                <div class="bg-blue-400 rounded-full p-1 text-white absolute -top-[320%] px-2 left-2 text-sm">
                    Account Details
                </div>
                <div class="h-1 bg-blue-400 rounded-lg"></div>
            </div>
            <div class="my-2 flex gap-4 overflow-x-auto hide-sc pb-4">
                <div class="bg-gray-100 shadow-lg p-2 mt-4 rounded-md">
                    <div class="text-gray-500">Profile Name</div>
                    <div class="ml-2 text-blue-700">{profile.name}</div>
                </div>
                <div class="bg-gray-100 shadow-lg p-2 mt-4 rounded-md">
                    <div class="text-gray-500">Email</div>
                    <div class="ml-2 text-blue-700">{profile.email}</div>
                </div>
            </div>
            {/* Batches */}
            <div class="relative mt-8">
                <div class="bg-blue-400 rounded-full p-1 text-white absolute -top-[320%] px-2 left-2 text-sm">
                    Batch
                </div>
                <div class="h-1 bg-blue-400 rounded-lg"></div>
            </div>
            <div class="my-2 flex gap-4">
                <For each={batches()}>
                    {(batch) => (
                        <div
                            onclick={() => changeBatch(batch)}
                            class={`${
                                profile.batchId === batch
                                    ? "bg-yellow-500 text-white "
                                    : " bg-gray-100 text-gray-600 "
                            } cursor-pointer active:scale-95 duration-75 text-xs shadow-lg p-2 mt-4 rounded-md`}
                        >
                            {batch}
                        </div>
                    )}
                </For>
            </div>
            {/* Security */}
            <div class="relative mt-8">
                <div class="bg-blue-400 rounded-full p-1 text-white absolute -top-[320%] px-2 left-2 text-sm">
                    Security
                </div>
                <div class="h-1 bg-blue-400 rounded-lg"></div>
            </div>
            <div class="my-3">
                <div class="text-gray-500">Password</div>
                <Show
                    when={
                        passwordResetState().message === "" &&
                        passwordResetState().processing === false
                    }
                >
                    <button
                        onclick={handleForgotPassword}
                        class="ml-2 bg-gray-100 shadow-lg border-blue-300 active:shadow-none hover:border-blue-600 duration-200 border-2 text-blue-600 rounded-full py-1 px-2 my-2"
                    >
                        Reset Password
                    </button>
                </Show>
                <Show when={passwordResetState().processing}>
                    <div class="ml-2 w-max cursor-progress bg-gray-100 flex gap-2 items-center shadow-lg border-green-300 active:shadow-none hover:border-green-600 duration-200 border-2 text-green-600 rounded-full py-1 px-2 my-2">
                        <div class="animate-spin p-2 border-green-500 border-2 border-b-transparent rounded-full"></div>{" "}
                        Sending Reset Link...
                    </div>
                </Show>
                <Show when={passwordResetState().message !== ""}>
                    <div
                        class={`
                        ${
                            passwordResetState().isSuccess
                                ? "text-green-600 border-green-300 "
                                : "text-red-600 border-red-300 "
                        }
                        ml-2 w-max cursor-not-allowed bg-gray-100 flex gap-2 items-center shadow-lgactive:shadow-none duration-200 border-2 rounded-full py-1 px-2 my-2
                    `}
                    >
                        {passwordResetState().message}
                    </div>
                </Show>
                <div class="text-gray-500">Login Activity</div>
                <div class="ml-2 text-blue-700 flex gap-4 overflow-y-auto pb-4 ">
                    <For each={loginActivity()}>
                        {(activity) => (
                            <div class="bg-gray-100 shadow-lg p-2 mt-4 rounded-md">
                                <div class="flex gap-2 text-sm">
                                    <div>{activity.browserName}</div>
                                    <div>{activity.osName}</div>
                                </div>
                                <div class="flex gap-2 text-gray-500 text-xs">
                                    <div>
                                        {new Date(
                                            activity.createdAt
                                        ).toLocaleString()}
                                    </div>
                                </div>
                            </div>
                        )}
                    </For>
                </div>
            </div>
            {/* Notification Preferences */}
            <div class="relative mt-8">
                <div class="bg-blue-400 rounded-full p-1 text-white absolute -top-[320%] px-2 left-2 text-sm">
                    Notification Preferences
                </div>
                <div class="h-1 bg-blue-400 rounded-lg"></div>
            </div>
            <div class="my-3">
                <div class="sm:flex gap-2 items-center">
                    <Show when={notificationPermission() === "granted"}>
                        <div class="ml-2 mt-8 w-max flex items-center gap-2 text-xs bg-gray-100 ring-1 ring-green-500 active:shadow-none duration-200 border-2 text-green-600 rounded-full py-1 px-2 my-2">
                            <DownloadedIcon /> <div>Enabled</div>
                        </div>
                        <Show
                            when={
                                notificationTestState().message === "" &&
                                notificationTestState().processing === false
                            }
                        >
                            <button
                                onclick={checkNotificationEnabled}
                                class="ml-2 bg-gray-100 shadow-lg border-blue-300 active:shadow-none hover:border-blue-600 duration-200 border-2 text-blue-600 rounded-full py-1 px-2 my-2"
                            >
                                Send Test Notification
                            </button>
                        </Show>
                        <Show when={notificationTestState().processing}>
                            <div class="ml-2 w-max cursor-progress bg-gray-100 flex gap-2 items-center shadow-lg border-green-300 active:shadow-none hover:border-green-600 duration-200 border-2 text-green-600 rounded-full py-1 px-2 my-2">
                                <div class="animate-spin p-2 border-green-500 border-2 border-b-transparent rounded-full"></div>{" "}
                                Hmm, testing...
                            </div>
                        </Show>
                        <Show when={notificationTestState().message !== ""}>
                            <div
                                class={`
                        ${
                            notificationTestState().isSuccess
                                ? "text-green-600 border-green-300 "
                                : "text-red-600 border-red-300 "
                        }
                        ml-2 w-max cursor-not-allowed bg-gray-100 flex gap-2 items-center shadow-lgactive:shadow-none duration-200 border-2 rounded-full py-1 px-2 my-2
                    `}
                            >
                                {notificationTestState().message}
                            </div>
                        </Show>
                    </Show>
                    <Show when={notificationPermission() === "denied"}>
                        <div class="ml-2 mt-8 w-max flex items-center gap-2 text-xs bg-gray-100 ring-1 ring-red-500 active:shadow-none duration-200 border-2 text-red-600 rounded-full py-1 px-2 my-2">
                            <div>Disabled</div>
                        </div>
                        <div class="text-red-500 text-sm">
                            Go to your browser settings and enable notifications
                        </div>
                    </Show>
                    <Show when={notificationPermission() === "default"}>
                        <div class="ml-2 mt-8 w-max flex items-center gap-2 text-xs bg-gray-100 ring-1 ring-yellow-500 active:shadow-none duration-200 border-2 text-yellow-600 rounded-full py-1 px-2 my-2">
                            Click button below to Enable Notifications
                        </div>
                        <button
                            onclick={() => {
                                console.log("doing...");
                                requestNotificationPermission(true);
                            }}
                            class="ml-2 bg-gray-100 shadow-lg border-blue-300 active:shadow-none hover:border-blue-600 duration-200 border-2 text-blue-600 rounded-full py-1 px-2 my-2"
                        >
                            Enable Notifications
                        </button>
                    </Show>
                </div>
                <Show
                    when={
                        !("serviceWorker" in navigator) ||
                        !("PushManager" in window)
                    }
                >
                    <div class="text-gray-500">
                        Your browser does not support notifications, switch to
                        chrome or edge.
                    </div>
                </Show>
            </div>

            {/* Application */}
            <div class="relative mt-8">
                <div class="bg-blue-400 rounded-full p-1 text-white absolute -top-[320%] px-2 left-2 text-sm">
                    Application
                </div>
                <div class="h-1 bg-blue-400 rounded-lg"></div>
            </div>
            <div>
                <div class="text-gray-500 text-xs mt-4">
                    Although, Cse Crew gets updated over the air, but if you
                    find something odd or you are not able to see new changes,
                    you can try clearing all the cache of this web application
                    manually or by pressing the button below.
                    <p class="hidden sm:block">
                        You can also try
                        <span class="bg-gray-500 text-white mx-1 px-2 rounded-sm">
                            Ctrl+F5
                        </span>
                        or{" "}
                        <span class="bg-gray-500 text-white mx-1 px-2 rounded-sm">
                            Ctrl+Shift+R
                        </span>{" "}
                        to hit hard refresh.
                    </p>
                </div>
                <Show when={!updating()}>
                    <button
                        onclick={() => {
                            console.log((window as any).installServiceWorker);
                            console.log(
                                (window as any)
                                    .unregisterServiceWorkerAndClearCache
                            );
                            if (
                                window["installServiceWorker"] &&
                                window["unregisterServiceWorkerAndClearCache"]
                            ) {
                                setUpdating(true);
                                console.log("doing...");
                                window[
                                    "unregisterServiceWorkerAndClearCache"
                                ]();
                                setTimeout(() => {
                                    window["installServiceWorker"]();
                                }, 2000);
                                setTimeout(() => {
                                    window.location.pathname = "/dashboard";
                                }, 5000);
                            }
                        }}
                        class="ml-2 bg-gray-100 shadow-lg border-blue-300 active:shadow-none hover:border-blue-600 duration-200 border-2 text-blue-600 rounded-full py-1 px-2 my-2"
                    >
                        Update Application
                    </button>
                </Show>
                <Show when={updating()}>
                    <div class="ml-2 w-max cursor-progress bg-gray-100 flex gap-2 items-center shadow-lg border-green-300 active:shadow-none hover:border-green-600 duration-200 border-2 text-green-600 rounded-full py-1 px-2 my-2">
                        <div class="animate-spin p-2 border-green-500 border-2 border-b-transparent rounded-full"></div>{" "}
                        Updating application...
                    </div>
                </Show>
            </div>

            <div class="my-3 border-t-2 pt-1">
                <button
                    onclick={() => {
                        localStorage.removeItem("token");
                        window.location.href = "/auth/login";
                    }}
                    class="ml-2 bg-gray-100 shadow-lg ring-red-300 active:shadow-none hover:ring-red-600 duration-200 ring-2 text-red-600 rounded-full py-1 px-2 my-2"
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Profile;
