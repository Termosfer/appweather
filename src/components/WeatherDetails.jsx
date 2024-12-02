import React from 'react'
import humid from "../assets/humidity 1.png"
import pressure from "../assets/pressure-white 1.png"
import rise from "../assets/sunrise-white 1.png"
import set from "../assets/sunset-white 1.png"
import wind from "../assets/wind 1.png"
import uv from "../assets/uv-white 1.png"

import "./header.css"
const WeatherDetails = ({ weatherData }) => {
    return (
        <div className='d-flex align-items-center justify-content-between px-3 py-1 wetherdetails'>
            <div className='d-flex flex-column gap-3 ps-3'>
                <div>
                    <h1 className='my-0'>
                        {
                            weatherData && weatherData.currentWeather ? weatherData.currentWeather.main.temp.toFixed() : null
                        }℃
                    </h1>
                    <span>Feels like: {
                        weatherData && weatherData.currentWeather ? weatherData.currentWeather.main.feels_like.toFixed() : null
                    }℃</span>
                </div>
                <div>

                    <div className='d-flex align-items-center gap-2'>
                        <div>
                            <img src={rise} alt="" className='img' />
                        </div>
                        <div className='d-flex flex-column'>
                            <span>Sunrise</span>
                            <span>
                                {
                                    weatherData && weatherData.currentWeather ? weatherData.currentWeather.sunrise : null
                                }
                            </span>
                        </div>
                    </div>
                    <div className='d-flex align-items-center gap-2'>
                        <div>
                            <img src={set} alt="" className='img' />
                        </div>
                        <div className='d-flex flex-column'>
                            <span>Sunset</span>
                            <span>  {
                                weatherData && weatherData.currentWeather ? weatherData.currentWeather.sunset : null
                            }</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className='text-center'>
                <img src={weatherData && weatherData.currentWeather ? weatherData.currentWeather.icon : null} alt="" className='center-img' />
                <h2 className=''>
                    {
                        weatherData && weatherData.currentWeather ? weatherData.currentWeather.weather[0].main : null
                    }
                </h2>
            </div>
            <div className='pos'>
                <div className='d-flex flex-column item w-50'>
                    <img src={humid} alt="" className='img1' />
                    <span>
                        {
                            weatherData && weatherData.currentWeather ? weatherData.currentWeather.main.humidity : null
                        }%
                        </span>
                    <span>Humidity</span>
                </div>
                <div className='d-flex flex-column item w-50'>
                    <img src={wind} alt="" className='img1' />
                    <span>
                        {
                           weatherData && weatherData.currentWeather ? weatherData.currentWeather.wind.speed.toFixed() : null  
                        }km/h
                        </span>
                    <span>Wind</span>
                </div>
                <div className='d-flex flex-column item w-50'>
                    <img src={pressure} alt="" className='img1' />
                    <span> 
                        {
                           weatherData && weatherData.currentWeather ? weatherData.currentWeather.main.pressure : null  
                        }hPa
                        </span>
                    <span>Pressure</span>
                </div>
                <div className='d-flex flex-column item w-50'>
                    <img src={uv} alt="" className='img1' />
                    <span>{
                           weatherData && weatherData.currentWeather ? weatherData.currentWeather.visibility : null  
                        }</span>
                    <span>Visibility</span>
                </div>
            </div>
        </div>
    )
}

export default WeatherDetails