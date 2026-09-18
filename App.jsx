import React, { useState } from 'react';
import FarmerInterface from './FarmerInterface';
import WorkerInterface from './WorkerInterface';
import ExpertInterface from './ExpertInterface';

export default function App() {
  const [activeTab, setActiveTab] = useState('landing');

  // --- BHASHINI MOCK HEADER ---
  const BhashiniHeader = () => (
    <div className="bg-[#2d2d2d] text-gray-400 text-xs py-2 px-4 flex justify-center space-x-6 overflow-x-auto whitespace-nowrap shadow-inner tracking-wider">
      <span className="hover:text-white cursor-pointer transition-colors">العربية</span>
      <span className="hover:text-white cursor-pointer transition-colors">বাংলা</span>
      <span className="text-emerald-500 border-b-2 border-emerald-500 font-bold cursor-pointer pb-1">English</span>
      <span className="hover:text-white cursor-pointer transition-colors">Español</span>
      <span className="hover:text-white cursor-pointer transition-colors">Français</span>
      <span className="hover:text-white cursor-pointer transition-colors">हिन्दी</span>
      <span className="hover:text-white cursor-pointer transition-colors">Português</span>
    </div>
  );

  if (activeTab === 'landing') {
    return (
      <div className="min-h-screen bg-emerald-50 flex flex-col font-sans text-gray-800">
        <BhashiniHeader />
        <div className="flex-1 flex flex-col items-center justify-center p-6">
          <div className="text-center mb-12 animate-fade-in">
            <span className="text-7xl block mb-4 drop-shadow-md">🌱</span>
            <h1 className="text-5xl md:text-6xl font-extrabold text-emerald-900 tracking-tight mb-4">AgriShield</h1>
            <p className="text-emerald-700 text-xl font-medium">Select your portal to continue</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
            <button onClick={() => setActiveTab('farmer')} className="bg-white p-12 rounded-[2.5rem] shadow-lg border-2 border-emerald-100 hover:-translate-y-3 hover:shadow-2xl hover:border-emerald-300 transition-all duration-300 group flex flex-col items-center">
              <div className="bg-emerald-50 p-8 rounded-full group-hover:bg-emerald-100 transition-colors mb-6"><span className="text-7xl block">🧑‍🌾</span></div>
              <h2 className="text-3xl font-bold text-emerald-950 mb-2">Farmer UI</h2>
              <p className="text-gray-500 text-md text-center">Scan crops & voice advisories</p>
            </button>
            <button onClick={() => setActiveTab('worker')} className="bg-white p-12 rounded-[2.5rem] shadow-lg border-2 border-blue-100 hover:-translate-y-3 hover:shadow-2xl hover:border-blue-300 transition-all duration-300 group flex flex-col items-center">
              <div className="bg-blue-50 p-8 rounded-full group-hover:bg-blue-100 transition-colors mb-6"><span className="text-7xl block">📋</span></div>
              <h2 className="text-3xl font-bold text-blue-950 mb-2">Extension Staff</h2>
              <p className="text-gray-500 text-md text-center">IoT pest hotspots & alerts</p>
            </button>
            <button onClick={() => setActiveTab('expert')} className="bg-white p-12 rounded-[2.5rem] shadow-lg border-2 border-purple-100 hover:-translate-y-3 hover:shadow-2xl hover:border-purple-300 transition-all duration-300 group flex flex-col items-center">
              <div className="bg-purple-50 p-8 rounded-full group-hover:bg-purple-100 transition-colors mb-6"><span className="text-7xl block">🔬</span></div>
              <h2 className="text-3xl font-bold text-purple-950 mb-2">Agronomist</h2>
              <p className="text-gray-500 text-md text-center">Validate AI scans & retrain</p>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-emerald-50/50 font-sans text-gray-800">
      <BhashiniHeader />
      <nav className="bg-emerald-950 text-white p-4 shadow-xl">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center">
          <div className="flex items-center space-x-3 mb-4 sm:mb-0">
            <span className="text-3xl">🌱</span>
            <h1 className="text-3xl font-extrabold tracking-tight text-emerald-50">AgriShield</h1>
          </div>
          <div className="flex flex-wrap justify-center gap-3 bg-emerald-900/50 p-2 rounded-2xl">
            <button onClick={() => setActiveTab('landing')} className="px-4 py-2 rounded-xl font-bold text-sm bg-gray-700/50 hover:bg-gray-600 transition-all">🏠 Home</button>
            <button onClick={() => setActiveTab('farmer')} className={`px-4 py-2 rounded-xl font-bold text-sm transition-all duration-200 ${activeTab === 'farmer' ? 'bg-emerald-500 text-white shadow-lg' : 'hover:bg-emerald-800 text-emerald-200'}`}>Farmer</button>
            <button onClick={() => setActiveTab('worker')} className={`px-4 py-2 rounded-xl font-bold text-sm transition-all duration-200 ${activeTab === 'worker' ? 'bg-blue-500 text-white shadow-lg' : 'hover:bg-emerald-800 text-emerald-200'}`}>Worker</button>
            <button onClick={() => setActiveTab('expert')} className={`px-4 py-2 rounded-xl font-bold text-sm transition-all duration-200 ${activeTab === 'expert' ? 'bg-purple-500 text-white shadow-lg' : 'hover:bg-emerald-800 text-emerald-200'}`}>Agronomist</button>
          </div>
        </div>
      </nav>
      <div className="p-4 sm:p-8 max-w-6xl mx-auto">
        {activeTab === 'farmer' && <FarmerInterface />}
        {activeTab === 'worker' && <WorkerInterface />}
        {activeTab === 'expert' && <ExpertInterface />}
      </div>
    </div>
  );
}