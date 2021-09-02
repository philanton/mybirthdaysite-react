import { NextApiRequest, NextApiResponse } from "next";
import {
  WholeWeatherData,
  WeatherData,
  getCityCoordinates,
  getWeatherDataFiltered,
} from "../../utils/weatherAPI";

const API_KEY = process.env.weatherAPIKey;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (typeof req.query.city !== 'string') {
    res.status(404).json({ error: "City is not provided!" })
  }

  const { city } = req.query;
  const coords = await getCityCoordinates(typeof city === 'string' ? city : city[0]);
  if (coords.length === 0) {
    res.status(404).json({ error: "No such city" });
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

    res.status(200).json(weatherData);
  } else {
    res.status(404).json({error: "There are some problems"});
  }
}