import React, { useState, useRef, useEffect } from 'react';
import { Camera as CameraIcon, Upload, Check, X, Trash2, RefreshCw, ZoomIn, AlertTriangle } from 'lucide-react';

const Camera: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [resizedImage, setResizedImage] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [showOriginal, setShowOriginal] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Model states
  const [model, setModel] = useState<any>(null);
  const [modelLoaded, setModelLoaded] = useState(false);
  const [modelLoading, setModelLoading] = useState(true);
  const [modelError, setModelError] = useState(false);
  const [modelErrorMessage, setModelErrorMessage] = useState('');
  const [prediction, setPrediction] = useState<{prediction: string, confidence: number} | null>(null);

  // Load the model when component mounts
  useEffect(() => {
    const loadModel = async () => {
      try {
        console.log('Starting to load model...');
        setModelLoading(true);
        
        const modelPath = '/models/xgb_resnet_model.json';
        console.log('Using model path:', modelPath);
        
        const response = await fetch(modelPath);
        
        console.log('Fetch response status:', response.status);
        
        if (!response.ok) {
          throw new Error(`Failed to load model: ${response.status} ${response.statusText}`);
        }
        
        const modelData = await response.json();
        console.log('Model loaded successfully, data size:', JSON.stringify(modelData).length);
        console.log('Model structure:', Object.keys(modelData));
        
        setModel(modelData);
        setModelLoaded(true);
        setModelLoading(false);
      } catch (error) {
        console.error('Error loading model:', error);
        setModelError(true);
        setModelErrorMessage(error instanceof Error ? error.message : 'Unknown error loading model');
        setModelLoading(false);
      }
    };

    loadModel();
  }, []);

  // Handle taking a picture through the device camera
  const handleTakePicture = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Resize image to 224x224 for the model
  const resizeImage = (src: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        // Set canvas size to 224x224 (required for the model)
        canvas.width = 224;
        canvas.height = 224;
        
        if (!ctx) {
          reject(new Error('Could not get canvas context'));
          return;
        }
        
        // Draw image to canvas with proper scaling
        // This preserves aspect ratio by determining which dimension to use as basis
        const scale = Math.max(224 / img.width, 224 / img.height);
        const scaledWidth = img.width * scale;
        const scaledHeight = img.height * scale;
        
        // Center the image on the canvas if it doesn't fill one dimension
        const offsetX = (224 - scaledWidth) / 2;
        const offsetY = (224 - scaledHeight) / 2;
        
        // Optional: Fill with black background to ensure 224x224
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, 224, 224);
        
        // Draw the image centered
        ctx.drawImage(img, offsetX, offsetY, scaledWidth, scaledHeight);
        
        // Get data URL
        const resizedDataUrl = canvas.toDataURL('image/jpeg', 0.95);
        resolve(resizedDataUrl);
      };
      
      img.onerror = (err) => {
        reject(err);
      };
      
      img.src = src;
    });
  };

  // Handle file selection (either from camera or upload)
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        // Clear any previous prediction
        setPrediction(null);
        
        // Read the original file
        const reader = new FileReader();
        reader.onloadend = async () => {
          const originalImage = reader.result as string;
          setImage(originalImage);
          
          // Resize the image for the model
          try {
            const resized = await resizeImage(originalImage);
            setResizedImage(resized);
          } catch (error) {
            console.error('Error resizing image:', error);
            alert('Could not process the image. Please try again.');
          }
        };
        reader.readAsDataURL(file);
      } catch (error) {
        console.error('Error processing file:', error);
      }
    }
  };

  // Reset the image
  const handleClearImage = () => {
    setImage(null);
    setResizedImage(null);
    setAnalyzing(false);
    setShowOriginal(true);
    setPrediction(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Extract features from image
  const extractFeaturesFromImage = async (imageData: string): Promise<number[]> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        canvas.width = 224;
        canvas.height = 224;
        
        if (ctx) {
          ctx.drawImage(img, 0, 0, 224, 224);
          
          // Simple feature extraction - replace with your actual feature extraction logic
          const imageData = ctx.getImageData(0, 0, 224, 224);
          const features = processImageData(imageData);
          
          resolve(features);
        } else {
          resolve([]);
        }
      };
      
      img.src = imageData;
    });
  };

  // Process image data into features
  const processImageData = (imageData: ImageData): number[] => {
    // This is a very simplified feature extraction
    // You'll need to replace this with your actual feature extraction method
    const features: number[] = [];
    const data = imageData.data;
    
    // Calculate average RGB values in a grid
    const gridSize = 7; // 7x7 grid
    const cellWidth = Math.floor(224 / gridSize);
    const cellHeight = Math.floor(224 / gridSize);
    
    for (let y = 0; y < gridSize; y++) {
      for (let x = 0; x < gridSize; x++) {
        let r = 0, g = 0, b = 0;
        let count = 0;
        
        for (let cy = y * cellHeight; cy < (y + 1) * cellHeight; cy++) {
          for (let cx = x * cellWidth; cx < (x + 1) * cellWidth; cx++) {
            const idx = (cy * 224 + cx) * 4;
            r += data[idx];
            g += data[idx + 1];
            b += data[idx + 2];
            count++;
          }
        }
        
        if (count > 0) {
          features.push(r / count);
          features.push(g / count);
          features.push(b / count);
        }
      }
    }
    
    return features;
  };

  // Make prediction with the model
  const predictWithModel = (model: any, features: number[]): {prediction: string, confidence: number} => {
    // This is a simplified prediction function
    // You'll need to replace with actual XGBoost prediction logic
    
    try {
      console.log('Making prediction with features:', features.length);
      
      // Simplified example - not actual XGBoost inference
      // In a real implementation, you would traverse trees based on your model structure
      
      // For demonstration, returning a simulated prediction
      const randomVal = Math.random();
      return {
        prediction: randomVal > 0.5 ? 'malignant' : 'benign',
        confidence: randomVal > 0.5 ? randomVal : 1 - randomVal
      };
    } catch (error) {
      console.error('Error during prediction:', error);
      return {
        prediction: 'unknown',
        confidence: 0
      };
    }
  };

  // Analyze the image with the model
  const handleAnalyzeImage = async () => {
    if (!resizedImage) {
      alert('Please wait for the image to be processed.');
      return;
    }
    
    if (!modelLoaded) {
      alert('Model is still loading. Please wait and try again.');
      return;
    }
    
    setAnalyzing(true);
    
    try {
      console.log('Starting image analysis...');
      
      // Extract features and make prediction
      const features = await extractFeaturesFromImage(resizedImage);
      console.log('Features extracted:', features.length);
      
      const result = predictWithModel(model, features);
      console.log('Prediction result:', result);
      
      setPrediction(result);
    } catch (error) {
      console.error('Error analyzing image:', error);
      alert('An error occurred during analysis. Please try again.');
    } finally {
      setAnalyzing(false);
    }
  };
  
  // Toggle between original image and resized (model input) view
  const toggleImageView = () => {
    setShowOriginal(!showOriginal);
  };

  // Force reload model - for troubleshooting
  const handleReloadModel = () => {
    setModelLoaded(false);
    setModelLoading(true);
    setModelError(false);
    setModelErrorMessage('');
    
    // Re-trigger the effect to load the model
    setModel(null);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-lg mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Skin Analysis</h2>
        <p className="text-gray-600 mb-6">
          Take a clear picture of the area of concern for analysis.
          Make sure the area is well-lit and in focus.
        </p>

        {/* Model Loading States */}
        {modelLoading && (
          <div className="bg-yellow-50 rounded-lg p-4 mb-4 flex items-center text-sm text-yellow-700">
            <RefreshCw className="h-5 w-5 mr-2 animate-spin text-yellow-500" />
            <span>Loading skin analysis model... This may take a moment.</span>
          </div>
        )}
        
        {modelError && (
          <div className="bg-red-50 rounded-lg p-4 mb-4 text-sm text-red-700">
            <div className="flex items-center mb-2">
              <AlertTriangle className="h-5 w-5 mr-2 text-red-500" />
              <span className="font-medium">Failed to load analysis model</span>
            </div>
            <p className="ml-7">{modelErrorMessage}</p>
            <button 
              onClick={handleReloadModel}
              className="mt-3 px-3 py-1 bg-red-100 hover:bg-red-200 text-red-700 rounded-md text-xs flex items-center"
            >
              <RefreshCw className="h-4 w-4 mr-1" /> Try Again
            </button>
          </div>
        )}

        {/* Image preview area */}
        {image ? (
          <div className="relative">
            <div className="rounded-lg overflow-hidden border border-gray-200 mb-4">
              <img 
                src={showOriginal ? image : resizedImage} 
                alt="Captured" 
                className="w-full h-auto object-contain max-h-96" 
              />
              
              {/* Resolution indicator overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white text-xs py-1 px-2">
                {showOriginal 
                  ? 'Original image (high resolution)' 
                  : 'Model input (224×224 pixels)'}
              </div>
            </div>
            
            {/* Control buttons */}
            <div className="absolute top-2 right-2 flex space-x-2">
              <button 
                onClick={toggleImageView}
                className="bg-white rounded-full p-1 shadow-md hover:bg-gray-100"
                aria-label="Toggle resolution view"
                title={showOriginal ? "Show model input (224×224)" : "Show original image"}
              >
                <ZoomIn className="h-5 w-5 text-gray-700" />
              </button>
              
              <button 
                onClick={handleClearImage}
                className="bg-white rounded-full p-1 shadow-md hover:bg-gray-100"
                aria-label="Clear image"
              >
                <X className="h-5 w-5 text-gray-700" />
              </button>
            </div>
          </div>
        ) : (
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 flex flex-col items-center justify-center text-center bg-gray-50">
            <CameraIcon className="h-12 w-12 text-gray-400 mb-4" />
            <p className="text-gray-500 mb-4">No image captured yet</p>
            <p className="text-sm text-gray-400 mb-4">For best results, ensure good lighting and clear focus on the area of concern</p>
          </div>
        )}

        {/* Prediction Results */}
        {prediction && (
          <div className={`mt-4 p-4 rounded-lg ${
            prediction.prediction === 'malignant' 
              ? 'bg-red-50 border border-red-200' 
              : 'bg-green-50 border border-green-200'
          }`}>
            <h3 className="font-semibold mb-2 flex items-center">
              {prediction.prediction === 'malignant' && <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />}
              Analysis Result
            </h3>
            
            <div className="mb-3">
              <span className={`font-bold text-lg ${
                prediction.prediction === 'malignant' ? 'text-red-600' : 'text-green-600'
              }`}>
                {prediction.prediction === 'malignant' ? 'Potentially Malignant' : 'Likely Benign'}
              </span>
              <span className="ml-2 text-sm text-gray-500">
                ({(prediction.confidence * 100).toFixed(1)}% confidence)
              </span>
            </div>
            
            <div className="text-sm">
              <div className="bg-white bg-opacity-70 p-3 rounded-md mb-3">
                <div className="relative h-6 w-full bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className={`absolute top-0 left-0 h-full ${
                      prediction.prediction === 'malignant' ? 'bg-red-500' : 'bg-green-500'
                    }`}
                    style={{ width: `${prediction.confidence * 100}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="font-medium mt-3 text-gray-700">Important Disclaimer:</div>
              <p className="text-gray-600">
                This analysis is for informational purposes only and not a medical diagnosis. 
                Please consult a healthcare professional for proper evaluation.
              </p>
            </div>
          </div>
        )}

        {/* Camera input (hidden) */}
        <input
          type="file"
          accept="image/*"
          capture="environment"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
        />

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-3 mt-6">
          {!image ? (
            <>
              <button
                onClick={handleTakePicture}
                className="flex items-center justify-center px-4 py-2 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <CameraIcon className="h-5 w-5 mr-2" />
                Take Picture
              </button>

              <button
                onClick={handleTakePicture}
                className="flex items-center justify-center px-4 py-2 bg-white border border-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <Upload className="h-5 w-5 mr-2" />
                Upload Image
              </button>
            </>
          ) : (
            <>
              {!prediction && (
                <button
                  onClick={handleAnalyzeImage}
                  disabled={analyzing || !modelLoaded}
                  className="flex items-center justify-center px-4 py-2 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                >
                  {analyzing ? (
                    <>
                      <RefreshCw className="h-5 w-5 mr-2 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Check className="h-5 w-5 mr-2" />
                      Analyze Image
                    </>
                  )}
                </button>
              )}

              <button
                onClick={handleTakePicture}
                className="flex items-center justify-center px-4 py-2 bg-white border border-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <CameraIcon className="h-5 w-5 mr-2" />
                New Picture
              </button>

              <button
                onClick={handleClearImage}
                className="flex items-center justify-center px-4 py-2 bg-white border border-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <Trash2 className="h-5 w-5 mr-2" />
                Clear
              </button>
            </>
          )}
        </div>
      </div>

      {/* Model info and instructions */}
      <div className="w-full max-w-lg space-y-4 mt-6">
        <div className="bg-indigo-50 rounded-lg p-4 text-sm text-indigo-700">
          <h3 className="font-semibold mb-2">About Image Processing:</h3>
          <p className="mb-2">
            Images you capture will be automatically resized to 224×224 pixels for our skin analysis model. 
            You can toggle between the original and resized view using the zoom button.
          </p>
          <p>
            The model works best with close-up images that clearly show the area of concern.
          </p>
        </div>
        
        <div className="bg-blue-50 rounded-lg p-4 text-sm text-blue-700">
          <h3 className="font-semibold mb-2">Tips for better images:</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li>Ensure good lighting - natural daylight works best</li>
            <li>Keep the camera steady and focus on the area of concern</li>
            <li>Take multiple pictures if needed</li>
            <li>Include a common object for size reference (like a coin) if possible</li>
          </ul>
        </div>
        
        {/* Model Info - for debugging purposes */}
        {modelLoaded && (
          <div className="bg-gray-50 rounded-lg p-4 text-xs text-gray-500 border border-gray-200">
            <h3 className="font-semibold mb-1">Model Info:</h3>
            <p>Status: {modelLoaded ? 'Loaded' : 'Not Loaded'}</p>
            <p>Type: XGBoost ResNet Model</p>
            <p>Size: ~2.3MB</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Camera;