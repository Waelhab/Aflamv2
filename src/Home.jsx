import React from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Home() {
  const location = useLocation();
  const user = location.state?.user || "Guest"; // Retrieve the user name from location state

  return (
    
    <div className="min-h-screen bg-gradient-to-r from-red-500 via-pink-500 to-red-500 text-white">
        <Navbar />
      <div className="container mx-auto px-6 py-12">
        {/* Welcome Section */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-4">Welcome, {user}!</h1>
          <p className="text-lg text-gray-100">
            Book your favorite movies, explore the latest releases, and enjoy the magic of cinema!
          </p>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="bg-white text-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <img
              src="https://via.placeholder.com/600x400"
              alt="Now Showing"
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-bold mb-2">Now Showing</h3>
              <p className="text-gray-600">
                Check out the movies currently playing in theaters.
              </p>
              <button className="mt-4 w-full py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600 transition">
                Explore Now
              </button>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white text-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <img
              src="https://via.placeholder.com/600x400"
              alt="Coming Soon"
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-bold mb-2">Coming Soon</h3>
              <p className="text-gray-600">
                Get a sneak peek at upcoming blockbusters.
              </p>
              <button className="mt-4 w-full py-2 px-4 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition">
                View Trailers
              </button>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white text-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <img
              src="https://via.placeholder.com/600x400"
              alt="Special Offers"
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-bold mb-2">Special Offers</h3>
              <p className="text-gray-600">
                Don’t miss out on our exclusive deals and discounts.
              </p>
              <button className="mt-4 w-full py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600 transition">
                Grab Deals
              </button>
            </div>
          </div>
        </div>

        {/* Footer Section */}
        <div className="mt-12 text-center">
          <p className="text-gray-200 text-sm">
            © 2024 MovieBooking. All rights reserved.
          </p>
        </div>
      </div>
      <Footer/>
    </div>
  );
}
