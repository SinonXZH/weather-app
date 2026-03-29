//event.js
import { getWeatherData } from './weather-api';
import { Render } from './render';

const render = new Render();

export function InitEvent (){
    searchCity();
    rollShow();
}

function searchCity (){
    const searchBtn = document.querySelector('header>button');
    const cityInput = document.getElementById('cityInput');

    searchBtn.addEventListener('click', async () => {
        const city = cityInput.value.trim();
        if (city) {
            try{
                render.renderLoad();
                const weatherData = await getWeatherData(city);
                render.main.innerHTML = '';

                render.data = weatherData;
                render.getMaxMin();
                render.renderCurrentWeather();
                render.renderWeek();
                render.renderAllDayCardBox();
            }catch{
                console.error('error');
                render.renderError();
            }
        }
    });
}

function rollShow() {
    render.main.addEventListener('click', (e) => {
        // 确保点击的是 .weatherWeekCard 元素或其子元素
        const weatherWeekCard = e.target.closest('.weatherWeekCard');
        if (weatherWeekCard) {
            const index = weatherWeekCard.dataset.index;
            
            const slidePosition = index * (1065-9);
            
            render.slide.style.transform = `translateX(-${slidePosition}px)`;
        }
    });
}