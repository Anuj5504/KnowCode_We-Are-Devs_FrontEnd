import { useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          
          <div className="flex-shrink-0 flex items-center">
            <a href="/" className="text-2xl font-bold text-gray-800">
              MyLogo
            </a>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            <a href="/" className="text-gray-800 hover:text-blue-500 px-3 py-2 rounded-md text-sm font-medium">
              Home
            </a>
            <a href="/about" className="text-gray-800 hover:text-blue-500 px-3 py-2 rounded-md text-sm font-medium">
              About Us
            </a>
            <a href="/services" className="text-gray-800 hover:text-blue-500 px-3 py-2 rounded-md text-sm font-medium">
              Services
            </a>
            <a href="/blog" className="text-gray-800 hover:text-blue-500 px-3 py-2 rounded-md text-sm font-medium">
              Blog
            </a>
            <a href="/contact" className="text-gray-800 hover:text-blue-500 px-3 py-2 rounded-md text-sm font-medium">
              Contact
            </a>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex items-center">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            </div>
          </div>

          {/* Sign In / Sign Up */}
          <div className="hidden md:flex items-center space-x-4">
            <a
              href="/signin"
              className="text-gray-800 hover:text-blue-500 px-3 py-2 rounded-md text-sm font-medium"
            >
              Sign In
            </a>
            <a
              href="/signup"
              className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-600"
            >
              Sign Up
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-800 hover:text-blue-500 focus:outline-none"
            >
              {isOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <Transition
        show={isOpen}
        enter="transition ease-out duration-100 transform"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="transition ease-in duration-75 transform"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a href="/" className="block text-gray-800 hover:text-blue-500 px-3 py-2 rounded-md text-base font-medium">
              Home
            </a>
            <a href="/about" className="block text-gray-800 hover:text-blue-500 px-3 py-2 rounded-md text-base font-medium">
              About Us
            </a>
            <a href="/services" className="block text-gray-800 hover:text-blue-500 px-3 py-2 rounded-md text-base font-medium">
              Services
            </a>
            <a href="/blog" className="block text-gray-800 hover:text-blue-500 px-3 py-2 rounded-md text-base font-medium">
              Blog
            </a>
            <a href="/contact" className="block text-gray-800 hover:text-blue-500 px-3 py-2 rounded-md text-base font-medium">
              Contact
            </a>
            <div className="mt-4">
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            </div>
            <div className="mt-4 space-y-2">
              <a
                href="/signin"
                className="block text-gray-800 hover:text-blue-500 px-3 py-2 rounded-md text-base font-medium"
              >
                Sign In
              </a>
              <a
                href="/signup"
                className="block bg-blue-500 text-white px-4 py-2 rounded-md text-base font-medium hover:bg-blue-600"
              >
                Sign Up
              </a>
            </div>
          </div>
        </div>
      </Transition>
    </nav>
  );
};

export default Navbar;