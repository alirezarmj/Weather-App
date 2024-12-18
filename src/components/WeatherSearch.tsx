import React, { useState } from "react";

interface WeatherSearchProps {
  onSearch: (location: string) => void;
}

const WeatherSearch: React.FC<WeatherSearchProps> = ({ onSearch }) => {
  const [location, setLocation] = useState("");

  const handleSearch = (e?: React.FormEvent) => {
    e?.preventDefault(); // Prevent default form submission behavior
    if (!location.trim()) {
      alert("Please enter a location!");
      return;
    }
    onSearch(location);
    setLocation("");
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mt-4 w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl">
      <h2 className="text-xl sm:text-2xl font-bold mb-2 text-center">Search Weather by Location</h2>
      <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-2">
        <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Enter city or location" className="flex-1 p-2 border rounded mb-2 sm:mb-0 sm:mr-2" />
        <button
          type="submit" // Set type to submit
          className="px-4 py-2 bg-blue-500 text-white rounded shadow-md hover:bg-blue-600 w-full sm:w-auto"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default WeatherSearch;
