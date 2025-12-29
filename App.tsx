
import React, { useState, useEffect, useMemo } from 'react';
import FloatingBalloons from './components/FloatingBalloons';
import BirthdayCake from './components/BirthdayCake';
import WishGenerator from './components/WishGenerator';
import Confetti from './components/Confetti';
import PhoneFrame from './components/PhoneFrame';
import PhotoGallery from './components/PhotoGallery';
import BirthdayMusic from './components/BirthdayMusic';
import { Gift, Heart, Stars, Sparkles } from 'lucide-react';
import { MediaItem } from './types';

const App: React.FC = () => {
  const [confettiTrigger, setConfettiTrigger] = useState(0);
  const [isRevealed, setIsRevealed] = useState(false);
  
  // Initializing with the content provided in the prompt
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([
    { 
      url: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80', 
      type: 'image' 
    }, // Representing the field photo
    { 
      url: 'https://images.unsplash.com/photo-1523050335102-c32c75130629?auto=format&fit=crop&q=80', 
      type: 'image' 
    }, // Representing the college/podium context
    { 
      url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80', 
      type: 'image' 
    }, // Representing the landscape building
    { 
      url: 'https://assets.mixkit.co/videos/preview/mixkit-girl-in-red-dress-walking-in-a-park-1175-large.mp4', 
      type: 'video' 
    } // Representing the student video
  ]);

  const handleBlowCake = () => {
    setConfettiTrigger(prev => prev + 1);
  };

  useEffect(() => {
    // Initial celebration
    const timer = setTimeout(() => setConfettiTrigger(1), 500);
    return () => clearTimeout(timer);
  }, []);

  const firstMedia = useMemo(() => {
    return mediaItems[0];
  }, [mediaItems]);

  return (
    <div className="min-h-screen relative overflow-x-hidden pb-20 bg-gradient-to-b from-pink-50 to-white">
      <FloatingBalloons />
      <Confetti trigger={confettiTrigger} />
      <BirthdayMusic />

      {/* Header Section */}
      <header className="relative z-10 pt-16 px-4 text-center">
        <div className="inline-block relative">
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 flex gap-2">
             <Sparkles className="text-yellow-400 animate-bounce" />
             <Sparkles className="text-pink-400 animate-pulse delay-75" />
          </div>
          <h1 className="text-5xl md:text-8xl font-cursive text-pink-600 mb-2 drop-shadow-lg">
            Khushi's Big Day
          </h1>
          <div className="absolute -top-6 -right-6 text-yellow-400 animate-pulse hidden md:block">
            <Stars size={48} />
          </div>
        </div>
        <p className="text-xl md:text-2xl text-purple-500 font-medium max-w-lg mx-auto leading-relaxed px-4">
          This world becomes a lot brighter... Wishing you the best for upcoming endeavours. ✨️
        </p>
      </header>

      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-4 mt-12 space-y-24">
        
        {/* Interactive Centerpiece */}
        <section className="flex flex-col items-center justify-center gap-12 lg:flex-row lg:items-start lg:gap-24">
          <div className="flex flex-col items-center">
            <div className="max-w-md w-full bg-white/60 backdrop-blur-md rounded-[3rem] p-10 shadow-2xl border border-white/80 hover:scale-[1.02] transition-transform duration-500">
              <BirthdayCake 
                onBlow={handleBlowCake} 
                imageUrl={firstMedia?.type === 'image' ? firstMedia.url : undefined} 
                videoUrl={firstMedia?.type === 'video' ? firstMedia.url : undefined}
              />
            </div>
            <div className="mt-8 text-center max-w-xs">
               <p className="text-pink-500 font-cursive text-2xl">
                 Look at that beautiful smile! 🎂
               </p>
            </div>
          </div>

          {/* Photo Phone Section */}
          <div className="space-y-6">
            <div className="text-center mb-4">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center justify-center gap-2">
                <Heart className="text-pink-500 fill-pink-500" size={24} />
                Memory Gallery
              </h2>
              <p className="text-sm text-gray-500 px-4">These beautiful moments are attached to your wish</p>
            </div>
            <PhoneFrame>
              <PhotoGallery mediaItems={mediaItems} setMediaItems={setMediaItems} />
            </PhoneFrame>
          </div>
        </section>

        {/* Wish Generator */}
        <section id="wishes" className="max-w-4xl mx-auto">
          <WishGenerator />
        </section>

        {/* Surprise Section */}
        <section className="text-center pb-12">
          {!isRevealed ? (
            <div className="relative inline-block">
              <div className="absolute -inset-4 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full blur opacity-30 animate-pulse"></div>
              <button
                onClick={() => {
                  setIsRevealed(true);
                  setConfettiTrigger(prev => prev + 1);
                }}
                className="relative bg-white hover:bg-pink-50 text-pink-600 border-2 border-pink-200 px-12 py-6 rounded-full text-2xl font-bold shadow-xl hover:scale-105 transition-all flex items-center gap-4 mx-auto"
              >
                <Gift size={32} className="animate-bounce" />
                Tap for a Surprise
              </button>
            </div>
          ) : (
            <div className="bg-gradient-to-br from-white to-pink-50 border border-pink-100 p-8 md:p-12 rounded-[3rem] shadow-2xl max-w-4xl mx-auto animate-in zoom-in duration-700 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 text-pink-100 transform translate-x-10 -translate-y-10">
                <Heart size={200} fill="currentColor" />
              </div>
              
              <h3 className="text-3xl md:text-5xl font-bold mb-6 text-gray-800 relative">
                To The Dearest <span className="text-pink-600 italic">*KHUSHI*</span>
              </h3>
              
              <div className="relative z-10 mb-8">
                <p className="text-3xl md:text-5xl font-extrabold text-pink-500 mb-8 animate-pulse leading-tight drop-shadow-sm">
                  HAPPY BIRTHDAY TO YOU🥳💫🎊
                </p>
                
                {/* Attached Media Display inside the card */}
                <div className="flex justify-center gap-4 mb-10 overflow-x-auto pb-4 scrollbar-hide px-4">
                  {mediaItems.map((item, i) => (
                    <div key={i} className="flex-shrink-0 w-32 h-32 md:w-48 md:h-48 rounded-2xl overflow-hidden shadow-xl border-4 border-white transform rotate-[-3deg] even:rotate-[3deg] hover:rotate-0 hover:scale-105 transition-all duration-300">
                      {item.type === 'video' ? (
                        <video src={item.url} autoPlay muted loop playsInline className="w-full h-full object-cover" />
                      ) : (
                        <img src={item.url} className="w-full h-full object-cover" alt="Memory" />
                      )}
                    </div>
                  ))}
                </div>
                
                <div className="text-xl md:text-3xl leading-relaxed text-gray-700 font-cursive space-y-8 px-4">
                  <p className="bg-white/50 backdrop-blur-sm p-6 rounded-3xl inline-block shadow-sm border border-white/50">
                    This world becomes a lot brighter... <br/>
                    Wishing you the best for upcoming endeavours. ✨️
                  </p>
                  <p className="text-purple-600 font-bold block text-2xl md:text-4xl drop-shadow-sm">
                    Always be joyous, conscious and surrounded with your loved ones. 🥰💖
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative mt-12">
                <div className="bg-white/80 p-6 rounded-2xl shadow-sm border border-pink-50 hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center text-pink-500 mb-4 mx-auto">
                    <Heart fill="currentColor" size={24} />
                  </div>
                  <h4 className="font-bold text-gray-700">Infinite Love</h4>
                  <p className="text-xs text-gray-400 mt-1">Boundless and pure</p>
                </div>
                <div className="bg-white/80 p-6 rounded-2xl shadow-sm border border-pink-50 hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-purple-500 mb-4 mx-auto">
                    <Stars size={24} />
                  </div>
                  <h4 className="font-bold text-gray-700">Star Bright</h4>
                  <p className="text-xs text-gray-400 mt-1">Shining your own path</p>
                </div>
                <div className="bg-white/80 p-6 rounded-2xl shadow-sm border border-pink-50 hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-600 mb-4 mx-auto">
                    <Sparkles size={24} />
                  </div>
                  <h4 className="font-bold text-gray-700">Joy Always</h4>
                  <p className="text-xs text-gray-400 mt-1">Every single day</p>
                </div>
              </div>
            </div>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="relative z-10 text-center py-16">
        <div className="w-16 h-1 bg-pink-100 mx-auto mb-6 rounded-full"></div>
        <p className="flex items-center justify-center gap-2 text-pink-400 font-medium text-sm tracking-wide">
          CRAFTED WITH <Heart size={14} fill="currentColor" /> EXCLUSIVELY FOR KHUSHI
        </p>
      </footer>
    </div>
  );
};

export default App;
