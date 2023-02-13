import { useNavigate } from "solid-app-router";
import { createSignal, mergeProps, onMount, Show } from "solid-js";
import { axiosNormal } from "../../@utils/axios";
import { getBatches } from "../../@utils/helpers";
import Dropdown from "../../components/Dropdown/Dropdown";
// secret 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

const BatchSelectionModal = (props: {
    selectBatch: (batch: string) => void;
    status: "success" | "error" | "loading" | "idle";
}) => {
    console.log(status);
    const [batch, setBatch] = createSignal("");
    const [batches, setBatches] = createSignal<
        { key: string; value: string }[]
    >([]);

    onMount(async () => {
        const res = await getBatches();
        console.log("batches res", res);
        setBatches(res);
    });

    return (
        <div class="fixed top-0 left-0 bg-white h-screen w-screen pt-6 sm:pt-0 sm:flex justify-center px-4 items-center flex-col z-20">
            <div>
                <h1 class="text-2xl font-semibold text-blue-600 mb-4">
                    Last step, select batch
                </h1>
                <Show when={batches().length === 0}>
                    <div class="animate-spin rounded-full h-5 w-5 border-2 border-b-transparent border-gray-500 mx-2"></div>
                    <div class="text-gray-500">Signing up...</div>
                </Show>
                <Show when={batches().length > 0}>
                    <Dropdown
                        options={batches()}
                        onChange={(v) => {
                            setBatch(v.toString());
                        }}
                        defaultValue="Select Batch"
                    />
                </Show>
                <Show
                    when={
                        (batch() && props.status === "idle") ||
                        props.status === "error"
                    }
                >
                    <button
                        onClick={() => {
                            props.selectBatch(batch());
                        }}
                        class="bg-blue-500 mt-4 text-white px-4 py-2 rounded-full active:scale-95 transition duration-150 hover:bg-opacity-90"
                    >
                        Complete & Go to Dashboard
                    </button>
                </Show>
                <Show when={props.status === "loading"}>
                    <div class="bg-gray-100 ring-1 cursor-not-allowed mt-4 text-blue px-4 py-2 rounded-full flex items-center justify-center gap-2">
                        <div class="animate-spin rounded-full h-5 w-5 border-2 border-b-transparent border-blue-500 mx-2"></div>
                        <div class="text-blue-500">Signing up...</div>
                    </div>
                </Show>
                <Show when={props.status === "error"}>
                    <div class="text-red-800 bg-red-100 p-2 rounded-full text-center mt-2">
                        Something went wrong, please try again.
                    </div>
                </Show>
                <Show when={props.status === "success"}>
                    <div class="text-green-800 bg-green-100 p-2 rounded-full text-center mt-2">
                        Perfect, you are all set!
                    </div>
                </Show>
            </div>
        </div>
    );
};

const GoogleAuth = () => {
    const navigate = useNavigate();
    const [googleCredential, setGoogleCredential] = createSignal<string>("");
    const [showBatchModal, setShowBatchModal] = createSignal<boolean>(false);
    const [batchModalStatus, setBatchModalStatus] = createSignal<
        "success" | "error" | "loading" | "idle"
    >("idle");

    const authenticateWithGoogle = async (batchId: string) => {
        if (
            !googleCredential() ||
            !batchId ||
            batchModalStatus() === "loading"
        ) {
            return;
        }
        setBatchModalStatus("loading");
        try {
            const response = await axiosNormal.post("/user/google", {
                credential: googleCredential(),
                batchId,
            });
            if (response.data.success && response.data.token) {
                localStorage.setItem("token", response.data.token);
                setBatchModalStatus("success");
                setTimeout(() => {
                    navigate("/dashboard");
                }, 1000);
                return;
            }
        } catch (error) {
            console.log(error);
        }
        setBatchModalStatus("error");
    };
    console.log(batchModalStatus());
    onMount(() => {
        console.log("GoogleAuth");
        const script = document.createElement("script");
        script.src = "https://accounts.google.com/gsi/client";
        script.async = true;
        script.defer = true;
        script.onload = () => {
            console.log("GoogleAuth script loaded");
            const params = {
                client_id:
                    "440254403518-cvn098ve9vt2kiuh1qd7c7rthma9hg5m.apps.googleusercontent.com",
                callback: (response: any) => {
                    console.log(response);
                    if (response.credential) {
                        setGoogleCredential(response.credential);
                        setShowBatchModal(true);
                    }
                },
            };
            window["google"].accounts.id.initialize(params);
            window["google"].accounts.id.prompt((notification: any) => {
                console.log(notification);
                if (notification.i === false) {
                }
            });
        };
        document.body.appendChild(script);
    });

    (window as any).onSignIn = (googleUser: any) => {
        console.log(googleUser);
        if (googleUser.credential) {
            setGoogleCredential(googleUser.credential);
            setShowBatchModal(true);
        }
    };

    return (
        <div class="">
            <Show when={showBatchModal()}>
                <BatchSelectionModal
                    selectBatch={(batch) => authenticateWithGoogle(batch)}
                    status={batchModalStatus()}
                />
            </Show>
            <div
                id="g_id_onload"
                data-client_id="440254403518-cvn098ve9vt2kiuh1qd7c7rthma9hg5m.apps.googleusercontent.com"
                // data-login_uri="https://crewv2.netlify.app"
                data-auto_select="true"
                data-context="use"
                data-callback="onSignIn"
                data-theme="outline"
                data-longtitle="true"
                data-type="standard"
                // data-ux_mode="redirect"
                // data-redirect_uri="http://localhost:3000/auth/login"
                data-prompt_parent_id="g_id_onload"
            ></div>
            <div class="g_id_signin" data-type="standard"></div>
        </div>
    );
};

export default GoogleAuth;
