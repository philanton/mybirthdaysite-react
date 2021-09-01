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

export interface WeatherDataFiltered {
  date: number;
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

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

export default async function getCityWeather(city: string) {
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