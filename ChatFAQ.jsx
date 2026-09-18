import React, { useState } from 'react';

export default function ChatFAQ({ setCurrentView }) {
  const [activeTab, setActiveTab] = useState('chat'); 
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Namaskar! I am your AI Krishi Mitra. Ask me anything about farming, weather, or crop diseases.' }
  ]);
  const [loading, setLoading] = useState(false);

  // 🧠 THE HACKATHON "SMART MOCK" BRAIN
  const generateMockResponse = (input) => {
    const text = input.toLowerCase();
    if (text.includes('cotton') || text.includes('pink bollworm')) {
      return "For Pink Bollworm in cotton, it is highly recommended to install pheromone traps (5 per acre). If infestation crosses 10%, apply Profenofos 50 EC at 2ml/liter of water.";
    } else if (text.includes('fertilizer') || text.includes('soil')) {
      return "Based on standard Mahagri guidelines, ensure you do a soil test every 2 years. For basic NPK balance in this region, use Urea and DAP as base fertilizers before sowing.";
    } else if (text.includes('weather') || text.includes('rain')) {
      return "I can see the local weather data. High humidity is expected over the next 48 hours. Please delay any chemical spraying until the weather clears.";
    } else {
      return "That is a great question. Based on current MahaDBT agricultural guidelines, I recommend consulting your local Krishi Vigyan Kendra (KVK) for a physical inspection of this issue.";
    }
  };

  const handleSendMessage = () => {
    if (!chatInput.trim()) return;

    // 1. Instantly show the user's message
    const newMessages = [...messages, { sender: 'user', text: chatInput }];
    setMessages(newMessages);
    const currentInput = chatInput;
    setChatInput('');
    setLoading(true);

    // 2. Simulate an API network delay so it looks like a real LLM thinking
    setTimeout(() => {
      const botReply = generateMockResponse(currentInput);
      setMessages([...newMessages, { sender: 'bot', text: botReply }]);
      setLoading(false);
    }, 1500); // 1.5 second fake delay
  };

  const faqs = [
    { q: "How do I identify Pink Bollworm in Cotton?", a: "Look for rosette flowers and small boreholes in the bolls. The larvae inside will be pinkish." },
    { q: "What is the MahaDBT scheme?", a: "It is a direct benefit transfer scheme by the Maharashtra Govt providing subsidies for seeds, fertilizers, and farm equipment." },
    { q: "When should I spray Neem Oil?", a: "Spray neem oil early in the morning or late evening when the temperature is cooler to prevent leaf burn." }
  ];

  return (
    <div className="max-w-md mx-auto bg-white p-6 shadow-lg border border-gray-100 animate-fade-in flex flex-col h-[600px] rounded-none mt-4">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <button onClick={() => setCurrentView('home')} className="text-emerald-600 font-semibold text-sm hover:text-emerald-800 flex items-center rounded-none">← Back</button>
        <span className="bg-emerald-100 text-emerald-800 px-3 py-1 text-xs font-bold rounded-none">AI Powered</span>
      </div>

      <h2 className="text-2xl font-bold text-gray-900 mb-4">Krishi Mitra</h2>

      {/* Tabs */}
      <div className="flex space-x-2 bg-gray-100 p-1 mb-4 rounded-none">
        <button 
          onClick={() => setActiveTab('chat')} 
          className={`flex-1 py-2 text-sm font-bold transition-colors rounded-none ${activeTab === 'chat' ? 'bg-white shadow text-emerald-700' : 'text-gray-500'}`}
        >
          🤖 Ask AI
        </button>
        <button 
          onClick={() => setActiveTab('faq')} 
          className={`flex-1 py-2 text-sm font-bold transition-colors rounded-none ${activeTab === 'faq' ? 'bg-white shadow text-emerald-700' : 'text-gray-500'}`}
        >
          📚 FAQs
        </button>
      </div>

      {/* CHAT VIEW */}
      {activeTab === 'chat' && (
        <div className="flex flex-col flex-1 overflow-hidden">
          <div className="flex-1 overflow-y-auto bg-gray-50 p-4 border border-gray-200 mb-4 space-y-4 rounded-none">
            {messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`p-3 max-w-[80%] text-sm rounded-none ${msg.sender === 'user' ? 'bg-emerald-600 text-white' : 'bg-white border border-gray-200 text-gray-800 shadow-sm'}`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="p-3 bg-white border border-gray-200 text-gray-500 shadow-sm text-sm animate-pulse rounded-none">
                  Typing...
                </div>
              </div>
            )}
          </div>
          
          <div className="flex space-x-2">
            <input 
              type="text" 
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ask about your crops..." 
              className="flex-1 border border-gray-300 px-4 py-2 focus:outline-none focus:border-emerald-500 text-sm rounded-none"
            />
            <button 
              onClick={handleSendMessage}
              disabled={loading}
              className="bg-emerald-600 text-white px-4 py-2 font-bold hover:bg-emerald-700 disabled:opacity-50 rounded-none"
            >
              Send
            </button>
          </div>
        </div>
      )}

      {/* FAQ VIEW */}
      {activeTab === 'faq' && (
        <div className="flex-1 overflow-y-auto space-y-3">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-emerald-50 p-4 border border-emerald-100 rounded-none">
              <h3 className="font-bold text-emerald-900 text-sm mb-2">Q: {faq.q}</h3>
              <p className="text-gray-700 text-sm">A: {faq.a}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}