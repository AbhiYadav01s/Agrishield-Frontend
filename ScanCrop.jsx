import React, { useState, useRef } from 'react';

export default function ScanCrop({ setCurrentView }) {
  const [imagePreview, setImagePreview] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const fileInputRef = useRef(null);

  // Handle local image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setResult(null);
    }
  };

  // Send image to Python backend
  const handleSimulateScan = async () => {
    if (!imagePreview) return alert("Please upload or capture a photo first.");

    setAnalyzing(true);
    setResult(null);

    const file = fileInputRef.current.files[0];
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch("https://agrishield-api-cser.onrender.com/api/crop-scan", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Connection failed");

      const data = await response.json();
      const topMatch = data.predictions[0];

      setResult({
        disease: topMatch.label,
        confidence: topMatch.confidence + "%",
        weatherEffect: data.weather_effect,
        solution: data.solution,
        precaution: data.precaution,
        flagged: data.flagged_to_worker
      });
    } catch (error) {
      console.error(error);
      alert("Failed to connect to Python backend. Make sure app.py is running!");
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 shadow-lg border border-gray-100 animate-fade-in rounded-none">

      {/* Header */}
      <div className="flex justify-between items-center mb-6 border-b pb-4">
        <button
          onClick={() => setCurrentView('home')}
          className="text-emerald-600 font-semibold text-sm hover:text-emerald-800 flex items-center rounded-none"
        >
          ← Back to Home
        </button>
        <span className="bg-emerald-100 text-emerald-800 px-3 py-1 text-xs font-bold rounded-none">
          AI Vision Engine
        </span>
      </div>

      <h2 className="text-3xl font-black text-gray-900 mb-2">Scan Crop Disease</h2>
      <p className="text-gray-500 text-sm mb-6">Upload or capture a photo of the infected leaf or plant part.</p>

      {/* Upload Box */}
      <div className="border-2 border-dashed border-gray-300 p-6 text-center bg-gray-50 rounded-none mb-6">
        {imagePreview ? (
          <div className="flex flex-col items-center">
            <img src={imagePreview} alt="Crop Preview" className="max-h-64 object-contain mb-4 border shadow-sm rounded-none" />
            <button
              onClick={() => fileInputRef.current.click()}
              className="text-xs text-emerald-700 font-bold underline hover:text-emerald-900"
            >
              Change Photo
            </button>
          </div>
        ) : (
          <div
            onClick={() => fileInputRef.current.click()}
            className="cursor-pointer py-10 flex flex-col items-center"
          >
            <span className="text-5xl mb-3">📁</span>
            <p className="font-bold text-gray-700">Click to upload crop photo</p>
            <p className="text-xs text-gray-400 mt-1">Supports JPG, PNG files</p>
          </div>
        )}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleImageChange}
          accept="image/*"
          className="hidden"
        />
      </div>

      {/* Analyze Button */}
      <button
        onClick={handleSimulateScan}
        disabled={analyzing || !imagePreview}
        className="w-full bg-emerald-600 text-white font-bold py-3 hover:bg-emerald-700 disabled:opacity-50 transition-colors shadow-md rounded-none mb-6"
      >
        {analyzing ? "Analyzing Crop via ResNet-50..." : "Analyze Crop Photo"}
      </button>

      {/* RESULTS DISPLAY SECTION */}
      {result && (
        <div className="bg-emerald-50 p-6 border border-emerald-200 shadow-inner space-y-4 rounded-none">
          <div className="flex justify-between items-start border-b pb-3">
            <div>
              <p className="text-emerald-800 text-xs font-bold uppercase tracking-wider mb-1">AI Diagnosis</p>
              <h3 className="font-extrabold text-2xl text-gray-900">{result.disease}</h3>
            </div>
            <span className="bg-emerald-200 text-emerald-800 text-sm font-extrabold px-3 py-1 rounded-none">
              {result.confidence} Match
            </span>
          </div>

          <div className="space-y-3 text-sm">
            <div className="bg-white p-3 border-l-4 border-amber-500 shadow-sm rounded-none">
              <strong className="text-amber-900 block mb-1">Weather effect:</strong>
              <p className="text-gray-700">{result.weatherEffect}</p>
            </div>

            <div className="bg-white p-3 border-l-4 border-emerald-600 shadow-sm rounded-none">
              <strong className="text-emerald-900 block mb-1">Solution:</strong>
              <p className="text-gray-700">{result.solution}</p>
            </div>

            <div className="bg-white p-3 border-l-4 border-blue-600 shadow-sm rounded-none">
              <strong className="text-blue-900 block mb-1">Precaution:</strong>
              <p className="text-gray-700">{result.precaution}</p>
            </div>
          </div>

          {result.flagged && (
            <div className="bg-orange-100 border-l-4 border-orange-500 p-3 text-xs text-orange-900 font-bold rounded-none">
              ⚠️ Confidence is &lt; 80%. This scan has been automatically pushed to the Agronomist's terminal queue for expert review!
            </div>
          )}
        </div>
      )}
    </div>
  );
}
