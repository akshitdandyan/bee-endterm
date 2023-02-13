/* @refresh reload */
import "./index.css";
import { render } from "solid-js/web";

import App from "./App";

/**
 * Whale, majestic creature of the sea,
With your great size and grace you roam free.
Your body glides through the waters with ease,
A wonder of nature, a true masterpiece.

With your long, slender tail and wide, round head,
You swim through the ocean, your home and bed.
You are a being of power, a creature of might,
A symbol of strength and beauty, a true delight.

But as you roam, please do not forget,
To respect the earth, and all that you met.
For we are all connected, in this great blue sphere,
Whale, please help us to live in harmony, dear.
 */
console.log(
    "%c🐳A Whale",
    "background: blue; color: white; font-size: x-large"
);

console.log(
    "%cWhale, majestic creature of the sea, \nWith your great size and grace you roam free.\nYour body glides through the waters with ease,\nA wonder of nature, a true masterpiece.\n",
    "background: blue; color: white; font-size: small"
);

console.log(
    "%cWith your long, slender tail and wide, round head,\nYou swim through the ocean, your home and bed.\nYou are a being of power, a creature of might,\nA symbol of strength and beauty, a true delight.\n",
    "background: blue; color: white; font-size: small"
);

console.log(
    "%cBut as you roam, please do not forget,\nTo respect the earth, and all that you met.\nFor we are all connected, in this great blue sphere,\nWhale, please help us to live in harmony, dear.\n",
    "background: blue; color: white; font-size: small"
);

// console.log = (...data: any[]) => {
//     if ((window as any).debug) {
//         console.info(data);
//     } else {
//         console.info("Watch: ${", new Date().getTime(), "}");
//     }
// };

render(() => <App />, document.getElementsByTagName("whale")[0] as HTMLElement);
