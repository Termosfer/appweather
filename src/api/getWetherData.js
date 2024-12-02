import axios from "axios";
import { DateTime } from 'luxon'
import { API_KEY } from "./api";
import { BASE_URL } from "./api";
 

const getWehterData = async (value) => {
    const currentWeatherResponse = await axios.get(
        `${BASE_URL}weather?q=${value}&appid=${API_KEY}&units=metric`
    );


    const forecastResponse = await axios.get(
        `${BASE_URL}forecast?q=${value}&appid=${API_KEY}&units=metric`
    );

    const iconUrl = (icon) => `https://openweathermap.org/img/wn/${icon}@2x.png`
    const currentWeatherIcon = currentWeatherResponse.data.weather[0].icon;

    const timezoneOffset = currentWeatherResponse.data.timezone;
    const timeSunrise = currentWeatherResponse.data.sys.sunrise;
    const timeSunset = currentWeatherResponse.data.sys.sunset;

    const timezoneString = `UTC${timezoneOffset >= 0 ? '+' : ''}${timezoneOffset / 3600}`;


        const forecastTimes = forecastResponse.data.list.map(item => {
            const time = DateTime.fromSeconds(item.dt).toFormat("HH:mm"); 
    
            const iconCode = item.weather[0].icon;
            const iconImage = iconUrl(iconCode);
    
            const temperature = item.main.temp;  
            const wind = item.wind.speed;  
            const deg = item.wind.deg;  
            return {
                time,
                icon: iconImage,
                temperature,
                wind,
                deg
            };
        });
        const fiveDayForecast = forecastResponse.data.list.filter((item, index) => {
            return index % 8 === 0;  
        }).map(item => {
            const date = DateTime.fromSeconds(item.dt).toFormat("cccc, dd MMMM");
            const temperature = item.main.temp;
            const iconCode = item.weather[0].icon;
            const iconImage = iconUrl(iconCode);
            return {
                date,
                temperature,
                icon: iconImage,
            };
        });

    const localTimeOnly = DateTime.now()
        .setZone(timezoneString)
        .toFormat("HH:mm");  

    const localDateOnly = DateTime.now()
        .setZone(timezoneString)
        .toFormat("cccc, dd MMM");  
    let sunrise = "Invalid Time";
    if (timeSunrise && timeSunrise > 0) {
        sunrise = DateTime.fromSeconds(timeSunrise)
            .setZone(timezoneString) 
            .toFormat("hh:mm a"); 
    } else {
        console.error("Invalid sunrise timestamp:", timeSunrise);
    }
    const sunset = DateTime.fromSeconds(timeSunset)
        .setZone(timezoneString)
        .toFormat("hh:mm a"); 
    return {
        currentWeather: {
            ...currentWeatherResponse.data,
            localTimeOnly,
            localDateOnly,
            sunrise,
            sunset,
            icon: iconUrl(currentWeatherIcon),
            temperature: currentWeatherResponse.data.main.temp,
            humidity: currentWeatherResponse.data.main.humidity,
            pressure: currentWeatherResponse.data.main.pressure,
            weatherDescription: currentWeatherResponse.data.weather[0]?.description,  
        },
        forecast: {
            ...forecastResponse.data,
            times: forecastTimes
        },
        fiveDayForecast
    };

}

export default getWehterData