const config = {
  API_KEY: import.meta.env.VITE_WEATHERBIT_API_KEY, // Using Vite's environment variables
  BASE_URL: "https://api.weatherbit.io/v2.0", // Base URL for the Weatherbit API
};

export default config;
