import {format, addWeeks} from 'date-fns';

// https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/[location]/[date1]/[date2]?key=YOUR_API_KEY

async function getWeatherData (location = 'london') {
    const currentDate = new Date();
    const oneWeekLater = addWeeks(currentDate, 1);
    const formattedDate = format(currentDate, 'yyyy-MM-dd');
    const FormattedoneWeekLater = format(oneWeekLater, 'yyyy-MM-dd');

    const key = 'K393D58JQ78KH2GR44HHPHL8C';
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/${formattedDate}/${FormattedoneWeekLater}?key=${key}`;

    console.log('A');
    try{
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
    }catch{
        console.error('Error fetching weather data');
    };
}

export {getWeatherData};