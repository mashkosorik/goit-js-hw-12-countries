// import css from "./css/style.css"
import fetchCountries from './fetchCountries.js';

import debounce from 'lodash.debounce';
const countries = document.querySelector('.countries');
const input = document.querySelector('#searchInput');

input.addEventListener(
  'input',
  debounce(e => {
    if (!e.target.value) {
      countries.innerHTML = '';
      return;
    }
    fetchCountries(e.target.value);
    // input.value = ''
  }, 1700),
);
