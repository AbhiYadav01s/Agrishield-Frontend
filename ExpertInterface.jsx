import React from 'react';

export default function ExpertInterface() {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 border border-gray-100">
      <div className="mb-8">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">AI Validation Queue</h2>
        <p className="text-gray-500 mt-1">Human-in-the-loop retraining protocol</p>
      </div>
      <div className="overflow-hidden rounded-xl border border-gray-200 shadow-sm">
        <table className="min-w-full bg-white text-left">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="py-3 px-6 font-bold text-xs text-gray-500 uppercase tracking-wider">Scan Origin</th>
              <th className="py-3 px-6 font-bold text-xs text-gray-500 uppercase tracking-wider">AI Prediction</th>
              <th className="py-3 px-6 font-bold text-xs text-gray-500 uppercase tracking-wider">Treatment Rule (PoP)</th>
              <th className="py-3 px-6 font-bold text-xs text-gray-500 uppercase tracking-wider text-right">Expert Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            <tr className="hover:bg-gray-50 transition-colors">
              <td className="py-4 px-6 text-sm font-semibold text-gray-800">IMG-9932<br/><span className="text-xs font-normal text-gray-400">Cotton • Yavatmal</span></td>
              <td className="py-4 px-6 text-sm"><span className="bg-red-100 text-red-700 font-bold px-2 py-1 rounded-md">Pink Bollworm (88%)</span></td>
              <td className="py-4 px-6 text-sm text-gray-600 font-medium">CIBRC: Profenofos 50 EC</td>
              <td className="py-4 px-6 text-right space-x-2">
                <button className="bg-white border-2 border-emerald-500 text-emerald-600 px-4 py-2 rounded-lg text-xs font-bold hover:bg-emerald-50 transition-colors">Approve</button>
                <button className="bg-white border-2 border-red-500 text-red-600 px-4 py-2 rounded-lg text-xs font-bold hover:bg-red-50 transition-colors">Override</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}