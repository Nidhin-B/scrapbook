// ========================================
// SCRAPBOOK PAGE TRANSITIONS
// ========================================

document.addEventListener("DOMContentLoaded", () => {

    // Make the page appear when loaded
    document.body.classList.add("page-ready");


    // Handle internal page navigation
    const pageLinks = document.querySelectorAll(
        'a[href$=".html"], a[href*="/"]'
    );


    pageLinks.forEach(link => {

        link.addEventListener("click", (event) => {

            const href = link.getAttribute("href");

            // Ignore empty links
            if (!href || href === "#") {
                return;
            }

            // Ignore external websites
            if (
                href.startsWith("http") ||
                href.startsWith("//") ||
                link.target === "_blank"
            ) {
                return;
            }

            // Ignore same-page anchors
            if (href.startsWith("#")) {
                return;
            }

            event.preventDefault();

            // Start page transition
            document.body.classList.add("page-leaving");


            // Wait for animation before changing page
            setTimeout(() => {
                window.location.href = href;
            }, 480);

        });

    });

});