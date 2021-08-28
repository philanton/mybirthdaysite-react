import { useEffect, useState } from "react";

interface WeatherData {
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

interface WeatherDataFiltered {
  date: Date;
  feels_like: number;
  humidity: number;
  pressure: number;
  temp: number;
  weather_description: string;
  weather_icon_uri: string;
  weather_main: string;
};

interface WholeWeatherData {
  current: {
    sunrise: Date;
    sunset: Date;
    other: WeatherDataFiltered;
  };
  hourly: WeatherDataFiltered[];
}

export default function WeatherTable() {
  const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
  const lat = '50.450001';
  const lon = '30.523333';
  const URI = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;
  const [weatherData, setWeatherData] = useState<WholeWeatherData>({} as WholeWeatherData);

  useEffect(() => {
    fetch(URI)
      .then(response => response.json())
      .then(data => {
        const { current, hourly } = data;
        const weatherData: WholeWeatherData = {
          current: {
            sunrise: new Date(current.sunrise * 1000),
            sunset: new Date(current.sunset * 1000),
            other: getWeatherDataFiltered(current),
          },
          hourly: hourly.slice(0, 24).map((data: WeatherData) => getWeatherDataFiltered(data))
        };
        setWeatherData(weatherData);
      });
  }, [URI])
  
  return Object.keys(weatherData).length === 0 ? null : (
    <div className="desert desert-up">
      <div className="content">
        <h2>Weather Forecast</h2>
        <CurrentWeather
          sunrise={weatherData.current.sunrise}
          sunset={weatherData.current.sunset}
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
              {weatherData.hourly.map((data: WeatherDataFiltered) => <WeatherForHour data={data} key={data.date.getHours()}/>)}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
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
          {props.other.date.toDateString()}
        </p>
        <em className="emph p-4">
          {props.other.weather_description}
        </em>
        <img
          src={props.other.weather_icon_uri}
          alt={props.other.weather_main}
          className="block w-24"
        />
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
      <td className="text-right">{data.date.getHours()}</td>
      <td>
        <img
          src={data.weather_icon_uri}
          alt={data.weather_main}
        />
      </td>
      <td>{data.weather_description}</td>
      <td>{data.temp} (feels like {data.feels_like})</td>
      <td>{data.humidity}</td>
      <td>{data.pressure}</td>
    </tr>
  );
}

function getWeatherDataFiltered(data: WeatherData): WeatherDataFiltered {
  return {
    date: new Date(data.dt * 1000),
    feels_like: data.feels_like,
    humidity: data.humidity,
    pressure: data.pressure,
    temp: data.temp,
    weather_description: data.weather[0].description,
    weather_icon_uri: `http://openweathermap.org/img/w/${data.weather[0].icon}.png`,
    weather_main: data.weather[0].main,
  };
}