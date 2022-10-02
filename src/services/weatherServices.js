import {DateTime} from "luxon" //? Library to format timestamps

const API_KEY = "f878e607aeaa1e3e4711fe93f36c7bc4"
const BASE_URL = "http://api.openweathermap.org/data/2.5"

//? Function to get data
const getWeatherData = (infoType, searchParams) => {
    const url = new URL(BASE_URL + '/' + infoType)
    url.search = new URLSearchParams({...searchParams, appid: API_KEY})

    return fetch(url)
    .then((res) => res.json())

}

//? Endpoint for current weather, obtaing required information
const formatCurrentWeather = (data) => {
    //Destructuring the data we need (teperature, humidity, country name, sunrise, speed, etc)
    const {
        coord: {lat, lon},
        main: {temp, feels_like, temp_min, temp_max, humidity},
        name, 
        dt,
        sys: {country, sunrise, sunset},
        weather,
        wind: {speed}
    } = data

    const {main: details, icon} = weather[0]
    
    return {lat,lon, temp, feels_like, temp_min, temp_max, humidity, name, dt, country, sunrise, sunset, details, icon, speed}
}

const formatForecastWeather = data => {
    let {timezone, daily, hourly} = data
    daily = daily.slice(1,6).map(d=> {
        return {
            title: formatToLocalTime(d.dt, timezone, 'cccc'),
            temp: d.temp.day,
            icon: d.weather[0].icon
        }
    })

    hourly = hourly.slice(1,6).map(d=> {
        return {
            title: formatToLocalTime(d.dt, timezone, 'hh:mm a'),
            temp: d.temp,
            icon: d.weather[0].icon
        }
    })

    return { timezone, daily, hourly}
}

//? Using weather API for using City name Params
const getFormattedWeatherData = async (searchParams) => {
    const formattedCurrentWeather = await getWeatherData('weather', searchParams).then(formatCurrentWeather)

    const {lat, lon} = formattedCurrentWeather

//? Search params for onecall (Hourly information)
    const formattedForecastWeatherm = await getWeatherData('onecall', {
        lat, lon, exclude: 'current, minutely, alerts', units: searchParams.units
    }).then(formatForecastWeather)

    return {...formattedCurrentWeather, ...formattedForecastWeatherm}
}

const formatToLocalTime = (secs, zone, format = "cccc, dd LLL yyyy' | Local Time: 'hh:mm a") => DateTime.fromSeconds(secs).setZone(zone).toFormat(format)

const iconUrlFromCode = (code) => `http://openweathermap.org/img/wn/${code}@2x.png`

export default getFormattedWeatherData
export {formatToLocalTime, iconUrlFromCode}
