(function () {
  const l = document.createElement("link").relList;
  if (l && l.supports && l.supports("modulepreload")) return;
  for (const o of document.querySelectorAll('link[rel="modulepreload"]')) m(o);
  new MutationObserver((o) => {
    for (const s of o)
      if (s.type === "childList")
        for (const u of s.addedNodes)
          u.tagName === "LINK" && u.rel === "modulepreload" && m(u);
  }).observe(document, { childList: !0, subtree: !0 });
  function d(o) {
    const s = {};
    return (
      o.integrity && (s.integrity = o.integrity),
      o.referrerPolicy && (s.referrerPolicy = o.referrerPolicy),
      o.crossOrigin === "use-credentials"
        ? (s.credentials = "include")
        : o.crossOrigin === "anonymous"
        ? (s.credentials = "omit")
        : (s.credentials = "same-origin"),
      s
    );
  }
  function m(o) {
    if (o.ep) return;
    o.ep = !0;
    const s = d(o);
    fetch(o.href, s);
  }
})();
(() => {
  gsap.registerPlugin(ScrollTrigger);
  const f = () => {
      const e = document.querySelector(".topics"),
        t = e.querySelectorAll(".topics__item"),
        r = e.querySelector(".topics__line");
      t.forEach((n) => {
        const c = n.querySelector(".topics__circle"),
          i = n.querySelector(".topics__title");
        gsap.to(c, {
          backgroundColor: "#ffffff",
          scrollTrigger: {
            trigger: n,
            start: "bottom 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
            scrub: !1,
            markers: !1,
          },
        }),
          gsap.to(i, {
            color: "#ffffff",
            scrollTrigger: {
              trigger: n,
              start: "bottom 80%",
              end: "bottom 20%",
              toggleActions: "play none none reverse",
              markers: !1,
              scrub: !1,
            },
          });
      }),
        gsap.fromTo(
          r,
          { height: "0%" },
          {
            height: "100%",
            duration: 1.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: e,
              start: "bottom 80%",
              end: "bottom 20%",
              scrub: !1,
            },
          }
        );
    },
    l = (e) => {
      e &&
        (e.showModal(),
        gsap.fromTo(
          e,
          { opacity: 0, scale: 0.8 },
          { opacity: 1, scale: 1, duration: 0.5, ease: "power2.out" }
        ));
    },
    d = (e) => {
      e &&
        gsap.to(e, {
          opacity: 0,
          scale: 0.8,
          duration: 0.5,
          ease: "power2.in",
          onComplete: () => e.close(),
        });
    },
    m = () => {
      const e = (n, c, i) => {
          const g = document.getElementById(n),
            a = document.getElementById(c);
          g &&
            a &&
            g.addEventListener("click", () => {
              i === "open" && l(a), i === "close" && d(a);
            });
        },
        t = (n, c, i) => {
          const g = document.getElementById(i),
            a = document.getElementById(n),
            p = document.getElementById(c);
          g &&
            a &&
            p &&
            g.addEventListener("click", () => {
              d(a), setTimeout(() => l(p), 500);
            });
        },
        r = (n) => {
          const c = document.getElementById(n);
          c &&
            c.addEventListener("keydown", (i) => {
              i.key === "Escape" && (i.preventDefault(), d(c));
            });
        };
      e("openDialog1", "dialog1", "open"),
        e("closeDialog1", "dialog1", "close"),
        t("dialog1", "dialog2", "toDialog2"),
        e("openDialog2", "dialog2", "open"),
        e("closeDialog2", "dialog2", "close"),
        t("dialog2", "dialog1", "backToDialog1"),
        r("dialog1"),
        r("dialog2");
    },
    o = () => {
      const e = document.querySelector("header"),
        t = e.offsetHeight,
        r = () => {
          window.scrollY > t * 0.8
            ? e.classList.add("header--scrolled")
            : e.classList.remove("header--scrolled");
        };
      window.addEventListener("scroll", r);
    },
    s = "abcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_=+";
  let u = 16;
  function y(e) {
    return e
      .split("")
      .map((t) => (t === " " ? " " : s[Math.floor(Math.random() * s.length)]))
      .join("");
  }
  function h(e, t, r = 10) {
    const n = document.getElementById(e);
    if (!n) {
      console.error(`Елемент із ID "${e}" не знайдено.`);
      return;
    }
    gsap.to(
      {},
      {
        duration: r * 0.005,
        repeat: r - 1,
        onRepeat: () => {
          n.textContent = y(t);
        },
        onComplete: () => {
          gsap.to(n, { textContent: t, duration: 1, ease: "power2.out" });
        },
      }
    );
  }
  function L() {
    const e = document.querySelector(".header__menu-icon"),
      t = document.querySelector(".nav-menu"),
      r = t.querySelectorAll("a"),
      n = () => {
        t.classList.contains("nav-menu--open")
          ? (t.classList.remove("nav-menu--open"),
            e.classList.remove("header__menu-icon--open"),
            document.body.classList.remove("lock-scroll"))
          : (t.classList.add("nav-menu--open"),
            e.classList.add("header__menu-icon--open"),
            document.body.classList.add("lock-scroll"));
      };
    e.addEventListener("click", n),
      r.forEach((c) => {
        c.addEventListener("click", () => {
          t.classList.contains("nav-menu--open") &&
            (t.classList.remove("nav-menu--open"),
            e.classList.remove("header__menu-icon--open"),
            document.body.classList.remove("lock-scroll"));
        });
      });
  }
  function v() {
    const e = document.getElementById("meetup-sticky");
    ScrollTrigger.create({
      trigger: ".hero",
      start: "bottom top",
      end: "top 20%",
      markers: !1,
      toggleClass: "meetup-sticky--active",
      onEnter: () => {
        e.classList.add("meetup--sticky");
      },
      onLeaveBack: () => {
        e.classList.remove("meetup--sticky");
      },
    });
  }
  document.addEventListener("DOMContentLoaded", () => {
    L(),
      o(),
      setTimeout(() => h("main-title", "SEO PUB", u), 300),
      f(),
      m(),
      v();
  });
})();
