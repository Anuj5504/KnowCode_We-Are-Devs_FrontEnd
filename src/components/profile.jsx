import React from 'react';
import { motion } from 'framer-motion';

const Profile = () => {
  // Sample user data - replace with actual user data
  const user = {
    username: "EcoWarrior",
    email: "eco@warrior.com",
    joinDate: "January 2024",
    stats: {
      coins: 15000,
      productsSold: 45,
      impact: "150kg e-waste recycled",
      rank: 1
    },
    achievements: [
      { id: 1, title: "First Sale", icon: "🌟", description: "Completed first product sale" },
      { id: 2, title: "Eco Champion", icon: "🏆", description: "Reached 10,000 coins" },
      { id: 3, title: "Green Impact", icon: "🌍", description: "Recycled 100kg of e-waste" }
    ]
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3 }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-24 px-4 sm:px-6 lg:px-8">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto"
      >
        {/* Profile Header */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-green-400 to-green-600 px-8 py-12">
            <div className="flex items-center space-x-6">
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center text-3xl font-bold text-green-600">
                {user.username.charAt(0)}
              </div>
              <div className="text-white">
                <h1 className="text-3xl font-bold">{user.username}</h1>
                <p className="text-green-100">{user.email}</p>
                <p className="text-green-100 text-sm mt-1">Member since {user.joinDate}</p>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-8">
            <motion.div
              variants={itemVariants}
              className="bg-gray-50 p-4 rounded-lg text-center"
            >
              <p className="text-gray-500 text-sm">Coins Earned</p>
              <p className="text-2xl font-bold text-green-600">{user.stats.coins}</p>
            </motion.div>
            <motion.div
              variants={itemVariants}
              className="bg-gray-50 p-4 rounded-lg text-center"
            >
              <p className="text-gray-500 text-sm">Products Sold</p>
              <p className="text-2xl font-bold text-green-600">{user.stats.productsSold}</p>
            </motion.div>
            <motion.div
              variants={itemVariants}
              className="bg-gray-50 p-4 rounded-lg text-center"
            >
              <p className="text-gray-500 text-sm">Environmental Impact</p>
              <p className="text-2xl font-bold text-green-600">{user.stats.impact}</p>
            </motion.div>
            <motion.div
              variants={itemVariants}
              className="bg-gray-50 p-4 rounded-lg text-center"
            >
              <p className="text-gray-500 text-sm">Current Rank</p>
              <p className="text-2xl font-bold text-green-600">#{user.stats.rank}</p>
            </motion.div>
          </div>
        </div>

        {/* Achievements Section */}
        <motion.div variants={itemVariants} className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Achievements</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {user.achievements.map((achievement) => (
              <motion.div
                key={achievement.id}
                variants={itemVariants}
                className="bg-gray-50 rounded-lg p-6 flex items-start space-x-4"
              >
                <span className="text-4xl">{achievement.icon}</span>
                <div>
                  <h3 className="font-semibold text-gray-900">{achievement.title}</h3>
                  <p className="text-gray-500 text-sm">{achievement.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          variants={itemVariants}
          className="mt-8 flex justify-center space-x-4"
        >
          <button className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors">
            Edit Profile
          </button>
          <button className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors">
            View History
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Profile;