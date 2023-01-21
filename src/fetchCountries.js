const BASE_URL = 'https://restcountries.com/v3.1/name/';
import Notiflix from 'notiflix';
function fetchCountries(name = 'Ukraine') {
  return fetch(
    `${BASE_URL}${name}?fields=name,capital,population,flags,languages`
  )
    .then(resp => {
      if (!resp.ok) {
        Notiflix.Notify.failure('Oops, there is no country with that name');

        throw new Error(resp.statusText);
      }
      return resp.json();
    })
    .catch(err => console.error(err));
}
export default fetchCountries;
