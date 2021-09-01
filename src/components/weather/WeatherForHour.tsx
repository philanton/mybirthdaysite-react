import React from "react"
import { WeatherDataFiltered } from "../../utils/weatherAPI";

interface WeatherForHourProps {
    data: WeatherDataFiltered;
}

const WeatherForHour: React.FC<WeatherForHourProps> = props => {
  const { data } = props;
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

export default WeatherForHour;