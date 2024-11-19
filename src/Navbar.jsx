import React, { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-red-500 via-pink-500 to-red-500 shadow-lg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <span className="text-white text-2xl font-bold tracking-wide">
              Aflam
            </span>
          </div>

          {/* Menu for larger screens */}
          <div className="hidden md:flex space-x-6">
            <a
              href="#"
              className="text-white hover:text-pink-200 transition duration-300"
            >
              Home
            </a>
            <a
              href="#"
              className="text-white hover:text-pink-200 transition duration-300"
            >
              Now Showing
            </a>
            <a
              href="#"
              className="text-white hover:text-pink-200 transition duration-300"
            >
              Coming Soon
            </a>
            <a
              href="#"
              className="text-white hover:text-pink-200 transition duration-300"
            >
              Contact
            </a>
          </div>

          {/* Hamburger menu for mobile */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Dropdown menu for mobile */}
        {isOpen && (
          <div className="md:hidden">
            <a
              href="#"
              className="block px-4 py-2 text-white hover:bg-pink-600 transition duration-300"
            >
              Home
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-white hover:bg-pink-600 transition duration-300"
            >
              Now Showing
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-white hover:bg-pink-600 transition duration-300"
            >
              Coming Soon
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-white hover:bg-pink-600 transition duration-300"
            >
              Contact
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}
