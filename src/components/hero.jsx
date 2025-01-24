import React from "react";
import { motion } from "framer-motion";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const floatingAnimation = {
  initial: { y: 0 },
  animate: {
    y: [-10, 10],
    transition: {
      duration: 3,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut",
    },
  },
};

const textVariant = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut"
    }
  },
};

const imageVariant = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut"
    }
  },
};

const HeroSection = () => {
  const navigate = useNavigate();  // Initialize navigate hook

  const handleGetStarted = () => {
    const isLoggedIn = localStorage.getItem("userInfo");

    if (isLoggedIn) {
      navigate("/main");  // Redirect to /main if logged in
    } else {
      toast.warning("Please log in first!", {
        autoClose: 1000, // Toast will disappear after 1 second
      });
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
      className="relative bg-gradient-to-br from-green-50 via-white to-green-50 min-h-screen flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-12"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.1, scale: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute -top-1/2 -right-1/4 w-[500px] h-[500px] md:w-[800px] md:h-[800px] rounded-full bg-gradient-to-br from-green-300 to-green-400"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.1, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.2 }}
          className="absolute -bottom-1/4 -left-1/4 w-[400px] h-[400px] md:w-[600px] md:h-[600px] rounded-full bg-gradient-to-tr from-green-200 to-green-300"
        />
      </div>

      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center relative z-10">
        {/* Text Content */}
        <motion.div
          variants={textVariant}
          className="text-center lg:text-left order-2 lg:order-1"
        >
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 1, delay: 0.5 }}
            className="h-1 bg-gradient-to-r from-green-500 to-green-300 mb-8 hidden lg:block"
          />
          <motion.h1
            variants={fadeInUp}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-green-800 mb-6 leading-tight"
          >
            Transforming E-Waste into a{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-green-400">
              Sustainable Future
            </span>
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            className="text-gray-600 text-lg sm:text-xl mb-8 max-w-2xl mx-auto lg:mx-0"
          >
            Join us in reducing electronic waste by recycling responsibly. Contribute to a cleaner,
            greener planet by recycling your e-waste today!
          </motion.p>
          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
          >
            <motion.button
              onClick={handleGetStarted}  // Add onClick event to the button
              whileHover={{ scale: 1.05, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-green-600 to-green-500 text-white px-8 py-4 rounded-full font-semibold 
                shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              Get Started Now
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}
              whileTap={{ scale: 0.95 }}
              className="border-2 border-green-600 text-green-600 px-8 py-4 rounded-full font-semibold 
                hover:bg-green-50 transition-all duration-300 transform hover:-translate-y-1"
            >
              Learn More
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Image Section */}
        <motion.div
          variants={imageVariant}
          className="relative flex justify-center order-1 lg:order-2"
        >
          <motion.div
            variants={floatingAnimation}
            className="relative w-full max-w-lg xl:max-w-xl"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-green-400/20 to-transparent rounded-3xl blur-2xl"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
            <img
              src="/bin.jpg"
              alt="E-waste Recycling Illustration"
              className="relative w-full rounded-3xl shadow-2xl transform hover:scale-105 transition-transform duration-500"
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
      >
        <svg
          className="w-6 h-6 text-green-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </motion.div>
    </motion.div>
  );
};

export default HeroSection;
 