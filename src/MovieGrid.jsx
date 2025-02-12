import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const MovieGrid = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/movies.json")
      .then((response) => response.json())
      .then((data) => {
        setMovies(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-white">
        <p className="text-xl font-semibold">Loading movies...</p>
      </div>
    );
  }

  if (!movies || movies.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-white">
        <h2 className="text-2xl font-semibold">No movies available.</h2>
        <p className="text-gray-500">Please check back later.</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 min-h-screen text-white py-10">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl font-bold mb-8 text-center">Now Showing</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {movies.map((movie) => (
            <div
              key={movie.movie_id}
              className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:scale-105 transition-transform"
            >
              <img
                src={movie.image_url}
                alt={movie.title}
                className="w-full h-72 object-cover"
              />
              <div className="p-5">
                <h3 className="text-lg font-bold">{movie.title}</h3>
                <p className="text-sm text-gray-400">{movie.classification}</p>
                <Link
                  to={`/movie/${movie.movie_id}`}
                  className="mt-3 inline-block w-full bg-blue-600 hover:bg-blue-500 text-white text-center font-semibold py-2 rounded-lg transition"
                >
                  View Details
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
