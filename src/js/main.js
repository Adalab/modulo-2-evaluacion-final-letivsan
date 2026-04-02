'use strict';
/*SECCIÓN DE QUERY SELECTORS*/
const searchInput = document.querySelector('.js_searchInput');
const searchButton = document.querySelector('.js_searchButton');
const seriesList = document.querySelector('.js_seriesList');

/*SECCIÓN DE DATOS*/
let seriesData = [];
const defaultImage = 'https://placehold.co/210x295/f5f5f5/666666/?text=TV';

/*SECCIÓN DE FUNCIONES*/
function renderSeries () {
    let html = '';

    for (const eachSeries of seriesData) {
        const seriesName = eachSeries.show.name;

        let seriesImage = defaultImage;

        if (eachSeries.show.image && eachSeries.show.image.medium) {
            seriesImage = eachSeries.show.image.medium;
        }
    
        html += `<li class="series__item">
        <img class="series__image" src="${seriesImage}" alt="${seriesName}"/>
        <h3 class= "series__title">${seriesName}</h3></li>`;
    }
    
    seriesList.innerHTML = html;
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
            console.log('Datos que devuelve la API:', data);

            seriesData = data;
            console.log ('seriesData actualizado', seriesData);

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

/*SECCIÓN DE ACCIONES AL CARGAR LA PÁGINA - EJECUCCIÓN*/
searchButton.addEventListener('click', handleClickSearch);
