import Image from 'next/image'
import { useState, useEffect, ChangeEvent, SyntheticEvent } from 'react';
import { getCityWeather } from './api/forecast';

export interface WeatherData {
  dt: number;
  feels_like: number;
  humidity: number;
  pressure: number;
  temp: number;
  weather: {
    description: string;
    icon: string;
    main: string;
  }[];
}

export interface WeatherDataFiltered {
  date:  number;
  feels_like: number;
  humidity: number;
  pressure: number;
  temp: number;
  weather_description: string;
  weather_icon_uri: string;
  weather_main: string;
};

export interface WholeWeatherData {
  current: {
    sunrise: number;
    sunset: number;
    other: WeatherDataFiltered;
  };
  hourly: WeatherDataFiltered[];
}

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

function CurrentWeather(props: {
  sunrise: Date;
  sunset: Date;
  other: WeatherDataFiltered;
}) {
  return (
    <div className="chunk bg-indigo-200 rounded-3xl p-6">
      <div className="flex flex-wrap justify-center items-center m-6">
        <p className="w-30 sm:w-60">
          {new Date(props.other.date * 1000).toDateString()}
        </p>
        <em className="emph p-4">
          {props.other.weather_description}
        </em>
        <div>
          <Image
            src={props.other.weather_icon_uri}
            alt={props.other.weather_main}
            width={96}
            height={96}
          />
        </div>
      </div>
      <div className="paragraph bg-indigo-300 rounded-lg p-2 my-0 sm:my-0">
        <p>
          Sunrise at {props.sunrise.toTimeString().match(/\d\d:\d\d/)} and 
          sunset at {props.sunset.toTimeString().match(/\d\d:\d\d/)}.
        </p>
        <p>
          Temperature is {props.other.temp} C
          and it feels like {props.other.feels_like} C.
        </p>
        <p>
          Humidity: {props.other.humidity}%.
        </p>
        <p>
          Pressure: {props.other.pressure}hPa.
        </p>
      </div>
    </div>
  );
}

function WeatherForHour(props: { data: WeatherDataFiltered }) {
  const { data } = props;
  return (
    <tr>
      <td className="text-right">{new Date(data.date * 1000).getHours()}</td>
      <td>
        <Image
          src={data.weather_icon_uri}
          alt={data.weather_main}
          width={44}
          height={44}
        />
      </td>
      <td>{data.weather_description}</td>
      <td>{data.temp} (feels like {data.feels_like})</td>
      <td>{data.humidity}</td>
      <td>{data.pressure}</td>
    </tr>
  );
}