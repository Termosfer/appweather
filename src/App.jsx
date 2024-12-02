import { useState } from 'react'
import getWehterData from './api/getWetherData'
import './App.css'
import DailyForecast from './components/DailyForecast'
import Header from './components/Header'
import HourlyForecst from './components/HourlyForecst'
import LocalTime from './components/LocalTime'
import WeatherDetails from './components/WeatherDetails'
function App() {
  const [city, setCity] = useState("")
  const [weatherData, setWeatherData] = useState(null);
  const [show, setShow] = useState(false)
  const clickHandler = async () => {
    if (city.trim() !== "") {
      const data = await getWehterData(city);
      setWeatherData(data);
      setCity("")
    }
  };
  const clickSun = () => {
    setShow(!show)
}
  return (
    <div className={`container w-75 px-5  ${show ? "app" : "dark-mode"}`}>
      <Header clickHandler={clickHandler} city={city} setCity={setCity} setWeatherData={setWeatherData} show={show} setShow={setShow} clickSun={clickSun}/>
      {weatherData && (
        <>
          <div className='row align-items-center'>
            <div className='col-5'>
              <LocalTime weatherData={weatherData} />
            </div>
            <div className="col-7">
              <WeatherDetails weatherData={weatherData} />
            </div>
          </div>
          <div className='row align-items-center py-5'>
            <div className="col-5">
              <DailyForecast weatherData={weatherData} />
            </div>
            <div className='col-7'>
              <HourlyForecst weatherData={weatherData} />
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default App
