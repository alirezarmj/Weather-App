import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useWeatherData from "./hooks/useWeatherData";
import { CurrentWeather, ErrorBoundary, ForecastWeather, HistoricalWeather, WeatherSearch } from "./components";

const App: React.FC = () => {
  const {
    weatherData,
    forecastData,
    historicalData,
    showForecast,
    showHistorical,
    isCelsius,
    broadcastMessage,
    toggleView,
    toggleHistoricalView,
    toggleUnit,
    dismissBroadcast,
    handleRefresh,
    handleSearch,
  } = useWeatherData();

  return (
    <div className="min-h-screen bg-blue-100 flex flex-col items-center justify-center p-6">
      <ToastContainer />
      {broadcastMessage && (
        <div className="bg-red-500 text-white p-4 rounded-md shadow-md w-full text-center mb-4 flex justify-between items-center">
          <span>{broadcastMessage}</span>
          <button onClick={dismissBroadcast} className="ml-4 bg-red-700 hover:bg-red-800 text-white font-bold py-1 px-3 rounded">
            Dismiss
          </button>
        </div>
      )}

      <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mt-8 text-center">Weather Forecast</h1>
      <WeatherSearch onSearch={handleSearch} />
      <ErrorBoundary>
        {weatherData ? (
          <>
            {showForecast ? (
              <ForecastWeather data={forecastData || []} isCelsius={isCelsius} />
            ) : showHistorical ? (
              <HistoricalWeather data={historicalData || []} isCelsius={isCelsius} />
            ) : (
              <CurrentWeather data={weatherData} isCelsius={isCelsius} />
            )}
            <div className="flex flex-wrap gap-4 mt-6 justify-center">
              <button onClick={toggleView} className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 w-full sm:w-auto">
                {showForecast ? "Show Current Weather" : "Show 7-Day Forecast"}
              </button>
              <button onClick={toggleHistoricalView} className="px-4 py-2 bg-yellow-500 text-white rounded-lg shadow-md hover:bg-yellow-600 w-full sm:w-auto">
                {showHistorical ? "Hide Historical Weather" : "Show Historical Weather"}
              </button>
              <button onClick={handleRefresh} className="px-4 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 w-full sm:w-auto">
                Refresh Weather
              </button>
              <button onClick={toggleUnit} className="px-4 py-2 bg-purple-500 text-white rounded-lg shadow-md hover:bg-purple-600 w-full sm:w-auto">
                {isCelsius ? "Switch to °F" : "Switch to °C"}
              </button>
            </div>
          </>
        ) : (
          <p className="mt-4">Loading weather data...</p>
        )}
      </ErrorBoundary>
    </div>
  );
};

export default App;
