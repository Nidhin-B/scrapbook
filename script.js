/* ========================================
   SCRAPBOOK — SIMPLE PAGE MOTION
======================================== */

document.addEventListener("DOMContentLoaded", () => {

    const body = document.body;

    const reducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;


    /* ----------------------------------------
       PAGE ENTRANCE
    ---------------------------------------- */

    if (!reducedMotion) {

        body.classList.add("motion-enabled");

        requestAnimationFrame(() => {
            body.classList.add("page-ready");
        });

    }


    /* ----------------------------------------
       SAME-SITE LINKS
       NO ARTIFICIAL DELAY
    ---------------------------------------- */

    const links =
        document.querySelectorAll(
            "a[href]"
        );

    links.forEach(link => {

        link.addEventListener("click", event => {

            const href =
                link.getAttribute("href");

            if (!href) return;

            /* Don't interfere with anchors */
            if (href.startsWith("#")) return;

            /* Don't interfere with downloads */
            if (link.hasAttribute("download")) return;

            /* Don't interfere with new tabs */
            if (link.target === "_blank") return;


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


            /* External website */
            if (
                destination.origin !==
                window.location.origin
            ) {

                return;

            }


            /* Same exact page */
            if (
                destination.href ===
                window.location.href
            ) {

                return;

            }


            /*
             * Let the browser navigate normally.
             *
             * No 760ms timeout.
             * No duplicate listeners.
             * No fake loading screen.
             */

        });

    });


    /* ----------------------------------------
       BACK / FORWARD CACHE
    ---------------------------------------- */

    window.addEventListener(
        "pageshow",
        () => {

            body.classList.remove(
                "page-leaving"
            );

            if (!reducedMotion) {

                body.classList.remove(
                    "page-ready"
                );

                requestAnimationFrame(() => {

                    body.classList.add(
                        "page-ready"
                    );

                });

            }

        }
    );

});