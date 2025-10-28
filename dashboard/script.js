let sidebar = document.querySelector(".sidebar");
let closeBtn = document.querySelector("#btn");
let hamburger = document.querySelector("#hamburgerbtn")

closeBtn.addEventListener("click", () => {
  sidebar.classList.toggle("open");
  menuBtnChange();

});
hamburger.addEventListener("click", () => {
  sidebar.classList.toggle("open");
  menuBtnChange();
  //  hamburgerBtnChange()
});
F

function menuBtnChange() {
  if (sidebar.classList.contains("open")) {
    closeBtn.classList.replace("bx-menu", "bx-menu-alt-right");
  } else {
    closeBtn.classList.replace("bx-menu-alt-right", "bx-menu");
  }
}
