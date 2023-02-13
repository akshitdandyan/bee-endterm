import { Link, useNavigate } from "solid-app-router";

const TermsAndConditions = () => {
    const navigate = useNavigate();

    const navigateToDashboard = () => {
        localStorage.getItem("token")
            ? navigate("/dashboard")
            : navigate("/auth/login");
    };
    return (
        <>
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
                <h1 class="text-lg font-semibold mt-6">Terms and conditions</h1>
                <ul class="list-disc pl-6">
                    <li>
                        Please read the following terms and conditions carefully
                        as it sets out the terms of a legally binding agreement
                        between you (the user) and Cse Crew.
                    </li>
                </ul>

                <h1 class="text-lg font-semibold mt-6">Introduction</h1>
                <ul class="list-disc pl-6">
                    <li>
                        The following sets out the terms and conditions on which
                        you may use the content and services on
                        https://csecrew.cf website.
                    </li>
                </ul>

                <h1 class="text-lg font-semibold mt-6">
                    Registration Access and Use
                </h1>
                <ul class="list-disc pl-6">
                    <li>
                        We welcome users to register on our digital platforms.
                        We offer the below-mentioned registration services which
                        may be subject to change in the future. All changes will
                        be appended on the terms and conditions page and
                        communicated to existing users by email. Registration
                        services are offered for individual subscribers only.
                    </li>
                    <li>
                        We also expect you to keep the information secure,
                        specifically access passwords and payment information.
                        Kindly update the information periodically to keep your
                        account relevant. Cse Crew will rely on any information
                        you provide to us and will never make misuse or selling
                        of your information.
                    </li>
                    <li>
                        You are not allowed to share your account credentials
                        with anyone else. Cse Crew does not allow more than two
                        devices on one account. We allow two devices so that
                        user can get updates and content on his/her mobile
                        without buying a separate subscription. On knowledge,
                        Cse Crew will ban or suspend your access to Cse Crew
                        platform if it comes across you sharing your account
                        access or your account being used in more than two
                        devices without further obligation to you.
                    </li>
                    <li>
                        We may in exceptional circumstances cease to provide
                        subscription services. We will give you at least 7 days’
                        notice of this, if possible. If we do so, then we will
                        have no further obligation to you.
                    </li>
                </ul>

                <h1 class="text-lg font-semibold mt-6">
                    Subscription Period, Renewal, and Cancellation of
                    Subscriptions
                </h1>

                <ul class="list-disc pl-6">
                    <li>
                        <b>Subscription:</b> Currently we offer 2 modes of
                        subscription on our platform and all its services. These
                        include 30 days plan a 90 days plan. After you pay for
                        either of them, the services will be accessible and
                        after the plan period expires, the services will pause
                        for the account and you can buy subscription again.
                    </li>
                    <li>
                        <b>Renewals:</b> You can renew or buy the subscription
                        on the official https://csecrew.cf platform. Cse Crew
                        won’t be charging you regularly per period of time,
                        after your premium subscription plan expires, you will
                        be redirected to page where you can purchase
                        subscription again.
                    </li>
                    <li>
                        <b>Cancellation Policy:</b> The premium membership once
                        bought cannot be canceled for a refund of any sort for
                        now. We at Cse Crew value your satisfaction at highest,
                        so if you are unsatisfied of any sorts, feel free to
                        write an email to use(info.csecrew@gmail.com). We will
                        try our best to improve it, if required.
                    </li>
                    <li>
                        <b>Cancellation by us:</b> Cse Crew reserves the right
                        to suspend or terminate your subscription if you breach
                        these terms and conditions or any of policies, with or
                        without notice and without further obligation to you. We
                        may also suspend or terminate your subscription if we
                        are prevented from providing services to you by
                        circumstances beyond our control.
                    </li>
                    <li>
                        <b>Payment related:</b> We at Cse Crew use Razorpay for
                        handling and managing payments as it allows to process
                        payment with multiple methods in our country. Thanks to
                        Razorpay. In case the payment gets declined or any other
                        error occurs during checking out then we shall not be
                        taking any responsibility for your money in that matter.
                        For any kind of information about your payments history
                        with your Cse Crew account, you can always reach us via
                        email and we would provide you all suitable details.
                    </li>
                </ul>

                <h1 class="text-lg font-semibold mt-6">
                    Using content/notes created by Cse Crew
                </h1>
                <div class="my-4 text-gray-600 m-2">
                    All the content on our sub platform{" "}
                    <a
                        href="https://notes.csecrew.cf"
                        rel="noreferrer"
                        target="_blank"
                    >
                        https://notes.csecrew.cf
                    </a>{" "}
                    belongs and copyrighted to Cse Crew only. Please keep
                    following points in mind while accessing our notes website:
                    <ul class="list-disc pl-6">
                        <li>
                            If someone found to be accessing content without
                            paying it's charges, a strict action will be taken
                            for data breach.
                        </li>
                        <li>
                            If someone shares content created by us will face an
                            F.I.R for copyright infrengement case under Section
                            55 of The Copyright Act, 1957
                        </li>
                        <li>
                            If someone is using our resources without
                            subscription/charges may also face cosequences
                        </li>
                    </ul>
                </div>

                <h1 class="text-lg font-semibold mt-6">Privacy Policy</h1>
                <div class="my-4 text-gray-600 m-2">
                    You must read privacy policy and opt in for using platform
                    only if you agree to it.
                </div>

                <h1 class="text-lg font-semibold mt-6">
                    Changes to Terms and Conditions and Validity
                </h1>
                <div class="my-4 text-gray-600 m-2">
                    These terms and conditions were published on March 1, 2022
                    and replaced with immediate effect the terms and conditions
                    previously published.
                </div>
            </div>
        </>
    );
};

export default TermsAndConditions;
