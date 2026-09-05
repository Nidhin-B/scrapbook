/* ========================================
   SCRAPBOOK — PAGE MOTION
======================================== */

document.addEventListener("DOMContentLoaded", () => {

    const body = document.body;

    const reducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;


    /*
       Tell CSS that JavaScript is active.
       This allows entrance animations to begin
       underneath the page transition.
    */

    body.classList.add("motion-enabled");


    /*
       Give the browser one paint before beginning
       the entrance.

       This is important.

       The new page is already being animated while
       the page transition is still revealing it.
    */

    requestAnimationFrame(() => {

        requestAnimationFrame(() => {

            body.classList.add("page-ready");

        });

    });


    /*
       ========================================
       INTERNAL LINK HANDLING
       ========================================
    */

    const links =
        document.querySelectorAll(
            "a[href]"
        );


    links.forEach(link => {

        link.addEventListener("click", event => {

            const href =
                link.getAttribute("href");


            if (!href) {
                return;
            }


            /*
               Don't interfere with anchors.
            */

            if (href.startsWith("#")) {
                return;
            }


            /*
               Don't interfere with downloads.
            */

            if (
                link.hasAttribute("download")
            ) {
                return;
            }


            /*
               Don't interfere with new tabs.
            */

            if (
                link.target === "_blank"
            ) {
                return;
            }


            /*
               Convert relative URL into an actual URL.
            */

            let destination;

            try {

                destination =
                    new URL(
                        href,
                        window.location.href
                    );

            } catch {
                return;
            }


            /*
               External websites should behave normally.
            */

            if (
                destination.origin !==
                window.location.origin
            ) {
                return;
            }


            /*
               Same-page hash links should behave normally.
            */

            if (
                destination.pathname ===
                    window.location.pathname
                &&
                destination.hash
            ) {
                return;
            }


            /*
               Don't animate a link to the exact page
               we're already on.
            */

            if (
                destination.href ===
                window.location.href
            ) {
                return;
            }


            /*
               Reduced-motion users get instant navigation.
            */

            if (reducedMotion) {
                return;
            }


            /*
               Stop multiple clicks.
            */

            if (
                body.classList.contains(
                    "page-leaving"
                )
            ) {
                event.preventDefault();
                return;
            }


            event.preventDefault();


            /*
               Start the outgoing page cover.
            */

            body.classList.remove(
                "page-ready"
            );

            body.classList.add(
                "page-leaving"
            );


            /*
               The cover gets time to reach the top
               before the browser changes documents.
            */

            setTimeout(() => {

                window.location.href =
                    destination.href;

            }, 760);

        });

    });


    /*
       ========================================
       BROWSER BACK / FORWARD
       ========================================

       When a page is restored from browser cache,
       make sure it isn't left in its old state.
    */

    window.addEventListener(
        "pageshow",
        event => {

            body.classList.remove(
                "page-leaving"
            );


            /*
               Re-run the entrance when the browser
               restores the page from bfcache.
            */

            if (event.persisted) {

                body.classList.remove(
                    "page-ready"
                );


                requestAnimationFrame(() => {

                    requestAnimationFrame(() => {

                        body.classList.add(
                            "page-ready"
                        );

                    });

                });

            }

        }
    );


    /*
       ========================================
       FALLBACK
       ========================================

       For browsers without cross-document
       View Transitions.
    */

    const supportsViewTransitions =
        "startViewTransition" in document;


    if (
        !supportsViewTransitions &&
        !reducedMotion
    ) {

        const cover =
            document.createElement("div");


        cover.className =
            "fallback-cover";


        document.body.appendChild(
            cover
        );


        /*
           Reveal the current page.
        */

        requestAnimationFrame(() => {

            requestAnimationFrame(() => {

                cover.classList.add("hide");

            });

        });


        /*
           Fallback navigation.
        */

        links.forEach(link => {

            link.addEventListener(
                "click",
                event => {

                    const href =
                        link.getAttribute("href");


                    if (!href) {
                        return;
                    }


                    if (
                        href.startsWith("#") ||
                        link.target === "_blank" ||
                        link.hasAttribute("download")
                    ) {
                        return;
                    }


                    let destination;

                    try {

                        destination =
                            new URL(
                                href,
                                window.location.href
                            );

                    } catch {
                        return;
                    }


                    if (
                        destination.origin !==
                        window.location.origin
                    ) {
                        return;
                    }


                    event.preventDefault();


                    cover.classList.remove(
                        "hide"
                    );


                    setTimeout(() => {

                        window.location.href =
                            destination.href;

                    }, 760);

                }
            );

        });

    }

});