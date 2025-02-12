import React, { useState, useEffect } from "react";

const SearchMovies = () => {
  const [movies, setMovies] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [cinemas, setCinemas] = useState([]);
  const [selectedCinema, setSelectedCinema] = useState("");
  const [showTimes, setShowTimes] = useState([]);
  const [isSearchClicked, setIsSearchClicked] = useState(false);

  // Load movie data from JSON
  useEffect(() => {
    fetch("/movies.json") // Ensure the path is correct
      .then((res) => res.json())
      .then((data) => {
        setMovies(data);

        // Extract unique cities from movie showtimes
        const uniqueCities = new Set();
        data.forEach((movie) => {
          if (movie.timings) {
            Object.values(movie.timings).forEach((details) => {
              Object.keys(details.showtimes).forEach((cinema) => {
                uniqueCities.add(cinema.split(" - ")[0]); // Extract city name
              });
            });
          }
        });

        setCities([...uniqueCities]);
      })
      .catch((error) => console.error("Error fetching movies:", error));
  }, []);

  // Update cinemas when city is selected
  const handleCityChange = (event) => {
    const cityName = event.target.value;
    setSelectedCity(cityName);
    setSelectedCinema("");
    setShowTimes([]);
    setIsSearchClicked(false);

    // Extract unique cinemas for the selected city
    const uniqueCinemas = new Set();
    movies.forEach((movie) => {
      if (movie.timings) {
        Object.values(movie.timings).forEach((details) => {
          Object.keys(details.showtimes).forEach((cinema) => {
            if (cinema.startsWith(cityName)) {
              uniqueCinemas.add(cinema);
            }
          });
        });
      }
    });

    setCinemas([...uniqueCinemas]);
  };

  // Handle cinema selection
  const handleCinemaChange = (event) => {
    setSelectedCinema(event.target.value);
    setShowTimes([]);
    setIsSearchClicked(false);
  };

  // Handle search action
  const handleSearch = () => {
    if (!selectedCity || !selectedCinema) {
      alert("Please select both a city and a cinema.");
      return;
    }

    setIsSearchClicked(true);

    // Filter showtimes based on selected cinema
    const filteredShowTimes = movies
      .map((movie) => ({
        movieName: movie.name,
        moviePoster: movie.image_url,
        movieAgeRating: movie.classification,
        showTimes: movie.timings
          ? Object.entries(movie.timings)
              .map(([date, details]) => ({
                date,
                dayOfWeek: details.day_of_week,
                times: details.showtimes[selectedCinema] || [],
              }))
              .filter((entry) => entry.times.length > 0)
          : [],
      }))
      .filter((movie) => movie.showTimes.length > 0);

    setShowTimes(filteredShowTimes);
  };

  return (
    <div className="bg-gray-900 text-white p-6">
      {/* Dropdowns */}
      <div className="flex flex-wrap justify-center items-center space-x-4 mb-6">
        {/* City Dropdown */}
        <select
          value={selectedCity}
          onChange={handleCityChange}
          className="p-3 rounded-lg bg-gray-800 text-white focus:ring focus:ring-pink-500"
        >
          <option value="">Select Your City</option>
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>

        {/* Cinema Dropdown */}
        <select
          value={selectedCinema}
          onChange={handleCinemaChange}
          className="p-3 rounded-lg bg-gray-800 text-white focus:ring focus:ring-pink-500"
          disabled={!selectedCity || cinemas.length === 0}
        >
          <option value="">Select Your Cinema</option>
          {cinemas.map((cinema) => (
            <option key={cinema} value={cinema}>
              {cinema}
            </option>
          ))}
        </select>

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
        {isSearchClicked && showTimes.length > 0 ? (
          <div>
            <h2 className="text-2xl font-bold mb-4">
              Showtimes for {selectedCinema}, {selectedCity}
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
                      <p className="text-gray-400">Age Rating: {movie.movieAgeRating}</p>
                    </div>
                  </div>
                  {movie.showTimes.map((showTime, idx) => (
                    <div key={idx} className="mb-4">
                      <p className="text-gray-400 mb-2">
                        <strong>{showTime.dayOfWeek}, {showTime.date}</strong>
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
        ) : (
          isSearchClicked && (
            <p className="text-center text-gray-400">
              No showtimes available for {selectedCinema}.
            </p>
          )
        )}
      </div>
    </div>
  );
};

export default SearchMovies;
