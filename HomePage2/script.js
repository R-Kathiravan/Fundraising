//Theme Change
const themeToggle = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;
function applyTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        htmlElement.classList.add('dark-mode');
    } else {
        htmlElement.classList.remove('dark-mode');
    }
}

applyTheme();

themeToggle.addEventListener('click', () => {
    htmlElement.classList.toggle('dark-mode');

    if (htmlElement.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }
});
// Menu 
const hamburger = document.querySelector(".hamburger");
const menu = document.querySelector(".menu-items");
const closeBtn = document.querySelector(".close-btn");
const signInMenu = document.querySelector(".sign-in-menu");

hamburger.addEventListener("click", (e) => {
    e.stopPropagation();
    menu.classList.toggle("show");
    signInMenu.classList.toggle("show"); // Show login inside mobile menu
});

closeBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    menu.classList.remove("show");
    signInMenu.classList.remove("show");
});

document.addEventListener("click", (e) => {
    if (
        menu.classList.contains("show") &&
        !menu.contains(e.target) &&
        !hamburger.contains(e.target)
    ) {
        menu.classList.remove("show");
        signInMenu.classList.remove("show");
    }
});
