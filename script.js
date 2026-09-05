/* ========================================
   SCRAPBOOK — FAST PAGE MOTION
======================================== */

document.addEventListener("DOMContentLoaded", () => {

    const body = document.body;

    const reducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;


    /* ========================================
       PAGE ENTRANCE
    ======================================== */

    if (!reducedMotion) {

        body.classList.add(
            "motion-enabled"
        );

        requestAnimationFrame(() => {

            body.classList.add(
                "page-ready"
            );

        });

    }


    /* ========================================
       NAVIGATION
       
       IMPORTANT:
       There is NO artificial delay here.
       The browser navigates immediately.
    ======================================== */

    const links =
        document.querySelectorAll(
            "a[href]"
        );

    links.forEach(link => {

        link.addEventListener(
            "click",
            event => {

                const href =
                    link.getAttribute("href");

                if (!href) return;


                /* Anchor links */

                if (
                    href.startsWith("#")
                ) {
                    return;
                }


                /* Downloads */

                if (
                    link.hasAttribute(
                        "download"
                    )
                ) {
                    return;
                }


                /* New tabs */

                if (
                    link.target === "_blank"
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


                /* External links */

                if (
                    destination.origin !==
                    window.location.origin
                ) {
                    return;
                }


                /* Same page */

                if (
                    destination.href ===
                    window.location.href
                ) {
                    return;
                }


                /*
                 * DO NOTHING.
                 *
                 * We intentionally allow the
                 * browser to navigate normally.
                 *
                 * This is what removes the huge
                 * artificial delay.
                 */

            }
        );

    });


    /* ========================================
       BACK / FORWARD CACHE
    ======================================== */

    window.addEventListener(
        "pageshow",
        () => {

            body.classList.remove(
                "page-ready"
            );


            if (!reducedMotion) {

                requestAnimationFrame(() => {

                    body.classList.add(
                        "page-ready"
                    );

                });

            }

        }
    );

});