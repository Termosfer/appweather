const DailyForecast = ({ weatherData }) => {
    return (
        <div className='d-flex flex-column daily p-3 text-center'>
            <h4 >5 Days Forecast:</h4>
            {
                weatherData && weatherData.fiveDayForecast?.map((t, index) => {
                    return (
                        <div key={index} >
                            <img src={t.icon} alt="" className='img' />
                            <div className='span1'>{t.temperature.toFixed()}℃</div>
                            <div className='span2'>{t.date}</div>
                        </div>
                    )
                })

            }
        </div>
    )
}

export default DailyForecast