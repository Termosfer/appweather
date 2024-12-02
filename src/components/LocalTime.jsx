import React from 'react'
import "./header.css"
const LocalTime = ({ weatherData }) => {
    console.log(weatherData
        , "ad")
    return (
        <div className='d-flex flex-column align-items-center justify-content-between local-time'>
            <h2 className='fw-bold'>
                {
                    weatherData && weatherData.currentWeather ? weatherData.currentWeather.name : null
                }
            </h2>
            <div className='d-flex flex-column align-items-center'>
                <h1>
                    {
                        weatherData && weatherData.currentWeather ? weatherData.currentWeather.localTimeOnly : null
                    }
                </h1>
                <span> {
                        weatherData && weatherData.currentWeather ? weatherData.currentWeather.localDateOnly : null
                    }</span>
            </div>
        </div>
    )
}

export default LocalTime