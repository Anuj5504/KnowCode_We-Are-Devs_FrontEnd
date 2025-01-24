import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from 'framer-motion';

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const coins = useMotionValue(250); // Initial coin value
  const roundedCoins = useTransform(coins, value => Math.round(value));

  // Slide Tabs Animation State
  const [position, setPosition] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });

  const dropdownVariants = {
    hidden: {
      opacity: 0,
      y: -20, 
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.2,
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      scale: 0.95,
      transition: {
        duration: 0.2,
      },
    },
  };

  useEffect(() => {
    const controls = animate(coins, 250, { duration: 5 }); // Adjust the target value and duration as needed
    return () => controls.stop();
  }, [coins]);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="bg-white shadow-sm fixed w-full top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex items-center space-x-8">
            <span className="text-2xl font-bold text-green-700">
              E-Waste<span className="text-orange-500">-X</span>
            </span>

            {/* Search Bar */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="w-64 px-4 py-2 rounded-3xl border border-gray-200 focus:outline-none focus:border-green-500 transition-colors focus:w-96"
              />

              <svg
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex items-center space-x-8"
          >
            {/* Slide Tabs for Coins, Impact Dashboard, and Leaderboard */}
            <ul
              onMouseLeave={() => {
                setPosition((pv) => ({
                  ...pv,
                  opacity: 0,
                }));
              }}
              className="relative flex items-center space-x-8"
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="flex items-center space-x-2 bg-green-50 px-4 py-2 rounded-lg"
              >
                <span className="text-green-700 font-medium">Coins:</span>
                <motion.span
                  className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold"
                  style={{ fontSize: 18 }}
                >
                  {roundedCoins}
                </motion.span>
              </motion.div>

              <Tab setPosition={setPosition}>
                <motion.a
                  whileHover={{ scale: 1.1 }}
                  href="/impact-dashboard"
                  className="text-gray-600 hover:text-green-700 font-medium transition duration-300 flex items-center space-x-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                    />
                  </svg>
                  <span>Impact Dashboard</span>
                </motion.a>
              </Tab>

              <Tab setPosition={setPosition}>
                <motion.a
                  whileHover={{ scale: 1.1 }}
                  href="/leaderboard"
                  className="text-gray-600 hover:text-green-700 font-medium transition duration-300 flex items-center space-x-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <span>Leaderboard</span>
                </motion.a>
              </Tab>

              {/* Cursor for Slide Tabs */}
              <Cursor position={position} />
            </ul>

            {/* Profile Dropdown */}
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.1 }}
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center"
              >
                <span className="text-sm font-semibold text-green-800">EW</span>
              </motion.button>

              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div
                    variants={dropdownVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50"
                  >
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">EcoWarrior</p>
                      <p className="text-sm text-gray-500">eco@warrior.com</p>
                    </div>
                    <a href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50 transition-colors">
                      Profile
                    </a>
                    <a href="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50 transition-colors">
                      Settings
                    </a>
                    <button onClick={() => {/* handle logout */ }} className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors">
                      Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.nav>
  );
};

// Tab Component
const Tab = ({ children, setPosition }) => {
  const ref = useRef(null);

  const handleMouseEnter = () => {
    if (!ref?.current) return;

    const { offsetLeft, offsetWidth } = ref.current;
    setPosition({
      left: offsetLeft,
      width: offsetWidth,
      opacity: 1,
    });
  };

  return (
    <li
      ref={ref}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setPosition((prev) => ({ ...prev, opacity: 0 }))} 
      className="relative z-10 block cursor-pointer"
    >
      {children}
    </li>
  );
};

// Cursor Component
const Cursor = ({ position }) => {
  return (
    <motion.li
      animate={{
        ...position,
      }}
      className="absolute z-0 h-10 rounded-full bg-green-100"
    />
  );
};

export default Navbar;
