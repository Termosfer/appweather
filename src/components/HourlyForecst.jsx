import React from 'react'
import nav from "../assets/navigation 1.png"
const HourlyForecst = ({ weatherData }) => {
    console.log(weatherData, "we")
    const getWindRotation = (deg) => {
        return `rotate(${deg}deg)`;
    }
    return (
        <div className='d-flex flex-column text-center text-white hourly p-3'>
            <h3 className='pb-1'>Hourly Forecast:</h3>
            <div className='d-flex align-items-center justify-content-evenly'>
                {
                    weatherData && weatherData.forecast.times.slice(3,8).map((t,index) => {

                        return (
                            <div key={index} className='d-flex flex-column  hourly-bg'>
                                <span>{t.time}</span>
                                <img src={t.icon} alt="" className='img' />
                                <span>{t.temperature.toFixed()}℃</span>
                                <img src={nav} alt="" className='img' style={{ transform: getWindRotation(t.deg) }}/>
                                <span>{t.wind.toFixed()}km/h</span>
                            </div>

                        )
                    })

                }
            </div>
        </div>
    )
}

export default HourlyForecst