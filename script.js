/* ========================================
   SCRAPBOOK — PAGE MOTION SYSTEM
======================================== */

document.addEventListener("DOMContentLoaded", () => {

    /*
       PAGE ENTRANCE
       Give the browser one frame before
       starting the entrance animation.
    */

    requestAnimationFrame(() => {
        document.body.classList.add("page-ready");
    });


    /*
       PAGE NAVIGATION
    */

    const pageLinks = document.querySelectorAll(
        'a[href$=".html"], a[href*="/"]'
    );


    pageLinks.forEach(link => {

        link.addEventListener("click", (event) => {

            const href = link.getAttribute("href");

            if (!href || href === "#") {
                return;
            }

            /* Don't animate external links */

            if (
                href.startsWith("http") ||
                href.startsWith("//") ||
                link.target === "_blank"
            ) {
                return;
            }

            /* Don't animate same-page anchors */

            if (href.startsWith("#")) {
                return;
            }


            event.preventDefault();


            /*
               Don't allow the user to trigger
               multiple transitions at once.
            */

            if (document.body.classList.contains("page-leaving")) {
                return;
            }


            /*
               Start the outgoing animation.
            */

            document.body.classList.remove("page-ready");

            document.body.classList.add("page-leaving");


            /*
               Wait for the paper transition
               before changing the document.
            */

            setTimeout(() => {
                window.location.href = href;
            }, 650);

        });

    });

});