import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { FaRecycle, FaLeaf, FaMapMarkerAlt, FaBox, FaWeightHanging, FaMinus, FaPlus } from 'react-icons/fa';
import { MdVerified } from 'react-icons/md';

const ProductInfo = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [bidAmount, setBidAmount] = useState('');
    const [showBidConfirm, setShowBidConfirm] = useState(false);
    const [showBuyConfirm, setShowBuyConfirm] = useState(false);
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    useEffect(() => {
        fetchProductDetails();
        const interval = setInterval(fetchProductDetails, 30000); // Refresh every 30 seconds
        return () => clearInterval(interval);
    }, [id]);

    const fetchProductDetails = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/ewaste/${id}`);
            if (!response.ok) throw new Error('Failed to fetch product details');
            const data = await response.json();
            setProduct(data);
            setLoading(false);
        } catch (err) {
            console.error('Error fetching product:', err);
            setError('Failed to fetch product details');
            setLoading(false);
        }
    };

    const formatWalletAddress = (address) => {
        if (!address) return 'Unknown';
        return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
    };

    const handleBidConfirm = async () => {
        if (!userInfo?.walletAddress) {
            toast.error('Please connect your wallet to place a bid');
            return;
        }

        if (!bidAmount || Number(bidAmount) <= 0) {
            toast.error('Please enter a valid bid amount');
            return;
        }

        try {
            const response = await fetch(`http://localhost:3000/api/ewaste/${id}/bid`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': userInfo.walletAddress
                },
                body: JSON.stringify({ amount: Number(bidAmount) })
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.message || 'Failed to place bid');

            toast.success('Bid placed successfully! 🎉');
            setShowBidConfirm(false);
            fetchProductDetails();
            setBidAmount('');
        } catch (error) {
            toast.error(error.message || 'Failed to place bid');
        }
    };

    const handleBidChange = (action) => {
        const currentBid = Number(bidAmount) || 0;
        const minBid = product.price || 0;
        const increment = 100; // Increment by 100 rupees

        if (action === 'increase') {
            setBidAmount(String(currentBid + increment));
        } else if (action === 'decrease') {
            const newAmount = Math.max(minBid, currentBid - increment);
            setBidAmount(String(newAmount));
        }
    };

    const handleBuyNow = async () => {
        if (!userInfo?.walletAddress) {
            toast.error('Please connect your wallet first');
            return;
        }

        try {
            const response = await fetch(`http://localhost:3000/api/ewaste/${id}/buy`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': userInfo.walletAddress
                }
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.message || 'Failed to process request');

            toast.success('Request processed successfully! 🎉');
            setShowBuyConfirm(false);
            fetchProductDetails();
        } catch (error) {
            toast.error(error.message || 'Failed to process request');
        }
    };

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center">
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
                <FaRecycle className="text-green-500 text-4xl" />
            </motion.div>
        </div>
    );

    if (error) return (
        <div className="min-h-screen flex items-center justify-center">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-red-500 text-xl"
            >
                {error}
            </motion.div>
        </div>
    );

    if (!product) return null;

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-6">
            <div className="max-w-6xl mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-white rounded-2xl shadow-lg overflow-hidden"
                >
                    <div className="flex flex-col lg:flex-row">
                        {/* Left Section - Image */}
                        <div className="lg:w-1/2 relative">
                            <div className="aspect-square">
                                <img
                                    src={product.imageUrl}
                                    alt={product.itemName}
                                    className="w-full h-full object-contain bg-gradient-to-br from-gray-50 to-gray-100 p-6"
                                    onError={(e) => {
                                        e.target.src = 'https://via.placeholder.com/400?text=No+Image';
                                    }}
                                />
                                {/* Status Tags */}
                                <div className="absolute top-4 right-4 flex flex-col gap-2">
                                    {product.biddingEnabled && product.donationOrSale !== 'donate' && (
                                        <motion.div
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            className="bg-yellow-400/90 backdrop-blur-sm text-yellow-900 px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5 shadow-lg"
                                        >
                                            <MdVerified className="text-base" /> Bidding Active
                                        </motion.div>
                                    )}
                                    <motion.div
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.1 }}
                                        className={`px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5 shadow-lg backdrop-blur-sm ${product.donationOrSale === 'donate'
                                                ? 'bg-green-400/90 text-green-900'
                                                : 'bg-blue-400/90 text-blue-900'
                                            }`}
                                    >
                                        {product.donationOrSale === 'donate' ? 'Donation' : 'For Sale'}
                                    </motion.div>
                                </div>
                            </div>
                        </div>

                        {/* Right Section - Details */}
                        <div className="lg:w-1/2 p-6 flex flex-col">
                            <div className="space-y-6">
                                {/* Title and Basic Info */}
                                <div>
                                    <motion.h1
                                        initial={{ opacity: 0, y: -20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="text-2xl font-bold text-gray-900 mb-1"
                                    >
                                        {product.itemName}
                                    </motion.h1>
                                    <p className="text-sm text-gray-500">ID: {product._id}</p>
                                </div>

                                {/* Info Grid */}
                                <div className="grid grid-cols-2 gap-3">
                                    <InfoCard icon={<FaRecycle />} label="Category" value={product.category} />
                                    <InfoCard icon={<FaLeaf />} label="Condition" value={product.condition} />
                                    <InfoCard icon={<FaWeightHanging />} label="Weight" value={`${product.weight} kg`} />
                                    <InfoCard icon={<FaBox />} label="Quantity" value={product.quantity} />
                                    <InfoCard
                                        icon={<FaMapMarkerAlt />}
                                        label="Location"
                                        value={product.location}
                                        className="col-span-2"
                                    />
                                </div>

                                {/* Action Section */}
                                <div className="space-y-4">
                                    {product.donationOrSale === 'donate' ? (
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl"
                                        >
                                            <h3 className="text-base font-semibold text-green-800 mb-2">Request Donation</h3>
                                            <motion.button
                                                whileHover={{ scale: 1.01 }}
                                                whileTap={{ scale: 0.99 }}
                                                onClick={() => setShowBuyConfirm(true)}
                                                className="w-full py-2.5 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all text-sm font-medium shadow-md"
                                            >
                                                Request Now
                                            </motion.button>
                                        </motion.div>
                                    ) : (
                                        <>
                                            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl">
                                                <h3 className="text-base font-semibold text-blue-900 mb-1">Price</h3>
                                                <p className="text-2xl font-bold text-blue-600">₹{product.price}</p>
                                            </div>

                                            {product.biddingEnabled && (
                                                <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-4 rounded-xl">
                                                    <div className="flex justify-between items-center mb-3">
                                                        <h3 className="text-base font-semibold text-yellow-800">Place Your Bid</h3>
                                                        <p className="text-xs text-gray-600">
                                                            Ends: {new Date(product.biddingEndTime).toLocaleDateString()}
                                                        </p>
                                                    </div>
                                                    <div className="flex items-center gap-2 mb-3">
                                                        <motion.button
                                                            whileHover={{ scale: 1.05 }}
                                                            whileTap={{ scale: 0.95 }}
                                                            onClick={() => handleBidChange('decrease')}
                                                            className="w-8 h-8 flex items-center justify-center bg-yellow-200 text-yellow-800 rounded-full hover:bg-yellow-300 shadow-md"
                                                        >
                                                            <FaMinus className="text-xs" />
                                                        </motion.button>
                                                        <input
                                                            type="number"
                                                            value={bidAmount}
                                                            onChange={(e) => setBidAmount(e.target.value)}
                                                            placeholder="Enter amount"
                                                            className="flex-1 px-3 py-2 text-center text-lg font-bold border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                                        />
                                                        <motion.button
                                                            whileHover={{ scale: 1.05 }}
                                                            whileTap={{ scale: 0.95 }}
                                                            onClick={() => handleBidChange('increase')}
                                                            className="w-8 h-8 flex items-center justify-center bg-yellow-200 text-yellow-800 rounded-full hover:bg-yellow-300 shadow-md"
                                                        >
                                                            <FaPlus className="text-xs" />
                                                        </motion.button>
                                                    </div>
                                                    <motion.button
                                                        whileHover={{ scale: 1.01 }}
                                                        whileTap={{ scale: 0.99 }}
                                                        onClick={() => setShowBidConfirm(true)}
                                                        className="w-full py-2.5 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white rounded-lg hover:from-yellow-600 hover:to-yellow-700 transition-all text-sm font-medium shadow-md"
                                                    >
                                                        Place Bid
                                                    </motion.button>
                                                </div>
                                            )}
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Confirmation Modals */}
            <AnimatePresence>
                {showBuyConfirm && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-white rounded-lg p-6 max-w-md w-full"
                        >
                            <h3 className="text-xl font-bold mb-4">Confirm Request</h3>
                            <p className="mb-4">Are you sure you want to request this donation?</p>
                            <div className="flex justify-end gap-4">
                                <button
                                    onClick={() => setShowBuyConfirm(false)}
                                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                                >
                                    Cancel
                                </button>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={handleBuyNow}
                                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                                >
                                    Confirm Request
                                </motion.button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}

                {/* Existing Bid Confirmation Modal */}
                {showBidConfirm && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-white rounded-lg p-6 max-w-md w-full"
                        >
                            <h3 className="text-xl font-bold mb-4">Confirm Your Bid</h3>
                            <p className="mb-4">Are you sure you want to place a bid of ₹{bidAmount}?</p>
                            <div className="flex justify-end gap-4">
                                <button
                                    onClick={() => setShowBidConfirm(false)}
                                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                                >
                                    Cancel
                                </button>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={handleBidConfirm}
                                    className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
                                >
                                    Confirm Bid
                                </motion.button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

// Updated InfoCard Component
const InfoCard = ({ icon, label, value, className = '' }) => (
    <div className={`flex items-center gap-2.5 bg-gradient-to-br from-gray-50 to-gray-100 p-3 rounded-xl ${className}`}>
        <div className="text-green-500 text-base">{icon}</div>
        <div>
            <p className="text-xs text-gray-500 font-medium">{label}</p>
            <p className="text-sm font-semibold text-gray-900">{value || 'N/A'}</p>
        </div>
    </div>
);

export default ProductInfo;
