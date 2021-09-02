import Image from 'next/image'
import { WeatherDataFiltered } from "../utils/weatherAPI";

export default function WeatherForHour(props: { data: WeatherDataFiltered }) {
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