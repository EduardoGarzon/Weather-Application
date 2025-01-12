// Variáveis e Selecao de Elementos

const apiKey = "c20817620deaff78ce5263a4944dded5";
const apiPhotoKey = "w-qkge5SZFiUpbw_mmneiTN3nmlaaOvLfLq9O9gjIyo";
const apiCountryURL = "https://flagsapi.com/";

const cityInput = document.querySelector("#city-input");
const searchBtn = document.querySelector("#search");

const cityElement = document.querySelector("#city");
const tempElement = document.querySelector("#temperature span");
const descElement = document.querySelector("#description");
const weatherIconElement = document.querySelector("#weather-icon");
const countryElement = document.querySelector("#country");
const humidityElement = document.querySelector("#humidity span");
const windElement = document.querySelector("#wind span");

const weatherContainer = document.querySelector("#weather-data");
const errorContainer = document.querySelector("#error-message");

// Funcoes
const getCountryPhoto = async (countryName) => {

    const apiCountryPhotoURL = `https://api.unsplash.com/search/photos?query=${countryName}&client_id=${apiPhotoKey}`;

    const res = await fetch(apiCountryPhotoURL);
    const data = await res.json();

    let randonNumber = Math.floor(Math.random() * 10);
    
    return data.results[randonNumber].urls.regular;
};

const getCountryName = async (data) => {
    const apiCountryNameURL = `https://restcountries.com/v3.1/alpha/${data.sys.country}`;

    const res = await fetch(apiCountryNameURL);
    const countryName = await res.json();

    return countryName;
};

const getWeatherData = async (city) => {

    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;

    const res = await fetch(apiWeatherURL);
    const data = await res.json();

    return data;

};

const showMeWeatherData = async (city) => {
    const data = await getWeatherData(city);
    const countryName = await getCountryName(data);
    const countryPhoto = await getCountryPhoto(countryName[0].name.common);

    console.log(data);
    console.log(countryName[0].name.common);
    console.log(countryPhoto);

    cityInput.value = "";

    if (data.cod === "404") {
        errorContainer.classList.remove("hide");
        weatherContainer.classList.add("hide");
    } else {
        errorContainer.classList.add("hide");

        document.body.style.backgroundImage = `url(${countryPhoto})`;
        document.body.style.backgroundRepeat = "no-repeat";
        document.body.style.backgroundSize = "cover";
        document.body.style.backgroundPosition = "center";

        cityElement.innerHTML = data.name;
        tempElement.innerHTML = parseInt(data.main.temp);
        descElement.innerHTML = data.weather[0].description;

        weatherIconElement.setAttribute(
            "src",
            `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`
        );

        countryElement.setAttribute("src", apiCountryURL + data.sys.country + "/shiny/64.png");

        humidityElement.innerHTML = `${data.main.humidity}%`;
        windElement.innerHTML = `${data.wind.speed}km/h`;

        weatherContainer.classList.remove("hide");
    }
};

// Eventos
searchBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const city = cityInput.value;

    showMeWeatherData(city);
});

cityInput.addEventListener("keyup", (e) => {

    if (e.code === "Enter") {
        const city = e.target.value;
        showMeWeatherData(city);
    }
});