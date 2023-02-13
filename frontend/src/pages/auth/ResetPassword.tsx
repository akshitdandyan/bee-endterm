import { useNavigate, useParams } from "solid-app-router";
import { createSignal, onMount, Show } from "solid-js";
import { axiosNormal } from "../../@utils/axios";

const ResetPassword = () => {
    const navigate = useNavigate();
    const { token } = useParams<{ token: string }>();
    const [verifyingToken, setVerifyingToken] = createSignal(true);
    const [state, setState] = createSignal({
        message: "",
        isSuccess: false,
        processing: false,
    });

    const [details, setDetails] = createSignal({
        password: "",
        confirmPassword: "",
        token: "",
        email: "",
    });

    onMount(async () => {
        const res = await axiosNormal.get(`/user/verify/${token}`);
        if (res.status === 200 && res.data.success) {
            setVerifyingToken(false);
            setDetails({
                ...details(),
                token: token,
                email: res.data.payload.email,
            });
        } else {
            navigate("/auth/login");
        }
    });

    // reset password
    const handleSubmit = async () => {
        setDetails({
            password: details().password.trim(),
            confirmPassword: details().confirmPassword.trim(),
            token: token,
            email: details().email.trim(),
        });
        if (details().password !== details().confirmPassword) {
            setState({
                ...state(),
                message: "Passwords do not match",
                isSuccess: false,
                processing: false,
            });
            return;
        }

        if (details().password.trim().length < 8) {
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
            const res = await axiosNormal.post(
                "/user/resetpassword",
                details()
            );
            if (res.status === 200) {
                setState({
                    ...state(),
                    message: res.data.message,
                    isSuccess: res.data.success,
                    processing: false,
                });
            }
            if (res.data.success && res.data.token) {
                localStorage.setItem("token", res.data.token);
                setTimeout(() => {
                    console.log("redirecting");
                    navigate("/dashboard");
                }, 1000);
            }
        } catch (error) {
            console.log(error);
            setState({
                ...state(),
                message: "Something went wrong",
                isSuccess: false,
                processing: false,
            });
        }
    };

    return (
        <div>
            <div class="md:grid grid-cols-[2fr_1fr] h-screen">
                <div class="bg-black hidden md:flex flex-col justify-center items-center">
                    <img
                        src="https://ik.imagekit.io/csecrew/welcome-illustration_eLzyXOOAE.svg"
                        alt="Welcome"
                        style="height: 200px; margin-bottom: 20px;"
                    />
                    <img
                        src="https://ik.imagekit.io/csecrew/csecrewlogo_zL7nzrpfC.svg"
                        alt="Cse Crew"
                        style="height: 80px;"
                    />
                </div>
                <div class="h-screen sm:flex items-center justify-center bg-slate-700">
                    <Show when={verifyingToken()}>
                        <div class="flex justify-center items-center gap-2">
                            <div class="animate-spin rounded-full h-5 w-5 border-2 border-b-transparent border-white mx-2"></div>
                        </div>
                        <div class="text-white text-center">Just a sec...</div>
                    </Show>
                    <Show when={!verifyingToken()}>
                        <div class="p-4">
                            <div class="text-2xl text-white">
                                Hello! 👋🏼 <br /> It's okay to forget things.😸
                            </div>
                            <div class="border-b-2"></div>
                            <div class="mt-4">
                                <label class="text-sm text-gray-200">
                                    Choose a password
                                </label>
                                <input
                                    type="password"
                                    class="w-full border-2 border-gray-300 outline-none mt-2 text-blue-200 text-sm p-3 rounded-full bg-transparent"
                                    placeholder={"New Password"}
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
                            <div class="mt-4">
                                <label class="text-sm text-gray-200">
                                    Confirm password
                                </label>
                                <input
                                    type="password"
                                    class="w-full border-2 border-gray-300 outline-none mt-2 text-blue-200 text-sm p-3 rounded-full bg-transparent"
                                    placeholder={"Enter password again"}
                                    value={details().confirmPassword}
                                    onInput={(e) =>
                                        setDetails({
                                            ...details(),
                                            confirmPassword:
                                                e.currentTarget.value,
                                        })
                                    }
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            handleSubmit();
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
                                    class={`flex justify-center w-full bg-blue-200 text-blue-700 text-sm p-3 rounded-full duration-75 hover:shadow-xl active:scale-95 shadow-blue-500 ${
                                        state().processing
                                            ? "cursor-not-allowed bg-blue-400"
                                            : ""
                                    }`}
                                    onclick={handleSubmit}
                                >
                                    <Show when={state().processing}>
                                        <div class="animate-spin rounded-full h-5 w-5 border-2 border-b-transparent border-blue-900 mx-2"></div>
                                    </Show>
                                    <Show when={!state().processing}>
                                        Reset Password
                                    </Show>
                                </button>
                            </div>
                            <div class="border-b-2 mt-2"></div>
                            <div class="flex sm:hidden mt-6 justify-center flex-col">
                                <img
                                    src="https://ik.imagekit.io/csecrew/csecrewlogo_zL7nzrpfC.svg"
                                    alt="Cse Crew"
                                    style="height: 40px;"
                                />
                            </div>
                        </div>
                    </Show>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;
