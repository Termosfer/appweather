import { FaRegSun, FaRegMoon, FaSearch } from "react-icons/fa";
import { FaLocationCrosshairs } from "react-icons/fa6";
import "./header.css"
import { useState } from "react";
import { API_KEY, BASE_URL } from "../api/api";
const Header = ({ city, setCity, clickHandler, show, clickSun }) => {
    const [loading, setLoading] = useState(false);

    const getCurrentLocation = () => {
        if (navigator.geolocation) {
            setLoading(true);
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    fetchCityByCoordinates(latitude, longitude);
                },
                (error) => {
                    console.log(error)
                    setLoading(false);
                }
            );
        } else {
            setLoading(false);
        }
    };


    const fetchCityByCoordinates = async (latitude, longitude) => {
        const url = `${BASE_URL}/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;

        try {
            const response = await fetch(url);
            const data = await response.json();
            const cityName = data.name;
            setCity(cityName);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='d-flex align-items-center justify-content-between header'>
            <div>
                {
                    show ? <FaRegMoon className='sun' onClick={clickSun} /> : <FaRegSun className='sun' onClick={clickSun} />
                }

            </div>
            <div className='search-input'>
                <input type="text" placeholder='Search city...' className='w-100' onChange={(e) => setCity(e.target.value)} value={city} />
                <FaSearch className='search' onClick={clickHandler} />
            </div>
            <button onClick={getCurrentLocation} disabled={loading} className='d-flex align-items-center gap-2 button'>
                <FaLocationCrosshairs className='location' />
                {loading ? "Loading..." : "Current Location"}
            </button>
        </div>
    )
}

export default Header