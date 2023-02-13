import { useLocation, Link, useNavigate } from "solid-app-router";
import { createEffect, createSignal, onMount, Show } from "solid-js";
import { axiosAuth, axiosNormal } from "../../@utils/axios";
import { getBatches } from "../../@utils/helpers";
import Dropdown from "../../components/Dropdown/Dropdown";
import { GoogleIcon } from "../../components/icons";
import "./Auth.css";
import GoogleAuth from "./GoogleAuthComponents";

const SignUp = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const [isLogin, setIsLogin] = createSignal(
        location.pathname === "/auth/login"
    );

    const [pageTitle, setPageTitle] = createSignal(
        isLogin()
            ? "Welcome again! Please don't logout now 😅"
            : "Hey 👋, Let's get you a sweet account!"
    );

    const [ui, setUi] = createSignal<
        "login-signup" | "email-verify" | "forgot-password"
    >("login-signup");

    createEffect(() => {
        if (isLogin() && ui() === "login-signup") {
            setPageTitle("Welcome again! Please don't logout now 😅");
        }
        if (!isLogin() && ui() === "login-signup") {
            setPageTitle("Hey 👋, Let's get you a sweet account!");
        }
        if (ui() === "email-verify") {
            setPageTitle(
                `🌟 OTP sent to ${
                    details().email
                }, check your inbox or spam folder!`
            );
        }
        if (ui() === "forgot-password") {
            setPageTitle(`📧 Enter your email to get reset link`);
        }
    });

    const [details, setDetails] = createSignal({
        email: "",
        password: "",
        batchId: "",
    });
    const [batches, setBatches] = createSignal([]);

    const [otp, setOtp] = createSignal("");

    const [state, setState] = createSignal({
        message: "",
        isSuccess: false,
        processing: false,
    });

    onMount(async () => {
        const res = await getBatches();
        console.log("batches res", res);
        setBatches(res);
    });

    const handleSubmit = async () => {
        if (!details().email || !details().password) {
            setState({
                ...state(),
                message: "Please fill all the fields",
                isSuccess: false,
                processing: false,
            });
            return;
        }
        if (!isLogin() && !details().batchId) {
            setState({
                ...state(),
                message: "Please select your batch",
                isSuccess: false,
                processing: false,
            });
            return;
        }
        // email regex
        const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        if (!emailRegex.test(details().email)) {
            setState({
                ...state(),

                message: "Please enter a valid email",
                isSuccess: false,
                processing: false,
            });
            return;
        }
        if (details().password.length < 8) {
            setState({
                ...state(),

                message: "Password must contain at least 8 characters",
                isSuccess: false,
                processing: false,
            });
            return;
        }
        setState({
            ...state(),
            message: "",
            isSuccess: false,
            processing: true,
        });
        try {
            if (!isLogin()) {
                const res = await axiosNormal.post("/user/signup", details());
                if (res.status === 200) {
                    setState({
                        ...state(),
                        message: res.data.message,
                        isSuccess: res.data.success,
                        processing: false,
                    });
                }
                if (res.data.success) {
                    localStorage.setItem("token", res.data.token);
                    setUi("email-verify");
                }
            } else {
                const res = await axiosNormal.post("/user/login", details());
                if (res.status === 200) {
                    setState({
                        ...state(),

                        message: res.data.message,
                        isSuccess: res.data.success,
                        processing: false,
                    });
                }
                if (res.data.success) {
                    localStorage.setItem("token", res.data.token);
                    navigate("/dashboard");
                }
                if (res.data.message === "Email not verified") {
                    localStorage.setItem("token", res.data.token);

                    setUi("email-verify");
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleVerify = async () => {
        if (!otp() || otp().length !== 6) {
            setState({
                ...state(),
                message: "Please enter a valid OTP",
                isSuccess: false,
                processing: false,
            });
            return;
        }
        setState({
            ...state(),
            message: "",
            isSuccess: false,
            processing: true,
        });
        try {
            const res = await axiosAuth.post("/user/verifyemail", {
                email: details().email,
                emailOtp: otp(),
            });
            if (res.status === 200) {
                setState({
                    ...state(),
                    message: res.data.message,
                    isSuccess: res.data.success,
                    processing: false,
                });
            }
            if (res.data.success) {
                localStorage.setItem("token", res.data.token);
                setTimeout(() => {
                    navigate("/dashboard");
                }, 1000);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleForgotPassword = async () => {
        // email regex
        const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        if (!emailRegex.test(details().email)) {
            setState({
                ...state(),
                message: "Please enter a valid email",
                isSuccess: false,
                processing: false,
            });
            return;
        }
        setState({
            ...state(),
            message: "",
            isSuccess: false,
            processing: true,
        });
        try {
            const res = await axiosAuth.post("/user/forgotpassword", {
                email: details().email,
            });
            if (res.status === 200) {
                setState({
                    ...state(),
                    message: res.data.message,
                    isSuccess: res.data.success,
                    processing: false,
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    onMount(() => {
        localStorage.removeItem("token");
    });

    return (
        <div>
            <div class="md:grid grid-cols-[2fr_1fr] h-screen">
                <div class="decor hidden md:flex justify-center items-center">
                    <div>
                        <h1 class="text-white text-4xl font-bold">
                            The Crew Welcomes You With Heart ♥️
                        </h1>
                    </div>
                </div>
                <div class="flex items-center justify-center">
                    <div class="p-4">
                        <div class="text-2xl">{pageTitle()}</div>
                        <div class="flex gap-2">
                            <Show when={ui() === "login-signup"}>
                                <Link
                                    class="text-sm my-1 underline text-blue-500"
                                    onclick={() => setIsLogin(!isLogin())}
                                    // adding !isLogin() because it was navigating on second hit due to which
                                    // there was incompatibility between pathname & isLogin. !isLogin() here fixes it.
                                    href={
                                        !isLogin()
                                            ? "/auth/signup"
                                            : "/auth/login"
                                    }
                                >
                                    {isLogin()
                                        ? "Get an account"
                                        : "Already have account? Login"}
                                </Link>
                                <Show when={isLogin()}>
                                    <div
                                        onclick={() => setUi("forgot-password")}
                                        class="text-sm my-1 underline text-blue-500 cursor-pointer"
                                    >
                                        Forgot Password?
                                    </div>
                                </Show>
                            </Show>
                            <Show when={ui() === "forgot-password"}>
                                <div
                                    onclick={() => setUi("login-signup")}
                                    class="text-sm my-1 underline text-blue-500 cursor-pointer"
                                >
                                    Remembered Password?
                                </div>
                            </Show>
                        </div>
                        <div class="border-b-2"></div>

                        <Show when={ui() === "login-signup"}>
                            <div class="mt-4">
                                <label class="text-sm text-gray-500">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    class="w-full border-2 border-gray-300 outline-none mt-2 text-blue-600 text-sm p-3 rounded-full"
                                    placeholder={
                                        isLogin
                                            ? "Enter email"
                                            : "University email only"
                                    }
                                    value={details().email}
                                    onInput={(e) =>
                                        setDetails({
                                            ...details(),
                                            email: e.currentTarget.value,
                                        })
                                    }
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            handleSubmit();
                                        }
                                    }}
                                />
                            </div>
                            <div class="mt-4">
                                <label class="text-sm text-gray-500">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    class="w-full border-2 border-gray-300 outline-none mt-2 text-blue-600 text-sm p-3 rounded-full"
                                    placeholder={
                                        isLogin()
                                            ? "Enter Password"
                                            : "Please keep it complex just like your thoughts"
                                    }
                                    value={details().password}
                                    onInput={(e) =>
                                        setDetails({
                                            ...details(),
                                            password: e.currentTarget.value,
                                        })
                                    }
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            handleSubmit();
                                        }
                                    }}
                                />
                            </div>
                            <Show when={!isLogin()}>
                                <div class="mt-4">
                                    <label class="text-sm text-gray-500">
                                        Batch
                                    </label>
                                    <Dropdown
                                        defaultValue={"Choose batch"}
                                        options={batches()}
                                        onChange={(value) => {
                                            console.log(value);
                                            setDetails({
                                                ...details(),
                                                batchId: value.toString(),
                                            });
                                        }}
                                    />
                                </div>
                            </Show>
                            <Show when={state().message}>
                                <div
                                    class={`${
                                        state().isSuccess
                                            ? "text-green-600 bg-green-100"
                                            : "text-red-600 bg-red-100"
                                    } mt-2 rounded-md p-2`}
                                >
                                    {state().message}
                                </div>
                            </Show>
                            <div class="mt-4">
                                <button
                                    class={`flex justify-center w-full bg-blue-600 text-white text-sm p-3 rounded-full duration-75 hover:shadow-xl active:scale-95 shadow-blue-500 ${
                                        state().processing
                                            ? "cursor-not-allowed bg-blue-400"
                                            : ""
                                    }`}
                                    onclick={handleSubmit}
                                >
                                    <Show when={state().processing}>
                                        <div class="animate-spin rounded-full h-5 w-5 border-2 border-b-transparent border-white-900 mx-2"></div>
                                    </Show>
                                    <Show when={!state().processing}>
                                        {isLogin() ? "Login" : "Sign Up"}
                                    </Show>
                                </button>
                            </div>
                        </Show>

                        <Show when={ui() === "email-verify"}>
                            <div class="mt-4">
                                <label class="text-sm text-gray-500">
                                    Enter OTP
                                </label>
                                <input
                                    type="text"
                                    class="w-full border-2 border-gray-300 outline-none mt-2 text-blue-600 text-sm p-3 rounded-full"
                                    placeholder="Enter OTP"
                                    value={otp()}
                                    onInput={(e) =>
                                        setOtp(e.currentTarget.value)
                                    }
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            handleVerify();
                                        }
                                    }}
                                />
                            </div>
                            <Show when={state().message}>
                                <div
                                    class={`${
                                        state().isSuccess
                                            ? "text-green-600 bg-green-100"
                                            : "text-red-600 bg-red-100"
                                    } mt-2 rounded-md p-2`}
                                >
                                    {state().message}
                                </div>
                            </Show>
                            <div class="mt-4">
                                <button
                                    class={`flex justify-center w-full bg-blue-600 text-white text-sm p-3 rounded-full duration-75 hover:shadow-xl active:scale-95 shadow-blue-500 ${
                                        state().processing
                                            ? "cursor-not-allowed bg-blue-400"
                                            : ""
                                    }`}
                                    onclick={handleVerify}
                                >
                                    <Show when={state().processing}>
                                        <div class="animate-spin rounded-full h-5 w-5 border-2 border-b-transparent border-white-900 mx-2"></div>
                                    </Show>
                                    <Show when={!state().processing}>
                                        Verify
                                    </Show>
                                </button>
                            </div>
                        </Show>

                        <Show when={ui() === "forgot-password"}>
                            <div class="mt-4">
                                <label class="text-sm text-gray-500">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    class="w-full border-2 border-gray-300 outline-none mt-2 text-blue-600 text-sm p-3 rounded-full"
                                    placeholder="Enter email"
                                    value={details().email}
                                    onInput={(e) =>
                                        setDetails({
                                            ...details(),
                                            email: e.currentTarget.value,
                                        })
                                    }
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            handleForgotPassword();
                                        }
                                    }}
                                />
                            </div>
                            <Show when={state().message}>
                                <div
                                    class={`${
                                        state().isSuccess
                                            ? "text-green-600 bg-green-100"
                                            : "text-red-600 bg-red-100"
                                    } mt-2 rounded-md p-2`}
                                >
                                    {state().message}
                                </div>
                            </Show>
                            <div class="mt-4">
                                <button
                                    class={`flex justify-center w-full bg-blue-600 text-white text-sm p-3 rounded-full duration-75 hover:shadow-xl active:scale-95 shadow-blue-500 ${
                                        state().processing
                                            ? "cursor-not-allowed bg-blue-400"
                                            : ""
                                    }`}
                                    onclick={handleForgotPassword}
                                >
                                    <Show when={state().processing}>
                                        <div class="animate-spin rounded-full h-5 w-5 border-2 border-b-transparent border-white-900 mx-2"></div>
                                    </Show>
                                    <Show when={!state().processing}>
                                        Send Reset Link
                                    </Show>
                                </button>
                            </div>
                        </Show>

                        <div class="border-b-2 mt-2"></div>

                        {/* <div class="mt-2 flex justify-center gap-1 items-center p-2 rounded-full border-2 cursor-pointer hover:bg-gray-50 active:bg-gray-100">
                            <GoogleIcon />
                            <div>
                                {isLogin()
                                    ? "Sign in with Google"
                                    : "Sign up with Google"}
                            </div>
                        </div> */}
                        <div class="mt-2 flex justify-center">
                            <GoogleAuth />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
