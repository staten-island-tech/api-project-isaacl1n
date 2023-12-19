import '../css/style.css'
import { DOMselectors } from './dom.js'

DOMselectors.searchForm.addEventListener("submit", function(event) {
  event.preventDefault();
  const category = DOMselectors.searchSelector.value.toString()
  const query = DOMselectors.searchBar.value

  const URL = "https://restcountries.com/v3.1/" + category + "/" + query
  console.log(fetch(URL));

  async function getData(URL) {
    try {
      const response = await fetch(URL);
      const data = await response.json();
      console.log(data);
      DOMselectors.result.innerHTML = "";
      data.forEach(territory => {
        DOMselectors.result.insertAdjacentHTML(
          "beforeend",
          `
            <div class="territory">
              <img src="${territory.flags.png}" class="flag">
              <h2 class="name">${territory.name.common}</h2>
              <p class="name" id="official-name">${territory.name.official}</p>
              <p class="info">Capital: ${territory.capital}</p>
              <p class="info">Area: ${territory.area} km<sup>2</sup></p>
              <p class="info">Population: ${territory.population}</p>
              <p class="info">Region: ${territory.region}</p>
              <p class="info">Subregion: ${territory.subregion}</p>
              <p class="info">TLD: ${territory.tld[0]}</p>
              <p class="info">Driving Side: ${territory.car.side}</p>
            </div>
          `
        );
      });
    } catch (error) {
      console.log(error);
      DOMselectors.result.insertAdjacentHTML(
        "beforeend",
        `
          
        `
      );
    };
  };
  getData(URL);
});