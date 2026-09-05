/* ========================================
   SCRAPBOOK PAGE TRANSITIONS
======================================== */

document.addEventListener("DOMContentLoaded", () => {

    /*
       Small entrance sequence.

       The View Transition API handles the actual
       cross-page paper-like movement when supported.
    */

    requestAnimationFrame(() => {
        document.body.classList.add("page-ready");
    });


    /*
       Fallback for browsers that don't support
       cross-document View Transitions.
    */

    const supportsViewTransitions =
        "startViewTransition" in document;


    if (!supportsViewTransitions) {

        const cover = document.createElement("div");

        cover.className = "fallback-cover";

        document.body.appendChild(cover);

        requestAnimationFrame(() => {
            cover.classList.add("hide");
        });


        const links = document.querySelectorAll("a");

        links.forEach(link => {

            link.addEventListener("click", event => {

                const href = link.getAttribute("href");

                if (!href || href === "#") return;

                if (
                    href.startsWith("http://") ||
                    href.startsWith("https://") ||
                    href.startsWith("//") ||
                    href.startsWith("#") ||
                    link.target === "_blank" ||
                    link.hasAttribute("download")
                ) {
                    return;
                }

                event.preventDefault();

                cover.classList.remove("hide");

                setTimeout(() => {
                    window.location.href = href;
                }, 650);

            });

        });

    }


    /*
       Browser back / forward.

       This prevents the page from getting stuck
       in its outgoing state when restored from cache.
    */

    window.addEventListener("pageshow", () => {

        document.body.classList.remove("page-leaving");

        requestAnimationFrame(() => {
            document.body.classList.add("page-ready");
        });

    });

});