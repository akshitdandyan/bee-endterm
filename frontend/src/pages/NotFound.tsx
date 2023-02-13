import { useNavigate } from "solid-app-router";
import { onMount } from "solid-js";

const NotFound = () => {
    const navigate = useNavigate();
    onMount(() => {
        navigate("/dashboard");
    });
    return <div class="">😸</div>;
};

export default NotFound;
