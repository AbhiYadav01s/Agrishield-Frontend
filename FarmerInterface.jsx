import React, { useState } from 'react';
import ScanCrop from './ScanCrop';
import CheckRisk from './CheckRisk';
import MyReports from './MyReports';
import ChatFAQ from './ChatFAQ';

export default function FarmerInterface() {
  const [currentView, setCurrentView] = useState('home');
  const [isMarathi, setIsMarathi] = useState(false);
  const [loadingTranslation, setLoadingTranslation] = useState(false);

  // Dynamic text dictionary for English vs Marathi
  const [texts, setTexts] = useState({
    namaskar: "Namaskar,",
    subtitle: "How can we assist your farm today?",
    scanTitle: "Scan Crop",
    scanDesc: "Snap a photo to instantly identify diseases.",
    riskTitle: "Check Risk",
    riskDesc: "Live OpenWeather & regional pest alerts.",
    chatTitle: "Krishi Mitra",
    chatDesc: "Ask our AI farming assistant anything.",
    reportsTitle: "My Reports",
    reportsDesc: "History of past scans and treatments."
  });

  if (currentView === 'scan') return <ScanCrop setCurrentView={setCurrentView} />;
  if (currentView === 'risk') return <CheckRisk setCurrentView={setCurrentView} />;
  if (currentView === 'reports') return <MyReports setCurrentView={setCurrentView} />;
  if (currentView === 'chat') return <ChatFAQ setCurrentView={setCurrentView} />;

  // Toggle Language Handler calling your Python backend
  const handleLanguageToggle = async () => {
    const targetLang = isMarathi ? 'en' : 'mr';
    setLoadingTranslation(true);

    try {
      // If switching back to English, we reset to original strings instantly
      if (isMarathi) {
        setTexts({
          namaskar: "Namaskar,",
          subtitle: "How can we assist your farm today?",
          scanTitle: "Scan Crop",
          scanDesc: "Snap a photo to instantly identify diseases.",
          riskTitle: "Check Risk",
          riskDesc: "Live OpenWeather & regional pest alerts.",
          chatTitle: "Krishi Mitra",
          chatDesc: "Ask our AI farming assistant anything.",
          reportsTitle: "My Reports",
          reportsDesc: "History of past scans and treatments."
        });
        setIsMarathi(false);
        setLoadingTranslation(false);
        return;
      }

      // Otherwise, call your Flask backend to translate each text line into Marathi
      const response = await fetch("http://127.0.0.1:5000/api/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: "Namaskar|How can we assist your farm today?|Scan Crop|Snap a photo to instantly identify diseases.|Check Risk|Live OpenWeather & regional pest alerts.|Krishi Mitra|Ask our AI farming assistant anything.|My Reports|History of past scans and treatments.",
          target: "mr"
        })
      });

      if (!response.ok) throw new Error("Translation failed");
      const data = await response.json();
      const translatedParts = data.translated.split('|');

      if (translatedParts.length >= 10) {
        setTexts({
          namaskar: translatedParts[0],
          subtitle: translatedParts[1],
          scanTitle: translatedParts[2],
          scanDesc: translatedParts[3],
          riskTitle: translatedParts[4],
          riskDesc: translatedParts[5],
          chatTitle: translatedParts[6],
          chatDesc: translatedParts[7],
          reportsTitle: translatedParts[8],
          reportsDesc: translatedParts[9]
        });
      }
      setIsMarathi(true);
    } catch (error) {
      console.error("Translation error:", error);
      alert("Make sure Python app.py is running to translate!");
    } finally {
      setLoadingTranslation(false);
    }
  };

  return (
    <div className="max-w-md mx-auto animate-fade-in relative mt-4">
      
      {/* ACTION BAR WITH WORKING TRANSLATE BUTTON */}
      <div className="flex justify-between items-center mb-10 bg-white p-5 rounded-[2rem] shadow-xl border-4 border-emerald-50">
        
        {/* Working Translation Toggle Button */}
        <div 
          onClick={handleLanguageToggle} 
          className="flex flex-col items-center group cursor-pointer w-1/3 transition-transform active:scale-95"
        >
           <div className={`p-4 rounded-2xl transition-colors shadow-inner ${isMarathi ? 'bg-emerald-600 text-white' : 'bg-emerald-100 text-emerald-900'}`}>
             <span className="text-4xl block">🌐</span>
           </div>
           <span className="text-xs font-black text-emerald-900 mt-2 tracking-widest uppercase">
             {loadingTranslation ? "Translating..." : isMarathi ? "ENG / मराठी" : "मराठी / ENG"}
           </span>
        </div>
        
        {/* Center Voice Button */}
        <div className="flex flex-col items-center -mt-12 relative z-10 w-1/3">
           <button className="bg-gradient-to-br from-emerald-400 to-emerald-700 text-white p-7 rounded-full shadow-2xl shadow-emerald-600/40 hover:scale-105 active:scale-95 transition-all animate-pulse border-8 border-[#f4fbf7]">
             <span className="text-6xl block">🎙️</span>
           </button>
           <span className="text-sm font-black text-emerald-900 mt-3 tracking-widest uppercase">Tap to Speak</span>
        </div>

        {/* Read Aloud Feature */}
        <div className="flex flex-col items-center group cursor-pointer w-1/3">
           <div className="bg-blue-100 p-4 rounded-2xl group-hover:bg-blue-200 transition-colors shadow-inner">
             <span className="text-4xl block">🔊</span>
           </div>
           <span className="text-xs font-black text-blue-900 mt-2 tracking-widest uppercase">Read Aloud</span>
        </div>
      </div>

      <div className="text-center mb-8">
        <h2 className="text-4xl font-black text-emerald-950 tracking-tighter">{texts.namaskar}</h2>
        <p className="text-emerald-700 font-semibold mt-2 text-lg">{texts.subtitle}</p>
      </div>

      {/* MAIN BUTTONS */}
      <div className="flex flex-col items-center space-y-6">
        
        <button onClick={() => setCurrentView('scan')} className="w-[95%] bg-white p-6 rounded-[2.5rem] shadow-lg border-2 border-emerald-50 flex items-center space-x-6 hover:-translate-y-2 hover:shadow-2xl hover:border-emerald-200 transition-all duration-300 group">
          <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 p-5 rounded-[2rem] group-hover:scale-110 transition-transform shadow-sm">
            <span className="text-6xl block">📸</span>
          </div>
          <div className="text-left">
            <h3 className="text-2xl font-black text-emerald-950 tracking-tight">{texts.scanTitle}</h3>
            <p className="text-emerald-700/80 text-sm mt-1 font-bold leading-tight">{texts.scanDesc}</p>
          </div>
        </button>
        
        <button onClick={() => setCurrentView('risk')} className="w-[95%] bg-white p-6 rounded-[2.5rem] shadow-lg border-2 border-emerald-50 flex items-center space-x-6 hover:-translate-y-2 hover:shadow-2xl hover:border-orange-200 transition-all duration-300 group">
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-5 rounded-[2rem] group-hover:scale-110 transition-transform shadow-sm">
            <span className="text-6xl block">⚠️</span>
          </div>
          <div className="text-left">
            <h3 className="text-2xl font-black text-emerald-950 tracking-tight">{texts.riskTitle}</h3>
            <p className="text-emerald-700/80 text-sm mt-1 font-bold leading-tight">{texts.riskDesc}</p>
          </div>
        </button>

        <button onClick={() => setCurrentView('chat')} className="w-[95%] bg-gradient-to-r from-emerald-600 to-teal-600 p-6 rounded-[2.5rem] shadow-xl border-4 border-emerald-100 flex items-center space-x-6 hover:-translate-y-2 hover:shadow-2xl hover:border-teal-300 transition-all duration-300 group">
          <div className="bg-white/20 p-5 rounded-[2rem] group-hover:scale-110 transition-transform shadow-sm backdrop-blur-sm">
            <span className="text-6xl block">🤖</span>
          </div>
          <div className="text-left">
            <h3 className="text-2xl font-black text-white tracking-tight drop-shadow-sm">{texts.chatTitle}</h3>
            <p className="text-emerald-50 text-sm mt-1 font-bold leading-tight">{texts.chatDesc}</p>
          </div>
        </button>
        
        <button onClick={() => setCurrentView('reports')} className="w-[95%] bg-white p-6 rounded-[2.5rem] shadow-lg border-2 border-emerald-50 flex items-center space-x-6 hover:-translate-y-2 hover:shadow-2xl hover:border-blue-200 transition-all duration-300 group">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-5 rounded-[2rem] group-hover:scale-110 transition-transform shadow-sm">
            <span className="text-6xl block">📊</span>
          </div>
          <div className="text-left">
            <h3 className="text-2xl font-black text-emerald-950 tracking-tight">{texts.reportsTitle}</h3>
            <p className="text-emerald-700/80 text-sm mt-1 font-bold leading-tight">{texts.reportsDesc}</p>
          </div>
        </button>

      </div>
    </div>
  );
}