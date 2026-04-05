'use strict';
/*SECCIÓN DE QUERY SELECTORS*/
const searchForm = document.querySelector('.js_searchForm');
const searchInput = document.querySelector('.js_searchInput');
const searchButton = document.querySelector('.js_searchButton');
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
//Saber si una serie está ya en favoritas
function isFavorite(seriesId) {
    const foundFavorite = favoriteSeries.find(
        (eachFavorite) => eachFavorite.id === seriesId
    );
    // console.log('Es fav¿?', seriesId, foundFavorite);
    return foundFavorite !== undefined;
}

//Guardar favs en localStorage
function saveFavoritesInLocalStorage() {
    localStorage.setItem(localStorageKey, JSON.stringify(favoriteSeries));
    // console.log('Lo que hay en localStorage ahora', localStorage.getItem('favoriteSeries'));
}

//Cargar favs desde localStorage
function loadFavoritesFromLocalStorage() {
    const savedFavorites = localStorage.getItem(localStorageKey);

    if (savedFavorites !== null) {
        favoriteSeries = JSON.parse(savedFavorites);
    //     console.log ('Favoritos cargados', favoriteSeries);
    // } else {
    //     console.log ('No hay favoritos guardados');
    }
}

function renderSeries () {
    // console.table(seriesData);
    let html = '';

    if (seriesData.length === 0) {
        html = '<li class="series__messsage">No hay resultados</li>';
    } else {
        //recorremos array de series
        for (const eachSeries of seriesData) {
             const seriesId = eachSeries.show.id;
             const seriesName = eachSeries.show.name;
             const seriesImage = getImageUrl(eachSeries.show.image);
             const favoriteClass = isFavorite(seriesId) ? 'series__item--favorite' : '';
             
             html += `
             <li class="series__item js_seriesItem ${favoriteClass}" data-id="${seriesId}">
        <img class="series__image" src="${seriesImage}" alt="${seriesName}"/>
        <h3 class="series__title">${seriesName}</h3></li>`;
    }
}

    //Pintar todo el HTML
    seriesList.innerHTML = html;
    // console.log ('HTML generado para las series', html);
    //Volver a añadir los eventos a cada serie
    addEventListenersToSeries();
}

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
         <h3 class= "favorites__title">${eachFavorite.name}</h3></li>`;
        }
    }

    favoritesList.innerHTML = html;
    //Después de pintar las favoritas, evento de botones x
    addEventListenersToDeleteButtons();
}

//Escuchar clicks en la x de cada fav
function addEventListenersToSeries() {
    const seriesItems = document.querySelectorAll ('.js_seriesItem');

    for (const eachSeriesItem of seriesItems) {
        eachSeriesItem.addEventListener('click', handleClickSeries);
    }
}

function addEventListenersToDeleteButtons () {
    const deleteButtons = document.querySelectorAll('.js_deleteFavorite');
    for (const eachButton of deleteButtons) {
        eachButton.addEventListener('click', handleClickDeleteFavorite);
    }
}

function getSeriesFromApi() {
    const searchText = searchInput.value.trim();
    // console.log('Texto buscado', searchText);

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
            seriesList.innerHTML =
            '<li class="series__message">Ha ocurrido un error al buscar las series</li>';
        });
    }
    
/*SECCIÓN DE FUNCIONES DE EVENTOS*/
function handleSubmitSearch (ev) {
    ev.preventDefault ();
    getSeriesFromApi();
}

function handleClickSeries(ev) {
    const clickedSeriesId = parseInt(ev.currentTarget.dataset.id);
    // console.log('serie clicada en id:', clickedSeriesId);

    const clickedSeries = seriesData.find(
       (eachSeries) => eachSeries.show.id === clickedSeriesId);
    //    console.dir(clickedSeries);

    const favoriteIndex = favoriteSeries.findIndex(
        (eachFavorite) => eachFavorite.id === clickedSeriesId);
        // console.log('índice en favoritos', favoriteIndex);

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

    // console.log('Estado actual de favoritos', favoriteSeries);
    saveFavoritesInLocalStorage();
    renderFavorites();
    renderSeries();
    }

    //Borrar fav concreta desde la x
    function handleClickDeleteFavorite (ev) {
        const clickedFavoriteId = parseInt(ev.currentTarget.dataset.id);

        const updatedFavorites = favoriteSeries.filter(
            (eachFavorite) => eachFavorite.id !== clickedFavoriteId);
        
        favoriteSeries = updatedFavorites;

        saveFavoritesInLocalStorage();
        renderFavorites();
        renderSeries();
    }

    function handleClickResetFavorites() {
        favoriteSeries = [];
        saveFavoritesInLocalStorage();
        renderFavorites();
        renderSeries();
    }

/*SECCIÓN DE ACCIONES AL CARGAR LA PÁGINA - EJECUCCIÓN*/
loadFavoritesFromLocalStorage();
renderFavorites();

searchForm.addEventListener('submit', handleSubmitSearch);
resetFavoritesButton.addEventListener('click', handleClickResetFavorites);
;

