/**
 * =========================================================
 * PORTFOLIO JAVASCRIPT ENGINE
 * Theme: Black + Purple
 * =========================================================
 */

document.addEventListener("DOMContentLoaded", () => {

    // 1. Mobile Menu
    initMobileMenu();

    // 2. Navbar + Scroll Spy
    initScrollSpy();

    // 3. Scroll Reveal
    initScrollAnimations();

    // 4. Skill Bars + Counters
    initSkillAndCounterAnimations();

    // 5. Back To Top
    initBackToTop();

    // 6. Django Contact Form
    initContactForm();

    // 7. Footer Year
    initDynamicYear();

});


/* =========================================================
   1. MOBILE MENU TOGGLE
========================================================= */

function initMobileMenu() {

    const menuToggle = document.getElementById("menu-toggle");
    const navMenu = document.getElementById("nav-menu");

    if (!menuToggle || !navMenu) {
        return;
    }

    // Open / close menu
    menuToggle.addEventListener("click", function (event) {

        event.stopPropagation();

        navMenu.classList.toggle("show");

        const isOpen =
            navMenu.classList.contains("show");

        menuToggle.innerHTML = isOpen
            ? '<i class="fa-solid fa-xmark"></i>'
            : '<i class="fa-solid fa-bars"></i>';

    });


    // Close when clicking navigation link
    navMenu.querySelectorAll("a").forEach(function (link) {

        link.addEventListener("click", function () {

            navMenu.classList.remove("show");

            menuToggle.innerHTML =
                '<i class="fa-solid fa-bars"></i>';

        });

    });


    // Close when clicking outside
    document.addEventListener("click", function (event) {

        if (
            !navMenu.contains(event.target) &&
            !menuToggle.contains(event.target)
        ) {

            navMenu.classList.remove("show");

            menuToggle.innerHTML =
                '<i class="fa-solid fa-bars"></i>';

        }

    });

}


/* =========================================================
   2. NAVBAR SCROLL EFFECT & SCROLL SPY
========================================================= */

function initScrollSpy() {

    const navbar =
        document.querySelector(".navbar");

    const sections =
        document.querySelectorAll("section[id]");

    const navLinks =
        document.querySelectorAll(".navbar nav a");


    window.addEventListener("scroll", function () {

        const scrollY =
            window.pageYOffset;


        /* Navbar appearance */

        if (navbar) {

            if (scrollY > 50) {

                navbar.style.borderBottom =
                    "1px solid rgba(155, 124, 255, 0.28)";

                navbar.style.background =
                    "rgba(3, 3, 8, 0.96)";

                navbar.style.boxShadow =
                    "0 15px 50px rgba(0,0,0,0.45)";

            } else {

                navbar.style.borderBottom =
                    "1px solid rgba(255,255,255,0.06)";

                navbar.style.background =
                    "rgba(3, 3, 8, 0.92)";

                navbar.style.boxShadow =
                    "0 15px 50px rgba(0,0,0,0.30)";

            }

        }


        /* Scroll spy */

        sections.forEach(function (section) {

            const sectionHeight =
                section.offsetHeight;

            const sectionTop =
                section.offsetTop - 120;

            const sectionId =
                section.getAttribute("id");


            if (
                scrollY >= sectionTop &&
                scrollY < sectionTop + sectionHeight
            ) {

                navLinks.forEach(function (link) {

                    link.classList.remove("active");

                    if (
                        link.getAttribute("href") ===
                        `#${sectionId}`
                    ) {

                        link.classList.add("active");

                    }

                });

            }

        });

    });

}


/* =========================================================
   3. SCROLL REVEAL ANIMATIONS
========================================================= */

function initScrollAnimations() {

    const animatedElements =
        document.querySelectorAll(
            ".skill-card, " +
            ".coding-card, " +
            ".project-card, " +
            ".cert-card, " +
            ".timeline-item, " +
            ".about-grid, " +
            ".stats"
        );


    if (!animatedElements.length) {
        return;
    }


    // Fallback for browsers without IntersectionObserver
    if (!("IntersectionObserver" in window)) {

        animatedElements.forEach(function (element) {

            element.classList.add("show");

        });

        return;
    }


    const observerOptions = {

        threshold: 0.12,

        rootMargin:
            "0px 0px -40px 0px"

    };


    const observer =
        new IntersectionObserver(
            function (entries, obs) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("show");

                        obs.unobserve(
                            entry.target
                        );

                    }

                });

            },
            observerOptions
        );


    animatedElements.forEach(
        function (element) {

            observer.observe(element);

        }
    );

}


/* =========================================================
   4. SKILL BARS & NUMBER COUNTERS
========================================================= */

