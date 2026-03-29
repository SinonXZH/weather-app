import {format, addWeeks} from 'date-fns';

// https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/[location]/[date1]/[date2]?key=YOUR_API_KEY

async function getWeatherData (location = 'london',temp = 'metric', lang = 'cn') {
    const key = 'K393D58JQ78KH2GR44HHPHL8C';
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/next7days?unitGroup=metric&key=${key}`;
    
    try{
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        return data;
    }catch{
        console.error('Error fetching weather data');
    };
}

export {getWeatherData};