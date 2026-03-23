import { useEffect } from 'react';
import svgPaths from "../../imports/svg-cg0a0dhra7";
import IPhone1415ProMax4 from "../../imports/IPhone1415ProMax4";

interface GamesVideoOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export function GamesVideoOverlay({ isOpen, onClose }: GamesVideoOverlayProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 animate-fade-in">
      <div className="relative w-[430px] h-[932px] bg-[#e4e4e4]">
        {/* Video Background */}
        <IPhone1415ProMax4 />

        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute right-[36px] top-[35px] w-[48px] h-[48px] cursor-pointer hover:opacity-80 transition-opacity z-10"
          aria-label="Close video"
        >
          <div className="absolute inset-[-1.04%_-7.29%_-17.71%_-11.46%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 56.9991 56.9991">
              <g filter="url(#filter0_d_11_55)">
                <path d={svgPaths.p3cbc8080} fill="var(--fill-0, #FF9E9F)" fillOpacity="0.2" shapeRendering="crispEdges" />
              </g>
              <defs>
                <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="56.9991" id="filter0_d_11_55" width="56.9991" x="2.21888e-07" y="-2.2701e-09">
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                  <feOffset dx="-1" dy="4" />
                  <feGaussianBlur stdDeviation="2.25" />
                  <feComposite in2="hardAlpha" operator="out" />
                  <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0" />
                  <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_11_55" />
                  <feBlend in="SourceGraphic" in2="effect1_dropShadow_11_55" mode="normal" result="shape" />
                </filter>
              </defs>
            </svg>
          </div>
        </button>
      </div>
    </div>
  );
}
