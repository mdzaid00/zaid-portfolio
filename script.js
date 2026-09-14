document.addEventListener("DOMContentLoaded", () => {

    // Smooth navigation
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener("click", function (event) {
            const target = document.querySelector(this.getAttribute("href"));

            if (target) {
                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth"
                });
            }
        });
    });

    // Simple reveal animation
    const sections = document.querySelectorAll(".section, .process-section");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    }, {
        threshold: 0.12
    });

    sections.forEach(section => {
        observer.observe(section);
    });

});
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});
