//event.js
import { getWeatherData } from './weather-api';
import { Render } from './render';

const render = new Render();

export function InitEvent (){
    searchCity();
}

function searchCity (){
    const searchBtn = document.querySelector('header>button');
    const cityInput = document.getElementById('cityInput');

    searchBtn.addEventListener('click', async () => {
        const city = cityInput.value.trim();
        if (city) {
            try{
                const weatherData = await getWeatherData(city);
                render.data = weatherData;
                render.getMaxMin();
                render.renderCurrentWeather();
                render.renderWeek();
                render.renderAllDayCardBox();
            }catch{
                
            }
        }
    });
}