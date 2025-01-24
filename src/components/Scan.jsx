import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const Scan = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [isUsingCamera, setIsUsingCamera] = useState(false);
    const [cameraError, setCameraError] = useState(null);
    const [productDetails, setProductDetails] = useState({
        itemName: '',
        category: '',
        condition: '',
        weight: '',
        quantity: '',
        location: '',
        donationOrSale: 'donate',
    });
    const videoRef = useRef(null);
    const streamRef = useRef(null);

    // Cleanup function for camera stream
    useEffect(() => {
        return () => {
            if (streamRef.current) {
                streamRef.current.getTracks().forEach(track => track.stop());
            }
        };
    }, []);

    const startCamera = async () => {
        try {
            setCameraError(null);
            const constraints = {
                video: {
                    facingMode: 'environment', // Use back camera if available
                    width: { ideal: 1280 },
                    height: { ideal: 720 }
                }
            };

            const stream = await navigator.mediaDevices.getUserMedia(constraints);
            streamRef.current = stream;

            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                videoRef.current.play().catch(e => console.error('Error playing video:', e));
            }

            setIsUsingCamera(true);
        } catch (err) {
            console.error('Error accessing camera:', err);
            setCameraError('Unable to access camera. Please make sure you have granted camera permissions.');
            setIsUsingCamera(false);
        }
    };

    const stopCamera = () => {
        if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => track.stop());
            setIsUsingCamera(false);
        }
    };

    const capturePhoto = () => {
        if (videoRef.current) {
            const canvas = document.createElement('canvas');
            canvas.width = videoRef.current.videoWidth;
            canvas.height = videoRef.current.videoHeight;
            canvas.getContext('2d').drawImage(videoRef.current, 0, 0);
            canvas.toBlob((blob) => {
                setSelectedFile(blob);
                setPreview(canvas.toDataURL('image/jpeg'));
            }, 'image/jpeg');
            stopCamera();
        }
    };

    const handleFileSelect = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProductDetails(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleUpload = async () => {
        if (!selectedFile) return;

        const formData = new FormData();
        formData.append('file', selectedFile);
        Object.keys(productDetails).forEach(key => {
            formData.append(key, productDetails[key]);
        });
        formData.append('user', 'user_id_here'); // Replace with actual user ID

        try {
            const response = await fetch('http://localhost:3000/api/ewaste', {
                method: 'POST',
                body: formData,
            });
            const data = await response.json();
            console.log('Upload successful:', data);
            // Reset form and preview
            setSelectedFile(null);
            setPreview(null);
            setProductDetails({
                itemName: '',
                category: '',
                condition: '',
                weight: '',
                quantity: '',
                location: '',
                donationOrSale: 'donate',
            });
        } catch (error) {
            console.error('Upload failed:', error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-24 px-4 sm:px-6 lg:px-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden"
            >
                <div className="p-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Add E-Waste Product</h2>

                    <div className="space-y-6">
                        {/* Image Upload/Camera Section */}
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                            {isUsingCamera ? (
                                <div className="space-y-4">
                                    {cameraError ? (
                                        <div className="text-red-500">{cameraError}</div>
                                    ) : (
                                        <>
                                            <video
                                                ref={videoRef}
                                                autoPlay
                                                playsInline
                                                className="w-full h-64 object-cover rounded-lg"
                                                style={{ transform: 'scaleX(-1)' }} // Mirror the video
                                            />
                                            <div className="flex justify-center space-x-4">
                                                <button
                                                    onClick={capturePhoto}
                                                    className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                                                >
                                                    Capture Photo
                                                </button>
                                                <button
                                                    onClick={stopCamera}
                                                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        </>
                                    )}
                                </div>
                            ) : (
                                <>
                                    {preview ? (
                                        <div className="space-y-4">
                                            <img
                                                src={preview}
                                                alt="Preview"
                                                className="max-w-full h-64 object-contain mx-auto"
                                            />
                                            <button
                                                onClick={() => {
                                                    setSelectedFile(null);
                                                    setPreview(null);
                                                }}
                                                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="space-y-4">
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleFileSelect}
                                                className="hidden"
                                                id="file-upload"
                                            />
                                            <div className="flex justify-center space-x-4">
                                                <label
                                                    htmlFor="file-upload"
                                                    className="cursor-pointer px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                                                >
                                                    Choose File
                                                </label>
                                                <button
                                                    onClick={startCamera}
                                                    className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                                                >
                                                    Use Camera
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>

                        {/* Product Details Form */}
                        <div className="space-y-4">
                            <input
                                type="text"
                                name="itemName"
                                value={productDetails.itemName}
                                onChange={handleInputChange}
                                placeholder="Item Name"
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                            <select
                                name="category"
                                value={productDetails.category}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                            >
                                <option value="">Select Category</option>
                                <option value="electronics">Electronics</option>
                                <option value="appliances">Appliances</option>
                                <option value="computers">Computers</option>
                                <option value="mobile">Mobile Devices</option>
                            </select>
                            <select
                                name="condition"
                                value={productDetails.condition}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                            >
                                <option value="">Select Condition</option>
                                <option value="new">New</option>
                                <option value="good">Good</option>
                                <option value="fair">Fair</option>
                                <option value="poor">Poor</option>
                            </select>
                            <div className="grid grid-cols-2 gap-4">
                                <input
                                    type="number"
                                    name="weight"
                                    value={productDetails.weight}
                                    onChange={handleInputChange}
                                    placeholder="Weight (kg)"
                                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                />
                                <input
                                    type="number"
                                    name="quantity"
                                    value={productDetails.quantity}
                                    onChange={handleInputChange}
                                    placeholder="Quantity"
                                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                />
                            </div>
                            <input
                                type="text"
                                name="location"
                                value={productDetails.location}
                                onChange={handleInputChange}
                                placeholder="Location"
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                            <select
                                name="donationOrSale"
                                value={productDetails.donationOrSale}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                            >
                                <option value="donate">Donate</option>
                                <option value="sell">Sell</option>
                            </select>
                        </div>

                        <button
                            onClick={handleUpload}
                            disabled={!selectedFile || !productDetails.itemName}
                            className={`w-full py-3 px-4 rounded-md text-white font-medium ${selectedFile && productDetails.itemName
                                    ? 'bg-green-600 hover:bg-green-700'
                                    : 'bg-gray-400 cursor-not-allowed'
                                } transition-colors`}
                        >
                            Upload Product
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Scan;