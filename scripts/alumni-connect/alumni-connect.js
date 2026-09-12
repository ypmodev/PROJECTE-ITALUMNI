const VALID_TABS = ['home', 'networking', 'job-opportunities', 'events'];

const TAB_TITLES = {
    home: 'Inici',
    networking: 'Xarxa',
    'job-opportunities': 'Oportunitats de feina',
    events: 'Esdeveniments'
};


function showTab(tabName) {

    // Si el tab no es válido, mostramos Home
    if (!VALID_TABS.includes(tabName)) {
        tabName = 'home';
    }

    // Ocultar todas las secciones
    document.querySelectorAll('.tab-section').forEach(section => {
        section.classList.remove('is-active');
    });

    // Mostrar la sección seleccionada
    const section = document.getElementById(tabName);

    if (section) {
        section.classList.add('is-active');
    }


    // =========================
    // TÍTULO DEL HEADER MOBILE
    // =========================

    const mobileTitle = document.getElementById('mobile-header-title');

    if (mobileTitle) {
        mobileTitle.textContent = TAB_TITLES[tabName];
    }


    // =========================
    // FLECHA 
    // =========================

    const backButton = document.getElementById('mobile-back-btn');

    if (backButton) {
        backButton.hidden = tabName === 'home';
    }


    // =========================
    // NAVEGACIÓN DESKTOP
    // =========================

    document.querySelectorAll('.desktop-nav__link').forEach(link => {
        link.classList.remove('desktop-nav__link--active');
        link.removeAttribute('aria-current');
    });

    const desktopLink = document.querySelector(
        `.desktop-nav__link[data-tab="${tabName}"]`
    );

    if (desktopLink) {
        desktopLink.classList.add('desktop-nav__link--active');
        desktopLink.setAttribute('aria-current', 'page');
    }


    // =========================
    // NAVEGACIÓN MOBILE
    // =========================

    document.querySelectorAll('.mobile-bottom-nav__item').forEach(item => {
        item.classList.remove('mobile-bottom-nav__item--active');
        item.removeAttribute('aria-current');
    });

    const mobileItem = document.querySelector(
        `.mobile-bottom-nav__item[data-tab="${tabName}"]`
    );

    if (mobileItem) {
        mobileItem.classList.add('mobile-bottom-nav__item--active');
        mobileItem.setAttribute('aria-current', 'page');
    }
}


// =========================
// BOTONES DE NAVEGACIÓN (nav superior + bottom nav, tienen data-tab)
// =========================

document.querySelectorAll('[data-tab]').forEach(tab => {

    tab.addEventListener('click', event => {

        event.preventDefault();

        const tabName = tab.dataset.tab;

        showTab(tabName);
    });
});


// =========================
// ENLACES DE LAS TARJETAS DE HOME (no tienen data-tab, usan href="#...")
// =========================

document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener('click', event => {

        const target = link.getAttribute('href').substring(1);

        if (!VALID_TABS.includes(target)) {
            return;
        }

        event.preventDefault();

        showTab(target);
    });
});


// =========================
// ESTADO INICIAL
// =========================

showTab('home');