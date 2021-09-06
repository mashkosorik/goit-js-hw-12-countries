import { error } from '@pnotify/core';
import template from './template.hbs';
import listCountries from './listCountries.hbs';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
// import "@pnotify/confirm/dist/PNotifyConfirm.css";

const countries = document.querySelector('.countries');
let baseUrl = 'https://restcountries.eu/rest/v2/name/';
function createItem(data, templates, place) {
  const item = templates(data);
  place.insertAdjacentHTML('afterbegin', item);
}
export default function fetchCountries(searchQuery) {
  countries.innerHTML = '';
  let url = `${baseUrl}${searchQuery}`;
  return fetch(url)
    .then(res => res.json())
    .then(countriesList => {
      if (countriesList.length === 1) {
        createItem(countriesList, template, countries);
      } else if (countriesList.length >= 2 && countriesList.length <= 10) {
        createItem(countriesList, listCountries, countries);
      } else if (countriesList.length > 10) {
        error({
          title: 'Attantion',
          text: 'to many matches found countries',
          delay: 2000,
        });
      } else {
        error({
          title: 'counrty not found',
          text: 'counrty not found',
          delay: 2000,
        });
      }
    })
    .catch(error => console.log(error));
}
// export default function fetchCountries(searchQuery) {
//   if (searchQuery) {
//     return fetch(`${baseUrl}${searchQuery}?countriesList;listCountries;countries`)
//       .then(response => {
//         if (response.ok) return response.json();
//         throw new Error(`error`);
//       })
//       .catch(error => {
//         console.error(`Error:`, error);
//       });
//   }
// }
