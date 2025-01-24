import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import HeroSection from './hero';
import HowWeWork from './howWeWork';
import { Impact } from './impact';
import Card from './ui/card';

// Animation variants
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

// Add new animation variants
const slideInLeft = {
  hidden: { opacity: 0, x: -100 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
};

const slideInRight = {
  hidden: { opacity: 0, x: 100 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
};

// Add these new animation variants at the top with other variants
const float = {
  initial: { y: 0 },
  animate: {
    y: [-10, 10],
    transition: {
      duration: 4,
      repeat: Infinity,
      repeatType: 'reverse',
      ease: "easeInOut"
    }
  }
};

const gentlePulse = {
  initial: { scale: 1 },
  animate: {
    scale: [1, 1.02, 1],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

const backgroundShimmer = {
  initial: { backgroundPosition: "0 0" },
  animate: {
    backgroundPosition: ["0 0", "100% 0"],
    transition: {
      duration: 15,
      repeat: Infinity,
      ease: "linear"
    }
  }
};

const HomePage = () => {
  const [impactRef, impactInView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const [approachRef, approachInView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const [footerRef, footerInView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <HeroSection />

      <motion.div
        ref={approachRef}
        initial="hidden"
        animate={"visible"}
        variants={fadeInUp}
        className="bg-green-50 py-16 relative overflow-hidden"
      >
        <HowWeWork />
      </motion.div>
      <Impact />

      <motion.div
        ref={approachRef}
        initial="hidden"
        animate={approachInView ? "visible" : "hidden"}
        variants={fadeInUp}
        className="bg-green-50 py-16 relative overflow-hidden"
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-green-50 via-green-100 to-green-50 opacity-50"
          initial="initial"
          animate="animate"
          variants={backgroundShimmer}
          style={{ backgroundSize: "200% 100%" }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.h2
            variants={slideInLeft}
            initial="initial"
            animate="animate"
            className="text-3xl font-bold text-green-700 text-center mb-8"
          >
            Our Sustainable Approach
          </motion.h2>
          <motion.p
            variants={slideInRight}
            className="text-gray-600 text-lg text-center max-w-2xl mx-auto"
          >
            Our sustainable approach helps recycling and reselling Electronic Waste
          </motion.p>
        </div>
      </motion.div>

      {/* Footer Section */}
      <motion.footer
        ref={footerRef}
        initial="hidden"
        animate={footerInView ? "visible" : "hidden"}
        variants={fadeInUp}
        className="bg-green-700 text-white py-8"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-lg">
            &copy; 2023 E-Waste-X. All rights reserved.
          </p>
          <div className="mt-4 space-x-6">
            <a href="/about-us" className="hover:text-green-300">About Us</a>
            <a href="/sustainability" className="hover:text-green-300">Sustainability</a>
            <a href="/lets-connect" className="hover:text-green-300">Let's Connect</a>
          </div>
        </div>
      </motion.footer>
    </div>
  );
};

export default HomePage;
