const backButton = document.getElementById("mobile-back-btn");
const mobileTitle = document.getElementById("mobile-header-title");

const VALID_TABS = ["home", "networking", "job-opportunities", "events"];

const TAB_TITLES = {
  home: "Inici",
  networking: "Xarxa",
  "job-opportunities": "Oportunitats de feina",
  events: "Esdeveniments",
};

function showTab(tabName, updateUrl = true) {
  if (!VALID_TABS.includes(tabName)) {
    tabName = "home";
  }
  // Ocultar todas las secciones
  document.querySelectorAll(".tab-section").forEach((section) => {
    section.classList.remove("is-active");
  });
  // Mostrar la sección seleccionada
  const section = document.getElementById(tabName);
  if (section) {
    section.classList.add("is-active");
  }

  // TÍTULO DEL HEADER MOBILE
  if (mobileTitle) {
    mobileTitle.textContent = TAB_TITLES[tabName];
  }

  if (backButton) {
    backButton.hidden = tabName === "home";
  }

  // NAVEGACIÓN DESKTOP
  document.querySelectorAll(".desktop-nav__link").forEach((link) => {
    link.classList.remove("desktop-nav__link--active");
    link.removeAttribute("aria-current");
  });

  const desktopLink = document.querySelector(
    `.desktop-nav__link[data-tab="${tabName}"]`,
  );

  if (desktopLink) {
    desktopLink.classList.add("desktop-nav__link--active");
    desktopLink.setAttribute("aria-current", "page");
  }

  // NAVEGACIÓN MOVIL
  document.querySelectorAll(".mobile-bottom-nav__item").forEach((item) => {
    item.classList.remove("mobile-bottom-nav__item--active");
    item.removeAttribute("aria-current");
  });

  const mobileItem = document.querySelector(
    `.mobile-bottom-nav__item[data-tab="${tabName}"]`,
  );

  if (mobileItem) {
    mobileItem.classList.add("mobile-bottom-nav__item--active");
    mobileItem.setAttribute("aria-current", "page");
  }

  if (updateUrl) {
    window.location.hash = tabName;
  }
}

// BOTONES DE NAVEGACIÓN (nav superior + bottom nav)
document.querySelectorAll("[data-tab]").forEach((tab) => {
  tab.addEventListener("click", (event) => {
    event.preventDefault();
    const tabName = tab.dataset.tab;
    showTab(tabName);
  });
});

//Botón flecha-atrás
function goBack() {
  if (window.history.length > 1) {
    window.history.back();
  } else {
    showTab("home");
  }
}

// aIdentificar el clic del boton atrás
if (backButton) {
  backButton.addEventListener("click", (event) => {
    event.preventDefault();
    goBack();
  });
}

// escuchar cambios en historial
window.addEventListener("hashchange", () => {
  const tabName = window.location.hash.substring(1);
  showTab(tabName, false);
});

// ESTADO INICIAL
const initialTab = window.location.hash.substring(1);
showTab(initialTab || "home", false);
