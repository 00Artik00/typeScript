import { renderSearchFormBlock } from './search-form.js'
import { renderSearchStubBlock } from './search-results.js'
import { renderUserBlock } from './user.js'
import { renderToast } from './lib.js'
import { initHandlers } from './initHandlers.js'

window.addEventListener('DOMContentLoaded', () => {
  localStorage.setItem('user', JSON.stringify({ username: "Artem", avatarUrl: "/img/avatar.png" }));
  localStorage.setItem(' favoritesAmount', "0");
  const date = new Date();
  const dateIn: string = date.toISOString().split("T")[0];
  const dateOut: string = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 3, 0)
    .toISOString().split('T')[0];
  renderUserBlock(0, 'Tim Berton', '/img/avatar.png')
  renderSearchFormBlock(dateIn, dateOut)
  renderSearchStubBlock()
  renderToast(
    { text: 'Это пример уведомления. Используйте его при необходимости', type: 'success' },
    { name: 'Понял', handler: () => { console.log('Уведомление закрыто') } }
  )
  initHandlers();
})

