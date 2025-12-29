
import React, { useState } from 'react';
import { WISH_VIBES } from '../constants';
import { generateBirthdayWish } from '../services/geminiService';
import { Sparkles, Loader2, Send } from 'lucide-react';

const WishGenerator: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [wish, setWish] = useState<string>("");
  const [selectedVibe, setSelectedVibe] = useState(WISH_VIBES[0].id);

  const handleGenerate = async () => {
    setLoading(true);
    const vibe = WISH_VIBES.find(v => v.id === selectedVibe);
    if (vibe) {
      const result = await generateBirthdayWish(vibe.prompt);
      setWish(result);
    }
    setLoading(false);
  };

  return (
    <div className="bg-white/80 backdrop-blur-md rounded-3xl p-6 shadow-xl border border-pink-100 w-full max-w-2xl mx-auto">
      <div className="flex items-center gap-2 mb-6">
        <Sparkles className="text-pink-500" />
        <h2 className="text-xl font-bold text-gray-800">Wish for Khushi</h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {WISH_VIBES.map((v) => (
          <button
            key={v.id}
            onClick={() => setSelectedVibe(v.id)}
            className={`p-3 rounded-xl text-sm flex flex-col items-center gap-1 transition-all ${
              selectedVibe === v.id
                ? 'bg-pink-500 text-white shadow-lg scale-105'
                : 'bg-pink-50 text-gray-600 hover:bg-pink-100'
            }`}
          >
            <span className="text-2xl">{v.emoji}</span>
            <span>{v.name}</span>
          </button>
        ))}
      </div>

      <button
        onClick={handleGenerate}
        disabled={loading}
        className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-50 flex items-center justify-center gap-2"
      >
        {loading ? <Loader2 className="animate-spin" /> : <Send size={18} />}
        {loading ? 'Thinking...' : 'Generate New Wish'}
      </button>

      {wish && (
        <div className="mt-6 p-5 bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl border-l-4 border-pink-500 animate-in fade-in duration-500">
          <p className="text-lg text-gray-700 italic font-cursive leading-relaxed">
            "{wish}"
          </p>
        </div>
      )}
    </div>
  );
};

export default WishGenerator;
