import { ForecastDay } from "../types/weather";
import { getWeatherIcon } from "../utils/weatherIcons";
interface ForecastWeatherProps {
  data: ForecastDay[];
  isCelsius: boolean;
}

function ForecastWeather({ data, isCelsius }: ForecastWeatherProps) {
  return (
    <div className="mt-10">
      <h2 className="text-2xl font-bold mb-4">7-Day Forecast</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {data.slice(0, 7).map((day, index) => {
          const dateTimeString = day?.datetime.replace(":", "T") + ":00:00";
          const parsedDate = new Date(dateTimeString);
          const formattedDate = parsedDate.toLocaleString();

          const displayTemp = isCelsius ? day.temp : (day.temp * 9) / 5 + 32;
          const tempUnit = isCelsius ? "°C" : "°F";

          return (
            <div key={index} className="bg-white text-gray-800 rounded-lg shadow p-4 text-center">
              <p className="font-semibold">{formattedDate}</p>
              <i className={`wi ${getWeatherIcon(day?.weather?.code)} text-4xl text-blue-500 my-2`}></i>
              <p className="text-4xl my-2">
                {displayTemp.toFixed(1)}
                {tempUnit}
              </p>
              <p>{day.weather.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ForecastWeather;
