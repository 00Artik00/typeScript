import { renderBlock } from './lib.js'
import { SearchFormData, Estates } from './interfases.js'
import { renderEmptyOrErrorSearchBlock, renderSearchResultsBlock } from './search-results.js'
import { Database, FlatRentSdk } from './flat-rent-sdk.js'


function searchCallBack(search: Error | []): void {
  setTimeout(() => {
    if (Math.round(Math.random())) {
      console.log(`RANDOM VALUE: ${JSON.stringify([])}`)
    } else {
      console.log(`RANDOM VALUE: ${search}`)
    }
  }, 2000)
}
function Provider2Search(formData: SearchFormData): Promise<Database[]> {
  const flatRentSdk = new FlatRentSdk()
  const resultsPromise = flatRentSdk.search({
    city: formData.inputCity,
    checkInDate: new Date(formData.inputIn),
    checkOutDate: new Date(formData.inputOut),
    priceLimit: formData.inputMaxPrice
  })
  return resultsPromise
}
async function GetResultsFromAllProvider(formData: SearchFormData) {
  const provider1 = await search<SearchFormData>(formData);
  const provider2 = await Provider2Search(formData);
  const provider2Changed: Estates[] = provider2.map(el => {
    const randomDistanse = Math.floor(Math.random() * 10 + 1);
    return {
      img: el.photos[0],
      imgAlt: "estate",
      free: true,
      city: "Санкт-Петербург",
      name: el.title,
      price: el.totalPrice,
      distanse: ` ${randomDistanse}км от вас`,
      distanseNumber: randomDistanse,
      describe: el.details,
      id: el.id
    }
  })

  return [...provider1, ...provider2Changed]
}

export function renderSearchFormBlock(dateIn: string, dateOut: string): void {
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
          <div>
          <select class="selectProvider">
            <option>Provider1</option>
            <option>Provider2</option>
            <option>All</option>
          </select>
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
  const inputProvider: string = (<HTMLSelectElement>document.querySelector(".selectProvider")).value
  const formData: SearchFormData = {
    inputCity: (<HTMLInputElement>document.querySelector("#city")).value,
    inputIn: (<HTMLInputElement>document.querySelector("#check-in-date")).value,
    inputOut: (<HTMLInputElement>document.querySelector("#check-out-date")).value,
    inputMaxPrice: +(<HTMLInputElement>document.querySelector("#max-price")).value
  }
  if (inputProvider == "Provider1") {
    search<SearchFormData>(formData, searchCallBack).then(results => {
      if (results.length > 0) {
        results.sort((first, second) => first.price - second.price)
        renderSearchResultsBlock(results)
        localStorage.setItem('results', JSON.stringify(results));
      } else {
        renderEmptyOrErrorSearchBlock(`По вашим запросам ничего не найдено, попробуйте изменить дату заезда/выезда или максимальную цену за сутки`);
      }
    })

  }
  if (inputProvider == "Provider2") {
    const resultsPromise = Provider2Search(formData)
    resultsPromise.then(data => {
      if (data.length > 0) {
        const newResults = [];
        data.forEach(el => {
          const randomDistanse = Math.floor(Math.random() * 10 + 1);
          newResults.push({
            img: el.photos[0],
            imgAlt: "estate",
            free: true,
            city: "Санкт-Петербург",
            name: el.title,
            price: el.totalPrice,
            distanse: ` ${randomDistanse}км от вас`,
            distanseNumber: randomDistanse,
            describe: el.details,
            id: el.id
          })
        })
        newResults.sort((first, second) => first.price - second.price);
        renderSearchResultsBlock(newResults)
        localStorage.setItem('results', JSON.stringify(newResults));
      } else {
        renderEmptyOrErrorSearchBlock(`По вашим запросам ничего не найдено, попробуйте изменить дату заезда/выезда или максимальную цену за сутки`);
      }

    })
  }
  if (inputProvider == "All") {
    GetResultsFromAllProvider(formData).then(results => {
      if (results.length > 0) {
        results.sort((first, second) => first.price - second.price)
        renderSearchResultsBlock(results)
        localStorage.setItem('results', JSON.stringify(results));
      } else {
        renderEmptyOrErrorSearchBlock(`По вашим запросам ничего не найдено, попробуйте изменить дату заезда/выезда или максимальную цену за сутки`);
      }
    })
    // new Promise((res, reg) => {

    // }).then(results => {
    //   if (results.length > 0) {
    //     renderSearchResultsBlock(results)
    //   } else {
    //     renderEmptyOrErrorSearchBlock(`По вашим запросам ничего не найдено, попробуйте изменить дату заезда/выезда или максимальную цену за сутки`);
    //   }
    // })

  }


}
export async function search<Type>(formData: Type, cl?: (search: Error | []) => void): Promise<Estates[]> {
  let response = await fetch("/estates", {
    method: 'POST',
    body: JSON.stringify(formData),
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
  });
  if (response.ok) {
    let results: Estates[] = await response.json();
    if (results.length > 0) {
      return results
    }
    return []
  } else {
    alert("Ошибка HTTP: " + response.status);
  }
}

