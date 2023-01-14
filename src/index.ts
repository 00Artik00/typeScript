import { renderSearchFormBlock } from './search-form.js'
import { renderSearchStubBlock } from './search-results.js'
import { renderUserBlock } from './user.js'
import { renderToast } from './lib.js'

window.addEventListener('DOMContentLoaded', () => {
  const date = new Date();
  const dateIn = date.toISOString().split("T")[0];
  const dateOut = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 3, 0)
    .toISOString().split('T')[0];
  renderUserBlock(0, 'Tim Berton', '/img/avatar.png')
  renderSearchFormBlock(dateIn, dateOut)
  renderSearchStubBlock()
  renderToast(
    { text: 'Это пример уведомления. Используйте его при необходимости', type: 'success' },
    { name: 'Понял', handler: () => { console.log('Уведомление закрыто') } }
  )
})

