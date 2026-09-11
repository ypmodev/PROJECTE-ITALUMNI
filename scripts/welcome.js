const modal = document.getElementById("accessModal");
const closeModal = document.querySelector(".modal__close");

const privateButtons = document.querySelectorAll('[data-private="true"]');

privateButtons.forEach(button => {
    button.addEventListener("click", (event) => {
        event.preventDefault();

        modal.classList.add("is-open");
        modal.setAttribute("aria-hidden", "false");
    });
});

closeModal.addEventListener("click", () => {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
});