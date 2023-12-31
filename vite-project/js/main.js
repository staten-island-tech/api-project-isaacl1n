import '../css/style.css'
import { DOMselectors } from './dom.js'

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
              <h3 class="name" id="official-name">${territory.name.official}</h5>
            <ul>
              <li class="info">Capital: ${territory.capital}</li>
              <li class="info">Area: ${territory.area} sq km</li>
              <li class="info">Population: ${territory.population}</li>
              <li class="info">Region: ${territory.region}</li>
              <li class="info">Subregion: ${territory.subregion}</li>
              <li class="info">TLD: ${territory.tld[0]}</li>
              <li class="info">Driving Side: ${territory.car.side}</li>
            </ul>
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
getData("https://restcountries.com/v3.1/all/");

DOMselectors.searchForm.addEventListener("submit", function(event) {
  event.preventDefault();
  const category = DOMselectors.searchSelector.value.toString()
  const query = DOMselectors.searchBar.value
  const URL = "https://restcountries.com/v3.1/" + category + "/" + query
  console.log(fetch(URL));
  getData(URL);
});