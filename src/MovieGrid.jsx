import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./UserContext"; // Import UserContext

const MovieGrid = () => {
  const { user } = useContext(UserContext); // Access the user from context
  const [movies, setMovies] = useState([]);
  const [visibleMovies, setVisibleMovies] = useState([]);
  const [startIndex, setStartIndex] = useState(0);

  useEffect(() => {
    // Fetch data from data.json file
    fetch("/data.json")
      .then((response) => response.json())
      .then((data) => {
        setMovies(data); // Store all movies
        setVisibleMovies(data.slice(0, 4)); // Show the first 4 movies initially
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleNext = () => {
    if (startIndex + 4 < movies.length) {
      setStartIndex((prevIndex) => prevIndex + 1);
      setVisibleMovies(movies.slice(startIndex + 1, startIndex + 5));
    }
  };

  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex((prevIndex) => prevIndex - 1);
      setVisibleMovies(movies.slice(startIndex - 1, startIndex + 3));
    }
  };

  return (
    <div className="bg-gradient-to-b from-white via-red-50 to-red-100 py-10">
      {/* Welcome Message */}
      <div className="text-center mb-6">
        
      </div>

      {/* Title */}
      <h2 className="text-black text-3xl font-bold text-center mb-6">
        What's On
      </h2>

      <div className="relative mx-auto px-4 max-w-7xl">
        {/* Navigation Buttons */}
        <button
          onClick={handlePrev}
          disabled={startIndex === 0}
          className="absolute top-1/2 -left-10 transform -translate-y-1/2 bg-gray-800 text-white p-3 rounded-full shadow-md hover:bg-gray-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          &#8249;
        </button>
        <button
          onClick={handleNext}
          disabled={startIndex + 4 >= movies.length}
          className="absolute top-1/2 -right-10 transform -translate-y-1/2 bg-gray-800 text-white p-3 rounded-full shadow-md hover:bg-gray-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          &#8250;
        </button>

        {/* Movie Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {visibleMovies.map((movie, index) => (
            <div
              key={index}
              className="relative w-full aspect-[2/3] bg-white rounded-lg shadow-md overflow-hidden"
            >
              <img
                src={movie.poster}
                alt={movie.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 p-2 md:p-4 flex justify-between items-center">
                <p className="text-white text-xs md:text-sm font-medium">
                  {movie.name}
                </p>
                <Link
                  to={`/movie/${movies.indexOf(movie)}`}
                  className="px-3 py-1 md:px-4 md:py-2 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs md:text-sm font-medium rounded shadow-md hover:from-red-600 hover:to-red-700 transition"
                >
                  Learn More
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieGrid;
