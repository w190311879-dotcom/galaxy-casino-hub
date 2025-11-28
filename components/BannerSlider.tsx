import React from 'react';
import { Banner } from '../types';

interface BannerSliderProps {
  banners: Banner[];
}

const BannerSlider: React.FC<BannerSliderProps> = ({ banners }) => {
  return (
    <div className="w-full overflow-x-auto no-scrollbar py-4">
      <div className="flex space-x-3 px-4">
        {banners.map((banner) => (
          <div 
            key={banner.id} 
            className="relative flex-none w-[92%] sm:w-[340px] h-48 rounded-2xl overflow-hidden shadow-2xl group cursor-pointer"
          >
            {/* Image */}
            <img 
              src={banner.imageUrl} 
              alt={banner.title} 
              className="w-full h-full object-cover"
            />
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-violet-900/90 via-transparent to-transparent"></div>

            {/* Content */}
            <div className="absolute inset-0 flex flex-col justify-center px-6">
              <div className="bg-white/10 backdrop-blur-sm self-start px-2 py-0.5 rounded text-[10px] font-bold text-white mb-2 border border-white/20">
                HOT EVENT
              </div>
              <h3 className="text-white text-3xl font-black italic tracking-tighter uppercase drop-shadow-lg max-w-[70%] leading-none">
                {banner.title}
              </h3>
              <p className="text-violet-200 text-sm font-medium mt-1">{banner.subtitle}</p>
              
              <div className="mt-4 flex items-center space-x-2">
                 <div className="h-2 w-2 bg-yellow-400 rounded-full animate-pulse"></div>
                 <span className="text-[10px] text-yellow-400 font-bold uppercase">Live Now</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BannerSlider;