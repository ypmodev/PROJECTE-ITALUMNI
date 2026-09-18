const template = document.getElementById('networking-card-template'); 
const mobileList = document.getElementById('networking-mobile-list');
const topList = document.getElementById('networking-top-list');
const suggestionsList = document.getElementById('networking-suggestions-list');
const filtersListMobile = document.getElementById('networking-mobile-filters-list');
const filtersListDesktop = document.getElementById('networking-desktop-filters-list'); 
const searchInput = document.querySelectorAll('.search__input');
const mobileFilterButtons = document.querySelectorAll('.networking-filter-mobile');
const filterButtonPopulars = document.querySelectorAll('.desktop-filter-tab.btn-filter-populars');
const filterButtonActivities = document.querySelectorAll('.desktop-filter-tab.btn-filter-activities');
const filterButtonsDesktop = document.querySelectorAll('.desktop-filter-tab');

//Active-filtro desktop
filterButtonsDesktop.forEach(button => {
    button.addEventListener('click', () => {
        
        filterButtonsDesktop.forEach(button => {
            button.classList.remove('active');
        });
        
        button.classList.add('active');
    });
});

//Active-filtro movil
mobileFilterButtons.forEach(button => {
    button.addEventListener('click', () => {

        const filter = button.dataset.networkingFilter;
        const desktopButton = document.querySelector(`.desktop-filter-tab.btn-filter-${filter}`
        );

        desktopButton.click();

        mobileList.style.display = 'none';
        filtersListMobile.style.display = 'block';

        mobileFilterButtons.forEach(button => {
            button.classList.remove('active');
        });

        button.classList.add('active');
    });
});


//Cards
function renderAlumni(alumni) {
 
    mobileList.innerHTML = '';
    topList.innerHTML = '';
    suggestionsList.innerHTML = ''; 

    alumni.forEach(person => {
        // Mobile card
        const mobileCard = cloneTemplate(template);
        const mobileArticle = mobileCard.querySelector('.networking-card');
 
        mobileArticle.querySelector('.networking-card__image').src = person.avatar;
        mobileArticle.querySelector('.networking-card__name').textContent = person.name;
        mobileArticle.querySelector('.networking-card__class').textContent = `Class of ${person.classYear}`;
        mobileArticle.querySelector('.networking-card__role').textContent = person.role;
        mobileArticle.querySelector('.networking-card__location').textContent = person.location;
        mobileArticle.querySelector('.networking-card__action').textContent = 'Veure perfil';
 
        addCardToList(mobileList, mobileArticle);
 
        // Desktop card
        const desktopCard = cloneTemplate(template);
        const desktopArticle = desktopCard.querySelector('.networking-card');
 
        desktopArticle.querySelector('.networking-card__image').src = person.avatar;
        desktopArticle.querySelector('.networking-card__name').textContent = person.name;
        desktopArticle.querySelector('.networking-card__role').textContent = person.role;
        desktopArticle.querySelector('.networking-card__location').textContent = person.location;
        desktopArticle.querySelector('.networking-card__action').textContent = 'Veure perfil';
 
        //priorizo personas conectadas y las que no las dejo como sugerencias
        if (person.connected) {
            addCardToList(topList, desktopArticle); //añado en la toplist
        } else {
            addCardToList(suggestionsList, desktopArticle); //añado en la suggestionsList
        }
    });
}
 
// Mostrar resultados. 
function showResults(lista, textos) {
 
    lista.innerHTML = ''; 
    textos.forEach(texto => {
        const li = document.createElement('li');
        li.textContent = texto;
        lista.appendChild(li);
    });
} 

let alumniData = [];
//Sacar datos json
async function loadDataNetworking() { 
    setLoadingState(
        [mobileList, topList, suggestionsList],
        "Cargando información..."
    );
   
    try {
        alumniData = await loadData("/data/networking.json");
        renderAlumni(alumniData);    
        return true;
    
        } catch (error) {
        setErrorState(
            [mobileList, topList, suggestionsList],
            "No se ha podido cargar la información."
        );
        return false;
    }
}

//Search
function setupNetworkingSearch() {
    setupSearch(searchInput, alumniData,['name', 'role'], resultSearch => {
            if (resultSearch.length === 0) {
                setEmptyState([mobileList, topList, suggestionsList],
                    "No se han encontrado resultados."
                );
                return;
            }

            renderAlumni(resultSearch);
        }
    );
}

//Orden de ejecución
async function initNetworking() {
    const loaded = await loadDataNetworking();

    if (loaded) {
        setupNetworkingSearch();
    }
}

initNetworking();

//Filtro actividad 
filterButtonActivities.forEach(button => {
    button.addEventListener('click', () => {

        const activities = [];

        // actividades de todos los alumnos
        alumniData.forEach(person => {
            person.activities.forEach(activity => {
                activities.push({
                    ...activity,
                    personName: person.name
                });
            });
        });

        // Ordenamos las actividades 
        activities.sort((a, b) => {
            return new Date(b.date) - new Date(a.date);
        });

        // 5 más recientes
        const recentActivities = activities.slice(0, 5);

        const textos = recentActivities.map(activity =>
             activity.personName + ' ' + activity.text);

        showResults(filtersListMobile, textos);
        showResults(filtersListDesktop, textos);
    });
});

// Filtro populares 
filterButtonPopulars.forEach(button => {
    button.addEventListener('click', () => {
        // Hacemos una copia de alumni para poder ordenarla
        const populars = [...alumniData];
        // Ordenamos de más seguidores a menos seguidores
        populars.sort((a, b) => {
            return b.followers - a.followers;
        });

        // Nos quedamos con los 5 primeros
        const mostPopulars = populars.slice(0, 5);

        const textos = mostPopulars.map(person => person.name + ' - ' + person.followers + ' followers');

        showResults(filtersListMobile, textos);
        showResults(filtersListDesktop, textos);
    });
});

// Filtro Més connectats
const filterButtonConnected = document.querySelectorAll('.btn-filter-mes-connectats');

filterButtonConnected.forEach(button => {
    button.addEventListener('click', () => {
        // Hacemos una copia de los alumnos
        const connectedPeople = [...alumniData];
        // Ordenamos de más conexiones a menos
        connectedPeople.sort((a, b) => {
            return b.connections - a.connections;
        });
        // Nos quedamos con los 5 primeros
        const mostConnected = connectedPeople.slice(0, 5);      
        const textos = mostConnected.map(person => person.name + ' - ' + person.connections + ' connections');

        showResults(filtersListMobile, textos);
        showResults(filtersListDesktop, textos);
    });
});