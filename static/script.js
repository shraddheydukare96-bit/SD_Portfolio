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
/* =========================================================
   PORTFOLIO GAME ZONE
   PAPER LEAK 2026
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       ELEMENTS
    ===================================================== */

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
        
        const gameBGM = 
    document.getElementById("gameBGM");

    const gameMuteButton = 
    document.getElementById("gameMuteButton");

    const levelDisplay =
        document.getElementById("gameLevelDisplay");

    const levelButtons =
        document.querySelectorAll(
            ".game-level-btn"
        );


    /* =====================================================
       SAFETY CHECK
       Prevent errors if Game Zone HTML is missing
    ===================================================== */

    if (
        !gameZoneButton ||
        !closeGameButton ||
        !profileView ||
        !portfolioGame ||
        !game ||
        !paper
    ) {
        return;
    }

/* =====================================================
       GAME Audio mute unmute
    ===================================================== */

  if (gameMuteButton && gameBGM) {

    gameMuteButton.addEventListener(
        "click",
        function (event) {

            event.preventDefault();
            event.stopPropagation();

            gameBGM.muted = !gameBGM.muted;

            if (gameBGM.muted) {

                gameMuteButton.textContent = "🔇";

                gameMuteButton.setAttribute(
                    "aria-label",
                    "Unmute game music"
                );

            } else {

                gameMuteButton.textContent = "🔊";

                gameMuteButton.setAttribute(
                    "aria-label",
                    "Mute game music"
                );

                /*
                   If music was stopped for any reason,
                   start it again when user unmutes.
                */

                if (gameRunning) {

                    gameBGM.play().catch(function (error) {
                        console.log(
                            "Game BGM could not resume:",
                            error
                        );
                    });

                }

            }

        }
    );

}

    /* =====================================================
       GAME VARIABLES
    ===================================================== */

    /*
       Medium-sized paper
    */

    const PAPER_WIDTH = 46;

    const PAPER_HEIGHT = 58;


    /*
       Paper horizontal position
    */

    const PAPER_X = 70;


    /*
       Ground height
    */

    const GROUND_HEIGHT = 40;


    /*
       Current paper position
    */

    let paperY = 220;


    /*
       Vertical movement
    */

    let velocity = 0;


    /*
       Current difficulty
    */

    let selectedLevel = "easy";


    /*
       Physics
    */

    let gravity = 0.12;

    let flapPower = -5.2;


    /*
       Money movement
    */

    let pipeSpeed = 1.8;


    /*
       Gap between money stacks
    */

    let pipeGap = 170;


    /*
       Money pipes
    */

    let moneyPipes = [];


    /*
       Score
    */

    let score = 0;


    /*
       Best score
    */

    let bestScore =
        Number(
            localStorage.getItem(
                "portfolioPaperLeakBest"
            )
        ) || 0;


    /*
       Game state
    */

    let gameRunning = false;


    /*
       Pipe creation timer
    */

    let pipeTimer = 0;


    /*
       Animation timing
    */

    let lastTime = 0;


    /*
       Prevent duplicate game loops
    */

    let animationFrame = null;


    /*
       Display best score
    */

    if (bestScoreText) {

        bestScoreText.textContent =
            bestScore;

    }


    /* =====================================================
       LEVEL SETTINGS
    ===================================================== */

    const levels = {

        /* ================================================
           EASY
        ================================================= */

        easy: {

            gravity: 0.12,

            flapPower: -5.2,

            pipeSpeed: 1.8,

            pipeGap: 170,

            label: "🟢 EASY"

        },


        /* ================================================
           NORMAL
        ================================================= */

        normal: {

            gravity: 0.16,

            flapPower: -5.8,

            pipeSpeed: 2.1,

            pipeGap: 155,

            label: "🟡 NORMAL"

        },


        /* ================================================
           HARD
        ================================================= */

        hard: {

            gravity: 0.23,

            flapPower: -6.5,

            pipeSpeed: 2.7,

            pipeGap: 125,

            label: "🔴 HARD"

        }

    };


    /* =====================================================
       APPLY LEVEL SETTINGS
    ===================================================== */

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


        if (levelDisplay) {

            levelDisplay.textContent =
                settings.label;

        }

    }


    /* =====================================================
       OPEN GAME ZONE
    ===================================================== */

    gameZoneButton.addEventListener(
        "click",
        function (event) {

            event.preventDefault();

            event.stopPropagation();


            /*
               Hide profile picture
            */

            profileView.classList.add(
                "game-hidden"
            );


            /*
               Show game
            */

            portfolioGame.classList.add(
                "active"
            );


            /*
               Reset game
            */

            resetGame();


            /*
               Show start screen
            */

            message.style.display =
                "flex";

        }
    );


    /* =====================================================
       CLOSE GAME
    ===================================================== */

    closeGameButton.addEventListener(
        "click",
        function (event) {
            if (gameBGM) {
    gameBGM.pause();
    gameBGM.currentTime = 0;
}

            event.preventDefault();

            event.stopPropagation();


            /*
               Stop game
            */

            stopGame();


            /*
               Remove old money
            */

            clearMoneyPipes();


            /*
               Hide game
            */

            portfolioGame.classList.remove(
                "active"
            );


            /*
               Show profile picture
            */

            profileView.classList.remove(
                "game-hidden"
            );

        }
    );


    /* =====================================================
       LEVEL SELECTION
    ===================================================== */

    levelButtons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();

                    event.stopPropagation();


                    /*
                       Don't allow changing
                       level during game
                    */

                    if (gameRunning) {

                        return;

                    }


                    /*
                       Get selected level
                    */

                    selectedLevel =
                        this.dataset.level;


                    /*
                       Remove old selection
                    */

                    levelButtons.forEach(
                        function (btn) {

                            btn.classList.remove(
                                "selected"
                            );

                        }
                    );


                    /*
                       Select current button
                    */

                    this.classList.add(
                        "selected"
                    );


                    /*
                       Apply settings
                    */

                    applyLevelSettings();

                }
            );

        }
    );


    /* =====================================================
       CLEAR MONEY PIPES
    ===================================================== */

    function clearMoneyPipes() {

        moneyPipes.forEach(
            function (pipe) {

                if (pipe.top) {

                    pipe.top.remove();

                }

                if (pipe.bottom) {

                    pipe.bottom.remove();

                }

            }
        );


        moneyPipes = [];

    }


    /* =====================================================
       RESET GAME
    ===================================================== */

    function resetGame() {

        /*
           Stop previous animation
        */

        stopGame();


        /*
           Remove old money
        */

        clearMoneyPipes();


        /*
           Reset paper position
        */

        paperY = 220;


        /*
           Reset velocity
        */

        velocity = 0;


        /*
           Reset score
        */

        score = 0;


        /*
           Reset pipe timer
        */

        pipeTimer = 0;


        /*
           Reset paper appearance
        */

        paper.style.top =
            paperY + "px";


        paper.style.transform =
            "rotate(-8deg)";


        /*
           Reset score display
        */

        if (scoreText) {

            scoreText.textContent =
                "0";

        }


        /*
           Reset start message
        */

        if (messageTitle) {

            messageTitle.textContent =
                "📄 PAPER LEAK!";

        }


        if (messageText) {

            messageText.textContent =
                "The exam hasn't started yet, but the paper is already trying to escape. 😂";

        }


        if (startButton) {

            startButton.textContent =
                "Start the Escape";

        }


        /*
           Apply selected difficulty
        */

        applyLevelSettings();

    }


    /* =====================================================
       START GAME
    ===================================================== */

    function startGame() {

        /*
           Stop any old game loop
        */

        stopGame();


        /*
           Clear previous pipes
        */

        clearMoneyPipes();


        /*
           Apply selected level
        */

        applyLevelSettings();


        /*
           Reset paper
        */

        paperY = 220;

        velocity = 0;


        /*
           Reset score
        */

        score = 0;


        /*
           Reset pipe timer
        */

        pipeTimer = 0;


        /*
           Reset paper position
        */

        paper.style.top =
            paperY + "px";


        paper.style.transform =
            "rotate(-8deg)";


        /*
           Reset score display
        */

        if (scoreText) {

            scoreText.textContent =
                "0";

        }


        /*
           Start game
        */

        gameRunning = true;


        /*
           Hide start screen
        */

        message.style.display =
            "none";


        /*
           Start animation
        */

        lastTime =
            performance.now();


        animationFrame =
            requestAnimationFrame(
                gameLoop
            );

    }


    /* =====================================================
       STOP GAME
    ===================================================== */

    function stopGame() {

        gameRunning = false;


        if (animationFrame !== null) {

            cancelAnimationFrame(
                animationFrame
            );

            animationFrame = null;

        }

    }


    /* =====================================================
       FLAP / FLY
    ===================================================== */

    function flap() {

        if (!gameRunning) {

            return;

        }


        /*
           Give paper upward movement
        */

        velocity =
            flapPower;

    }


    /* =====================================================
       CREATE MONEY PIPE
    ===================================================== */

    function createMoneyPipe() {

        const gameHeight =
            game.clientHeight;


        /*
           Gap selected according
           to difficulty
        */

        const gap =
            pipeGap;


        /*
           Safe top limit
        */

        const minTop =
            55;


        /*
           Keep enough space
           for bottom pipe
        */

        const maxTop =
            gameHeight -
            gap -
            100;


        /*
           Random top height
        */

        const topHeight =
            Math.floor(
                Math.random() *
                (
                    maxTop -
                    minTop
                )
                +
                minTop
            );


        /*
           Bottom height
        */

        const bottomHeight =
            gameHeight -
            topHeight -
            gap -
            GROUND_HEIGHT;


        /*
           Create top money stack
        */

        const top =
            document.createElement(
                "div"
            );


        top.className =
            "portfolio-money-pipe top";


        top.style.height =
            Math.max(
                50,
                topHeight
            ) + "px";


        /*
           Create bottom money stack
        */

        const bottom =
            document.createElement(
                "div"
            );


        bottom.className =
            "portfolio-money-pipe bottom";


        bottom.style.height =
            Math.max(
                50,
                bottomHeight
            ) + "px";


        /*
           Add to game
        */

        game.appendChild(top);

        game.appendChild(bottom);


        /*
           Store pipe information
        */

        moneyPipes.push({

            top: top,

            bottom: bottom,

            x:
                game.clientWidth + 70,

            scored: false

        });

    }


    /* =====================================================
       COLLISION DETECTION
    ===================================================== */

    function collision(pipe) {

        /*
           Paper rectangle

           Medium:
           46 × 58
        */

        const paperLeft =
            PAPER_X;


        const paperRight =
            paperLeft +
            PAPER_WIDTH;


        const paperTop =
            paperY;


        const paperBottom =
            paperY +
            PAPER_HEIGHT;


        /*
           Money rectangle
        */

        const pipeLeft =
            pipe.x;


        const pipeRight =
            pipe.x + 58;


        /*
           Check horizontal collision
        */

        if (
            paperRight > pipeLeft &&
            paperLeft < pipeRight
        ) {

            /*
               Top money height
            */

            const topHeight =
                pipe.top.offsetHeight;


            /*
               Bottom money starts here
            */

            const bottomStart =
                game.clientHeight -
                pipe.bottom.offsetHeight -
                GROUND_HEIGHT;


            /*
               Check vertical collision
            */

            if (
                paperTop < topHeight ||
                paperBottom > bottomStart
            ) {

                return true;

            }

        }


        return false;

    }


    /* =====================================================
       PAPER LEAKED
    ===================================================== */

    function endGame() {

        /*
           Prevent duplicate calls
        */

        if (!gameRunning) {

            return;

        }


        /*
           Stop game
        */

        gameRunning = false;


        /*
           Cancel animation
        */

        if (animationFrame !== null) {

            cancelAnimationFrame(
                animationFrame
            );

            animationFrame = null;

        }


        /*
           Update best score
        */

        if (
            score >
            bestScore
        ) {

            bestScore =
                score;


            localStorage.setItem(
                "portfolioPaperLeakBest",
                bestScore
            );

        }


        /*
           Display best score
        */

        if (bestScoreText) {

            bestScoreText.textContent =
                bestScore;

        }


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

            "The paper saw the syllabus and chose freedom. 😂",

            "You came to write the exam. The paper came to escape. 🏃📄",

            "The paper had better attendance than you. 😂",

            "Breaking: Question paper chooses independence. 🇮🇳",

            "Your paper has entered witness protection. 💀",

            "Result: Paper escaped. Student confused. Professor disappointed. 😂"

        ];


        /*
           Select random joke
        */

        const randomJoke =
            jokes[
                Math.floor(
                    Math.random() *
                    jokes.length
                )
            ];


        /*
           Show game-over screen
        */

        message.style.display =
            "flex";


        messageTitle.textContent =
            "📄 PAPER LEAKED!";


        messageText.textContent =
            randomJoke;


        startButton.textContent =
            "Leak Another Paper";

    }


    /* =====================================================
       GAME LOOP
    ===================================================== */

    function gameLoop(time) {

        /*
           Stop if game ended
        */

        if (!gameRunning) {

            return;

        }


        /*
           Calculate frame time

           This keeps the game
           smooth on different devices.
        */

        const delta =
            Math.min(
                (time - lastTime) /
                16.67,
                2
            );


        lastTime =
            time;


        /* ===============================================
           PAPER PHYSICS
        =============================================== */

        velocity +=
            gravity *
            delta;


        paperY +=
            velocity *
            delta;


        /*
           Paper rotation

           Slower rotation than
           the previous version.
        */

        const rotation =
            Math.min(
                Math.max(
                    velocity * 3,
                    -18
                ),
                65
            );


        /*
           Update paper
        */

        paper.style.top =
            paperY + "px";


        paper.style.transform =
            `rotate(${rotation}deg)`;


        /* ===============================================
           CEILING
        =============================================== */

        if (
            paperY <= 0
        ) {

            paperY = 0;

            endGame();

            return;

        }


        /* ===============================================
           GROUND
        =============================================== */

        const groundLimit =
            game.clientHeight -
            GROUND_HEIGHT;


        if (
            paperY +
            PAPER_HEIGHT >=
            groundLimit
        ) {

            paperY =
                groundLimit -
                PAPER_HEIGHT;


            endGame();

            return;

        }


        /* ===============================================
           CREATE MONEY
        =============================================== */

        pipeTimer += delta;


        /*
           Spawn interval

           Easy = slower
           Normal = medium
           Hard = faster
        */

        let spawnRate = 125;


        if (
            selectedLevel ===
            "normal"
        ) {

            spawnRate = 115;

        }


        if (
            selectedLevel ===
            "hard"
        ) {

            spawnRate = 100;

        }


        if (
            pipeTimer >=
            spawnRate
        ) {

            createMoneyPipe();

            pipeTimer = 0;

        }


        /* ===============================================
           MOVE MONEY
        =============================================== */

        moneyPipes.forEach(
            function (pipe) {

                /*
                   Move pipe
                */

                pipe.x -=
                    pipeSpeed *
                    delta;


                /*
                   Update position
                */

                pipe.top.style.left =
                    pipe.x + "px";


                pipe.bottom.style.left =
                    pipe.x + "px";


                /* ======================================
                   SCORE
                ====================================== */

                if (
                    !pipe.scored &&
                    pipe.x +
                    58 <
                    PAPER_X
                ) {

                    pipe.scored =
                        true;


                    score++;


                    if (scoreText) {

                        scoreText.textContent =
                            score;

                    }

                }


                /* ======================================
                   COLLISION
                ====================================== */

                if (
                    collision(pipe)
                ) {

                    endGame();

                }

            }
        );


        /* ===============================================
           REMOVE OLD MONEY
        =============================================== */

        moneyPipes =
            moneyPipes.filter(
                function (pipe) {

                    if (
                        pipe.x <
                        -80
                    ) {

                        pipe.top.remove();

                        pipe.bottom.remove();

                        return false;

                    }


                    return true;

                }
            );


        /* ===============================================
           NEXT FRAME
        =============================================== */

        animationFrame =
            requestAnimationFrame(
                gameLoop
            );

    }


    /* =====================================================
       START BUTTON
    ===================================================== */
