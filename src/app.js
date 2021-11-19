import axios from "axios";

//1.    Create a function which retrieves information from all countries based on the API "https://restcountries.com/v2/all"
//2.    Link the world-map picture in HTML to ensure it will be displayed on the screen
//3.    Display all countries in a list on the screen with following information:
//       1. name of the country
//       2. flag of the country
//       3. "Has a population of [amount] people"
//4.    Sort countries on population low -> high.
//5.    Display countries in the color of the continent it is part of.
//       *Africa: blauw
//       *Americas: groen
//       *Asia: rood
//       *Europe: geel
//       *Oceania: paars

let color = "black";
const countryListContainer = document.getElementById("country-list");

getAllCountries();

async function getAllCountries() {
    try {
        const result = await axios.get("https://restcountries.com/v2/all");

        sortDataOnPopulation(result);

        for (let i = 0; i < result.data.length; i++) {

            const printElement = document.createElement("li");
            printElement.appendChild(displayFlag(result, i));
            printElement.appendChild(displayCountry(result, i));
            printElement.appendChild(displayPopulation(result, i));
            countryListContainer.appendChild(printElement);

            console.log(result.data[i].name);
            console.log(result.data[i].flag);
            console.log(result.data[i].population);
        }
    } catch (e) {
        console.error(e);
    }
}

//Sort data based on population
function sortDataOnPopulation(result) {
    result.data.sort((a, b) => {
        return a.population - b.population;
    });
}


//Display country flag on the HTML page
function displayFlag(result, i) {
    const printFlag = document.createElement("img");
    printFlag.setAttribute("class", "print-flag")
    printFlag.setAttribute("src", result.data[i].flag);
    return countryListContainer.appendChild(printFlag);
}


//Display country name on the HTML page and determine the color of the country by region
function displayCountry(result, i) {
    const regionOfCountry = result.data[i].region;
    color = determineColor(regionOfCountry);

    const printCountry = document.createElement("span");
    printCountry.setAttribute("class", "print-country");
    printCountry.setAttribute("id", color);
    printCountry.textContent = result.data[i].name;

    return countryListContainer.appendChild(printCountry);
}


//Display country population on the HTML page
function displayPopulation(result, i) {
    const printPopulation = document.createElement("span");
    printPopulation.setAttribute("class", "print-population")
    printPopulation.textContent = "Has a population of " + result.data[i].population + " people";
    return countryListContainer.appendChild(printPopulation);
}

function determineColor(regionOfCountry) {
    switch (regionOfCountry) {
        case "Africa":
            return color = "blue";
        case "Americas":
            return color = "green";
        case "Asia":
            return color = "red";
        case "Europe":
            return color = "yellow";
        case "Oceania":
            return color = "purple";
        default:
            return color = "black";
    }
}


