import axios from "axios";

const countryContainer = document.getElementById("country-information");
let userInput = "";

//After search button is pressed, the user input will be captured
document.getElementById("search-button").addEventListener("click", getUserInput);

//Capture user input
function getUserInput(ev) {
    ev.preventDefault();
    userInput = document.getElementById("input-field").value;

    getCountryByName();
}

//get Country by name and use userInput information for API URL
async function getCountryByName() {
    document.getElementById("country-information").innerHTML = "";                                             //Clear previous elements

    try {
        const result = await axios.get(`https://restcountries.com/v2/name/${userInput}`);

        console.log(result.data[0]);
        displayFlag(result);
        displayCountryName(result);
        displayCountryInfo(result);
        displayCapitalInfo(result);
        displayLanguages(result);
    } catch (e) {
        console.error(e);
    }
}

//Display country flag on the HTML page
function displayFlag(result) {
    const printFlag = document.createElement("img");
    printFlag.setAttribute("class", "print-flag")
    printFlag.setAttribute("src", result.data[0].flag);
    return countryContainer.appendChild(printFlag);
}

//Display country name on the HTML page
function displayCountryName(result) {
    const printCountryName = document.createElement("span");
    printCountryName.setAttribute("class", "print-country-name");
    printCountryName.textContent = result.data[0].name;
    return countryContainer.appendChild(printCountryName);
}

//Display country information on the HTML page
function displayCountryInfo(result) {
    const printCountryInfo = document.createElement("span");
    printCountryInfo.setAttribute("class", "print-country-info");
    printCountryInfo.textContent = result.data[0].name + " is situated in " + result.data[0].subregion + ", it has a population of " + result.data[0].population + " people.";
    return countryContainer.appendChild(printCountryInfo);
}

//Display Capital information and currency's
function displayCapitalInfo(result) {
    const printCapitalInfo = document.createElement("span");
    printCapitalInfo.setAttribute("class", "print-capital-info");
    printCapitalInfo.textContent = "The capital is " + result.data[0].capital + " and you can pay with ";

    if (result.data[0].currencies.length > 1) {
        printCapitalInfo.textContent += result.data[0].currencies[0].name + " and with " + result.data[0].currencies[1].name + "'s";
    } else {
        printCapitalInfo.textContent += result.data[0].currencies[0].name;
    }
    return countryContainer.appendChild(printCapitalInfo);
}

//Display Language information
function displayLanguages(result) {
    const printLanguageInfo = document.createElement("span");
    printLanguageInfo.setAttribute("class", "print-language-info");
    printLanguageInfo.textContent = "They speak ";

    const numberOfLanguages = result.data[0].languages.length;

    for (let i = 0; i < numberOfLanguages; i++) {
        if (numberOfLanguages - i > 1) {
            printLanguageInfo.textContent += result.data[0].languages[i].name + " and ";
        } else {
            printLanguageInfo.textContent += result.data[0].languages[i].name;
        }
    }
    return countryContainer.appendChild(printLanguageInfo);
}

function displayError() {
    const printError = document.createElement("span");
    printError.setAttribute("class", "print-error");
    printError.textContent = "Error!";
    return countryContainer.appendChild(printError);
}