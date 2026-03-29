//render.js
import { format, parse, getHours } from "date-fns"; 

export class Render {
    constructor(data){
        this.data = data;
        this.main = document.querySelector('main');

        this.maxTemp = 0;
        this.minTemp = 0;

        this.slide = null;
    }

    renderCurrentWeather(data = this.data){
        const currentWeatherCard = document.createElement('div');
        currentWeatherCard.classList = 'weatherCard';

        const cityName = data.address;
        const currentTime = new Date(`1970-01-01T${data.currentConditions.datetime}Z`);
        const currentTimeF1 = format(currentTime, 'HH:mm');
        const currentTimeF2 = format(currentTime, 'h:mm a');
        const temperature = data.currentConditions.temp;
        const humidity = data.currentConditions.humidity;
        const windSpeed = data.currentConditions.windspeed;
        const feelsLike = data.currentConditions.feelslike;
        const precip = data.currentConditions.precip;
        const weatherIconName = data.currentConditions.icon;
        const description = data.description;
        
        currentWeatherCard.innerHTML = `
        <div class="weatherCardInfo">
            <h2 class="cityName">${cityName}</h2>
            <p class="currentTime">${currentTimeF1}</p>
        </div>
        <div class="weatherLeft">
            <p class="temperature">${temperature}°C</p>
            <div class="weatherInfo">
                <p class="humidity">humidity: ${humidity}%</p>
                <p class="windSpeed">wind speed: ${windSpeed} km/h</p>
                <p class="feelsLike">feels like: ${feelsLike}°C</p>
                <p class="precip">precip: ${precip} mm</p>
            </div>
        </div>
        <div class="weatherRight">
            <img src="#" alt="Weather Icon">
            <div class="weatherRightRight">
                <p class="currentTime">${currentTimeF2}</p>
                <p class="weatherIconName">${weatherIconName}</p>
                <p class="description">${description}</p>
            </div>
        </div>`

        const iconSrc = require(`../image/${weatherIconName}.png`);
        currentWeatherCard.querySelector('.weatherRight>img').src = iconSrc;

        this.main.appendChild(currentWeatherCard);
    }

    #renderWeekCard(fatherBox, dayData, index){
        const weatherWeekCard = document.createElement('div');
        weatherWeekCard.classList = 'weatherWeekCard';
        weatherWeekCard.dataset.index = index;

        const date = new Date(dayData.datetime);
        const dateF1 = format(date, 'EEEE');
        const iconName = dayData.icon;
        const tempMax = parseInt(dayData.tempmax);
        const tempMin = parseInt(dayData.tempmin);

        weatherWeekCard.innerHTML = `
        <div class="weatherWeekCardTop">
            <h2>${dateF1}</h2>
            <p>${dayData.datetime}</p>
            <img src="#">
            <p>${iconName}</p>
        </div>
        <div class="weatherWeekCardBot">
            <h2>${tempMin}~${tempMax}°C</h2>
        </div>
        `

        const iconSrc = require(`../image/${iconName}.png`);
        weatherWeekCard.querySelector('.weatherWeekCardTop>img').src = iconSrc;

        fatherBox.appendChild(weatherWeekCard);
    }

    renderWeek (data = this.data){
        let index = 0;

        const weatherWeekCardBox = document.createElement('div');
        weatherWeekCardBox.classList = 'weatherWeekCardBox';

        data.days.forEach((dayData) => {
            this.#renderWeekCard(weatherWeekCardBox, dayData, index);
            index++;
        });

        this.main.appendChild(weatherWeekCardBox);
    }

    #renderDayCard(data, fatherBox){
        const weatherDayCard = document.createElement('div');
        weatherDayCard.classList = 'weatherDayCard';

        const time = new Date(parse(data.datetime, 'HH:mm:ss', new Date())).getHours();

        const weatherIconName = data.icon;

        weatherDayCard.innerHTML = `
        <p class="dayHour">${time}</p>
        <p class="weatherDayCardTemperature">${parseInt(data.temp)}°</p>
        <div class="weatherDayFeelsLike"></div>
        <img src="#">
        `

        const iconSrc = require(`../image/${weatherIconName}.png`);
        weatherDayCard.querySelector('.weatherDayCard>img').src = iconSrc;
    
        const height = this.#clacHeight(data.temp);
        const weatherDayFeelsLike = weatherDayCard.querySelector('.weatherDayFeelsLike')
        weatherDayFeelsLike.style.height = `${height}px`;

        fatherBox.appendChild(weatherDayCard);
    }

    #renderDayCardBox(day, fatherBox) {
        const weatherDayBox = document.createElement('div');
        weatherDayBox.classList = 'weatherDayBox';

        day.hours.forEach((hour, index) => {
            // if (index % 2 != 0) {
                this.#renderDayCard(hour, weatherDayBox);
            // }
        });
    
        fatherBox.appendChild(weatherDayBox);
    }

    getMaxMin(data = this.data) {    
        let maxTemp = -Infinity;  
        let minTemp = Infinity;  

        data.days.forEach(day => {
            const tempMax = day.tempmax;
            const tempMin = day.tempmin;
    
            maxTemp = Math.max(maxTemp, tempMax);
            minTemp = Math.min(minTemp, tempMin);
        });

        this.maxTemp = maxTemp;
        this.minTemp = minTemp;
    }

    #clacHeight (currentTemp){
        const minHeight = 40;
        const maxHeight = 180;
        
        const maxTemp = this.maxTemp;
        const minTemp = this.minTemp;

        // 计算标准化温度
        const normalizedTemp = (currentTemp - minTemp) / (maxTemp - minTemp);
        
        // 根据标准化温度计算对应的高度
        const height = normalizedTemp * (maxHeight - minHeight) + minHeight;
        
        return height;
    }

    renderAllDayCardBox(data = this.data){
        const weatherDayWrap = document.createElement('div');
        weatherDayWrap.classList = 'weatherDayWrap';

        const weatherDayBoxSlide = document.createElement('div');
        weatherDayBoxSlide.classList = 'weatherDayBoxSlide'; 

        this.slide = weatherDayBoxSlide;

        data.days.forEach((day) =>{
           this.#renderDayCardBox(day, weatherDayBoxSlide); 
        })

        weatherDayWrap.appendChild(weatherDayBoxSlide);
        this.main.appendChild(weatherDayWrap);
    }

    renderLoad(){
        this.main.innerHTML = '<h1 class="loading">loading...</h1>'
        
    }

    renderError(){
        this.main.innerHTML = '<h1 class="loading">oops...try again</h1>'
    }
}