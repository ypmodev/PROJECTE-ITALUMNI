const jobTemplate = document.getElementById("job-card-template");
const jobMobileList = document.getElementById("job-mobile-list");
const jobDesktopGrid = document.getElementById("job-desktop-grid");
const jobSearchInput = document.querySelectorAll(
  ".job-mobile .search__input, .job-desktop .search__input",
);

const jobMobileFilterButtons = document.querySelectorAll(".job-filter-mobile");

const jobDesktopFilterButtons = document.querySelectorAll(
  ".job-desktop .desktop-filter-tab",
);

let jobsData = [];

// ESTATE/ selected Filters
const selectedFilters = {
  stack: "",
  contractType: "",
  location: "",
};

// CARDS
function renderJobs(jobs) {
  jobMobileList.innerHTML = "";
  jobDesktopGrid.innerHTML = "";

  jobs.forEach((job) => {
    // MOBILE
    const mobileCard = cloneTemplate(jobTemplate);
    const mobileArticle = mobileCard.querySelector(".job-card");

    fillJobCard(mobileArticle, job);
    addCardToList(jobMobileList, mobileArticle);

    // DESKTOP
    const desktopCard = cloneTemplate(jobTemplate);
    const desktopArticle = desktopCard.querySelector(".job-card");

    fillJobCard(desktopArticle, job);
    addCardToList(jobDesktopGrid, desktopArticle);
  });
}

function fillJobCard(card, job) {
  const image = card.querySelector(".job-card__image");
  const stack = card.querySelector(".job-card__stack");
  const title = card.querySelector(".job-card__title");
  const details = card.querySelector(".job-card__details");
  const action = card.querySelector(".job-card__action");

  // Image
  image.src = job.image;
  image.alt = "";

  stack.textContent = job.stack;
  title.textContent = job.title;
  details.textContent = ` ${job.contractType} | ${job.postedAgo}`;
  action.addEventListener("click", (event) => {
    event.preventDefault();
  });
}

// FILTERS
function filterJobs() {
  return jobsData.filter((job) => {
    const matchesStack =
      !selectedFilters.stack || job.stack === selectedFilters.stack;

    const matchesContract =
      !selectedFilters.contractType ||
      job.contractType === selectedFilters.contractType;

    const matchesLocation =
      !selectedFilters.location || job.location === selectedFilters.location;

    return matchesStack && matchesContract && matchesLocation;
  });
}

function showJobResults(jobs) {
  if (jobs.length === 0) {
    setEmptyState([jobMobileList, jobDesktopGrid], "No s'han trobat ofertes.");
    return;
  }

  renderJobs(jobs);
}

function getFilterOptions(filter) {
  const values = jobsData.map((job) => job[filter]);

  return [...new Set(values)];
}

function showFilterOptions(button, filter) {
  const existingOptions = button.parentElement.querySelector(
    ".job-filter-options",
  );

  if (existingOptions) {
    existingOptions.remove();

    return;
  }

  document
    .querySelectorAll(".job-filter-options")
    .forEach((openList) => openList.remove());

  // Crear lista
  const optionsList = document.createElement("ul");

  optionsList.classList.add("job-filter-options");

  const options = getFilterOptions(filter);

  const clearItem = document.createElement("li");
  const clearButton = document.createElement("button");

  clearButton.type = "button";
  clearButton.textContent = "Netejar filtre";

  clearButton.addEventListener("click", () => {
    selectedFilters[filter] = "";

    updateActiveButtons(
      [...jobDesktopFilterButtons, ...jobMobileFilterButtons],
      (button) => Boolean(selectedFilters[button.dataset.jobFilter]),
    );

    showJobResults(filterJobs());
    optionsList.remove();
  });

  clearItem.appendChild(clearButton);
  optionsList.appendChild(clearItem);

  options.forEach((option) => {
    const optionItem = document.createElement("li");
    const optionButton = document.createElement("button");

    optionButton.type = "button";
    optionButton.textContent = option;

    optionButton.addEventListener("click", () => {
      if (selectedFilters[filter] === option) {
        selectedFilters[filter] = "";
      } else {
        selectedFilters[filter] = option;
      }

      optionsList.remove();

      updateActiveButtons(
        [...jobDesktopFilterButtons, ...jobMobileFilterButtons],
        (button) => Boolean(selectedFilters[button.dataset.jobFilter]),
      );

      const filteredJobs = filterJobs();

      showJobResults(filteredJobs);
    });

    optionItem.appendChild(optionButton);
    optionsList.appendChild(optionItem);
  });

  button.parentElement.appendChild(optionsList);
}

// filters desktop
jobDesktopFilterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.jobFilter;

    showFilterOptions(button, filter);
  });
});

// filters mobile
jobMobileFilterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.jobFilter;

    showFilterOptions(button, filter);
  });
});

updateActiveButtons(
  [...jobDesktopFilterButtons, ...jobMobileFilterButtons],
  (button) => Boolean(selectedFilters[button.dataset.jobFilter]),
);

// SEARCH
function setupJobsSearch() {
  setupSearch(jobSearchInput, jobsData, ["title", "stack"], (resultSearch) => {
    const filteredJobs = resultSearch.filter((job) => {
      const matchesStack =
        !selectedFilters.stack || job.stack === selectedFilters.stack;

      const matchesContract =
        !selectedFilters.contractType ||
        job.contractType === selectedFilters.contractType;

      const matchesLocation =
        !selectedFilters.location || job.location === selectedFilters.location;

      return matchesStack && matchesContract && matchesLocation;
    });

    showJobResults(filteredJobs);
  });
}

// LOAD DATA
async function loadDataJobs() {
  setLoadingState([jobMobileList, jobDesktopGrid], "Carregant informació...");

  try {
    jobsData = await loadData("/data/jobs.json");

    if (!Array.isArray(jobsData)) {
      throw new Error("jobs.json no contiene un array");
    }

    renderJobs(jobsData);

    return true;
  } catch (error) {
    console.error("Error carregant les ofertes:", error);

    setErrorState(
      [jobMobileList, jobDesktopGrid],
      "No s'han pogut carregar les ofertes.",
    );

    return false;
  }
}

// INIT
async function initJobs() {
  const loaded = await loadDataJobs();

  if (loaded) {
    setupJobsSearch();
  }
}

initJobs();
