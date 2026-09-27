/* MOBILE MENU */

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle) {
    menuToggle.addEventListener("click", () => {
        navLinks.classList.toggle("active");

        menuToggle.textContent =
            navLinks.classList.contains("active") ? "×" : "☰";
    });
}


/* CLOSE MOBILE MENU */

document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("active");

        if (menuToggle) {
            menuToggle.textContent = "☰";
        }
    });
});


/* SCROLL REVEAL */

const observer = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    },
    {
        threshold: 0.12
    }
);

document.querySelectorAll(".reveal").forEach(element => {
    observer.observe(element);
});


/* MOUSE GLOW */

const cursorGlow = document.querySelector(".cursor-glow");

if (cursorGlow && window.innerWidth > 700) {

    document.addEventListener("mousemove", event => {

        cursorGlow.style.left = event.clientX + "px";
        cursorGlow.style.top = event.clientY + "px";

    });

}


/* 3D TILT ON PROJECTS */

document.querySelectorAll(".project-card").forEach(card => {

    card.addEventListener("mousemove", event => {

        if (window.innerWidth < 800) return;

        const rect = card.getBoundingClientRect();

        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -3;
        const rotateY = ((x - centerX) / centerX) * 3;

        card.style.transform =
            `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;

    });

    card.addEventListener("mouseleave", () => {

        card.style.transform =
            "perspective(900px) rotateX(0) rotateY(0) translateY(0)";

    });

});


/* ACTIVE NAV */

const sections = document.querySelectorAll("section[id]");
const navItems = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 180;

        if (window.scrollY >= sectionTop) {
            current = section.getAttribute("id");
        }

    });

    navItems.forEach(item => {

        item.style.color = "";

        if (item.getAttribute("href") === "#" + current) {
            item.style.color = "#9eff00";
        }

    });

});


/* PAGE LOADED */

window.addEventListener("load", () => {

    document.body.classList.add("loaded");

    document.querySelectorAll(".hero .reveal").forEach((item, index) => {

        setTimeout(() => {
            item.classList.add("visible");
        }, 200 + index * 150);

    });

});
