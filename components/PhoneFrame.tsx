
import React from 'react';

interface PhoneFrameProps {
  children: React.ReactNode;
}

const PhoneFrame: React.FC<PhoneFrameProps> = ({ children }) => {
  return (
    <div className="relative mx-auto border-gray-800 bg-gray-800 border-[14px] rounded-[2.5rem] h-[600px] w-[300px] shadow-2xl overflow-hidden">
      {/* Top Speaker / Notch Area */}
      <div className="h-[32px] w-[3px] bg-gray-800 absolute -left-[17px] top-[72px] rounded-l-lg"></div>
      <div className="h-[46px] w-[3px] bg-gray-800 absolute -left-[17px] top-[124px] rounded-l-lg"></div>
      <div className="h-[46px] w-[3px] bg-gray-800 absolute -left-[17px] top-[178px] rounded-l-lg"></div>
      <div className="h-[64px] w-[3px] bg-gray-800 absolute -right-[17px] top-[142px] rounded-r-lg"></div>

      {/* Screen Content */}
      <div className="rounded-[2rem] overflow-hidden w-full h-full bg-white relative flex flex-col">
        {/* Dynamic Island style notch */}
        <div className="absolute top-0 inset-x-0 h-8 flex justify-center items-start pt-2 z-50 pointer-events-none">
          <div className="w-20 h-5 bg-black rounded-full shadow-inner"></div>
        </div>
        
        <div className="flex-1 overflow-y-auto pt-10 px-2 scrollbar-hide">
          {children}
        </div>
      </div>
    </div>
  );
};

export default PhoneFrame;
