document.querySelector(".hamburger").addEventListener("click", function () {
    document.querySelector(".menu-items").classList.toggle("show");
});
document.querySelector(".btn-close").addEventListener("click", function () {
    document.querySelector(".menu-items").classList.remove("show");
});




document.addEventListener('DOMContentLoaded', () => {
    AOS.init({
        startEvent: 'load',
        duration: 800,
        easing: 'ease-out-cubic',
        offset: 120,
        delay: 50,
        once: true,
        mirror: false,
        anchorPlacement: 'top-bottom'
    });
    document.body.style.overflow = "hidden";

    window.addEventListener("load", () => {
        const loader = document.getElementById("page-loader");
        setTimeout(() => {
            loader.style.opacity = "0";
            loader.style.pointerEvents = "none";
            setTimeout(() => {
                loader.style.display = "none";
                document.body.style.overflow = "auto";
            }, 400);
        }, 1600);
    });
});

const homeDropdownBtn = document.getElementById("homeDropdownBtn");
const homeDropdown = document.getElementById("homeDropdown");
const icon = document.querySelector(".dropdown-icon");

homeDropdownBtn.addEventListener("click", () => {
    homeDropdown.classList.toggle("show");
    icon.classList.toggle("rotate");
});
document.addEventListener("click", (e) => {
    if (!homeDropdown.contains(e.target) && !homeDropdownBtn.contains(e.target)) {
        homeDropdown.classList.remove("show");
        icon.classList.remove("rotate");
    }
});