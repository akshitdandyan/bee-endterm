export const injectPdfjsIfNotPresent = () => {
    return new Promise((resolve, reject) => {
        try {
            const pdfJsScriptElementExists = document.querySelector(
                "script[src='https://mozilla.github.io/pdf.js/build/pdf.js']"
            );
            if (pdfJsScriptElementExists) {
                resolve("pdfjs already present");
                return;
            }

            const pdfJsScriptElement = document.createElement("script");
            pdfJsScriptElement.src =
                "https://mozilla.github.io/pdf.js/build/pdf.js";
            pdfJsScriptElement.onload = () => {
                resolve("pdfjs injected");
            };
            pdfJsScriptElement.onerror = (error) => {
                reject(error);
            };
            document.body.appendChild(pdfJsScriptElement);
        } catch (error) {
            console.log("[injectPdfjsIfNotPresent] error", error);
            reject(error);
        }
    });
};
