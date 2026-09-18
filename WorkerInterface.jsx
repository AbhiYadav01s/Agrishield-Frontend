import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Generate a custom RED marker icon
const customRedIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

export default function WorkerInterface() {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMapData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/api/map-alerts");
        if (!response.ok) throw new Error("Failed to fetch");
        const data = await response.json();
        setAlerts(data);
      } catch (error) {
        console.error("Error fetching map alerts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMapData();
  }, []);

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 border border-gray-100 animate-fade-in">
      <div className="mb-8">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">Pest Surveillance Radar</h2>
        <p className="text-gray-500 mt-1">Live automated tracking via CROPSAP IoT Traps</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* MAP CONTAINER AREA */}
        <div 
          className="bg-gray-100 rounded-2xl border border-gray-200 overflow-hidden shadow-inner relative z-0"
          style={{ height: '400px', width: '100%' }}
        >
          {loading ? (
            <div className="flex items-center justify-center h-full text-blue-600 font-bold animate-pulse">
              🗺️ Loading Live Map Data...
            </div>
          ) : (
            <MapContainer 
              center={[20.5937, 77.9629]} // Re-centered to focus nicely on Maharashtra 
              zoom={7} 
              style={{ height: '100%', width: '100%' }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {/* Loop through the 8 new backend alerts and drop RED pins */}
              {alerts.map((hotspot) => (
                <Marker key={hotspot.id} position={[hotspot.lat, hotspot.lng]} icon={customRedIcon}>
                  <Popup>
                    <div className="font-sans">
                      <strong className="text-red-600 block mb-1">🚨 {hotspot.risk} RISK ALERT</strong>
                      <b>Pest:</b> {hotspot.pest} <br/>
                      <b>Trap ID:</b> {hotspot.trap_id} <br/>
                      <b>Count:</b> {hotspot.count} bugs detected<br/>
                      <b>Farmer:</b> {hotspot.farmer}
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          )}
        </div>

        {/* ACTIVE ALERTS LIST */}
        <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
          <h3 className="font-bold text-gray-800 text-lg uppercase tracking-wide border-b pb-2 sticky top-0 bg-white z-10">
            Active IoT Triggers
          </h3>
          
          {alerts.length === 0 && !loading && (
            <p className="text-gray-500 italic">No active alerts at this time.</p>
          )}

          {alerts.map((alert) => (
            <div key={alert.id} className={`border-l-4 p-4 rounded-r-xl shadow-md flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-3 sm:space-y-0 ${alert.risk === 'HIGH' ? 'bg-red-50 border-red-500' : alert.risk === 'MEDIUM' ? 'bg-orange-50 border-orange-500' : 'bg-yellow-50 border-yellow-500'}`}>
              <div>
                <div className="flex items-center space-x-2">
                  <span className={`h-3 w-3 rounded-full block ${alert.risk === 'HIGH' ? 'bg-red-500 animate-pulse' : alert.risk === 'MEDIUM' ? 'bg-orange-500' : 'bg-yellow-500'}`}></span>
                  <p className={`font-extrabold ${alert.risk === 'HIGH' ? 'text-red-700' : alert.risk === 'MEDIUM' ? 'text-orange-700' : 'text-yellow-700'}`}>
                    {alert.trap_id} Trigger
                  </p>
                </div>
                <p className="text-gray-600 text-sm mt-1 font-medium">
                  {alert.pest}: {alert.count} Count | {alert.farmer}
                </p>
              </div>
              <button className={`text-white font-bold text-xs px-4 py-2 rounded-lg shadow-sm transition-colors w-full sm:w-auto ${alert.risk === 'HIGH' ? 'bg-red-600 hover:bg-red-700' : alert.risk === 'MEDIUM' ? 'bg-orange-600 hover:bg-orange-700' : 'bg-yellow-600 hover:bg-yellow-700'}`}>
                Broadcast SMS
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}