import { Estates, Favorites } from './interfases.js';
import { renderBlock, updateBlock } from './lib.js';
import { getFavoritesAmount } from './user.js'
function getResultsToRender(results: Estates[]): string {
  let resultsToRender = '';
  results.forEach(result => {
    resultsToRender += `
      <li class="result">
      <div class="result-container">
          <div class="result-img-container">
              <div class="favorites" data-id=${result.id}> </div>
              <img class="result-img" src=${result.img} alt=${result.imgAlt}>
          </div>
          <div class="result-info">
              <div class="result-info--header">
                  <p>${result.name} </p>
                  <p class="price">${result.price}&#8381; </p>
              </div>
              <div class="result-info--map"> <i class="map-icon"> </i>${result.distanse}</div>
              <div class="result-info--descr"> ${result.describe} </div>
              <div class="result-info--footer">
                  <div>
                      <button>Забронировать</button>
                  </div>
              </div>
          </div>
      </div>
  </li>
    `
  });
  return resultsToRender;
}
function FavoriteHandler(favoritesElems: NodeListOf<HTMLDivElement>, results: Estates[]) {
  favoritesElems.forEach(favorite => {
    favorite.addEventListener('click', (event) => {
      //Обработчик для отмены избранного
      if (favorite.classList.contains('active')) {
        const favorites: Favorites[] = JSON.parse(localStorage.getItem('favoriteItems'));
        favorites.splice(favorites.indexOf(favorites.find(el => el.id == favorite.dataset.id)), 1);
        localStorage.setItem('favoriteItems', JSON.stringify(favorites))
        localStorage.setItem('favoritesAmount', `${+localStorage.getItem('favoritesAmount') - 1}`)
        //Обработчик для добавления избранного
      } else {
        const favorites: Favorites[] = localStorage.getItem('favoriteItems')
          ? JSON.parse(localStorage.getItem('favoriteItems')) : []
        const result = results.find(el => el.id == favorite.dataset.id);
        favorites.push({ id: result.id, name: result.name, img: result.img });
        localStorage.setItem('favoriteItems', JSON.stringify(favorites));
        localStorage.setItem('favoritesAmount', `${+localStorage.getItem('favoritesAmount') + 1}`)
      }
      favorite.classList.toggle("active");
      updateBlock(".favoritesCount", `${getFavoritesAmount()}`);
      console.log(`Проверка localStorage на наличие избранных элементов: `, localStorage.getItem("favoriteItems"));
      console.log(`Проверка localStorage на кол-во избранных элементов: `, localStorage.getItem("favoritesAmount"));
    })
  })
}
function filterHandler(filterElem: HTMLSelectElement) {
  filterElem.addEventListener('change', (event) => {
    event.preventDefault();
    const filterName = filterElem.value;
    if (filterName == "Сначала дешёвые") {
      const results: Estates[] = JSON.parse(localStorage.getItem('results'));
      results.sort((first, second) => first.price - second.price)
      updateBlock(".results-list", getResultsToRender(results));
    }
    if (filterName == "Сначала дорогие") {
      const results: Estates[] = JSON.parse(localStorage.getItem('results'));
      results.sort((first, second) => second.price - first.price)
      updateBlock(".results-list", getResultsToRender(results));
    }
    if (filterName == "Сначала ближе") {
      const results: Estates[] = JSON.parse(localStorage.getItem('results'));
      results.sort((first, second) => first.distanseNumber - second.distanseNumber);
      updateBlock(".results-list", getResultsToRender(results));
    }
  })
}

export function renderSearchStubBlock(): void {
  renderBlock(
    'search-results-block',
    `
    <div class="before-results-block">
      <img src="img/start-search.png" />
      <p>Чтобы начать поиск, заполните форму и&nbsp;нажмите "Найти"</p>
    </div>
    `
  )
}

export function renderEmptyOrErrorSearchBlock(reasonMessage: string) {
  renderBlock(
    'search-results-block',
    `
    <div class="no-results-block">
      <img src="../img/no-results.png" />
      <p>${reasonMessage}</p>
    </div>
    `
  )
}

export function renderSearchResultsBlock(results: Estates[]): void {
  renderBlock(
    'search-results-block',
    `
    <div class="search-results-header">
      <p>Результаты поиска</p>
      <div class="search-results-filter">
          <span><i class="icon icon-filter"></i> Сортировать:</span>
          <select class="filter">
              <option>Сначала дешёвые</option>
              <option>Сначала дорогие</option>
              <option>Сначала ближе</option>
          </select>
      </div>
    </div>
    <ul class="results-list" id="results-list">
    </ul>
    `
  )
  renderBlock("results-list", getResultsToRender(results));
  localStorage.setItem('favoriteItems', '');
  const favoritesElems: NodeListOf<HTMLDivElement> = document.querySelectorAll(".favorites");
  FavoriteHandler(favoritesElems, results);
  const filterElem: HTMLSelectElement = document.querySelector('.filter');
  filterHandler(filterElem);
}

