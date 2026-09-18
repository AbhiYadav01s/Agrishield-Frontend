import React, { useState } from 'react';

export default function CheckRisk({ setCurrentView }) {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchWeather = async () => {
    setLoading(true);
    
    // Hardcoded to Yavatmal, Maharashtra for a fail-proof hackathon demo
    const lat = 20.3888;
    const lon = 78.1204;

    try {
      const response = await fetch(`http://127.0.0.1:5000/api/weather?lat=${lat}&lon=${lon}`);
      if (!response.ok) throw new Error("Weather API failed");
      
      const data = await response.json();
      
      // If the backend returned an error (like a missing API key)
      if (data.error || data.cod === 401) {
        alert("Backend Error: Did your friend put the real API key in app.py?");
        setLoading(false);
        return;
      }

      setWeatherData(data);
    } catch (error) {
      console.error(error);
      alert("Failed to connect to backend. Is Python app.py running?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-2xl shadow-lg border border-gray-100 animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <button onClick={() => setCurrentView('home')} className="text-emerald-600 font-semibold text-sm hover:text-emerald-800 flex items-center">← Back</button>
        <button className="bg-emerald-100 text-emerald-800 p-2 rounded-full hover:bg-emerald-200 transition-colors"><span className="text-lg block">🎙️</span></button>
      </div>
      
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Risk Radar</h2>
      <p className="text-gray-500 text-sm mb-6">Weather and pest warnings for your location.</p>
      
      <div className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded-r-xl shadow-sm mb-6">
        <div className="flex items-center"><span className="text-2xl mr-2">⚠️</span><h3 className="text-orange-700 font-bold">High Humidity Warning</h3></div>
        <p className="text-orange-600 text-sm mt-1">Conditions favorable for fungal infections over the next 48 hours.</p>
      </div>

      {/* The Fetch Button */}
      {!weatherData && (
        <button 
          onClick={fetchWeather}
          disabled={loading}
          className="w-full bg-gray-50 p-6 rounded-2xl border-2 border-dashed border-blue-200 hover:bg-blue-50 hover:border-blue-400 transition-all group flex flex-col items-center justify-center active:scale-95"
        >
          <div className="bg-blue-100 p-4 rounded-full group-hover:scale-110 transition-transform mb-3 shadow-sm">
            <span className="text-5xl block">{loading ? '⏳' : '🗺️'}</span>
          </div>
          <h3 className="text-lg font-bold text-blue-800">
            {loading ? "Fetching Data..." : "Load OpenWeatherMap Data"}
          </h3>
          <p className="text-blue-600 text-xs mt-1 font-medium">Pull live API data for Yavatmal Region</p>
        </button>
      )}

      {/* The Weather Result Display */}
      {weatherData && (
        <div className="bg-blue-50 p-5 rounded-xl border border-blue-200 shadow-inner mt-4 animate-fade-in">
          <h3 className="font-bold text-blue-900 text-lg mb-4 border-b border-blue-200 pb-2">
            Live Weather: {weatherData.name}
          </h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-3 rounded-lg shadow-sm border border-blue-100 text-center">
              <p className="text-xs text-gray-500 uppercase font-bold mb-1">Temperature</p>
              <p className="text-2xl font-extrabold text-gray-900">{weatherData.main?.temp}°C</p>
            </div>
            
            <div className="bg-white p-3 rounded-lg shadow-sm border border-blue-100 text-center">
              <p className="text-xs text-gray-500 uppercase font-bold mb-1">Humidity</p>
              <p className="text-2xl font-extrabold text-blue-700">{weatherData.main?.humidity}%</p>
            </div>
          </div>

          <div className="mt-4 bg-white p-3 rounded-lg shadow-sm border border-blue-100">
            <p className="text-xs text-gray-500 uppercase font-bold mb-1">Conditions</p>
            <p className="text-md font-bold text-gray-800 capitalize">
              {weatherData.weather?.[0]?.description}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}