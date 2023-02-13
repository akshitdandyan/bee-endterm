import { Link, useNavigate } from "solid-app-router";
import { createSignal, onMount, Show } from "solid-js";
import "../styles/Home.css";

const Images = {
    logo: "https://ik.imagekit.io/csecrew/csecrewlogo_zL7nzrpfC.svg",
    productive:
        "https://ik.imagekit.io/csecrew/productive_7j-UV3zOE.svg?ik-sdk-version=javascript-1.4.3&updatedAt=1671693859764",
    goodGrades: "https://ik.imagekit.io/csecrew/good-grades_x-6SbP8-v.svg",
    time: "https://ik.imagekit.io/csecrew/time_fFSRlza4p.svg",
    cseCrew:
        "https://ik.imagekit.io/csecrew/Cse_Crew_3d_6-743x512_2HdYoW-UG.png",
    dashboardMockup:
        "https://ik.imagekit.io/csecrew/csecrew-dashboard-mockup.png",
    telegramMockup:
        "https://ik.imagekit.io/csecrew/classreminder-from-csecrew-mockup.png",
    telegramIcon: "https://ik.imagekit.io/csecrew/telegram_rewrTjRVm.svg",
};

const Home = () => {
    const navigate = useNavigate();

    const navigateToDashboard = () => {
        localStorage.getItem("token")
            ? navigate("/dashboard")
            : navigate("/auth/login");
    };

    const [showTelegramChannelOptions, setShowTelegramChannelOptions] =
        createSignal(false);

    onMount(() => {
        onMount(() => {
            document.title = "Cse Crew | Easy academic life for you";
        });
        // on scroll down, hide #landing-page-header and on scroll up, show it
        let prevScrollPos = window.pageYOffset;
        window.onscroll = () => {
            let currentScrollPos = window.pageYOffset;
            if (prevScrollPos > currentScrollPos) {
                document.getElementById("landing-page-header")!.style.top = "0";
            } else {
                document.getElementById("landing-page-header")!.style.top =
                    "-100px";
            }
            prevScrollPos = currentScrollPos;
        };
    });
    return (
        <div class="">
            <div
                id="landing-page-header"
                class="flex items-center justify-between bg-blue-700 p-4"
            >
                <div class="">
                    <img
                        src={Images.logo}
                        alt="Cse Crew"
                        style={{
                            height: "50px",
                        }}
                    />
                </div>
                <div
                    onclick={navigateToDashboard}
                    class="bg-gray-100 cursor-pointer shadow-lg text-blue-700 text-center rounded-full px-4 py-1 duration-150 active:shadow-none active:ring-2 active:ring-purple-500"
                >
                    Go to Dashboard
                </div>
            </div>

            <div class="sm:grid grid-cols-2 items-center p-4">
                <div class="sm:p-6">
                    <div class="text-right  sm:text-left text-xl mt-4 sm:mt-0 sm:text-4xl sm:leading-[60px]">
                        Well, it's kind of a google drive where someone else is
                        managing all the stuff for you, so you can focus and put
                        time on your studies.
                    </div>
                    <div class="text-gray-600 mt-10 text-center sm:text-left">
                        Stuff? Scroll to know more.
                    </div>
                </div>
                <div class="flex justify-center items-center">
                    <img
                        src={Images.productive}
                        alt="Cse Crew's synonym is productivity"
                        class="sm:h-[70vh] mt-8 sm:mt-0"
                    />
                </div>
            </div>

            <div class="flex flex-col-reverse sm:grid grid-cols-2 items-center p-4">
                <div class="flex justify-center items-center">
                    <img
                        src={Images.goodGrades}
                        alt="Cse Crew's synonym is productivity"
                        class="sm:h-[70vh] mt-8 sm:mt-0"
                    />
                </div>
                <div class="sm:p-6">
                    <div class="text-left  sm:text-left text-xl sm:text-4xl mt-4 sm:mt-0  sm:leading-[60px]">
                        You will find all latest announcements, notices, lecture
                        files, datesheets, timetables, etc. of your department
                        right here.
                    </div>
                    <div class="text-gray-600 mt-10 text-center sm:text-left">
                        I get them via whatsapp? Scroll more.
                    </div>
                </div>
            </div>

            <div class="sm:grid grid-cols-2 items-center p-4">
                <div class="sm:p-6">
                    <div class="text-right  sm:text-left text-xl sm:text-2xl mt-4 sm:mt-0  sm:leading-[55px] text-gray-600">
                        When you recieve a message on whatsapp, it will be lost
                        between several chats. You tries to check that later,
                        you scroll through chats, downloads the pdf, and then
                        you get to see it. This whole process, Oh Jesus, takes
                        atleast 15 - 30 seconds, which is kind of frustrating on
                        daily basis.
                    </div>
                </div>
                <div class="flex justify-center items-center">
                    <img
                        src={Images.time}
                        alt="Softwares are meant to be time saving."
                        class="sm:h-[70vh] mt-8 sm:mt-0"
                    />
                </div>
            </div>

            <div class="sm:grid grid-cols-2 items-center p-4">
                <div class="flex justify-center items-center">
                    <img
                        src={Images.cseCrew}
                        alt="Cse Crew's synonym is productivity"
                        class="sm:h-[70vh] mt-8 sm:mt-0"
                    />
                </div>
                <div class="sm:p-6">
                    <div class="text-blue-700 text-center sm:text-left text-3xl sm:text-4xl sm:leading-[60px]">
                        And that's why you will join the Cse Crew. All the stuff
                        managed in one place and delivered fast with zero hassle
                        on your dashboard.
                    </div>
                </div>
            </div>

            <div>
                <div class="text-center text-zinc-500 text-xl mb-20 sm:mb-0 leading-6 sm:text-3xl sm:font-semibold mt-20">
                    All university related content cleanly accessible on your
                    dashboard. No more hassle of searching for files in
                    whatsapp.
                </div>
                <div class="sm:grid grid-cols-[2fr_1fr] mt-6 relative">
                    <div class="sm:relative left-10">
                        <img
                            src={Images.dashboardMockup}
                            alt={"Cse Crew's Dashboard is all you need"}
                            class="w-4/5 mx-auto my-4 shadow-2xl rounded-md"
                        />
                    </div>
                    <div class="mx-2 sm:mx-0 sm:relative right-40 top-40 max-w-lg bg-gray-100 backdrop-blur-sm bg-opacity-40 ring-1 shadow-2xl shadow-sky-200 rounded-md p-4 ">
                        <h2 class="text-xl text-violet-700">
                            What you will get ?
                        </h2>
                        <ul class="list-disc list-outside pl-8">
                            <li class="my-4 text-blue-700">
                                All the latest announcements, notices, lecture
                                files, datesheets, timetables, etc. of your
                                department.
                            </li>
                            <li class="my-4 text-blue-700">
                                Reminders via notification & telegram of next
                                exam, event, etc.
                            </li>
                            <li class="my-4 text-blue-700">
                                In app-view of pdf files so that your device
                                don't get cluttered with files that's of no use
                                after reading.
                            </li>
                            <li class="my-4 text-blue-700">
                                You can view your downloads when you are
                                offline.
                            </li>
                        </ul>
                    </div>
                    <div
                        onclick={navigateToDashboard}
                        class="bg-gray-100 cursor-pointer w-max mx-auto scale-150  shadow-lg text-blue-700 text-center rounded-full px-4 py-1 duration-150 active:shadow-none mt-8 ring-2 ring-sky-500 active:ring-blue-500"
                    >
                        Go to Dashboard
                    </div>
                </div>
            </div>

            <div class="flex justify-center items-center flex-col sm:flex-row gap-6 mt-32">
                <div>
                    <img
                        src={Images.telegramMockup}
                        alt={
                            "Get class reminders so you don't have to check manually"
                        }
                        class="h-[600px]"
                    />
                </div>
                <div class="max-w-lg text-center sm:text-left">
                    <div class="text-gray-600 font-bold text-3xl">
                        Do you feel frustrated when you daily have to check next
                        class timings and location?
                    </div>
                    <div class="text-blue-700 mt-4">
                        We got your back here too. Join your group's telegram
                        channel and start getting upcoming class notifications.
                    </div>
                    <div
                        onclick={() => setShowTelegramChannelOptions(true)}
                        class="bg-gray-100 flex mx-auto sm:mx-0  cursor-pointer w-max  shadow-lg text-blue-700 text-center rounded-full px-4 py-1 duration-150 active:shadow-none mt-8 ring-2 ring-sky-500 active:ring-blue-500"
                    >
                        Join your group's channel
                        <img src={Images.telegramIcon} alt={"Telegram App"} />
                    </div>
                    <Show when={showTelegramChannelOptions()}>
                        <div class="mx-auto sm:mx-0 w-max">
                            <a
                                href="https://starwars.csecrew.com/"
                                target="_blank"
                                class="block mt-2 text-gray-100 rounded-full ring-1 px-4 py-1 bg-blue-600"
                            >
                                Batch 2022 - 2026
                            </a>
                            <a
                                href="https://ben10.csecrew.com/"
                                target="_blank"
                                class="block mt-2 text-gray-100 rounded-full ring-1 px-4 py-1 bg-blue-600"
                            >
                                Batch 2020 - 2024
                            </a>
                        </div>
                    </Show>
                </div>
            </div>

            <div class="mt-24">
                <div class="text-2xl text-gray-600 text-center">FAQs</div>
                <div class="sm:grid grid-cols-2 gap-6 mt-6 px-12">
                    <div class="bg-gray-100 backdrop-blur-sm bg-opacity-40 mt-4 sm:mt-0 ring-1 shadow-2xl shadow-sky-200 rounded-md p-4">
                        <h2 class="text-xl text-violet-700">
                            What is Cse Crew ?
                        </h2>
                        <div class="text-blue-700">
                            Cse Crew is a platform that provides all the
                            university related content to students of department
                            of Computer Science and Engineering.
                        </div>
                    </div>
                    <div class="bg-gray-100 backdrop-blur-sm bg-opacity-40 mt-4 sm:mt-0 ring-1 shadow-2xl shadow-sky-200 rounded-md p-4">
                        <h2 class="text-xl text-violet-700">
                            What is the purpose of Cse Crew ?
                        </h2>
                        <div class="text-blue-700">
                            The purpose of Cse Crew is to provide all the
                            university related content to students of department
                            of Computer Science and Engineering in a single
                            place.
                        </div>
                    </div>
                    <div class="bg-gray-100 backdrop-blur-sm bg-opacity-40 mt-4 sm:mt-0 ring-1 shadow-2xl shadow-sky-200 rounded-md p-4">
                        <h2 class="text-xl text-violet-700">
                            What is the benefit of Cse Crew ?
                        </h2>
                        <div class="text-blue-700">
                            The benefit of Cse Crew is that you don't have to
                            search for files in whatsapp or other social media
                            platforms. All the content is available on your
                            dashboard.
                        </div>
                    </div>
                    <div class="bg-gray-100 backdrop-blur-sm bg-opacity-40 mt-4 sm:mt-0 ring-1 shadow-2xl shadow-sky-200 rounded-md p-4">
                        <h2 class="text-xl text-violet-700">
                            How do I get started?
                        </h2>
                        <div class="text-blue-700">
                            You can quicky signup using google or your email by
                            visiting{" "}
                            <Link href="/auth/signup" class="underline">
                                signup page
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <div class="mt-40">
                <div class="p-8 bg-zinc-900 text-white sm:flex gap-32">
                    <div>
                        <img
                            src={Images.logo}
                            alt={"Cse Crew's Logo"}
                            class="w-32"
                        />
                        <div class="text-lg mt-2">Cse Crew</div>
                        <p class="text-sm text-zinc-200 mt-2">
                            A platform where you will get all your insitute's
                            study material in a single place, well organized.
                        </p>
                        <div class="text-zinc-200 text-sm mt-4">
                            © {new Date().getFullYear()} Cse Crew, Inc.
                        </div>
                    </div>
                    <div class="flex justify-between mt-6 sm:mt-0">
                        <div>
                            <div class="font-bold">Sitemap</div>
                            <Link
                                class="duration-100 hover:text-blue-400"
                                href="/"
                            >
                                <div class="mt-2">Home</div>
                            </Link>
                            <Link
                                class="duration-100 hover:text-blue-400"
                                href="/auth/signup"
                            >
                                <div class="mt-2">Signup</div>
                            </Link>
                            <Link
                                class="duration-100 hover:text-blue-400"
                                href="/auth/login"
                            >
                                <div class="mt-2">Login</div>
                            </Link>
                            <Link
                                class="duration-100 hover:text-blue-400"
                                href="/dashboard"
                            >
                                <div class="mt-2">Dashboard</div>
                            </Link>
                            <Link
                                class="duration-100 hover:text-blue-400"
                                href="/about"
                            >
                                <div class="mt-2">About</div>
                            </Link>
                        </div>
                    </div>

                    <div class="flex justify-between mt-6 sm:mt-0">
                        <div>
                            <div class="font-bold">Contact</div>
                            <a
                                class="duration-100 hover:text-blue-400"
                                href="mailto:info.csecrew@gmail.com"
                            >
                                <div class="mt-2">Email</div>
                            </a>
                            <a
                                class="duration-100 hover:text-blue-400"
                                href="tel:+91 9053203944"
                            >
                                <div class="mt-2">Phone</div>
                            </a>
                        </div>
                    </div>

                    <div class="flex justify-between mt-6 sm:mt-0">
                        <div>
                            <div class="font-bold">Platform</div>
                            <Link
                                class="duration-100 hover:text-blue-400"
                                href="/privacy-policy"
                            >
                                <div class="mt-2">Privacy Policy</div>
                            </Link>
                            <Link
                                class="duration-100 hover:text-blue-400"
                                href="/terms-and-conditions"
                            >
                                <div class="mt-2">Terms & Conditions</div>
                            </Link>
                        </div>
                    </div>

                    <div class="flex gap-6 flex-col mt-6 sm:mt-0">
                        <img
                            src="https://ik.imagekit.io/csecrew/ecell-pb-logo-691062f846ace24759a3632357744e11_0a03xN8f3z.png"
                            alt="Chitkara University CEED E-Cell"
                            class="w-32"
                        />
                        <div>
                            INCUBATED BY <br />
                            <a
                                href="https://ecellpb.cuceed.org/"
                                target="_blank"
                            >
                                {" "}
                                Chitkara University CEED E-Cell
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
