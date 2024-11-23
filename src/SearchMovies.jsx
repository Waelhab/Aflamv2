import React, { useState, useEffect } from "react";
import cinemaLocations from "./data/cinemaLocations.json"; // Path to cinema locations JSON
import movieData from "../data.json"; // Path to movie data JSON

const SearchMovies = () => {
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [cinemas, setCinemas] = useState([]);
  const [selectedCinemaId, setSelectedCinemaId] = useState("");
  const [selectedCinemaName, setSelectedCinemaName] = useState("");
  const [showTimes, setShowTimes] = useState([]);
  const [isSearchClicked, setIsSearchClicked] = useState(false);

  // Load cities and cinemas from JSON
  useEffect(() => {
    console.log("Loading cities from cinemaLocations.json...");
    setCities(cinemaLocations.cities); // Load cities from cinemaLocations.json
    console.log("Loaded cities:", cinemaLocations.cities);
  }, []);

  const handleCityChange = (event) => {
    const cityName = event.target.value;
    setSelectedCity(cityName);
    setSelectedCinemaId(""); // Reset cinema selection
    setSelectedCinemaName("");
    setShowTimes([]); // Reset showtimes
    setIsSearchClicked(false);
    console.log("Selected city:", cityName);

    // Find cinemas for the selected city
    const selectedCityData = cities.find((city) => city.name === cityName);
    if (selectedCityData) {
      setCinemas(selectedCityData.cinemas || []);
      console.log("Cinemas for selected city:", selectedCityData.cinemas);
    } else {
      setCinemas([]);
      console.warn("No cinemas found for selected city:", cityName);
    }
  };

  const handleCinemaChange = (event) => {
    const cinemaId = event.target.value;
    const selectedCinema = cinemas.find((cinema) => cinema.cinemaId === cinemaId);

    setSelectedCinemaId(cinemaId);
    setSelectedCinemaName(selectedCinema ? selectedCinema.name : "");
    setShowTimes([]); // Reset showtimes
    setIsSearchClicked(false);
    console.log("Selected cinemaId:", cinemaId);
    console.log("Selected cinemaName:", selectedCinema?.name || "Not found");
  };

  const handleSearch = () => {
    if (!selectedCity || !selectedCinemaId) {
      alert("Please select both a city and a cinema.");
      return;
    }

    console.log("Searching for showtimes...");
    console.log("Selected City:", selectedCity);
    console.log("Selected Cinema:", selectedCinemaName);

    setIsSearchClicked(true); // Button clicked

    // Filter movies based on the selected cinemaId
    const cinemaShowTimes = movieData.reduce((acc, movie) => {
      console.log("Processing movie:", movie.name);

      // Find showtimes for the selected cinemaId
      const showTimesForCinema = movie.showTimes.cinemas?.find(
        (cinema) => cinema.cinemaId === selectedCinemaId
      );

      if (showTimesForCinema) {
        console.log(`Showtimes found for "${movie.name}" at cinema "${selectedCinemaName}"`, showTimesForCinema);

        acc.push({
          movieName: movie.name,
          moviePoster: movie.poster,
          movieAgeRating: movie.ageRating,
          showTimes: showTimesForCinema.dates, // Include all dates and times for this cinema
        });
      } else {
        console.warn(`No showtimes found for movie "${movie.name}" at cinema "${selectedCinemaName}"`);
      }

      return acc;
    }, []);

    if (cinemaShowTimes.length === 0) {
      console.warn("No showtimes found for selected cinema:", selectedCinemaName);
    }

    console.log("Final showtimes:", cinemaShowTimes);
    setShowTimes(cinemaShowTimes); // Set all collected showtimes
  };

  return (
    <div className="bg-gray-900 text-white p-6">
      {/* Dropdowns */}
      <div className="flex flex-wrap justify-center items-center space-x-4 mb-6">
        {/* City Dropdown */}
        <div>
          <label htmlFor="city" className="sr-only">
            Select Your City
          </label>
          <select
            id="city"
            value={selectedCity}
            onChange={handleCityChange}
            className="p-3 rounded-lg bg-gray-800 text-white focus:ring focus:ring-pink-500"
          >
            <option value="">Select Your City</option>
            {cities.map((city) => (
              <option key={city.name} value={city.name}>
                {city.name}
              </option>
            ))}
          </select>
        </div>

        {/* Cinema Dropdown */}
        <div>
          <label htmlFor="cinema" className="sr-only">
            Select Your Cinema
          </label>
          <select
            id="cinema"
            value={selectedCinemaId}
            onChange={handleCinemaChange}
            className="p-3 rounded-lg bg-gray-800 text-white focus:ring focus:ring-pink-500"
            disabled={!selectedCity || cinemas.length === 0}
          >
            <option value="">Select Your Cinema</option>
            {cinemas.map((cinema) => (
              <option key={cinema.cinemaId} value={cinema.cinemaId}>
                {cinema.name}
              </option>
            ))}
          </select>
        </div>

        {/* Search Button */}
        <button
          onClick={handleSearch}
          className="bg-pink-600 hover:bg-pink-700 text-white font-semibold px-6 py-3 rounded-lg focus:ring focus:ring-pink-500"
        >
          Find Times And Book
        </button>
      </div>

      {/* Showtimes Section */}
      <div className="max-w-6xl mx-auto">
        {isSearchClicked && showTimes.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-4">
              Showtimes for {selectedCinemaName}, {selectedCity}
            </h2>
            <div className="space-y-6">
              {showTimes.map((movie, index) => (
                <div key={index} className="bg-gray-800 rounded-lg p-4 shadow-md">
                  <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 mb-4">
                    <img
                      src={movie.moviePoster}
                      alt={movie.movieName}
                      className="w-full md:w-20 h-auto rounded-lg object-cover"
                    />
                    <div>
                      <h3 className="text-lg font-semibold text-pink-500">
                        {movie.movieName}
                      </h3>
                      <p className="text-gray-400">
                        Age Rating: {movie.movieAgeRating}
                      </p>
                    </div>
                  </div>
                  {movie.showTimes.map((showTime, idx) => (
                    <div key={idx} className="mb-4">
                      <p className="text-gray-400 mb-2">
                        <strong>{showTime.date}</strong>
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {showTime.times.map((time, timeIdx) => (
                          <button
                            key={timeIdx}
                            className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-md shadow-md"
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}
        {isSearchClicked && showTimes.length === 0 && (
          <p className="text-center text-gray-400">
            No showtimes available for {selectedCinemaName}.
          </p>
        )}
      </div>
    </div>
  );
};

export default SearchMovies;
