'use strict';
/*SECCIÓN DE QUERY SELECTORS*/
const searchInput = document.querySelector('.js_searchInput');
const searchButton = document.querySelector('.js_searchButton');
const seriesList = document.querySelector('.js_seriesList');
const favoritesList = document.querySelector('.js_favoritesList');
const resetFavoritesButton = document.querySelector('.js_resetFavorites');

/*SECCIÓN DE DATOS*/
let seriesData = [];
let favoriteSeries = [];
const defaultImage = 'https://placehold.co/210x295/f5f5f5/666666/?text=TV';

/*SECCIÓN DE FUNCIONES*/
//Saber si una serie está ya en favoritas
function isFavorite(seriesId) {
    const foundFavorite = favoriteSeries.find(
        (eachFavorite) => eachFavorite.id === seriesId
    );

    console.log('Es fav¿?', seriesId, foundFavorite);
    return foundFavorite !== undefined;
}

function renderSeries () {
    console.table(seriesData);
    let html = '';

//recorremos array de series
    for (const eachSeries of seriesData) {
        const seriesId = eachSeries.show.id;
        const seriesName = eachSeries.show.name;
        const seriesImage = 
        eachSeries.show.image && eachSeries.show.image.medium 
        ? eachSeries.show.image.medium : defaultImage;
     
        //Comprobar si la serie es favorita
        const favoriteClass = isFavorite(seriesId) ? 'series__item--favorite' : '';

        //Construír el HTML de cada serie
        html += `<li class="series__item js_seriesItem ${favoriteClass}" data-id="${seriesId}">
        <img class="series__image" src="${seriesImage}" alt="${seriesName}"/>
        <h3 class="series__title">${seriesName}</h3></li>`;
    }
    
    //Pintar todo el HTMl
    seriesList.innerHTML = html;
    console.log ('HTML generado para las series', html);
    //Volver a añadir los eventos a cada serie
    addEventListenersToSeries();
}

function renderFavorites() {
    let html = '';

    if (favoriteSeries.length === 0) {
        html = '<li class="favorites__empty">Todavía no tienes series favoritas</li>';
    } else {
        for (const eachFavorite of favoriteSeries) {
        const favoriteImage = 
        eachFavorite.image && eachFavorite.image.medium 
        ? eachFavorite.image.medium : defaultImage;

         html += `<li class="favorites__item">
         <img class="favorites__image" src="${favoriteImage}" alt="${eachFavorite.name}"/>
         <h3 class= "favorites__title">${eachFavorite.name}</h3></li>`;
        }
    }

    favoritesList.innerHTML = html;
}

function addEventListenersToSeries() {
    const seriesItems = document.querySelectorAll ('.js_seriesItem');

    for (const eachSeriesItem of seriesItems) {
        eachSeriesItem.addEventListener('click', handleClickSeries);
    }
}

function getSeriesFromApi() {
    const searchText = searchInput.value.trim();
    console.log('Texto buscado', searchText);

    if (searchText === '') {
        seriesList.innerHTML = '';
        return;
    }

    fetch(`//api.tvmaze.com/search/shows?q=${searchText}`)
        .then((response) => response.json())
        .then((data) => {
            seriesData = data;
            renderSeries();
        })
        .catch((error) => {
            console.log ('Hay un error', error);
        });
    }
    
/*SECCIÓN DE FUNCIONES DE EVENTOS*/
function handleClickSearch (ev) {
    ev.preventDefault ();
    console.log ('Click en buscar');
    getSeriesFromApi();
}

function handleClickSeries(ev) {
    const clickedSeriesId = parseInt(ev.currentTarget.dataset.id);
    console.log('serie clicada en id:', clickedSeriesId);

    const clickedSeries = seriesData.find(
       (eachSeries) => eachSeries.show.id === clickedSeriesId);
       console.dir(clickedSeries);

    const favoriteIndex = favoriteSeries.findIndex(
        (eachFavorite) => eachFavorite.id === clickedSeriesId);
        console.log('índice en favoritos', favoriteIndex);

    if (favoriteIndex === -1) {
        console.log('añadiendo a favoritos');

        const favoriteObject = {
            id: clickedSeries.show.id,
            name: clickedSeries.show.name,
            image: clickedSeries.show.image
        };

        favoriteSeries.push(favoriteObject);
    } else {
        favoriteSeries.splice(favoriteIndex, 1);
    }

    renderFavorites();
    renderSeries();
    }

    function handleClickResetFavorites() {
        favoriteSeries = [];
        renderFavorites();
        renderSeries;
    }

/*SECCIÓN DE ACCIONES AL CARGAR LA PÁGINA - EJECUCCIÓN*/
searchButton.addEventListener('click', handleClickSearch);
resetFavoritesButton.addEventListener('click', handleClickResetFavorites);
renderFavorites();

