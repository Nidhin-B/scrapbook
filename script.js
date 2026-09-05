/* ========================================
   SCRAPBOOK — PAGE MOTION SYSTEM
======================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* ====================================
       CREATE TRANSITION LAYER
    ==================================== */

    const transition = document.createElement("div");

    transition.className = "page-transition";

    document.body.appendChild(transition);


    /* ====================================
       PAGE ENTRANCE
    ==================================== */

    requestAnimationFrame(() => {

        document.body.classList.add("page-ready");

    });


    /* ====================================
       PAGE LINKS
    ==================================== */

    const links = document.querySelectorAll("a");

    links.forEach(link => {

        link.addEventListener("click", event => {

            const href = link.getAttribute("href");

            /* Ignore invalid links */

            if (!href || href === "#") {
                return;
            }


            /* Ignore anchors */

            if (href.startsWith("#")) {
                return;
            }


            /* Ignore external websites */

            if (
                href.startsWith("http://") ||
                href.startsWith("https://") ||
                href.startsWith("//")
            ) {
                return;
            }


            /* Ignore downloads */

            if (
                link.hasAttribute("download")
            ) {
                return;
            }


            /* Ignore new tabs */

            if (
                link.target === "_blank"
            ) {
                return;
            }


            /* Prevent multiple transitions */

            if (
                document.body.classList.contains(
                    "page-leaving"
                )
            ) {
                return;
            }


            event.preventDefault();


            /* =================================
               START PAGE TRANSITION
            ================================= */

            document.body.classList.remove(
                "page-ready"
            );

            document.body.classList.add(
                "page-leaving"
            );


            /* =================================
               CHANGE PAGE
            ================================= */

            setTimeout(() => {

                window.location.href = href;

            }, 650);

        });

    });


    /* ====================================
       BACK/FORWARD BROWSER SUPPORT
    ==================================== */

    window.addEventListener(
        "pageshow",
        () => {

            document.body.classList.remove(
                "page-leaving"
            );

        }
    );

});