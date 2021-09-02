import { useState, useEffect, ChangeEvent } from 'react';
import CurrentWeather from '../components/currentWeather';
import WeatherForHour from '../components/weatherForHour';
import {
  WholeWeatherData,
  WeatherDataFiltered,
  getCityWeather,
} from '../utils/weatherAPI';

export default function WeatherTable() {
  const [weatherData, setWeatherData] = useState({} as WholeWeatherData);
  const [city, setCity] = useState('Kyiv');

  useEffect(() => {
    const f = async () => {
      const _weatherData = await getCityWeather(city);
      setWeatherData(_weatherData);
    };
    f();
  }, [city]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => setCity(e.target.value);

  return (
    <div className="desert desert-up">
      <div className="content">
        <h2>Weather Forecast</h2>
        <div className="chunk">
          <label
            className="lbl"
            htmlFor="city"
            id="city-label"
          >
            Your city:
          </label>
          <input
            type="text"
            id="city"
            name="city"
            onChange={handleChange}
            placeholder="My city"
            value={city}
            required
          />
        </div>
        {Object.keys(weatherData).length === 0 ? null : (
          <>
            <CurrentWeather
              sunrise={new Date(weatherData.current.sunrise * 1000)}
              sunset={new Date(weatherData.current.sunset * 1000)}
              other={weatherData.current.other}
            />
            <div className="overflow-x-scroll border-indigo-400 border-8 rounded-3xl">
              <table>
                <thead>
                  <tr>
                    <th className="w-16 sm:w-24">Hour</th>
                    <th className="w-12 sm:w-16"></th>
                    <th className="w-44 sm:w-64">Status</th>
                    <th className="w-52 sm:w-96">Temperature, C</th>
                    <th className="w-32 sm:w-48">Humidity, %</th>
                    <th className="w-36 sm:w-56">Pressure, hPa</th>
                  </tr>
                </thead>
                <tbody>
                  {weatherData.hourly.map((data: WeatherDataFiltered) => <WeatherForHour data={data} key={data.date}/>)}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  )
}