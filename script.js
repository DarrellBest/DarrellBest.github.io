document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll("section");
    const options = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = "fadeInUp 1s forwards";
            }
        });
    }, options);

    sections.forEach(section => {
        observer.observe(section);
    });

    // Smooth Scroll for Navigation
    document.querySelectorAll("nav a").forEach(anchor => {
        anchor.addEventListener("click", function(event) {
            event.preventDefault();
            const targetId = this.getAttribute("href").substring(1);
            const targetSection = document.getElementById(targetId);
            targetSection.scrollIntoView({ behavior: "smooth" });
        });
    });
});
