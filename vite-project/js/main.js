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
        console.log(territory.area);
        DOMselectors.result.insertAdjacentHTML(
          "beforeend",
          `
            
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