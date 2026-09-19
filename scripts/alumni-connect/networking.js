const template = document.getElementById("networking-card-template");

const mobileList = document.getElementById("networking-mobile-list");
const topList = document.getElementById("networking-top-list");
const suggestionsList = document.getElementById("networking-suggestions-list");

const filtersListMobile = document.getElementById(
  "networking-mobile-filters-list",
);
const filtersListDesktop = document.getElementById(
  "networking-desktop-filters-list",
);

const searchInput = document.querySelectorAll(".search__input");

const mobileFilterButtons = document.querySelectorAll(
  ".networking-filter-mobile",
);

const filterButtonPopulars = document.querySelectorAll(
  ".desktop-filter-tab.btn-filter-populars",
);

const filterButtonActivities = document.querySelectorAll(
  ".desktop-filter-tab.btn-filter-activities",
);

const filterButtonConnected = document.querySelectorAll(
  ".btn-filter-mes-connectats",
);

const filterButtonsDesktop = document.querySelectorAll(".desktop-filter-tab");

let alumniData = [];

// CARDS
function renderAlumni(alumni) {
  mobileList.innerHTML = "";
  topList.innerHTML = "";
  suggestionsList.innerHTML = "";

  alumni.forEach((person) => {
    // MOBILE
    const mobileCard = cloneTemplate(template);
    const mobileArticle = mobileCard.querySelector(".networking-card");

    fillAlumniCard(mobileArticle, person);
    addCardToList(mobileList, mobileArticle);

    // DESKTOP
    const desktopCard = cloneTemplate(template);
    const desktopArticle = desktopCard.querySelector(".networking-card");

    fillAlumniCard(desktopArticle, person);

    if (person.connected) {
      addCardToList(topList, desktopArticle);
    } else {
      addCardToList(suggestionsList, desktopArticle);
    }
  });
}

function fillAlumniCard(card, person) {
  card.querySelector(".networking-card__image").src = person.avatar;
  card.querySelector(".networking-card__name").textContent = person.name;
  card.querySelector(".networking-card__role").textContent = person.role;
  card.querySelector(".networking-card__location").textContent =
    person.location;
  card.querySelector(".networking-card__action").textContent = "Veure perfil";

  card
    .querySelector(".networking-card__action")
    .addEventListener("click", (event) => event.preventDefault());
}

// FIlTERS

function showResults(lista, textos) {
  lista.innerHTML = "";

  textos.forEach((texto) => {
    const li = document.createElement("li");
    li.textContent = texto;
    lista.appendChild(li);
  });
}

// Filter desktop
filterButtonsDesktop.forEach((button) => {
  button.addEventListener("click", () => {
    updateActiveButtons(filterButtonsDesktop, (btn) => btn === button);
  });
});

// Filter mobile
mobileFilterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.networkingFilter;

    const desktopButton = document.querySelector(
      `.desktop-filter-tab.btn-filter-${filter}`,
    );

    desktopButton.click();

    mobileList.style.display = "none";
    filtersListMobile.style.display = "block";

    updateActiveButtons(mobileFilterButtons, (btn) => btn === button);
  });
});

// Filter activities
filterButtonActivities.forEach((button) => {
  button.addEventListener("click", () => {
    const activities = [];

    alumniData.forEach((person) => {
      person.activities.forEach((activity) => {
        activities.push({
          ...activity,
          personName: person.name,
        });
      });
    });

    activities.sort((a, b) => {
      return new Date(b.date) - new Date(a.date);
    });

    const recentActivities = activities.slice(0, 5);

    const textos = recentActivities.map(
      (activity) => activity.personName + " " + activity.text,
    );

    showResults(filtersListMobile, textos);
    showResults(filtersListDesktop, textos);
  });
});

// Filter populars
filterButtonPopulars.forEach((button) => {
  button.addEventListener("click", () => {
    const populars = [...alumniData];

    populars.sort((a, b) => {
      return b.followers - a.followers;
    });

    const mostPopulars = populars.slice(0, 5);

    const textos = mostPopulars.map(
      (person) => person.name + " - " + person.followers + " followers",
    );

    showResults(filtersListMobile, textos);
    showResults(filtersListDesktop, textos);
  });
});

// Filter connected
filterButtonConnected.forEach((button) => {
  button.addEventListener("click", () => {
    const connectedPeople = [...alumniData];

    connectedPeople.sort((a, b) => {
      return b.connections - a.connections;
    });

    const mostConnected = connectedPeople.slice(0, 5);

    const textos = mostConnected.map(
      (person) => person.name + " - " + person.connections + " connections",
    );

    showResults(filtersListMobile, textos);
    showResults(filtersListDesktop, textos);
  });
});

// ==========================
// SEARCH
// ==========================

function setupNetworkingSearch() {
  setupSearch(searchInput, alumniData, ["name", "role"], (resultSearch) => {
    if (resultSearch.length === 0) {
      setEmptyState(
        [mobileList, topList, suggestionsList],
        "No se han encontrado resultados.",
      );
      return;
    }

    renderAlumni(resultSearch);
  });
}

// ==========================
// LOAD DATA
// ==========================

async function loadDataNetworking() {
  setLoadingState(
    [mobileList, topList, suggestionsList],
    "Cargando información...",
  );

  try {
    alumniData = await loadData("/data/networking.json");

    renderAlumni(alumniData);

    return true;
  } catch (error) {
    setErrorState(
      [mobileList, topList, suggestionsList],
      "No se ha podido cargar la información.",
    );

    return false;
  }
}

// ==========================
// INIT
// ==========================

async function initNetworking() {
  const loaded = await loadDataNetworking();

  if (loaded) {
    setupNetworkingSearch();
  }
}

initNetworking();
