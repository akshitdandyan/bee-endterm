import { Router, Routes, Route } from "solid-app-router";
import SignUp from "./auth/SignUp";
import Announcements from "./dashboard/Announcements";
import Dashboard from "./dashboard/Dashboard";
import Events from "./dashboard/Events";
import Subjects from "./dashboard/Subjects";
import Overview from "./dashboard/Overview";
import Timetable from "./dashboard/Timetable";
import Downloads from "./dashboard/Downloads";
import Profile from "./dashboard/Profile";
import Home from "./Home";
import Files from "./dashboard/Files";
import About from "./About";
import NotFound from "./NotFound";
import PrivacyPolicy from "./PrivacyPolicy";
import TermsAndConditions from "./TermsAndConditions";
import ResetPassword from "./auth/ResetPassword";

const Pages = () => {
    return (
        <div id="app" class="">
            <Router>
                <Routes>
                    <Route path={"/"} element={<Home />} />
                    <Route path={"/about"} element={<About />} />
                    <Route
                        path={["/auth/signup", "/auth/login"]}
                        element={<SignUp />}
                    />
                    <Route
                        path={"/auth/reset-password/:token"}
                        element={<ResetPassword />}
                    />
                    <Route path="/dashboard" element={<Dashboard />}>
                        <Route path="/" element={<Overview />} />

                        <Route path="/resources" element={<Subjects />} />
                        <Route
                            path="/resources/:resourceId"
                            element={<Files />}
                        />
                        <Route
                            path="/announcements"
                            element={<Announcements />}
                        />
                        <Route path="/events" element={<Events />} />
                        <Route path="/timetable" element={<Timetable />} />
                        <Route path="/downloads" element={<Downloads />} />
                        <Route path="/me" element={<Profile />} />

                        <Route path="*" element={<NotFound />} />
                    </Route>
                    <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                    <Route
                        path="/terms-and-conditions"
                        element={<TermsAndConditions />}
                    />
                </Routes>
            </Router>
        </div>
    );
};

export default Pages;