function initSkillAndCounterAnimations() {


    /* =========================
       SKILL PROGRESS BARS
    ========================= */

    const skillsSection =
        document.getElementById("skills");


    if (skillsSection) {

        const progressBars =
            skillsSection.querySelectorAll(
                ".progress span"
            );


        if (
            progressBars.length &&
            "IntersectionObserver" in window
        ) {

            const progressObserver =
                new IntersectionObserver(
                    function (entries, obs) {

                        entries.forEach(
                            function (entry) {

                                if (
                                    entry.isIntersecting
                                ) {

                                    progressBars.forEach(
                                        function (bar) {

                                            const targetWidth =
                                                bar.style.width;

                                            bar.style.width =
                                                "0%";

                                            setTimeout(
                                                function () {

                                                    bar.style.width =
                                                        targetWidth;

                                                },
                                                100
                                            );

                                        }
                                    );


                                    obs.unobserve(
                                        entry.target
                                    );

                                }

                            }
                        );

                    },
                    {
                        threshold: 0.2
                    }
                );


            progressObserver.observe(
                skillsSection
            );

        }

    }


    /* =========================
       STAT COUNTERS
    ========================= */

    const statCounters =
        document.querySelectorAll(
            ".stat h2"
        );


    if (!statCounters.length) {
        return;
    }


    const statsSection =
        document.querySelector(".stats");


    if (!statsSection) {
        return;
    }


    if (!("IntersectionObserver" in window)) {
        return;
    }


    const countObserver =
        new IntersectionObserver(
            function (entries, obs) {

                entries.forEach(
                    function (entry) {

                        if (
                            !entry.isIntersecting
                        ) {
                            return;
                        }


                        statCounters.forEach(
                            function (counter) {

                                const rawText =
                                    counter.innerText;

                                const targetNumber =
                                    parseInt(
                                        rawText.replace(
                                            /\D/g,
                                            ""
                                        ),
                                        10
                                    );

                                const hasPlus =
                                    rawText.includes("+");


                                if (
                                    isNaN(targetNumber)
                                ) {
                                    return;
                                }


                                let current = 0;

                                const duration = 1200;

                                const stepTime = 20;

                                const increment =
                                    Math.max(
                                        1,
                                        Math.ceil(
                                            targetNumber /
                                            (
                                                duration /
                                                stepTime
                                            )
                                        )
                                    );


                                const timer =
                                    setInterval(
                                        function () {

                                            current +=
                                                increment;


                                            if (
                                                current >=
                                                targetNumber
                                            ) {

                                                counter.innerText =
                                                    `${targetNumber}${hasPlus ? "+" : ""}`;

                                                clearInterval(
                                                    timer
                                                );

                                            } else {

                                                counter.innerText =
                                                    `${current}${hasPlus ? "+" : ""}`;

                                            }

                                        },
                                        stepTime
                                    );

                            }
                        );


                        obs.unobserve(
                            entry.target
                        );

                    }
                );

            },
            {
                threshold: 0.3
            }
        );


    countObserver.observe(
        statsSection
    );

}


/* =========================================================
   5. BACK TO TOP BUTTON
========================================================= */

function initBackToTop() {

    const scrollTopBtn =
        document.getElementById(
            "scrollTopBtn"
        );


    if (!scrollTopBtn) {
        return;
    }


    window.addEventListener(
        "scroll",
        function () {

            if (
                window.scrollY > 400
            ) {

                scrollTopBtn.classList.add(
                    "show-btn"
                );

            } else {

                scrollTopBtn.classList.remove(
                    "show-btn"
                );

            }

        }
    );


    scrollTopBtn.addEventListener(
        "click",
        function (event) {

            event.preventDefault();

            window.scrollTo({

                top: 0,

                behavior: "smooth"

            });

        }
    );

}


/* =========================================================
   6. DJANGO CONTACT FORM
========================================================= */

function initContactForm() {

    const contactForm =
        document.getElementById(
            "contact-form"
        );

    const formMessage =
        document.getElementById(
            "form-message"
        );


    if (!contactForm) {
        return;
    }


    contactForm.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();


            const submitButton =
                contactForm.querySelector(
                    "button[type='submit']"
                );


            if (!submitButton) {
                return;
            }


            const originalText =
                submitButton.innerHTML;


            submitButton.disabled =
                true;


            submitButton.innerHTML = `
                <i class="fa-solid fa-spinner fa-spin"></i>
                Sending...
            `;


            if (formMessage) {

                formMessage.textContent =
                    "";

                formMessage.style.color =
                    "";

            }


            try {

                const response =
                    await fetch(
                        contactForm.action,
                        {
                            method: "POST",

                            body:
                                new FormData(
                                    contactForm
                                ),

                            headers: {
                                "X-Requested-With":
                                    "XMLHttpRequest",

                                "Accept":
                                    "application/json"
                            }
                        }
                    );


                let data;


                try {

                    data =
                        await response.json();

                } catch (jsonError) {

                    data = {

                        status: "error",

                        message:
                            "Unexpected server response."

                    };

                }


                if (
                    response.ok &&
                    data.status ===
                    "success"
                ) {

                    if (formMessage) {

                        formMessage.textContent =
                            "✓ Your message has been sent successfully!";

                        formMessage.style.color =
                            "#9b7cff";

                    }


                    contactForm.reset();


                } else {

                    if (formMessage) {

                        formMessage.textContent =
                            data.message ||
                            "Unable to send your message.";

                        formMessage.style.color =
                            "#ff6b81";

                    }

                }


            } catch (error) {

                console.error(
                    "Contact form error:",
                    error
                );


                if (formMessage) {

                    formMessage.textContent =
                        "Something went wrong. Please try again.";

                    formMessage.style.color =
                        "#ff6b81";

                }


            } finally {

                submitButton.disabled =
                    false;

                submitButton.innerHTML =
                    originalText;

            }

        }
    );

}


/* =========================================================
   7. DYNAMIC FOOTER YEAR
========================================================= */

function initDynamicYear() {

    const footerParagraph =
        document.querySelector(
            "footer p"
        );


    if (!footerParagraph) {
        return;
    }


    const currentYear =
        new Date().getFullYear();


    footerParagraph.innerHTML =
        footerParagraph.innerHTML.replace(
            /\b\d{4}\b/,
            currentYear
        );

}