startButton.addEventListener(
    "click",
    function (event) {

        event.preventDefault();
        event.stopPropagation();

        /* =========================
           START GAME BGM
        ========================= */

        if (gameBGM) {

            gameBGM.pause();

            gameBGM.currentTime = 0;

            gameBGM.volume = 0.35;

            gameBGM.muted = false;

            gameBGM.play().catch(function (error) {
                console.log("Game BGM could not start:", error);
            });
        }

        /* =========================
           START GAME
        ========================= */

        startGame();

    }
);

    /* =====================================================
       GAME CLICK
    ===================================================== */

    game.addEventListener(
        "click",
        function (event) {

            /*
               Ignore level buttons
            */

            if (
                event.target.closest(
                    ".game-level-btn"
                )
            ) {

                return;

            }


            /*
               Ignore start button
            */

            if (
                event.target ===
                startButton
            ) {

                return;

            }


            /*
               If game is running,
               make paper fly
            */

            if (gameRunning) {

                flap();

            }

        }
    );


    /* =====================================================
       KEYBOARD
    ===================================================== */

    document.addEventListener(
        "keydown",
        function (event) {

            /*
               Only work when
               Game Zone is open
            */

            if (
                !portfolioGame.classList.contains(
                    "active"
                )
            ) {

                return;

            }


            /*
               Space key
            */

            if (
                event.code ===
                "Space"
            ) {

                event.preventDefault();


                /*
                   If game isn't running,
                   start it.
                */

                if (!gameRunning) {

                    /*
                       Only start if
                       message is visible
                    */

                    if (
                        message.style.display !==
                        "none"
                    ) {

                        startGame();

                    }

                }
                else {

                    flap();

                }

            }

        }
    );


    /* =====================================================
       TOUCH CONTROL
    ===================================================== */

    game.addEventListener(
        "touchstart",
        function (event) {

            /*
               Ignore level buttons
            */

            if (
                event.target.closest(
                    ".game-level-btn"
                )
            ) {

                return;

            }


            /*
               Ignore start button
            */

            if (
                event.target ===
                startButton
            ) {

                return;

            }


            /*
               Prevent page scrolling
            */

            event.preventDefault();


            /*
               Fly paper
            */

            if (gameRunning) {

                flap();

            }

        },
        {
            passive: false
        }
    );


    /* =====================================================
       INITIAL SETTINGS
    ===================================================== */

    applyLevelSettings();


    /*
       Initial paper position
    */

    paper.style.top =
        paperY + "px";


    paper.style.transform =
        "rotate(-8deg)";

});
/* =========================================================
   MOBILE GAME ZONE BUTTON
   ========================================================= */

const profileGameContainer =
    document.getElementById("profileGameContainer");

const gameZoneButton =
    document.getElementById("gameZoneButton");


if (
    profileGameContainer &&
    gameZoneButton
) {

    profileGameContainer.addEventListener(
        "click",
        function (event) {

            /*
             * Only use this behavior on mobile
             */

            if (
                window.innerWidth <= 768
            ) {

                /*
                 * If the Game Zone button
                 * itself was clicked,
                 * don't hide it.
                 */

                if (
                    event.target.closest(
                        "#gameZoneButton"
                    )
                ) {

                    return;

                }


                /*
                 * Show Game Zone button
                 * at the bottom.
                 */

                gameZoneButton.classList.add(
                    "mobile-show"
                );

            }

        }
    );

}