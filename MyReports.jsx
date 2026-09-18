import React, { useState } from 'react';
import ScanCrop from './ScanCrop';
import CheckRisk from './CheckRisk';
import MyReports from './MyReports';

export default function FarmerInterface() {
  const [currentView, setCurrentView] = useState('home');

  if (currentView === 'scan') return <ScanCrop setCurrentView={setCurrentView} />;
  if (currentView === 'risk') return <CheckRisk setCurrentView={setCurrentView} />;
  if (currentView === 'reports') return <MyReports setCurrentView={setCurrentView} />;

  return (
    <div className="max-w-md mx-auto animate-fade-in relative">
      <div className="mb-8 flex justify-between items-start">
        <div>
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Namaskar,</h2>
          <p className="text-emerald-700 font-medium mt-1">What would you like to do today?</p>
          <span className="inline-block mt-3 text-xs bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full font-bold shadow-sm">मराठी</span>
        </div>
        <button className="group flex flex-col items-center">
          <div className="bg-emerald-600 text-white p-4 rounded-full shadow-lg shadow-emerald-200 hover:bg-emerald-700 active:scale-95 transition-all animate-bounce">
            <span className="text-2xl block">🎙️</span>
          </div>
          <span className="text-xs font-bold text-emerald-700 mt-2 opacity-80 group-hover:opacity-100">Tap to Speak</span>
        </button>
      </div>

      <div className="space-y-4">
        <button onClick={() => setCurrentView('scan')} className="w-full bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center space-x-6 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 group">
          <div className="bg-emerald-100 p-4 rounded-full group-hover:scale-110 transition-transform"><span className="text-4xl block">📸</span></div>
          <div className="text-left"><h3 className="text-xl font-bold text-gray-800">Scan Crop</h3><p className="text-gray-500 text-sm mt-1">Identify diseases & insects instantly</p></div>
        </button>
        <button onClick={() => setCurrentView('risk')} className="w-full bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center space-x-6 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 group">
          <div className="bg-orange-100 p-4 rounded-full group-hover:scale-110 transition-transform"><span className="text-4xl block">⚠️</span></div>
          <div className="text-left"><h3 className="text-xl font-bold text-gray-800">Check Risk</h3><p className="text-gray-500 text-sm mt-1">View weather & pest alerts for your farm</p></div>
        </button>
        <button onClick={() => setCurrentView('reports')} className="w-full bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center space-x-6 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 group">
          <div className="bg-blue-100 p-4 rounded-full group-hover:scale-110 transition-transform"><span className="text-4xl block">📊</span></div>
          <div className="text-left"><h3 className="text-xl font-bold text-gray-800">My Reports</h3><p className="text-gray-500 text-sm mt-1">History of past scans and treatments</p></div>
        </button>
      </div>
    </div>
  );
}