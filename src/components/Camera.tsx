import React, { useState, useRef, useEffect } from 'react';
import { Camera as CameraIcon, Upload, Check, X, Trash2, RefreshCw, ZoomIn } from 'lucide-react';

const Camera: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [resizedImage, setResizedImage] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [showOriginal, setShowOriginal] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

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
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Simulate analyzing the image
  const handleAnalyzeImage = () => {
    if (!resizedImage) {
      alert('Please wait for the image to be processed.');
      return;
    }
    
    setAnalyzing(true);
    
    // In a real application, you would send the resized image to your backend for analysis
    // The important part is that we're using the resizedImage (224x224) for the model
    console.log('Sending 224x224 image to model for analysis');
    
    setTimeout(() => {
      setAnalyzing(false);
      // Here you would handle the analysis results
      alert('Analysis complete! This is where you would display the results.');
    }, 2000);
  };
  
  // Toggle between original image and resized (model input) view
  const toggleImageView = () => {
    setShowOriginal(!showOriginal);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-lg mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Skin Analysis</h2>
        <p className="text-gray-600 mb-6">
          Take a clear picture of the area of concern for analysis.
          Make sure the area is well-lit and in focus.
        </p>

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
              <button
                onClick={handleAnalyzeImage}
                disabled={analyzing}
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
      </div>
    </div>
  );
};

export default Camera;