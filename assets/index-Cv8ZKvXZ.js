(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity) fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy) fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous") fetchOpts.credentials = "omit";
    else fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep) return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
})();
gsap.registerPlugin(ScrollTrigger);
(() => {
  gsap.registerPlugin(ScrollTrigger);
  const fadeTopics = () => {
    const topicMain = document.querySelector(".topics");
    const topics = topicMain.querySelectorAll(".topics__item");
    const line = topicMain.querySelector(".topics__line");
    topics.forEach((topic) => {
      const circle = topic.querySelector(".topics__circle");
      const title = topic.querySelector(".topics__title");
      gsap.to(circle, {
        backgroundColor: "#ffffff",
        scrollTrigger: {
          trigger: topic,
          start: "bottom 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
          scrub: false,
          markers: false,
        },
      });
      gsap.to(title, {
        color: "#ffffff",
        scrollTrigger: {
          trigger: topic,
          start: "bottom 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
          markers: false,
          scrub: false,
        },
      });
    });
    gsap.fromTo(
      line,
      {
        height: "0%",
      },
      {
        height: "100%",
        duration: 1.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: topicMain,
          start: "bottom 80%",
          end: "bottom 20%",
          scrub: false,
        },
      }
    );
  };
  const openDialogWithAnimation = (dialog) => {
    if (dialog) {
      dialog.showModal();
      gsap.fromTo(
        dialog,
        {
          opacity: 0,
          scale: 0.8,
        },
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          ease: "power2.out",
        }
      );
    }
  };
  const closeDialogWithAnimation = (dialog) => {
    if (dialog)
      gsap.to(dialog, {
        opacity: 0,
        scale: 0.8,
        duration: 0.5,
        ease: "power2.in",
        onComplete: () => dialog.close(),
      });
  };
  const setupDialogs = () => {
    const handleDialogAction = (buttonId, dialogId, action) => {
      const button = document.getElementById(buttonId);
      const dialog = document.getElementById(dialogId);
      if (button && dialog)
        button.addEventListener("click", () => {
          if (action === "open") openDialogWithAnimation(dialog);
          if (action === "close") closeDialogWithAnimation(dialog);
        });
    };
    const handleDialogTransition = (
      currentDialogId,
      nextDialogId,
      buttonId
    ) => {
      const button = document.getElementById(buttonId);
      const currentDialog = document.getElementById(currentDialogId);
      const nextDialog = document.getElementById(nextDialogId);
      if (button && currentDialog && nextDialog)
        button.addEventListener("click", () => {
          closeDialogWithAnimation(currentDialog);
          setTimeout(() => openDialogWithAnimation(nextDialog), 500);
        });
    };
    const handleDialogEscClose = (dialogId) => {
      const dialog = document.getElementById(dialogId);
      if (dialog) {
        dialog.addEventListener("keydown", (event) => {
          if (event.key === "Escape") {
            event.preventDefault();
            closeDialogWithAnimation(dialog);
          }
        });
      }
    };
    handleDialogAction("openDialog1", "dialog1", "open");
    handleDialogAction("closeDialog1", "dialog1", "close");
    handleDialogTransition("dialog1", "dialog2", "toDialog2");
    handleDialogAction("openDialog2", "dialog2", "open");
    handleDialogAction("closeDialog2", "dialog2", "close");
    handleDialogTransition("dialog2", "dialog1", "backToDialog1");
    handleDialogEscClose("dialog1");
    handleDialogEscClose("dialog2");
  };
  const addHeaderClass = () => {
    const header = document.querySelector("header");
    const headerHeight = header.offsetHeight;
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > headerHeight * 0.8)
        header.classList.add("header--scrolled");
      else header.classList.remove("header--scrolled");
    };
    window.addEventListener("scroll", handleScroll);
  };
  const characters = "abcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_=+";
  let iterations = 16;
  function randomizeText(text) {
    return text
      .split("")
      .map((char) =>
        char === " "
          ? " "
          : characters[Math.floor(Math.random() * characters.length)]
      )
      .join("");
  }
  function startAnimation(elementId, finalWord, iterationCount = 10) {
    const element = document.getElementById(elementId);
    if (!element) {
      console.error(`Елемент із ID "${elementId}" не знайдено.`);
      return;
    }
    gsap.to(
      {},
      {
        duration: iterationCount * 5e-3,
        repeat: iterationCount - 1,
        onRepeat: () => {
          element.textContent = randomizeText(finalWord);
        },
        onComplete: () => {
          gsap.to(element, {
            textContent: finalWord,
            duration: 1,
            ease: "power2.out",
          });
        },
      }
    );
  }
  function toggleBurgerMenu() {
    const burger = document.querySelector(".header__menu-icon");
    const menu = document.querySelector(".nav-menu");
    const links = menu.querySelectorAll("a");
    const banner = document.querySelector("#meetup-sticky");

    
    const toggleMenu = () => {
      if (menu.classList.contains("nav-menu--open")) {
        menu.classList.remove("nav-menu--open");
        burger.classList.remove("header__menu-icon--open");
        document.body.classList.remove("lock-scroll");
        banner.style.opacity = '1'
      } else {
        menu.classList.add("nav-menu--open");
        burger.classList.add("header__menu-icon--open");
        document.body.classList.add("lock-scroll");
        banner.style.opacity = '0'
      }
    };
    burger.addEventListener("click", toggleMenu);
    links.forEach((link) => {
      link.addEventListener("click", () => {
        if (menu.classList.contains("nav-menu--open")) {
          menu.classList.remove("nav-menu--open");
          burger.classList.remove("header__menu-icon--open");
          document.body.classList.remove("lock-scroll");
        }
      });
    });
  }
  function stickyBanner() {
    const meetupBanner = document.getElementById("meetup-sticky");
    ScrollTrigger.create({
      trigger: "#meetup-sticky",
      markers: false,
      onEnter: () => {
        meetupBanner.classList.add("meetup--sticky");
      },
      onLeaveBack: () => {
        meetupBanner.classList.remove("meetup--sticky");
      },
    });
  }
  document.addEventListener("DOMContentLoaded", () => {
    toggleBurgerMenu();
    addHeaderClass();
    setTimeout(() => startAnimation("main-title", "SEO PUB", iterations), 300);
    fadeTopics();
    setupDialogs();
    stickyBanner();
  });
})();
