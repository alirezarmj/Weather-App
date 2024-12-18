import React from "react";
import { HistoricalWeatherType } from "../types/weather";

interface HistoricalWeatherProps {
  data: HistoricalWeatherType[]; // Array of historical weather data
  isCelsius: boolean;
}

const HistoricalWeather: React.FC<HistoricalWeatherProps> = ({ data, isCelsius }) => {
  return (
    <div className="bg-white mt-3 p-6 rounded-lg shadow-lg w-full">
      <h2 className="text-2xl font-bold mb-4">Historical Weather</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.map((day, index) => {
          const date = new Date(day.datetime);
          const temperature = isCelsius ? day.temp : (day.temp * 9) / 5 + 32; // Convert to °F if needed
          return (
            <div key={index} className="bg-gray-100 p-4 rounded-md shadow-md">
              <h3 className="font-semibold text-lg">{date.toLocaleDateString()}</h3>
              <p>
                Temperature: {temperature.toFixed(1)}°{isCelsius ? "C" : "F"}
              </p>
              <p>
                Max Temp: {isCelsius ? day.max_temp : (day.max_temp * 9) / 5 + 32}°{isCelsius ? "C" : "F"}
              </p>
              <p>
                Min Temp: {isCelsius ? day.min_temp : (day.min_temp * 9) / 5 + 32}°{isCelsius ? "C" : "F"}
              </p>
              <p>Humidity: {day.rh}%</p>
              <p>Wind Speed: {day.wind_spd} m/s</p>
              <p>Precipitation: {day.precip} mm</p>
              <p>Cloud Coverage: {day.clouds}%</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HistoricalWeather;
