'use strict';
/*SECCIÓN DE QUERY SELECTORS*/
const searchForm = document.querySelector('.js_searchForm');
const searchInput = document.querySelector('.js_searchInput');
const seriesList = document.querySelector('.js_seriesList');
const favoritesList = document.querySelector('.js_favoritesList');
const resetFavoritesButton = document.querySelector('.js_resetFavorites');

/*SECCIÓN DE DATOS*/
let seriesData = [];
let favoriteSeries = [];
const defaultImage = 'https://placehold.co/210x295/f5f5f5/666666/?text=TV';
const localStorageKey = 'favoriteSeries';

/*SECCIÓN DE FUNCIONES*/
function getImageUrl(image) {
    return image && image.medium ? image.medium : defaultImage;
}

function isFavorite(seriesId) {
    const foundFavorite = favoriteSeries.find(
        (eachFavorite) => eachFavorite.id === seriesId
    );
    return foundFavorite !== undefined;
}

function saveFavoritesInLocalStorage() {
    localStorage.setItem(localStorageKey, JSON.stringify(favoriteSeries));
}

//Carga los favoritos guardados cuando arranca la página
function loadFavoritesFromLocalStorage() {
    const savedFavorites = localStorage.getItem(localStorageKey);

    if (savedFavorites !== null) {
        favoriteSeries = JSON.parse(savedFavorites);
    }
}

//Dibuja en la pantalla los resultados de la búsqueda actual
function renderSeries() {
    let html = '';

    if (seriesData.length === 0) {
        html = '<li class="series__message">No hay resultados</li>';
    } else {
        for (const eachSeries of seriesData) {
             const seriesId = eachSeries.show.id;
             const seriesName = eachSeries.show.name;
             const seriesImage = getImageUrl(eachSeries.show.image);
             const favoriteClass = isFavorite(seriesId) ? 'series__item--favorite' : '';
             
             html += `
             <li class="series__item ${favoriteClass}">
             <button class="series__button js_seriesItem" type="button" data-id="${seriesId}">
             <img class="series__image" src="${seriesImage}" alt="${seriesName}"/>
             <span class="series__title">${seriesName}</span>
             </button>
             </li>`;
    }
}
    seriesList.innerHTML = html;
    addEventListenersToSeries();
}

//Dibuja en pantalla la columna de favoritas
function renderFavorites() {
    let html = '';
    if (favoriteSeries.length === 0) {
        html = '<li class="favorites__empty">Todavía no tienes series favoritas</li>';
    } else {
        for (const eachFavorite of favoriteSeries) {
        const favoriteImage = getImageUrl(eachFavorite.image);
         html += `<li class="favorites__item">
         <button class="favorites__delete js_deleteFavorite" data-id="${eachFavorite.id}"
         type="button"
         aria-label="Eliminar ${eachFavorite.name} de favoritas" title="Eliminar de favoritas">
         x</button>
         <img class="favorites__image" src="${favoriteImage}" alt="${eachFavorite.name}"/>
         <h3 class="favorites__title">${eachFavorite.name}</h3></li>`;
        }
    }

    favoritesList.innerHTML = html;
    addEventListenersToDeleteButtons();
}

function addEventListenersToSeries() {
    const seriesItems = document.querySelectorAll ('.js_seriesItem');

    for (const eachSeriesItem of seriesItems) {
        eachSeriesItem.addEventListener('click', handleClickSeries);
    }
}

function addEventListenersToDeleteButtons() {
    const deleteButtons = document.querySelectorAll('.js_deleteFavorite');
    for (const eachButton of deleteButtons) {
        eachButton.addEventListener('click', handleClickDeleteFavorite);
    }
}

//Busca series en la API según el texto escrito en el input
function getSeriesFromApi() {
    const searchText = searchInput.value.trim();

    if (searchText === '') {
        seriesData = [];
        renderSeries();
        return;
    }

    fetch(`//api.tvmaze.com/search/shows?q=${encodeURIComponent(searchText)}`)
        .then((response) => response.json())
        .then((data) => {
            seriesData = data;
            renderSeries();
        })
        .catch(() => {
            seriesData = [];
            seriesList.innerHTML =
            '<li class="series__message">Ha ocurrido un error al buscar las series</li>';
        });
    }
    
/*SECCIÓN DE FUNCIONES DE EVENTOS*/
function handleSubmitSearch(ev) {
    ev.preventDefault();
    getSeriesFromApi();
}

//Añade o quita una serie de favoritas al hacer click
function handleClickSeries(ev) {
    const clickedSeriesId = parseInt(ev.currentTarget.dataset.id);

    const clickedSeries = seriesData.find(
       (eachSeries) => eachSeries.show.id === clickedSeriesId);

    const favoriteIndex = favoriteSeries.findIndex(
        (eachFavorite) => eachFavorite.id === clickedSeriesId);

    if (favoriteIndex === -1) {
        const favoriteObject = {
            id: clickedSeries.show.id,
            name: clickedSeries.show.name,
            image: clickedSeries.show.image
        };

        favoriteSeries.push(favoriteObject);
    } else {
        favoriteSeries.splice(favoriteIndex, 1);
    }

    saveFavoritesInLocalStorage();
    renderFavorites();
    renderSeries();
    }
    
    //Elimina una favorita concreta desde la columna izquierda
    function handleClickDeleteFavorite(ev) {
        const clickedFavoriteId = parseInt(ev.currentTarget.dataset.id);

        favoriteSeries = favoriteSeries.filter(
            (eachFavorite) => eachFavorite.id !== clickedFavoriteId);
            
        saveFavoritesInLocalStorage();
        renderFavorites();
        renderSeries();
    }
    
    //Borra todas las favoritas
    function handleClickResetFavorites() {
        favoriteSeries = [];
        saveFavoritesInLocalStorage();
        renderFavorites();
        renderSeries();
    }

/*SECCIÓN DE ACCIONES AL CARGAR LA PÁGINA - EJECUCIÓN*/
loadFavoritesFromLocalStorage();
renderFavorites();

searchForm.addEventListener('submit', handleSubmitSearch);
resetFavoritesButton.addEventListener('click', handleClickResetFavorites);

