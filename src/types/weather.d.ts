export interface WeatherData {
  city_name: string;
  temp: number;
  lat: number; // Latitude
  lon: number; // Longitude
  weather: {
    description: string;
    code: number; // Weather condition code
    icon?: string; // Optional icon from the API
  };
  datetime: string;
}

export interface ForecastDay {
  datetime: string;
  temp: number;
  weather: {
    description: string;
    code: number; // Weather condition code
    icon?: string; // Optional icon from the API
  };
}

export interface HistoricalWeatherType {
  datetime: string; // Date of the weather data (e.g., "2024-12-11")
  temp: number; // Temperature in Celsius
  max_temp: number; // Maximum temperature of the day
  min_temp: number; // Minimum temperature of the day
  rh: number; // Relative humidity (%)
  wind_spd: number; // Wind speed (m/s)
  precip: number; // Precipitation (mm)
  clouds: number; // Cloud coverage (%)
  // You can add more properties if needed
}
