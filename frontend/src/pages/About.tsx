import { Link, useNavigate } from "solid-app-router";
import { createSignal, onMount, Show } from "solid-js";
import { axiosNormal } from "../@utils/axios";
import { DownloadedIcon } from "../components/icons";

const Images = {
    logo: "https://ik.imagekit.io/csecrew/csecrewlogo_zL7nzrpfC.svg",
    astronautIllustration:
        "https://ik.imagekit.io/csecrew/astronauts-illustration.png",
    workspaceIllustration:
        "https://ik.imagekit.io/csecrew/crew-in-night-light_s1EAzLnBC.png",
    coloredCompositionIllustration:
        "https://ik.imagekit.io/csecrew/colored-composition-illustration_MJELS90RG.png",
    keyboard: "https://ik.imagekit.io/csecrew/keyboard_07rBVc31F",
};
let sent = false;
const About = () => {
    const navigate = useNavigate();
    const [message, setMessage] = createSignal("");
    const [state, setState] = createSignal({
        loading: false,
        isSuccess: false,
        message: "",
    });

    const navigateToDashboard = () => {
        localStorage.getItem("token")
            ? navigate("/dashboard")
            : navigate("/auth/login");
    };

    const sendMessage = async () => {
        if (sent) {
            return;
        }
        if (!message()) {
            return;
        }
        setState({
            loading: true,
            isSuccess: false,
            message: "",
        });
        try {
            const res = await axiosNormal.post("/api/v1/contact", {
                message: message(),
            });
            setState({
                loading: false,
                isSuccess: res.data.success,
                message: res.data.message,
            });
        } catch (error) {
            console.log(error);
            setState({
                loading: false,
                isSuccess: false,
                message:
                    "Woops! Not sent, please contact via email 🥹: info.csecrew@gmail.com",
            });
        }
        sent = true;
    };

    onMount(() => {
        document.title = "About | Cse Crew";
    });

    return (
        <div class="h-screen custom-sc bg-zinc-900 flex flex-col">
            <div
                id="landing-page-header"
                class="flex items-center justify-between bg-blue-700 p-4"
            >
                <Link href="/">
                    <div class="">
                        <img
                            src={Images.logo}
                            alt="Cse Crew"
                            style={{
                                height: "50px",
                            }}
                        />
                    </div>
                </Link>
                <div
                    onclick={navigateToDashboard}
                    class="bg-gray-100 cursor-pointer shadow-lg text-blue-700 text-center rounded-full px-4 py-1 duration-150 active:shadow-none active:ring-2 active:ring-purple-500"
                >
                    Go to Dashboard
                </div>
            </div>
            <div class="relative flex-1 overflow-y-auto custom-sc w-screen overflow-x-hidden">
                <div class="sm:flex justify-evenly items-center">
                    <div>
                        <img
                            src={Images.astronautIllustration}
                            alt="Astronauts Illustration"
                            class="h-3/4"
                        />
                    </div>
                    <div class="relative flex justify-center items-center">
                        <img
                            src={Images.coloredCompositionIllustration}
                            alt="Composition"
                            class="absolute scale-125"
                        />
                        <div class="bg-gray-800 backdrop-blur-sm bg-opacity-10 text-white m-4 sm:m-0 sm:w-[40vw] h-max p-4 rounded-2xl ring-1 ring-sky-400 relative z-10">
                            <p class="mt-2 ">
                                We're a group of misfits, rebels, and all-around
                                weirdos who are passionate about making GenZ's
                                life easier.
                            </p>
                            <p class="mt-2 ">
                                Our journey began in July 2021 when our blue
                                whale had a crazy idea to create a web page
                                where students can find all stuff of thier
                                university lectures. But a html page couldn't
                                survive for long. So we kept on adding new
                                features and new features and new features, but
                                in a convienient way.
                            </p>
                            <p class="mt-2 ">
                                But we didn't do it alone. Along the way, we've
                                picked up a ragtag team of go-getters,
                                troublemakers, and all-around good eggs.
                                Together, we're taking on the world (or at least
                                trying to).
                            </p>
                            <p class="mt-2 ">
                                Our goal is simple like our lives. We want to
                                save each minute of students from hassling
                                around the chat apps to see what they want to
                                see.
                            </p>
                            <p class="mt-2 ">
                                Thanks for stopping by and getting to know us a
                                little better. We hope you stick around and see
                                what we build next.
                            </p>
                        </div>
                    </div>
                </div>

                <div class="sm:flex justify-evenly items-center mt-24">
                    <div class="relative flex justify-center items-center sm:pl-10">
                        <img
                            src={Images.coloredCompositionIllustration}
                            alt="Composition"
                            class="absolute scale-125 opacity-75"
                        />
                        <div class="bg-gray-800 backdrop-blur-sm bg-opacity-10 m-4 sm:m-0 text-white sm:w-[40vw] h-max p-4 rounded-2xl ring-1 ring-purple-400 relative z-10">
                            <p class="mt-2 ">
                                As mentioned above, we want to save each minute
                                of students from any kind of hassling. We want
                                to optimize our platform so much that this 'each
                                minute' turns into 'each second'!
                            </p>
                            <p class="mt-2 selection:bg-black">
                                How are we going to make it possible? Our team
                                is dedicated to delivering the best results
                                possible, and that often means putting in extra
                                time and effort. Even on weekends, you can find
                                us hard at work, tackling tasks and challenges
                                with determination and a sense of purpose. We
                                believe that by working hard and being committed
                                to our goals, we can build great things that can
                                make this golden 3-4 years of a student very
                                productive. Our team is always ready to go the
                                extra mile to get the job done, and we are proud
                                of the hard work and dedication that we bring to
                                every feature we roll out.
                            </p>
                            <p class="mt-6 text-lg">
                                "We may not have super strength, but we have
                                super work ethic."
                            </p>
                        </div>
                    </div>
                    <div>
                        <img
                            src={Images.workspaceIllustration}
                            alt="Astronauts Illustration"
                            class="w-4/5 mx-auto"
                        />
                    </div>
                </div>

                <div class="sm:flex justify-evenly items-center my-24">
                    <div>
                        <img
                            src={Images.keyboard}
                            alt="Astronauts Illustration"
                            class="sm:w-[30vw]"
                        />
                    </div>
                    <div class="relative flex justify-center items-center">
                        <div class="bg-gray-800 backdrop-blur-sm bg-opacity-10 text-white m-4 sm:m-0 sm:w-[40vw] h-max p-4 rounded-2xl ring-1 ring-green-400 relative z-10">
                            <p class="mt-2 ">That's it for now.</p>
                            <p>
                                We're always looking for new ways to improve our
                                platform, so if you have any suggestions or
                                feedback, please let us know. You can include
                                your email, phone or name in case you want us to
                                get back to you, otherwise we are cool in
                                recieving{" "}
                                <span class="text-green-500">anonymous</span>{" "}
                                feedbacks.
                            </p>
                            <p class="mt-2 ">
                                <input
                                    value={message()}
                                    onInput={(e) =>
                                        setMessage(e.currentTarget.value)
                                    }
                                    onkeydown={(e) => {
                                        if (e.key === "Enter") {
                                            sendMessage();
                                        }
                                    }}
                                    placeholder="Spell here..."
                                    class="w-full outline-none text-blue-500 bg-transparent p-4 border-b-2 border-b-gray-300 text-sm placeholder:text-blue-500 "
                                />
                                <Show when={message() && !state().message}>
                                    <button
                                        onclick={sendMessage}
                                        class="bg-green-500 text-white p-2 rounded-md mt-2 duration-100 active:scale-95"
                                    >
                                        {state().loading ? (
                                            <div class="flex gap-2 items-center">
                                                <div class="animate-spin rounded-full h-8 w-8 border-2 border-b-transparent border-white"></div>
                                                <span>Sending</span>
                                            </div>
                                        ) : (
                                            "TAP & SEND 🚀"
                                        )}
                                    </button>
                                </Show>
                                <Show
                                    when={state().isSuccess && state().message}
                                >
                                    <div class="text-green-500 flex gap-1 mt-4">
                                        <DownloadedIcon /> We recieved it on our
                                        doorstep. Thank you 🍬!
                                    </div>
                                </Show>
                                <Show
                                    when={!state().isSuccess && state().message}
                                >
                                    <div class="text-red-500 flex gap-1 mt-4">
                                        {state().message}
                                    </div>
                                </Show>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
