
import React, { useRef } from 'react';
import { Camera, Plus, Trash2, Video } from 'lucide-react';
import { MediaItem } from '../types';

interface PhotoGalleryProps {
  mediaItems: MediaItem[];
  setMediaItems: React.Dispatch<React.SetStateAction<MediaItem[]>>;
}

const PhotoGallery: React.FC<PhotoGalleryProps> = ({ mediaItems, setMediaItems }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        const fileType = file.type.startsWith('video/') ? 'video' : 'image';
        
        reader.onloadend = () => {
          setMediaItems((prev) => [
            { url: reader.result as string, type: fileType },
            ...prev
          ]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeMedia = (index: number) => {
    setMediaItems((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4 pb-8">
      <div className="flex justify-between items-center px-2">
        <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
          <Camera size={18} className="text-pink-500" />
          Memories
        </h3>
        <button 
          onClick={() => fileInputRef.current?.click()}
          className="p-2 bg-pink-100 text-pink-600 rounded-full hover:bg-pink-200 transition-colors"
        >
          <Plus size={20} />
        </button>
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleFileChange} 
          multiple 
          accept="image/*,video/*" 
          className="hidden" 
        />
      </div>

      {mediaItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 text-gray-400 border-2 border-dashed border-gray-200 rounded-2xl mx-2 bg-pink-50/50">
          <div className="flex gap-2">
            <Camera size={32} strokeWidth={1} />
            <Video size={32} strokeWidth={1} />
          </div>
          <p className="mt-2 text-sm text-center px-4">Add photos or videos! The first one will appear on Khushi's cake!</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-2 px-1">
          {mediaItems.map((item, index) => (
            <div key={index} className={`group relative aspect-square rounded-xl overflow-hidden shadow-sm border ${index === 0 ? 'border-pink-500 ring-2 ring-pink-200' : 'border-pink-50'}`}>
              {item.type === 'video' ? (
                <video src={item.url} className="w-full h-full object-cover" muted loop autoPlay playsInline />
              ) : (
                <img src={item.url} alt={`Memory ${index}`} className="w-full h-full object-cover" />
              )}
              
              {index === 0 && (
                <div className="absolute top-1 left-1 bg-pink-500 text-white text-[8px] font-bold px-1 rounded uppercase z-20">
                  On Cake
                </div>
              )}
              
              {item.type === 'video' && (
                <div className="absolute bottom-1 right-1 bg-black/40 text-white p-0.5 rounded z-20">
                  <Video size={10} />
                </div>
              )}

              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  removeMedia(index);
                }}
                className="absolute top-1 right-1 p-1 bg-red-500/80 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-20"
              >
                <Trash2 size={12} />
              </button>
            </div>
          ))}
        </div>
      )}
      
      <div className="bg-pink-50 p-4 rounded-xl mx-2">
        <p className="text-[10px] text-pink-400 uppercase tracking-widest text-center font-bold">
          Captured with Love
        </p>
      </div>
    </div>
  );
};

export default PhotoGallery;
