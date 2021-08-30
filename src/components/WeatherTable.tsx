import React, { ChangeEvent } from "react";

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
  date: number;
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
    sunrise: number;
    sunset: number;
    other: WeatherDataFiltered;
  };
  hourly: WeatherDataFiltered[];
}

interface WeatherState {
  weatherData: WholeWeatherData;
  city: string;
}

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

export default class WeatherTable extends React.Component<{}, WeatherState> {
  state: WeatherState = {
    weatherData: {} as WholeWeatherData,
    city: 'Kyiv',
  }

  handleChange(e: ChangeEvent<HTMLInputElement>) {
    this.setState({ city: e.target.value });
  }

  componentDidUpdate() {
    const f = async () => {
      const weatherData = await getCityWeather(this.state.city);
      this.setState({ weatherData });
    };
    f();
  }

  render() {
    const { weatherData, city } = this.state;

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
              onChange={this.handleChange.bind(this)}
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
}

interface CurrentWeatherProps {
  sunrise: Date;
  sunset: Date;
  other: WeatherDataFiltered;
}

class CurrentWeather extends React.Component<CurrentWeatherProps> {
  render() {
    return (
      <div className="chunk bg-indigo-200 rounded-3xl p-6">
        <div className="flex flex-wrap justify-center items-center m-6">
          <p className="w-30 sm:w-60">
            {new Date(this.props.other.date * 1000).toDateString()}
          </p>
          <em className="emph p-4">
            {this.props.other.weather_description}
          </em>
          <img
            src={this.props.other.weather_icon_uri}
            alt={this.props.other.weather_main}
            className="block w-24"
          />
        </div>
        <div className="paragraph bg-indigo-300 rounded-lg p-2 my-0 sm:my-0">
          <p>
            Sunrise at {this.props.sunrise.toTimeString().match(/\d\d:\d\d/)} and 
            sunset at {this.props.sunset.toTimeString().match(/\d\d:\d\d/)}.
          </p>
          <p>
            Temperature is {this.props.other.temp} C
            and it feels like {this.props.other.feels_like} C.
          </p>
          <p>
            Humidity: {this.props.other.humidity}%.
          </p>
          <p>
            Pressure: {this.props.other.pressure}hPa.
          </p>
        </div>
      </div>
    );
  }
}

interface WeatherForHourProps {
  data: WeatherDataFiltered;
}

class WeatherForHour extends React.Component<WeatherForHourProps> {
  render() {
    const { data } = this.props;
    return (
      <tr>
        <td className="text-right">{new Date(data.date * 1000).getHours()}</td>
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
}

async function getCityWeather(city: string) {
  const coords = await getCityCoordinates(typeof city === 'string' ? city : city[0]);
  if (coords.length === 0) {
    return {} as WholeWeatherData;
  }

  const [lat, lon] = coords;
  const WEATHER_URI = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;

  const response = await fetch(WEATHER_URI);
  const data = await response.json();

  if (typeof data.current !== 'undefined') {
    const { current, hourly } = data;
    const weatherData: WholeWeatherData = {
      current: {
        sunrise: current.sunrise,
        sunset: current.sunset,
        other: getWeatherDataFiltered(current),
      },
      hourly: hourly.slice(0, 24).map((data: WeatherData) => getWeatherDataFiltered(data))
    };

    return weatherData;
  } else {
    return {} as WholeWeatherData;
  }
}

async function getCityCoordinates(city: string) {
  const CITY_URI = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${API_KEY}`;

  const response = await fetch(CITY_URI);
  const data = await response.json();

  if (data.length > 0) {
    return [data[0].lat, data[0].lon];
  } else {
    return [];
  }
}

function getWeatherDataFiltered(data: WeatherData): WeatherDataFiltered {
  return {
    date: data.dt,
    feels_like: data.feels_like,
    humidity: data.humidity,
    pressure: data.pressure,
    temp: data.temp,
    weather_description: data.weather[0].description,
    weather_icon_uri: `http://openweathermap.org/img/w/${data.weather[0].icon}.png`,
    weather_main: data.weather[0].main,
  };
}