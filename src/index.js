import './css/styles.css';
import './css/reset.css';
import { fetchCountries } from './fetchCountries';
import Notiflix from 'notiflix';

const debounce = require('lodash.debounce');
const refs = {
  inputSearch: document.querySelector('#search-box'),
  countryListUl: document.querySelector('.country-list'),
  countryInfoDiv: document.querySelector('.country-info'),
};

const DEBOUNCE_DELAY = 300;

const handleInput = () => {
  if (refs.inputSearch.value.trim() !== '') {
    fetchCountries(refs.inputSearch.value.trim())
      .then(country => {
        if (country.length >= 10) {
          Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
          refs.countryListUl.innerHTML = '';
        } else if (country.length == 1) {
          getCountry(country);
          refs.countryListUl.innerHTML = '';
        } else {
          getCountries(country);
          refs.countryInfoDiv.innerHTML = '';
        }
      })
      .catch(() => {
        Notiflix.Notify.failure('Oops, there is no country with that name');
        refs.countryListUl.innerHTML = '';
        refs.countryInfoDiv.innerHTML = '';
      });
  }
};

const getCountries = countries => {
  const markupUl = countries
    .map(({ name, flags }) => {
      return `<li class='country-item'><img class='country-img' src='${flags.png}' alt='Flag of: ${name}'>${name}</li>`;
    })
    .join('');
  refs.countryListUl.innerHTML = markupUl;
};

const getCountry = country => {
  const markupInfo = country.map(({ name, capital, population, flags, languages }) => {
    return `<div class='info'>
              <img class='img-info' src='${flags.png}' alt='Flag of: ${name}'>
              <h1>${name}</h1>
            </div>
            <div>
            <p><strong>Capital:</strong> ${capital}</p>
            <p><strong>Population:</strong> ${population}</p>
            <p><strong>Languages:</strong> ${languages
              .map(item => {
                return item.name;
              })
              .join(', ')} </p>
            </div>`;
  });
  refs.countryInfoDiv.innerHTML = markupInfo;
};

refs.inputSearch.addEventListener(
  'input',
  debounce(() => handleInput(), DEBOUNCE_DELAY),
);
