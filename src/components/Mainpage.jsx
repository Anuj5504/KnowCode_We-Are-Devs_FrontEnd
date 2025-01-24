import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Products from './Products';
import Scan from './Scan';
import Profile from './profile';

const MainPage = () => {
    const [activeTab, setActiveTab] = useState('products');

    const renderContent = () => {
        switch (activeTab) {
            case 'products':
                return <Products />;
            case 'scan':
                return <Scan />;
            case 'profile':
                return <Profile />;
            default:
                return <Products />;
        }
    };

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.5,
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Desktop View */}
            <div className="hidden md:block pt-24">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
                >
                    <div className="grid grid-cols-3 gap-8 mb-8">
                        <motion.div
                            variants={itemVariants}
                            whileHover={{ scale: 1.05 }}
                            className={`p-6 rounded-xl shadow-lg cursor-pointer ${activeTab === 'products' ? 'bg-green-500 text-white' : 'bg-white'
                                }`}
                            onClick={() => setActiveTab('products')}
                        >
                            <div className="flex flex-col items-center space-y-4">
                                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                </svg>
                                <span className="text-lg font-semibold">Products</span>
                            </div>
                        </motion.div>

                        <motion.div
                            variants={itemVariants}
                            whileHover={{ scale: 1.05 }}
                            className={`p-6 rounded-xl shadow-lg cursor-pointer ${activeTab === 'scan' ? 'bg-green-500 text-white' : 'bg-white'
                                }`}
                            onClick={() => setActiveTab('scan')}
                        >
                            <div className="flex flex-col items-center space-y-4">
                                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <span className="text-lg font-semibold">Scan</span>
                            </div>
                        </motion.div>

                        <motion.div
                            variants={itemVariants}
                            whileHover={{ scale: 1.05 }}
                            className={`p-6 rounded-xl shadow-lg cursor-pointer ${activeTab === 'profile' ? 'bg-green-500 text-white' : 'bg-white'
                                }`}
                            onClick={() => setActiveTab('profile')}
                        >
                            <div className="flex flex-col items-center space-y-4">
                                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                                <span className="text-lg font-semibold">Profile</span>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>

            {/* Content Area */}
            <div className="pb-20 md:pb-0">
                {renderContent()}
            </div>

            {/* Mobile Bottom Navigation */}
            <motion.div
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                className="md:hidden fixed bottom-0 left-0 right-0 bg-white shadow-lg"
            >
                <div className="flex justify-around items-center h-16">
                    <button
                        onClick={() => setActiveTab('products')}
                        className={`flex flex-col items-center justify-center w-1/3 h-full ${activeTab === 'products' ? 'text-green-500' : 'text-gray-500'
                            }`}
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                        <span className="text-xs mt-1">Products</span>
                    </button>

                    <button
                        onClick={() => setActiveTab('scan')}
                        className={`flex flex-col items-center justify-center w-1/3 h-full ${activeTab === 'scan' ? 'text-green-500' : 'text-gray-500'
                            }`}
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span className="text-xs mt-1">Scan</span>
                    </button>

                    <button
                        onClick={() => setActiveTab('profile')}
                        className={`flex flex-col items-center justify-center w-1/3 h-full ${activeTab === 'profile' ? 'text-green-500' : 'text-gray-500'
                            }`}
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <span className="text-xs mt-1">Profile</span>
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

export default MainPage;