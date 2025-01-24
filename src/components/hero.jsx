import React from "react";
import { motion } from "framer-motion";

// Animation Variants
const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const HeroSection = () => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
      className="relative bg-green-50 min-h-screen flex items-center justify-center text-center px-6"
    >
      <motion.div variants={fadeInUp} className="max-w-4xl">
        <motion.h1
          variants={fadeInUp}
          className="text-5xl font-bold text-green-700 mb-6"
        >
          Transforming E-Waste into a Sustainable Future
        </motion.h1>
        <motion.p variants={fadeInUp} className="text-gray-600 text-lg mb-8">
          Join us in reducing electronic waste by recycling responsibly. Contribute to a cleaner,
          greener planet by recycling your e-waste today!
        </motion.p>
        <motion.button
          variants={fadeInUp}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-green-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-green-700 transition duration-300"
        >
          Get Started
        </motion.button>
      </motion.div>
     
    </motion.div>
  );
};

export default HeroSection;
