import { renderBlock } from './lib.js'

export function renderUserBlock(favoriteItemsAmount: number, userName: string, userAvatarLink: string) {
  const favoritesCaption = favoriteItemsAmount ? favoriteItemsAmount : 'ничего нет';
  const hasFavoriteItems = favoriteItemsAmount ? true : false;
  getUserData();
  getFavoritesAmount();

  renderBlock(
    'user-block',
    `
    <div class="header-container">
      <img class="avatar" src="${userAvatarLink}" alt="Wade Warren" />
      <div class="info">
          <p class="name">${userName}</p>
          <p class="fav">
            <i class="heart-icon${hasFavoriteItems ? ' active' : ''}"></i>${favoritesCaption}
          </p>
      </div>
    </div>
    `
  )
}
function getUserData(): unknown {
  if (localStorage.getItem('user') == null) {
    return "ничего не найдено"
  } else {
    return JSON.parse(localStorage.getItem('user'))
  }

}
function getFavoritesAmount(): unknown {
  if (localStorage.getItem('favoritesAmount') == null) {
    return "ничего не найдено";
  } else {
    return +localStorage.getItem('favoritesAmount');
  }

}
