import { useState, useEffect, useCallback, useRef } from "react";
import { toast } from "react-toastify";
import { HistoricalWeatherType, WeatherData } from "../types/weather";
import config from "../config";

const useWeatherData = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [forecastData, setForecastData] = useState<WeatherData[] | null>(null);
  const [historicalData, setHistoricalData] = useState<HistoricalWeatherType[] | null>(null);
  const [showForecast, setShowForecast] = useState(false);
  const [showHistorical, setShowHistorical] = useState(false);
  const [isCelsius, setIsCelsius] = useState(true);
  const [broadcastMessage, setBroadcastMessage] = useState<string | null>(null);

  const hasFetchedData = useRef(false);
  const hasShownError = useRef(false);

  const fetchWeatherData = useCallback(async (lat: number, lon: number) => {
    const getCurrentDate = () => new Date().toISOString().split("T")[0];
    const getPastDate = (days: number) => {
      const pastDate = new Date();
      pastDate.setDate(pastDate.getDate() - days);
      return pastDate.toISOString().split("T")[0];
    };

    try {
      const currentWeatherResponse = await fetch(`${config.BASE_URL}/current?lat=${lat}&lon=${lon}&key=${config.API_KEY}`);
      if (!currentWeatherResponse.ok) throw new Error("Failed to fetch current weather data");
      const currentWeather = await currentWeatherResponse.json();
      setWeatherData(currentWeather.data[0]);

      const forecastWeatherResponse = await fetch(`${config.BASE_URL}/forecast/daily?lat=${lat}&lon=${lon}&key=${config.API_KEY}`);
      if (!forecastWeatherResponse.ok) throw new Error("Failed to fetch forecast data");
      const forecastWeather = await forecastWeatherResponse.json();
      setForecastData(forecastWeather.data);

      const historicalWeatherResponse = await fetch(`${config.BASE_URL}/history/daily?lat=${lat}&lon=${lon}&key=${config.API_KEY}&start_date=${getPastDate(7)}&end_date=${getCurrentDate()}`);
      if (!historicalWeatherResponse.ok) throw new Error("Failed to fetch historical data");
      const historicalWeather = await historicalWeatherResponse.json();
      setHistoricalData(historicalWeather.data);

      if (!hasFetchedData.current) {
        toast.success("Weather data loaded successfully!");
        hasFetchedData.current = true;
      }

      const severeWeather = currentWeather.data[0]?.weather?.description.toLowerCase();
      if (severeWeather.includes("storm") || severeWeather.includes("snow") || severeWeather.includes("heat")) {
        setBroadcastMessage(`⚠️ Important: ${currentWeather.data[0]?.weather?.description}. Stay safe!`);
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
      if (!hasShownError.current) {
        toast.error("Failed to fetch weather data. Please try again.");
        hasShownError.current = true;
      }
    }
  }, []);

  const detectUserLocation = useCallback(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeatherData(latitude, longitude);
        },
        (error) => {
          console.error("Error fetching geolocation:", error);
          if (!hasShownError.current) {
            toast.error("Unable to retrieve location. Please allow location access.");
            hasShownError.current = true;
          }
        }
      );
    } else {
      if (!hasShownError.current) {
        toast.error("Geolocation is not supported by this browser.");
        hasShownError.current = true;
      }
    }
  }, [fetchWeatherData]);

  const handleSearch = async (location: string) => {
    try {
      const response = await fetch(`${config.BASE_URL}/current?city=${location}&key=${config.API_KEY}`);
      if (!response.ok) throw new Error("Failed to fetch weather data for the location.");
      const data = await response.json();
      const { lat, lon } = data.data[0];
      fetchWeatherData(lat, lon);
      toast.success(`Weather data for ${location} loaded successfully!`);
    } catch (error) {
      console.error("Error searching weather data:", error);
      if (!hasShownError.current) {
        toast.error("Failed to fetch weather data for the location. Please try again.");
        hasShownError.current = true;
      }
    }
  };

  const toggleView = () => {
    setShowForecast((prev) => !prev);
    setShowHistorical(false);
  };

  const toggleHistoricalView = () => {
    setShowHistorical((prev) => !prev);
    setShowForecast(false);
  };

  const toggleUnit = () => setIsCelsius((prev) => !prev);

  const dismissBroadcast = () => setBroadcastMessage(null);

  const handleRefresh = () => {
    hasFetchedData.current = false;
    hasShownError.current = false;
    detectUserLocation();
  };

  useEffect(() => {
    detectUserLocation();
  }, [detectUserLocation]);

  return {
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
  };
};

export default useWeatherData;
