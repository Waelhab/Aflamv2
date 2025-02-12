import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const MovieDetail = () => {
  const { movie_id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);

  const mainCities = ["Jeddah", "Riyadh", "Dammam", "Tabuk", "Jubail", "Hail"];

  useEffect(() => {
    fetch("/movies.json")
      .then((response) => response.json())
      .then((data) => {
        const selectedMovie = data.find((m) => m.movie_id === movie_id);
        if (!selectedMovie) {
          console.error("Movie not found!");
        }
        setMovie(selectedMovie);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching movie details:", error);
        setLoading(false);
      });
  }, [movie_id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-white">
        <p className="text-xl font-semibold">Loading movie details...</p>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="flex items-center justify-center h-screen text-white">
        <p className="text-red-500 font-bold text-xl">Movie not found!</p>
      </div>
    );
  }

  const availableDates = Object.keys(movie.timings || {}).filter(
    (date) => Object.keys(movie.timings[date].showtimes || {}).length > 0
  );

  const availableCinemas = selectedDate
    ? Object.keys(movie.timings[selectedDate]?.showtimes || {}).filter((cinema) =>
        selectedCity ? cinema.toLowerCase().includes(selectedCity.toLowerCase()) : false
      )
    : [];

  return (
    <div className="bg-gray-900 text-white min-h-screen py-10">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl font-bold text-center">{movie.title}</h1>

        {/* Movie Poster & Details */}
        <div className="mt-8 flex flex-col md:flex-row items-center">
          <img
            src={movie.image_url}
            alt={movie.title}
            className="w-full md:w-1/2 h-96 object-cover rounded-lg shadow-lg"
          />
          <div className="md:ml-6 mt-6 md:mt-0">
            <p className="text-lg">{movie.description || "No description available."}</p>
            <p className="text-gray-400 mt-2">
              <strong>Classification:</strong> {movie.classification}
            </p>
            <p className="text-gray-400">
              <strong>Language:</strong> {movie.language}
            </p>
          </div>
        </div>

        {/* City Selection */}
        <div className="mt-6">
          <h2 className="text-2xl font-semibold mb-3">Select City</h2>
          <div className="flex overflow-x-auto space-x-4 py-2">
            {mainCities.map((city) => (
              <button
                key={city}
                className={`px-4 py-2 rounded-md text-sm font-semibold ${
                  selectedCity === city ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-300"
                }`}
                onClick={() => setSelectedCity(city)}
              >
                {city}
              </button>
            ))}
          </div>
        </div>

        {/* Date Selection */}
        {selectedCity && availableDates.length > 0 && (
          <div className="mt-6">
            <h2 className="text-2xl font-semibold mb-3">Select Date</h2>
            <div className="flex overflow-x-auto space-x-4 py-2">
              {availableDates.map((date, index) => (
                <button
                  key={date}
                  className={`px-4 py-2 rounded-md text-sm font-semibold ${
                    selectedDate === date ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-300"
                  }`}
                  onClick={() => setSelectedDate(date)}
                >
                  {index === 0
                    ? "Today"
                    : index === 1
                    ? "Tomorrow"
                    : new Date(date).toLocaleDateString("en-US", {
                        weekday: "short",
                        day: "numeric",
                        month: "short",
                      })}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Showtimes */}
        {selectedCity && selectedDate && availableCinemas.length > 0 && (
          <div className="mt-10">
            <h2 className="text-2xl font-semibold mb-4">Showtimes</h2>
            <div className="p-6 bg-gray-800 rounded-lg">
              {availableCinemas.map((cinema) => (
                <div key={cinema} className="mb-6">
                  <h3 className="text-lg font-semibold text-yellow-400">{cinema}</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mt-2">
                    {Object.entries(movie.timings[selectedDate].showtimes[cinema] || {}).map(
                      ([format, times]) => (
                        <div key={format}>
                          <h4 className="text-md font-semibold text-gray-300 mb-1">{format}</h4>
                          <div className="flex flex-wrap gap-2">
                            {times.map((time) => (
                              <button
                                key={time}
                                className="px-3 py-1 bg-gray-700 text-white rounded-lg hover:bg-blue-500 transition"
                              >
                                {time}
                              </button>
                            ))}
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieDetail;