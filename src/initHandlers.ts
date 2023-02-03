import { searchHandler } from './search-form.js';
export function initHandlers() {
    document.querySelector('.search-button')?.addEventListener('click', event => {
        searchHandler(event);
    })
}
