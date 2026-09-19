//Search

const homeSearchInputs = document.querySelectorAll(
  ".home-mobile .search__input, .home-desktop .search__input",
);

homeSearchInputs.forEach((input) => {
  input.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && input.value.trim() !== "") {
      showTab("networking");
    }
  });
});
