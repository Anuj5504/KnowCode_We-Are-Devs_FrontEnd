import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const HowWeWork = () => {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const stepVariants = {
    hidden: { opacity: 1, y: 0 },  // Remove animation for opacity and y position
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0,  // No transition for instant visibility
      },
    },
  };

  const floatingVariants = {
    initial: { y: 0 },
    animate: {
      y: [-10, 10],
      transition: {
        duration: 3,
        repeat: Infinity,
        repeatType: "mirror",
        ease: "easeInOut"
      }
    }
  };

  const steps = [
    {
      title: "Buy/Sell Products",
      description: "Browse and purchase eco-friendly products or sell your e-waste",
      icon: (
        <svg className="w-12 h-12 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      ),
      bgColor: "bg-green-50",
    },
    {
      title: "Earn Coins",
      description: "Get rewarded with coins for every sustainable action",
      icon: (
        <svg className="w-12 h-12 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      bgColor: "bg-yellow-50",
    },
    {
      title: "Exchange Coins",
      description: "Convert your earned coins into various rewards",
      icon: (
        <svg className="w-12 h-12 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
        </svg>
      ),
      bgColor: "bg-blue-50",
    },
    {
      title: "Get Crypto",
      description: "Convert your coins into cryptocurrency",
      icon: (
        <svg className="w-12 h-12 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
      bgColor: "bg-purple-50",
    },
  ];

  return (
    <div className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 1, y: 0 }}  // Instant visibility
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            How We <span className="text-green-600">Work</span>
          </h2>
          <p className="text-xl text-gray-600">
            Your journey to sustainable e-waste management
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              variants={stepVariants}
              whileHover={{ scale: 1.05 }}
              className={`${step.bgColor} rounded-xl p-8 relative overflow-hidden`}
            >
              {/* Animated background circles */}
              <motion.div
                initial="initial"
                animate="animate"
                // @ts-ignore
                variants={floatingVariants}
                className="absolute -right-6 -top-6 w-24 h-24 rounded-full bg-white opacity-10"
              />
              <motion.div
                initial="initial"
                animate="animate"
                // @ts-ignore
                variants={floatingVariants}
                transition={{ delay: 0.2 }}
                className="absolute -left-6 -bottom-6 w-24 h-24 rounded-full bg-white opacity-10"
              />

              <motion.div
                initial="initial"
                animate="animate"
                // @ts-ignore
                variants={floatingVariants}
                className="relative z-10"
              >
                <div className="mb-4">{step.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600">{step.description}</p>
              </motion.div>

              {/* Connecting line for desktop */}
              {index < steps.length - 1 && (
                <div className=" lg:block absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-8 h-0.5 bg-gray-300" />
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 1, y: 0 }}  // Instant visibility
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0 }}
          className="text-center mt-16"
        >
          <button className="bg-green-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-green-700 transition-colors duration-300">
            Start Your Journey
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default HowWeWork;
