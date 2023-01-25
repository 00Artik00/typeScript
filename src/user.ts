import { renderBlock } from './lib.js'

export function renderUserBlock(favoriteItemsAmount: number, userName?: string, userAvatarLink?: string): void {
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
            <i class="heart-icon${hasFavoriteItems ? ' active' : ''}"></i>
            <span class="favoritesCount">${favoritesCaption}</span>
          </p>
      </div>
    </div>
    `
  )
}
export function getUserData(): unknown {
  if (localStorage.getItem('user') == null) {
    return 0
  } else {
    return JSON.parse(localStorage.getItem('user'))
  }
}
export function getFavoritesAmount(): number {
  if (localStorage.getItem('favoritesAmount') == null) {
    return 0;
  } else {
    return +localStorage.getItem('favoritesAmount');
  }
}

