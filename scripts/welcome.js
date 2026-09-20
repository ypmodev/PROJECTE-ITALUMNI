const modal = document.getElementById("accessModal");
const closeModal = document.querySelector(".modal__close");

const privateButtons = document.querySelectorAll('[data-private="true"]');
let lastFocusedElement = null;

privateButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    event.preventDefault();

    lastFocusedElement = button;
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    closeModal.focus();
  });
});

closeModal.addEventListener("click", closeAccessModal);

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && modal.getAttribute("aria-hidden") === "false") {
    closeAccessModal();
  }
});

function closeAccessModal() {
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  lastFocusedElement?.focus();
}
