export const getWeatherIcon = (code: number): string => {
  const weatherIcons: { [key: number]: string } = {
    // Thunderstorm
    200: "wi-storm-showers", // Thunderstorm with light rain
    201: "wi-thunderstorm", // Thunderstorm with rain
    202: "wi-thunderstorm", // Thunderstorm with heavy rain
    230: "wi-thunderstorm", // Thunderstorm with light drizzle
    231: "wi-thunderstorm", // Thunderstorm with drizzle
    232: "wi-thunderstorm", // Thunderstorm with heavy drizzle

    // Drizzle
    300: "wi-sprinkle", // Light drizzle
    301: "wi-sprinkle", // Drizzle
    302: "wi-sprinkle", // Heavy drizzle

    // Rain
    500: "wi-rain", // Light rain
    501: "wi-rain", // Moderate rain
    502: "wi-rain", // Heavy rain
    511: "wi-rain-mix", // Freezing rain
    520: "wi-showers", // Light shower rain
    521: "wi-showers", // Shower rain
    522: "wi-showers", // Heavy shower rain

    // Snow
    600: "wi-snow", // Light snow
    601: "wi-snow", // Snow
    602: "wi-snow", // Heavy snow
    610: "wi-sleet", // Mixed snow/rain
    611: "wi-sleet", // Sleet
    612: "wi-sleet", // Light sleet
    621: "wi-snow", // Snow showers
    622: "wi-snow", // Heavy snow showers

    // Atmosphere
    700: "wi-fog", // Mist
    711: "wi-smoke", // Smoke
    721: "wi-day-haze", // Haze
    731: "wi-dust", // Sand/dust whirls
    741: "wi-fog", // Fog
    751: "wi-dust", // Sand
    761: "wi-dust", // Dust
    762: "wi-volcano", // Volcanic ash
    771: "wi-strong-wind", // Squalls
    781: "wi-tornado", // Tornado

    // Clear and Clouds
    800: "wi-day-sunny", // Clear sky
    801: "wi-day-cloudy", // Few clouds
    802: "wi-cloud", // Scattered clouds
    803: "wi-cloudy", // Broken clouds
    804: "wi-cloudy", // Overcast clouds
  };

  // Fallback to a generic "cloudy" icon for unmapped codes
  return weatherIcons[code] || "wi-cloudy";
};
