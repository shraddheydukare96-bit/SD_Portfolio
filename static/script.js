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

/* =========================================================
   PORTFOLIO GAME ZONE
   PAPER LEAK 2026
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const gameZoneButton =
        document.getElementById("gameZoneButton");

    const closeGameButton =
        document.getElementById("closeGameButton");

    const profileView =
        document.getElementById("profileView");

    const portfolioGame =
        document.getElementById("portfolioGame");

    const game =
        document.getElementById("paperLeakGame");

    const paper =
        document.getElementById("gamePaper");

    const scoreText =
        document.getElementById("gameScore");

    const bestScoreText =
        document.getElementById("gameBestScore");

    const message =
        document.getElementById("gameMessage");

    const messageTitle =
        document.getElementById("gameMessageTitle");

    const messageText =
        document.getElementById("gameMessageText");

    const startButton =
        document.getElementById("gameStartButton");

    const levelDisplay =
        document.getElementById("gameLevelDisplay");

    const levelButtons =
        document.querySelectorAll(
            ".game-level-btn"
        );


    /* =========================================
       GAME VARIABLES
    ========================================= */

    let paperY = 150;

    let velocity = 0;

    let selectedLevel = "easy";

    let gravity = 0.20;

    let flapPower = -6;

    let pipeSpeed = 2.2;

    let pipeGap = 150;

    let moneyPipes = [];

    let score = 0;

    let bestScore =
        Number(
            localStorage.getItem(
                "portfolioPaperLeakBest"
            )
        ) || 0;

    let gameRunning = false;

    let pipeTimer = 0;

    let lastTime = 0;


    bestScoreText.textContent =
        bestScore;


    /* =========================================
       LEVEL SETTINGS
    ========================================= */

    const levels = {

        easy: {

            gravity: 0.20,

            flapPower: -6,

            pipeSpeed: 2.2,

            pipeGap: 150,

            label: "🟢 EASY"

        },


        normal: {

            gravity: 0.25,

            flapPower: -6.5,

            pipeSpeed: 2.6,

            pipeGap: 138,

            label: "🟡 NORMAL"

        },


        hard: {

            gravity: 0.34,

            flapPower: -7.2,

            pipeSpeed: 3.3,

            pipeGap: 112,

            label: "🔴 HARD"

        }

    };


    /* =========================================
       OPEN GAME ZONE
    ========================================= */

    gameZoneButton.addEventListener(
        "click",
        function (event) {

            event.preventDefault();

            event.stopPropagation();


            profileView.classList.add(
                "game-hidden"
            );


            portfolioGame.classList.add(
                "active"
            );


            /*
                Show game menu
            */

            resetGame();


            message.style.display =
                "flex";

        }
    );


    /* =========================================
       CLOSE GAME
    ========================================= */

    closeGameButton.addEventListener(
        "click",
        function (event) {

            event.preventDefault();

            event.stopPropagation();


            stopGame();


            portfolioGame.classList.remove(
                "active"
            );


            profileView.classList.remove(
                "game-hidden"
            );

        }
    );


    /* =========================================
       LEVEL SELECTION
    ========================================= */

    levelButtons.forEach(button => {

        button.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                event.stopPropagation();


                if (gameRunning) {
                    return;
                }


                selectedLevel =
                    this.dataset.level;


                levelButtons.forEach(
                    btn => {

                        btn.classList.remove(
                            "selected"
                        );

                    }
                );


                this.classList.add(
                    "selected"
                );


                levelDisplay.textContent =
                    levels[
                        selectedLevel
                    ].label;

            }
        );

    });


    /* =========================================
       APPLY LEVEL
    ========================================= */

    function applyLevelSettings() {

        const settings =
            levels[selectedLevel];


        gravity =
            settings.gravity;


        flapPower =
            settings.flapPower;


        pipeSpeed =
            settings.pipeSpeed;


        pipeGap =
            settings.pipeGap;


        levelDisplay.textContent =
            settings.label;

    }


    /* =========================================
       RESET GAME
    ========================================= */

    function resetGame() {

        stopGame();


        moneyPipes.forEach(
            pipe => {

                pipe.top.remove();

                pipe.bottom.remove();

            }
        );


        moneyPipes = [];


        paperY = 150;

        velocity = 0;

        score = 0;

        pipeTimer = 0;

        scoreText.textContent =
            "0";


        messageTitle.textContent =
            "📄 PAPER LEAK!";


        messageText.textContent =
            "The exam hasn't started yet, but the paper is already trying to escape. 😂";


        startButton.textContent =
            "Start the Escape";


        applyLevelSettings();

    }


    /* =========================================
       START GAME
    ========================================= */

    function startGame() {

        applyLevelSettings();


        moneyPipes.forEach(
            pipe => {

                pipe.top.remove();

                pipe.bottom.remove();

            }
        );


        moneyPipes = [];


        paperY = 150;

        velocity = 0;

        score = 0;

        pipeTimer = 0;

        gameRunning = true;


        scoreText.textContent =
            "0";


        message.style.display =
            "none";


        lastTime =
            performance.now();


        requestAnimationFrame(
            gameLoop
        );

    }


    /* =========================================
       STOP GAME
    ========================================= */

    function stopGame() {

        gameRunning = false;

    }


    /* =========================================
       FLAP
    ========================================= */

    function flap() {

        if (!gameRunning) {
            return;
        }


        velocity =
            flapPower;

    }


    /* =========================================
       CREATE MONEY PIPE
    ========================================= */

    function createMoneyPipe() {

        const gameHeight =
            game.clientHeight;


        const gap =
            pipeGap;


        const minTop =
            40;


        const maxTop =
            gameHeight -
            gap -
            75;


        const topHeight =
            Math.floor(
                Math.random() *
                (maxTop - minTop)
                + minTop
            );


        const bottomHeight =
            gameHeight -
            topHeight -
            gap -
            35;


        /* TOP */

        const top =
            document.createElement(
                "div"
            );


        top.className =
            "portfolio-money-pipe top";


        top.style.height =
            topHeight + "px";


        /* BOTTOM */

        const bottom =
            document.createElement(
                "div"
            );


        bottom.className =
            "portfolio-money-pipe bottom";


        bottom.style.height =
            bottomHeight + "px";


        game.appendChild(top);

        game.appendChild(bottom);


        moneyPipes.push({

            top: top,

            bottom: bottom,

            x:
                game.clientWidth + 55,

            scored: false

        });

    }


    /* =========================================
       COLLISION
    ========================================= */

    function collision(pipe) {

        /*
            Medium paper:

            43px wide
            54px high
        */

        const paperLeft =
            38;


        const paperRight =
            paperLeft + 43;


        const paperTop =
            paperY;


        const paperBottom =
            paperY + 54;


        const pipeLeft =
            pipe.x;


        const pipeRight =
            pipe.x + 48;


        if (
            paperRight > pipeLeft &&
            paperLeft < pipeRight
        ) {


            const topHeight =
                pipe.top.offsetHeight;


            const bottomStart =
                game.clientHeight -
                pipe.bottom.offsetHeight -
                35;


            if (
                paperTop < topHeight ||
                paperBottom > bottomStart
            ) {

                return true;

            }

        }


        return false;

    }


    /* =========================================
       PAPER LEAKED
    ========================================= */

    function endGame() {

        if (!gameRunning) {
            return;
        }


        gameRunning = false;


        /*
            Best score
        */

        if (
            score > bestScore
        ) {

            bestScore =
                score;


            localStorage.setItem(
                "portfolioPaperLeakBest",
                bestScore
            );

        }


        bestScoreText.textContent =
            bestScore;


        /*
            Sarcastic messages
        */

        const jokes = [

            "Paper leaked faster than your preparation. 😂",

            "Congratulations! You escaped the syllabus. 💀",

            "Your paper has officially resigned. 📝",

            "Exam cancelled? No. Paper escaped? YES. 😂",

            "Even the paper knew you weren't ready. 😭",

            "The question paper said: 'I'm out.' 🏃",

            "You studied everything except how to keep the paper safe. 💀",

            "Breaking news: Student loses paper before exam. 😂",

            "At least your paper got more marks than you. 😭",

            "Professor: Where is the paper? Student: Ask the money. 💰",

            "Paper successfully leaked. Career still loading... 😂",

            "You didn't fail the exam. The paper failed you. 💀",

            "The syllabus survived. Your paper didn't. 😂",

            "Your preparation was confidential. So was the paper. 🤫",

            "No cheating detected. Just extremely poor paper management. 😭",

            "Even Google couldn't save this attempt. 💀",

            "The paper saw the syllabus and chose freedom. 😂"

        ];


        const randomJoke =
            jokes[
                Math.floor(
                    Math.random() *
                    jokes.length
                )
            ];


        message.style.display =
            "flex";


        messageTitle.textContent =
            "📄 PAPER LEAKED!";


        messageText.textContent =
            randomJoke;


        startButton.textContent =
            "Leak Another Paper";

    }


    /* =========================================
       GAME LOOP
    ========================================= */

    function gameLoop(time) {

        if (!gameRunning) {
            return;
        }


        const delta =
            Math.min(
                (time - lastTime) / 16.67,
                2
            );


        lastTime =
            time;


        /*
            Paper physics
        */

        velocity +=
            gravity * delta;


        paperY +=
            velocity * delta;


        /*
            Rotation
        */

        const rotation =
            Math.min(
                Math.max(
                    velocity * 4,
                    -20
                ),
                80
            );


        paper.style.top =
            paperY + "px";


        paper.style.transform =
            `rotate(${rotation}deg)`;


        /*
            Ceiling
        */

        if (
            paperY < 0
        ) {

            endGame();

            return;

        }


        /*
            Ground
        */

        if (
            paperY + 54 >
            game.clientHeight - 35
        ) {

            endGame();

            return;

        }


        /*
            Create money
        */

        pipeTimer += delta;


        let spawnRate = 110;


        if (
            selectedLevel === "normal"
        ) {

            spawnRate = 105;

        }


        if (
            selectedLevel === "hard"
        ) {

            spawnRate = 90;

        }


        if (
            pipeTimer > spawnRate
        ) {

            createMoneyPipe();

            pipeTimer = 0;

        }


        /*
            Move money
        */

        moneyPipes.forEach(
            pipe => {


                pipe.x -=
                    pipeSpeed * delta;


                pipe.top.style.left =
                    pipe.x + "px";


                pipe.bottom.style.left =
                    pipe.x + "px";


                /*
                    Score
                */

                if (
                    !pipe.scored &&
                    pipe.x + 48 < 38
                ) {

                    pipe.scored = true;

                    score++;

                    scoreText.textContent =
                        score;

                }


                /*
                    Collision
                */

                if (
                    collision(pipe)
                ) {

                    endGame();

                }

            }
        );


        /*
            Remove old pipes
        */

        moneyPipes =
            moneyPipes.filter(
                pipe => {

                    if (
                        pipe.x < -60
                    ) {

                        pipe.top.remove();

                        pipe.bottom.remove();

                        return false;

                    }

                    return true;

                }
            );


        requestAnimationFrame(
            gameLoop
        );

    }


    /* =========================================
       START BUTTON
    ========================================= */

    startButton.addEventListener(
        "click",
        function (event) {

            event.preventDefault();

            event.stopPropagation();

            startGame();

        }
    );


    /* =========================================
       GAME CLICK
    ========================================= */

    game.addEventListener(
        "click",
        function (event) {

            if (
                event.target.closest(
                    ".game-level-btn"
                )
            ) {

                return;

            }


            if (
                event.target ===
                startButton
            ) {

                return;

            }


            if (
                !gameRunning &&
                message.style.display !== "none"
            ) {

                return;

            }


            flap();

        }
    );


    /* =========================================
       KEYBOARD
    ========================================= */

    document.addEventListener(
        "keydown",
        function (event) {

            /*
                Only respond when
                Game Zone is open
            */

            if (
                !portfolioGame.classList.contains(
                    "active"
                )
            ) {

                return;

            }


            if (
                event.code === "Space"
            ) {

                event.preventDefault();


                if (!gameRunning) {

                    startGame();

                }
                else {

                    flap();

                }

            }

        }
    );


    /* =========================================
       TOUCH
    ========================================= */

    game.addEventListener(
        "touchstart",
        function (event) {

            if (
                event.target.closest(
                    ".game-level-btn"
                )
            ) {

                return;

            }


            if (
                event.target ===
                startButton
            ) {

                return;

            }


            event.preventDefault();


            if (!gameRunning) {

                startGame();

            }
            else {

                flap();

            }

        },
        {
            passive: false
        }
    );


    /* =========================================
       INITIAL
    ========================================= */

    applyLevelSettings();

});