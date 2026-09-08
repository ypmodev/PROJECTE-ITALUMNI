const VALID_TABS = ['home', 'networking', 'job-opportunities'];


function showTab(tabName) {   
    document.querySelectorAll('.tab-section').forEach(section =>
         section.classList.remove('is-active'));   
    document.querySelector(`[data-tab-section="${tabName}"]`) 
        .classList.add('is-active');
}


document.querySelectorAll('[data-tab]').forEach(tab => {
    tab.addEventListener('click', () => {
        const tabName = tab.dataset.tab;
        showTab(tabName); 
        
        document.querySelectorAll('.desktop-nav__link')
            .forEach(link => link.classList.remove('desktop-nav__link--active'));

        // 3. Activar el link correcto en desktop-nav
        const desktopLink = document.querySelector(`.desktop-nav__link[data-tab="${tabName}"]`);
        if (desktopLink) desktopLink.classList.add('desktop-nav__link--active');

        // 4. Quitar estado activo en mobile-bottom-nav
        document.querySelectorAll('.mobile-bottom-nav__item')
            .forEach(item => item.classList.remove('mobile-bottom-nav__item--active'));

        // 5. Activar el item correcto en mobile-bottom-nav
        const mobileItem = document.querySelector(`.mobile-bottom-nav__item[data-tab="${tabName}"]`);
        if (mobileItem) mobileItem.classList.add('mobile-bottom-nav__item--active');//resultado tab activa

    });
});

