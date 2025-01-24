import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Store = () => {
  const [bitcoinPrice, setBitcoinPrice] = useState(null);
  const [userCoins, setUserCoins] = useState(250); // Replace with actual user coins
  const [exchangeAmount, setExchangeAmount] = useState(0);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const COIN_TO_BTC_RATE = 0.0000001; // Coin to BTC conversion rate

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
  };

  useEffect(() => {
    const fetchBitcoinPrice = async () => {
      try {
        const response = await fetch(
          'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd'
        );
        const data = await response.json();
        setBitcoinPrice(data.bitcoin.usd);
      } catch (error) {
        console.error('Error fetching Bitcoin price:', error);
      }
    };

    fetchBitcoinPrice();
    const interval = setInterval(fetchBitcoinPrice, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  const calculateBTC = (coins) => {
    return coins ? coins * COIN_TO_BTC_RATE : 0;
  };

  const calculateUSD = (btc) => {
    if (!bitcoinPrice || !btc) return 0;
    return btc * bitcoinPrice;
  };

  const handleExchange = () => {
    if (!exchangeAmount || exchangeAmount <= 0 || exchangeAmount > userCoins) return;
    setShowConfirmation(true);
  };

  const confirmExchange = () => {
    setUserCoins((prev) => prev - Number(exchangeAmount));
    setExchangeAmount(0);
    setShowConfirmation(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-24 px-4 sm:px-6 lg:px-8">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto"
      >
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Coin <span className="text-green-600">Exchange</span>
          </h1>
          <p className="text-lg text-gray-600">Convert your earned coins to Bitcoin</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Exchange Rate Card */}
          <motion.div variants={itemVariants} className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Current Rates</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                <span className="text-gray-600">1 Bitcoin (BTC)</span>
                <span className="font-bold">
                  ${(bitcoinPrice ?? 0).toLocaleString() || 'Loading...'}
                </span>
              </div>
              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                <span className="text-gray-600">10,000 Coins</span>
                <span className="font-bold">
                  {(COIN_TO_BTC_RATE * 10000).toFixed(8)} BTC
                </span>
              </div>
              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                <span className="text-gray-600">Your Coins</span>
                <span className="font-bold text-green-600">{userCoins.toLocaleString()}</span>
              </div>
            </div>
          </motion.div>

          {/* Exchange Form */}
          <motion.div variants={itemVariants} className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Exchange Coins</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Amount of Coins to Exchange
                </label>
                <input
                  type="number"
                  value={exchangeAmount}
                  onChange={(e) =>
                    setExchangeAmount(e.target.value ? parseInt(e.target.value) : 0)
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter amount of coins"
                  min="1"
                  max={userCoins}
                />
              </div>

              {exchangeAmount > 0 && (
                <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">You'll Receive (BTC)</span>
                    <span className="font-bold">{calculateBTC(exchangeAmount).toFixed(8)}</span>
                  </div>
                  <div className="flex justify-between border-t pt-2">
                    <span className="text-gray-600">Estimated Value (USD)</span>
                    <span className="font-bold">
                      ${calculateUSD(calculateBTC(exchangeAmount)).toFixed(2)}
                    </span>
                  </div>
                </div>
              )}

              <button
                onClick={handleExchange}
                disabled={!exchangeAmount || exchangeAmount <= 0 || exchangeAmount > userCoins}
                className={`w-full py-3 px-4 rounded-lg font-semibold text-white ${exchangeAmount > 0 && exchangeAmount <= userCoins
                    ? 'bg-green-600 hover:bg-green-700'
                    : 'bg-gray-400 cursor-not-allowed'
                  } transition-colors`}
              >
                Exchange Coins
              </button>
            </div>
          </motion.div>
        </div>

        {/* Confirmation Modal */}
        {showConfirmation && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-xl p-8 max-w-md w-full"
            >
              <h3 className="text-xl font-bold mb-4">Confirm Exchange</h3>
              <p className="text-gray-600 mb-6">
                You are about to exchange {exchangeAmount.toLocaleString()} coins for{' '}
                {calculateBTC(exchangeAmount).toFixed(8)} BTC (≈$
                {calculateUSD(calculateBTC(exchangeAmount)).toFixed(2)})
              </p>
              <div className="flex space-x-4">
                <button
                  onClick={confirmExchange}
                  className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
                >
                  Confirm
                </button>
                <button
                  onClick={() => setShowConfirmation(false)}
                  className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Store;
