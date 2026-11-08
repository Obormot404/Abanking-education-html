const menuButton = document.querySelector(".header__menu");
const navigation = document.querySelector(".nav");

menuButton?.addEventListener("click", () => {
  const isOpen = navigation.classList.toggle("nav--open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
});

document.querySelectorAll(".icon-button[aria-label^='Like']").forEach((button) => {
  button.addEventListener("click", () => {
    const isLiked = button.getAttribute("aria-pressed") === "true";
    button.setAttribute("aria-pressed", String(!isLiked));
  });
});

document.querySelector(".search")?.addEventListener("submit", (event) => {
  event.preventDefault();
  const query = event.currentTarget.querySelector("input").value.trim();
  if (query) {
    const target = `https://www.google.com/search?q=${encodeURIComponent(query + " design developer tool")}`;
    window.open(target, "_blank", "noopener,noreferrer");
  }
});

document.querySelector(".button--load")?.addEventListener("click", (event) => {
  const button = event.currentTarget;
  button.textContent = button.textContent === "Load more" ? "All tools loaded" : "Load more";
  button.disabled = true;
});
