//event.js
import { getWeatherData } from './weather-api';

export function InitEvent (){
    searchCity();
}

function searchCity (){
    const searchBtn = document.querySelector('header>button');
    const cityInput = document.getElementById('cityInput');

    searchBtn.addEventListener('click', async () => {
        const city = cityInput.value.trim();
        if (city) {
            const weatherData = await getWeatherData(city);
        }
    });
}