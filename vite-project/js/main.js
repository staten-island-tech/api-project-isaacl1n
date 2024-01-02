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
      if (!response.ok) {
        DOMselectors.result.innerHTML = "";
        DOMselectors.error.innerHTML = "";
        if (response.status === 400) {
          throw new Error("Error 400: Bad Request" + 
            `
              <p>The server did not understand your request.</p>
            `
          );
        } else if (response.status === 403) {
          throw new Error("Error 403: Access Forbidden" + 
            `
              <p>Your device may not access the server.</p>
            `
          );
        } else if (response.status === 404) {
          throw new Error("Error 404: Not Found" + 
            `
              <p>Have you spelled your query correctly?<p>
              <p>Is your query format correct?<p>
              <p>Did you select the wrong search category?<p>
            `
          );
        } else {
          throw new Error(`Error ${response.status}`);
        };
      };
      const data = await response.json();
      console.log(data);
      DOMselectors.result.innerHTML = "";
      DOMselectors.error.innerHTML = "";
      data.forEach(territory => {
        DOMselectors.result.insertAdjacentHTML(
          "beforeend",
          `
            <div class="territory">
              <img src="${territory.flags.png}" alt="${territory.flags.alt}" class="flag">
              <h2 class="name">${territory.name.common}</h2>
              <p class="name" id="official-name">${territory.name.official}</p>
              <p class="info">Capital: ${territory.capital}</p>
              <p class="info">Area: ${territory.area} sq km</p>
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
      DOMselectors.error.insertAdjacentHTML(
        "beforeend",
        `
          <h3>${error.message}</h3>
        `
      );
    };
  };
  getData(URL);
});