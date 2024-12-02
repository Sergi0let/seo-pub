(() => {
    "use strict";
    gsap.registerPlugin(ScrollTrigger);
    const fadeTopics = () => {
        const topicMain = document.querySelector(".topics");
        const topics = topicMain.querySelectorAll(".topics__item");
        const line = topicMain.querySelector(".topics__line");
        topics.forEach((topic => {
            const circle = topic.querySelector(".topics__circle");
            const title = topic.querySelector(".topics__title");
            gsap.to(circle, {
                backgroundColor: "#ffffff",
                scrollTrigger: {
                    trigger: topic,
                    start: "top 80%",
                    end: "top 20%",
                    toggleActions: "play none none reverse",
                    scrub: false,
                    markers: false
                }
            });
            gsap.to(title, {
                color: "#ffffff",
                scrollTrigger: {
                    trigger: topic,
                    start: "top 80%",
                    end: "top 20%",
                    toggleActions: "play none none reverse",
                    markers: false,
                    scrub: false
                }
            });
        }));
        gsap.fromTo(line, {
            height: "0%"
        }, {
            height: "100%",
            duration: 1.5,
            ease: "power2.out",
            scrollTrigger: {
                trigger: topicMain,
                start: "top 80%",
                end: "bottom 20%",
                scrub: true
            }
        });
    };
    const openDialogWithAnimation = dialog => {
        if (dialog) {
            dialog.showModal();
            gsap.fromTo(dialog, {
                opacity: 0,
                scale: .8
            }, {
                opacity: 1,
                scale: 1,
                duration: .5,
                ease: "power2.out"
            });
        }
    };
    const closeDialogWithAnimation = dialog => {
        if (dialog) gsap.to(dialog, {
            opacity: 0,
            scale: .8,
            duration: .5,
            ease: "power2.in",
            onComplete: () => dialog.close()
        });
    };
    const setupDialogs = () => {
        const handleDialogAction = (buttonId, dialogId, action) => {
            const button = document.getElementById(buttonId);
            const dialog = document.getElementById(dialogId);
            if (button && dialog) button.addEventListener("click", (() => {
                if (action === "open") openDialogWithAnimation(dialog);
                if (action === "close") closeDialogWithAnimation(dialog);
            }));
        };
        const handleDialogTransition = (currentDialogId, nextDialogId, buttonId) => {
            const button = document.getElementById(buttonId);
            const currentDialog = document.getElementById(currentDialogId);
            const nextDialog = document.getElementById(nextDialogId);
            if (button && currentDialog && nextDialog) button.addEventListener("click", (() => {
                closeDialogWithAnimation(currentDialog);
                setTimeout((() => openDialogWithAnimation(nextDialog)), 500);
            }));
        };
        handleDialogAction("openDialog1", "dialog1", "open");
        handleDialogAction("closeDialog1", "dialog1", "close");
        handleDialogTransition("dialog1", "dialog2", "toDialog2");
        handleDialogAction("openDialog2", "dialog2", "open");
        handleDialogAction("closeDialog2", "dialog2", "close");
        handleDialogTransition("dialog2", "dialog1", "backToDialog1");
    };
    const addHeaderClass = () => {
        const header = document.querySelector("header");
        const headerHeight = header.offsetHeight;
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            if (scrollPosition > headerHeight * .8) header.classList.add("header--scrolled"); else header.classList.remove("header--scrolled");
        };
        window.addEventListener("scroll", handleScroll);
    };
    const characters = "abcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_=+";
    let iterations = 16;
    function randomizeText(text) {
        return text.split("").map((char => char === " " ? " " : characters[Math.floor(Math.random() * characters.length)])).join("");
    }
    function startAnimation(elementId, finalWord, iterationCount = 10) {
        const element = document.getElementById(elementId);
        if (!element) {
            console.error(`Елемент із ID "${elementId}" не знайдено.`);
            return;
        }
        gsap.to({}, {
            duration: iterationCount * .005,
            repeat: iterationCount - 1,
            onRepeat: () => {
                element.textContent = randomizeText(finalWord);
            },
            onComplete: () => {
                gsap.to(element, {
                    textContent: finalWord,
                    duration: 1,
                    ease: "power2.out"
                });
            }
        });
    }
    const parallaxElements = document.querySelectorAll(".parallax-element");
    document.addEventListener("mousemove", (event => {
        const {clientX, clientY} = event;
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        parallaxElements.forEach(((element, index) => {
            const speed = (index + 1) * .02;
            const xOffset = (clientX - centerX) * speed;
            const yOffset = (clientY - centerY) * speed;
            gsap.to(element, {
                x: xOffset,
                y: yOffset,
                duration: .3,
                ease: "power2.out"
            });
        }));
    }));
    document.addEventListener("DOMContentLoaded", (() => {
        addHeaderClass();
        setTimeout((() => startAnimation("main-title", "SEO PUB", iterations)), 300);
        fadeTopics();
        setupDialogs();
    }));
})();