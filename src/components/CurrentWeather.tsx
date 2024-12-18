import { WeatherData } from "../types/weather";
import { getWeatherIcon } from "../utils/weatherIcons";
interface CurrentWeatherProps {
  data: WeatherData;
  isCelsius: boolean;
}

function CurrentWeather({ data, isCelsius }: CurrentWeatherProps) {
  const { city_name, temp, weather, datetime } = data;

  const dateOnly = datetime.split(":")[0]; // Extract date portion
  const parsedDate = new Date(dateOnly);

  // Convert temperature based on the unit
  const displayTemp = isCelsius ? temp : (temp * 9) / 5 + 32;
  const tempUnit = isCelsius ? "°C" : "°F";

  return (
    <div className="bg-white text-gray-800 rounded-lg shadow-lg p-6 mt-6 w-80 text-center">
      <h2 className="text-2xl font-bold">{city_name}</h2>
      <p className="text-sm">{parsedDate.toLocaleString()}</p>
      <i className={`wi ${getWeatherIcon(weather.code)} text-6xl text-blue-500 my-4`}></i>
      <p className="text-6xl my-4">
        {displayTemp.toFixed(1)}
        {tempUnit}
      </p>
      <p className="text-xl">{weather.description}</p>
    </div>
  );
}

export default CurrentWeather;
