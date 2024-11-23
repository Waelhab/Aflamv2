import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const MovieDetail = () => {
  const { id } = useParams(); // Get movie ID from URL
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    // Fetch data from data.json file
    fetch("/data.json")
      .then((response) => response.json())
      .then((data) => {
        // Find the movie by its ID
        const selectedMovie = data.find((movie) => movie.id === parseInt(id));
        setMovie(selectedMovie);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [id]);

  if (!movie) {
    return <div className="text-center text-black">Loading...</div>;
  }

  return (
    <div className="bg-gray-900 text-white py-10 px-4">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8">
        {/* Left Section - Poster and Details */}
        <div className="lg:w-3/5">
          <div className="relative">
            <img
              src={movie.poster}
              alt={movie.name}
              className="w-full h-auto rounded-lg shadow-lg"
            />
            <button
              className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg text-white hover:bg-opacity-70 transition"
              onClick={() => window.open(movie.youtube, "_blank")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.752 11.168l-5.197-3.04a.75.75 0 00-1.129.65v6.106a.75.75 0 001.13.65l5.196-3.04a.75.75 0 000-1.3z"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Right Section - Info and Showtimes */}
        <div className="lg:w-2/5">
          <h1 className="text-4xl font-bold mt-6">{movie.name}</h1>
          <p className="text-lg text-gray-400">
            {movie.ageRating} | {movie.runningTime} | {movie.language}
          </p>
          <h2 className="text-2xl font-bold mb-4">Movie Info</h2>
          <p className="mb-4">
            <strong>Release Date:</strong> {movie.releaseDate}
          </p>
          <p className="mb-4">
            <strong>Cast & Crew:</strong> {movie.cast.join(", ")}
          </p>
          <p className="mb-6">
            <strong>Synopsis:</strong> {movie.summary}
          </p>

          <h2 className="text-2xl font-bold mb-4">Showtimes</h2>
          {Object.entries(movie.showTimes).map(([location, times]) => (
            <div key={location} className="mb-6">
              <h3 className="text-lg font-semibold">{location}</h3>
              <div className="bg-gray-800 rounded-lg p-4 shadow-md">
                {times.map((show, index) => (
                  <div key={index} className="mb-4">
                    <p className="text-gray-300 mb-2">
                      <strong>{show.date}</strong>
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {show.times.map((time, idx) => (
                        <button
                          key={idx}
                          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md shadow-md"
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
