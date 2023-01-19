import { renderBlock } from './lib.js'
import { SearchFormData, Place } from './interfases.js'
import { json } from 'stream/consumers';

export function renderSearchFormBlock(dateIn: string, dateOut: string) {
  const date = new Date();
  const currentDate = date.toISOString().split("T")[0];
  const lastDayNextMonth = new Date(date.getFullYear(), date.getMonth() + 2, 1)
    .toISOString().split('T')[0];
  renderBlock(
    'search-form-block',
    `
    <form>
      <fieldset class="search-filedset">
        <div class="row">
          <div>
            <label for="city">Город</label>
            <input id="city" type="text" disabled value="Санкт-Петербург" />
            <input type="hidden" disabled value="59.9386,30.3141" />
          </div>
          <!--<div class="providers">
            <label><input type="checkbox" name="provider" value="homy" checked /> Homy</label>
            <label><input type="checkbox" name="provider" value="flat-rent" checked /> FlatRent</label>
          </div>--!>
        </div>
        <div class="row">
          <div>
            <label for="check-in-date">Дата заезда</label>
            <input id="check-in-date" type="date" value="${dateIn}" min="${currentDate}" max="${lastDayNextMonth}" name="checkin" />
          </div>
          <div>
            <label for="check-out-date">Дата выезда</label>
            <input id="check-out-date" type="date" value="${dateOut}" min="${currentDate}" max="${lastDayNextMonth}" name="checkout" />
          </div>
          <div>
            <label for="max-price">Макс. цена суток</label>
            <input id="max-price" type="text" value="" name="price" class="max-price" />
          </div>
          <div>
            <div><button class="search-button">Найти</button></div>
          </div>
        </div>
      </fieldset>
    </form>
    `
  )

}
export function searchHandler(event: Event): void {
  event.preventDefault();
  const formData: SearchFormData = {
    inputIn: (<HTMLInputElement>document.querySelector("#check-in-date")).value,
    inputOut: (<HTMLInputElement>document.querySelector("#check-out-date")).value,
    inputMaxPrice: +(<HTMLInputElement>document.querySelector("#max-price")).value
  }
  search(formData, searchCallBack);
}
export function search(formData: SearchFormData, cl?: (search: Error | []) => void): void {
  console.log(JSON.stringify(formData));
  if (cl) cl(new Error);
}
function searchCallBack(search: Error | []) {
  setTimeout(() => {
    if (Math.round(Math.random())) {
      console.log(`RANDOM VALUE: ${JSON.stringify([])}`)
    } else {
      console.log(`RANDOM VALUE: ${search}`)
    }
  }, 2000)
}
