const v=document.querySelector(".js_searchForm"),h=document.querySelector(".js_searchInput"),d=document.querySelector(".js_seriesList"),_=document.querySelector(".js_favoritesList"),S=document.querySelector(".js_resetFavorites");let r=[],i=[];const g="https://placehold.co/210x295/f5f5f5/666666/?text=TV",u="favoriteSeries";function f(e){return e&&e.medium?e.medium:g}function I(e){return i.find(s=>s.id===e)!==void 0}function l(){localStorage.setItem(u,JSON.stringify(i))}function F(){const e=localStorage.getItem(u);e!==null&&(i=JSON.parse(e))}function a(){let e="";if(r.length===0)e='<li class="series__message">No hay resultados</li>';else for(const t of r){const s=t.show.id,n=t.show.name,o=f(t.show.image),m=I(s)?"series__item--favorite":"";e+=`
             <li class="series__item ${m}">
             <button class="series__button js_seriesItem" type="button" data-id="${s}">
             <img class="series__image" src="${o}" alt=""/>
             <span class="series__title">${n}</span>
             </button>
             </li>`}d.innerHTML=e,p()}function c(){let e="";if(i.length===0)e='<li class="favorites__empty">Todavía no tienes series favoritas</li>';else for(const t of i){const s=f(t.image);e+=`<li class="favorites__item">
         <button class="favorites__delete js_deleteFavorite" data-id="${t.id}"
         type="button"
         aria-label="Eliminar ${t.name} de favoritas" title="Eliminar de favoritas">
         x</button>
         <img class="favorites__image" src="${s}" alt=""/>
         <h3 class="favorites__title">${t.name}</h3></li>`}_.innerHTML=e,L()}function p(){const e=document.querySelectorAll(".js_seriesItem");for(const t of e)t.addEventListener("click",j)}function L(){const e=document.querySelectorAll(".js_deleteFavorite");for(const t of e)t.addEventListener("click",T)}function y(){const e=h.value.trim();if(e===""){r=[],a();return}fetch(`//api.tvmaze.com/search/shows?q=${encodeURIComponent(e)}`).then(t=>t.json()).then(t=>{r=t,a()}).catch(()=>{d.innerHTML='<li class="series__message">Ha ocurrido un error al buscar las series</li>'})}function b(e){e.preventDefault(),y()}function j(e){const t=parseInt(e.currentTarget.dataset.id),s=r.find(o=>o.show.id===t),n=i.findIndex(o=>o.id===t);if(n===-1){const o={id:s.show.id,name:s.show.name,image:s.show.image};i.push(o)}else i.splice(n,1);l(),c(),a()}function T(e){const t=parseInt(e.currentTarget.dataset.id);i=i.filter(s=>s.id!==t),l(),c(),a()}function k(){i=[],l(),c(),a()}F();c();v.addEventListener("submit",b);S.addEventListener("click",k);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXMiOltdLCJzb3VyY2VzQ29udGVudCI6W10sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OzsifQ==
