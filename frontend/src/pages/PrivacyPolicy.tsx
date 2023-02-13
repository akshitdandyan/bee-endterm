import { Link, useNavigate } from "solid-app-router";

const PrivacyPolicy = () => {
    const navigate = useNavigate();

    const navigateToDashboard = () => {
        localStorage.getItem("token")
            ? navigate("/dashboard")
            : navigate("/auth/login");
    };
    return (
        <>
            {" "}
            <div
                id="landing-page-header"
                class="flex items-center justify-between bg-blue-700 p-4"
            >
                <Link href="/">
                    <div class="">
                        <img
                            src={
                                "https://ik.imagekit.io/csecrew/csecrewlogo_zL7nzrpfC.svg"
                            }
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
            <div class="p-4">
                <h1 class="text-lg font-semibold mt-6">Privacy Policy</h1>
                <div class="my-4 text-gray-600 m-2">
                    This privacy policy will help you understand how Cse Crew
                    uses and protects the data you provide to us when you visit
                    and use our website.
                </div>
                <div class="my-4 text-gray-600 m-2">
                    We reserve the right to change this policy at any given
                    time, of which you will be promptly updated. If you want to
                    make sure that you are up to date with the latest changes,
                    we advise you to frequently visit this page.
                </div>

                <h1 class="text-lg font-semibold mt-6">
                    What User Data We Collect
                </h1>
                <div class="my-4 text-gray-600 m-2">
                    When a user visit the website, we may collect the following
                    data:
                </div>
                <ul class="list-disc pl-6">
                    <li>Email address of visiting user</li>
                    <li>
                        Content you bookmarks (only for saving changes in cloud
                        for your saved files)
                    </li>
                    <li>
                        Number of downloads on a file (when a user downloads any
                        file, we don't get any information about the person
                        downloading file, only number is incremented for
                        analytics purposes)
                    </li>
                </ul>

                <h1 class="text-lg font-semibold mt-6">
                    Why We Collect Your Data
                </h1>
                <div class="my-4 text-gray-600 m-2">
                    We collect above mentioned data due to following reasons:
                </div>
                <ul class="list-disc pl-6">
                    <li>
                        Your email, for only contacting you whenever you need to
                        verify your account or need password to be reset.
                    </li>
                    <li>
                        Number of accounts to analyze how platfrom is
                        performing.
                    </li>
                    <li>
                        Details shall be used to connect with students in
                        respect of sharing information related to college
                        opportunities and notices.
                    </li>
                </ul>

                <h1 class="text-lg font-semibold mt-6">
                    Safeguarding and Securing the Data
                </h1>
                <div class="my-4 text-gray-600 m-2">
                    Cse Crew is committed to securing your data and keeping it
                    confdential! Cse Crew has done all in its power to prevent
                    data theft, unauthorized access, and disclosure by
                    Implementing the latest technologies and software, which
                    help us safeguard all the information we collect onllne. Cse
                    Crew promises to put forth all necessary updates and not
                    misuse your details for any personal purposes.
                </div>

                <h1 class="text-lg font-semibold mt-6">
                    Accessing Platform Services Policy
                </h1>
                <div class="my-4 text-gray-600 m-2">
                    We offer one account that can can be used on two devices,
                    that is desktop and mobile so user can get updates when
                    he/she is outside or unable to access desktop on the moment.
                    Please keep following points in mind while using our
                    platform:
                    <ul class="list-disc pl-6">
                        <li>
                            If user's account found to be used in more than 2
                            devices then it would be banned instantly without
                            any notice to user.
                        </li>
                        <li>
                            If user feels need to reactivate account, he/she may
                            appeal Cse Crew content team by sending an email
                            from thier institution email id to
                            <a href="mailto:info.csecrew@gmail.com">
                                {" "}
                                info.csecrew@gmail.com
                            </a>
                            .
                        </li>
                        <li>
                            We do not promise that we will accept your appeal,
                            we may do so if we found any defect from our
                            currently implemented technology or by charging a
                            money amount as fine.
                        </li>
                    </ul>
                </div>

                <h1 class="text-lg font-semibold mt-6" id="redundpolicy">
                    Refund Policy
                </h1>
                <div class="my-4 text-gray-600 m-2">
                    Before purchasing a premium subscription, you should know
                    following:
                </div>
                <ul class="list-disc pl-6">
                    <li>
                        The premium subscription once bought cannot be canceled
                        for a refund of any sort.
                    </li>
                    <li>
                        If user's account was found to be used in some unethical
                        means of usage then the account shall be banned(for
                        example using same account on more than 2 devices) and
                        no amount paid for the membership shall be refunded.
                    </li>
                    <li>
                        We at Cse Crew value your satisfaction at highest, so if
                        you are unsatisfied of any sorts, you are always open to
                        write to us on our email address, that is{" "}
                        <a href="mailto:info.csecrew@gmail.com">
                            info.csecrew@gmail.com
                        </a>
                        . We will try our best to improve it.
                    </li>
                </ul>

                <h1 class="text-lg font-semibold mt-6">Our Cookie Policy</h1>
                <div class="my-4 text-gray-600 m-2">
                    Once you agree to allow our website to use
                    cookies/localstorage/sessionstorage, you also agree to use
                    the data it collects regarding your online behavior (analyze
                    web traffic, web pages you spend the most time on). The data
                    we collect by using cookies is used to check whether user is
                    logged in or not on device before so we can redirect user to
                    content web pages. Please note that cookies don't allow us
                    to gain control of your computer in any way. They are
                    strictly used to monitor which pages you find useful and
                    which you do not so that we can provide a better experience
                    for you. If you want to disable cookies/local
                    storage/session storage, you can do it by accessing the
                    settings of your internet browser. (Provide links for cookie
                    settings for major internet browsers. Our website contalns
                    links that lead to other websites. If you cllck on these
                    links Cse Crew is not held responsible for your data and
                    privacy protection. Visiting those websites is not governed
                    by this privacy policy agreement. Make sure to read the
                    privacy policy documentation of the website you go to from
                    our website.
                </div>
                <h1 class="text-lg font-semibold mt-6">Content Policy</h1>
                <div class="my-4 text-gray-600 m-2">
                    The content being uploaded on cse crew doesn't belong to us.
                    Respected teachers/professors of our University works hard
                    to create these lecture files so that students can easily
                    get stuff related to thier curriculum. Cse Crew is just a
                    platform of sharing educational material. We make sure no
                    outsider of University can register a account on Cse Crew,
                    only people provided with University email id can have
                    access to content.
                </div>
                <h1 class="text-lg font-semibold mt-6">
                    Restricting the Cohesion of your Personal Data
                </h1>
                <div class="my-4 text-gray-600 m-2">
                    At some point. you might wish to restrict the use and
                    collection of your personal data. You can achieve this by
                    doing the following:
                </div>
                <ul class="list-disc pl-6">
                    <li>
                        When you are filling the forms on the website, make sure
                        to check If there is a box which you can leave
                        unchecked, if you don't want to disclose your personal
                        information.{" "}
                    </li>
                    <li>
                        If you have already agreed to share your information
                        with us, feel free to contact us via email and we will
                        be more than happy to change this for you.{" "}
                    </li>
                    <div class="my-4 text-gray-600 m-2">
                        Cse Crew will not lease, sell or distribute your
                        personal information to any third parties. We might do
                        so if the law forces us. Your personal informatlon will
                        be used when we need to send you required/important
                        materials or updates or any other information if you
                        agree to this privacy policy.{" "}
                    </div>
                </ul>
            </div>
        </>
    );
};

export default PrivacyPolicy;
