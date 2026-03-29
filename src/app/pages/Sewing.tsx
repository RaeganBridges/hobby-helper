import { useState, useEffect, useRef } from "react";
import svgPaths from "../../imports/svg-b9ct596ajp";
import { motion } from 'motion/react';

const SEWING_FLOOD_LOGO = '/images/flood/01-logo.png';
const SEWING_FLOOD_SECOND = '/images/flood/03-sewing.png';
const SEWING_FLOOD_BLEND_MS = (55 / 60) * 1000;

/** Filled-style check with round caps; uses sewingCheckDeboss (rotated shadow), not play triangles. */
function SewingPlayedCheck() {
  return (
    <div className="absolute flex inset-0 items-center justify-center">
      <div className="relative size-[108px]">
        <div className="absolute bottom-1/4 left-[14%] right-[14%] top-[10%]">
          <svg
            className="pointer-events-none block size-full overflow-visible"
            fill="none"
            viewBox="-3 -3 62 58"
            overflow="visible"
            aria-hidden
          >
            <g filter="url(#sewingCheckDeboss)">
              <g transform="translate(28 26) scale(1.52) translate(-28 -26)">
                <path
                  d="M 11.5 28.5 L 23 40 L 45 11"
                  fill="none"
                  stroke="#e8c547"
                  strokeWidth={11}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}

export default function Sewing() {
  const [playedWeeks, setPlayedWeeks] = useState<Set<number>>(new Set());
  const [floodOpen, setFloodOpen] = useState(false);
  const [floodBaseSrc, setFloodBaseSrc] = useState(SEWING_FLOOD_LOGO);
  const [floodOverlayIn, setFloodOverlayIn] = useState(false);
  const floodRunningRef = useRef(false);

  // Load played weeks from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('sewing-played-weeks-v4');
    if (saved) {
      setPlayedWeeks(new Set(JSON.parse(saved)));
    }
  }, []);

  useEffect(() => {
    if (!floodOpen) return;

    setFloodBaseSrc(SEWING_FLOOD_LOGO);
    setFloodOverlayIn(false);

    const FPS = 60;
    const firstHold = (60 / FPS) * 1000;
    const endHold = (20 / FPS) * 1000;

    const t1 = window.setTimeout(() => setFloodOverlayIn(true), firstHold);
    const t2 = window.setTimeout(() => {
      setFloodBaseSrc(SEWING_FLOOD_SECOND);
      setFloodOverlayIn(false);
    }, firstHold + SEWING_FLOOD_BLEND_MS + 80);
    const t3 = window.setTimeout(() => {
      setFloodOpen(false);
      setFloodBaseSrc(SEWING_FLOOD_LOGO);
      floodRunningRef.current = false;
    }, firstHold + SEWING_FLOOD_BLEND_MS + 80 + endHold);

    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearTimeout(t3);
    };
  }, [floodOpen]);

  const handleTitleFloodClick = () => {
    if (floodRunningRef.current) return;
    floodRunningRef.current = true;
    try {
      localStorage.removeItem('sewing-played-weeks-v4');
      localStorage.removeItem('sewing-played-weeks-v3');
    } catch {
      /* ignore */
    }
    setPlayedWeeks(new Set());
    const reduceMotion =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) {
      floodRunningRef.current = false;
      return;
    }
    setFloodOpen(true);
  };

  const handlePlayClick = (weekNumber: number) => {
    const newPlayedWeeks = new Set(playedWeeks).add(weekNumber);
    setPlayedWeeks(newPlayedWeeks);
    localStorage.setItem('sewing-played-weeks-v4', JSON.stringify(Array.from(newPlayedWeeks)));
    window.location.assign(`/sewing-video.html?week=${encodeURIComponent(String(weekNumber))}`);
  };

  const renderButton = (weekNumber: number, buttonStyles: string, rotationStyles?: string) => {
    const isPlayed = playedWeeks.has(weekNumber);
    
    const buttonContent = (
      <button 
        className={`relative block cursor-pointer overflow-visible rounded-full bg-transparent ${buttonStyles}`}
        onClick={() => handlePlayClick(weekNumber)}
      >
        {isPlayed ? (
          <SewingPlayedCheck />
        ) : (
          <div className="absolute flex inset-0 items-center justify-center">
            <div className="relative size-[108px]">
              <div className="absolute bottom-1/4 left-[14%] right-[14%] top-[10%]">
                <svg className="pointer-events-none block size-full overflow-visible" fill="none" preserveAspectRatio="none" viewBox="0 0 57.5931 52" overflow="visible">
                  <g transform="rotate(90 28.79655 26)" filter="url(#sewingPlayDeboss)">
                    <path d={svgPaths.p19083cc0} fill="var(--fill-0, #e8c547)" />
                  </g>
                </svg>
              </div>
            </div>
          </div>
        )}
      </button>
    );

    if (rotationStyles) {
      return (
        <div className={rotationStyles}>
          {buttonContent}
        </div>
      );
    }
    
    return buttonContent;
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="bg-white relative w-full h-full min-h-0"
      >
        <div className="relative w-full max-w-[430px] mx-auto h-full min-h-[932px] overflow-hidden">
          <svg className="pointer-events-none absolute h-0 w-0 overflow-hidden" aria-hidden>
            <defs>
              <filter id="sewingPlayDeboss" x="-100%" y="-100%" width="300%" height="300%" colorInterpolationFilters="sRGB">
                <feGaussianBlur in="SourceAlpha" stdDeviation="2.35" result="blur" />
                <feOffset in="blur" dx="7.7" dy="5.6" result="offsetBlur" />
                <feComposite in="SourceAlpha" in2="offsetBlur" operator="out" result="inverse" />
                <feFlood floodColor="#5e4d26" floodOpacity="0.30" result="shadowColor" />
                <feComposite in="shadowColor" in2="inverse" operator="in" result="innerShadow" />
                <feMerge>
                  <feMergeNode in="SourceGraphic" />
                  <feMergeNode in="innerShadow" />
                </feMerge>
              </filter>
              <filter id="sewingCheckDeboss" x="-100%" y="-100%" width="300%" height="300%" colorInterpolationFilters="sRGB">
                <feGaussianBlur in="SourceAlpha" stdDeviation="2.35" result="blur" />
                {/* Checks only: offset (7.7,5.6) rotated −270° */}
                <feOffset in="blur" dx="-5.6" dy="7.7" result="offsetBlur" />
                <feComposite in="SourceAlpha" in2="offsetBlur" operator="out" result="inverse" />
                <feFlood floodColor="#5e4d26" floodOpacity="0.30" result="shadowColor" />
                <feComposite in="shadowColor" in2="inverse" operator="in" result="innerShadow" />
                <feMerge>
                  <feMergeNode in="SourceGraphic" />
                  <feMergeNode in="innerShadow" />
                </feMerge>
              </filter>
            </defs>
          </svg>
          <div className="absolute inset-0 bg-[#ffefbc] opacity-35">
            <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_0px_35px_-10px_rgba(0,0,0,0.1)]" />
          </div>
          <div className="absolute bg-[#ffdc69] h-[177px] left-0 top-0 w-full rounded-t-none rounded-b-[55px]">
            <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_5px_15px_10px_rgba(0,0,0,0.1)]" />
          </div>
          <div className="absolute bg-[#f9db79] h-[42px] left-[43px] rounded-[25px] top-[852px] w-[344px]" />
          
          
          {/* Background cards */}
          <div className="absolute left-[-37.93px] top-[229.38px]">
            <div className="absolute flex h-[127.237px] items-center justify-center left-0 top-0 w-[327.851px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "0" } as React.CSSProperties}>
              <div className="-rotate-2 flex-none">
                <div className="bg-[#e8a719] h-[116px] rounded-[25px] w-[324px]" style={{ boxShadow: '-5px 5px 3px rgba(0, 0, 0, 0.23), -2px 2px 2px rgba(0, 0, 0, 0.14)' }} />
              </div>
            </div>
            <div className="absolute flex h-[127.237px] items-center justify-center left-0 top-[296px] w-[327.851px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "0" } as React.CSSProperties}>
              <div className="flex-none rotate-2">
                <div className="bg-[#e8a719] h-[116px] rounded-[25px] w-[324px]" style={{ boxShadow: '-5px 5px 3px rgba(0, 0, 0, 0.23), -2px 2px 2px rgba(0, 0, 0, 0.14)' }} />
              </div>
            </div>
            <div className="absolute flex h-[127.237px] items-center justify-center left-0 top-[444px] w-[327.851px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "0" } as React.CSSProperties}>
              <div className="-rotate-2 flex-none">
                <div className="bg-[#e8a719] h-[116px] rounded-[25px] w-[324px]" style={{ boxShadow: '-5px 5px 3px rgba(0, 0, 0, 0.23), -2px 2px 2px rgba(0, 0, 0, 0.14)' }} />
              </div>
            </div>
            <div className="absolute bg-[#e8a719] h-[116px] left-[1.93px] rounded-[25px] top-[154px] w-[324px]" style={{ boxShadow: '-5px 5px 3px rgba(0, 0, 0, 0.23), -2px 2px 2px rgba(0, 0, 0, 0.14)' }} />
          </div>
          
          {/* Right side cards */}
          <div className="pointer-events-none absolute left-[313px] top-[235px]">
            <div className="absolute bg-[#f9de87] h-[116px] left-0 rounded-[25px] top-0 w-[261px]" />
            <div className="absolute bg-[#f9de87] h-[116px] left-0 rounded-[25px] top-[148px] w-[261px]" />
            <div className="absolute bg-[#f9de87] h-[116px] left-0 rounded-[25px] top-[296px] w-[261px]" />
            <div className="absolute bg-[#f9de87] h-[116px] left-0 rounded-[25px] top-[444px] w-[261px]" />
          </div>
          
          {/* Title */}
          <button
            type="button"
            onClick={handleTitleFloodClick}
            className="absolute font-icebox-magnet leading-[normal] left-1/2 -translate-x-1/2 not-italic text-[#8f6922] text-[72px] top-[70px] whitespace-nowrap text-center cursor-pointer appearance-none bg-transparent border-0 p-0 m-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current"
            aria-label="Replay intro and reset week progress for sewing"
          >
            SEWING
          </button>
          
          {/* Week One */}
          <div className="absolute flex h-[42.374px] items-center justify-center left-[18.39px] top-[247px] w-[127.249px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "19" } as React.CSSProperties}>
            <div className="-rotate-2 flex-none">
              <p className="font-icebox-magnet leading-[normal] not-italic relative text-[#fff9e8] text-[32px] whitespace-nowrap">WEEK ONE</p>
            </div>
          </div>
          <div className="absolute flex h-[54.522px] items-center justify-center left-[19.87px] top-[283.17px] w-[246.456px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "19" } as React.CSSProperties}>
            <div className="-rotate-2 flex-none">
              <p className="font-hobby-text font-normal leading-[normal] relative text-[#fff9e8] text-[20px] w-[245px]" style={{ fontVariationSettings: "'wdth' 100" }}>
                Find pattern, fabric, and pin them together.
              </p>
            </div>
          </div>
          
          {/* Week Two */}
          <p className="absolute font-icebox-magnet leading-[normal] left-[19px] not-italic text-[#fff9e8] text-[32px] top-[396px] whitespace-nowrap">WEEK TWO</p>
          <p className="absolute font-hobby-text font-normal leading-[normal] left-[20px] text-[#fff9e8] text-[20px] top-[435px] w-[245px]" style={{ fontVariationSettings: "'wdth' 100" }}>
            Cut out the pattern, pin pieces, and start sewing.
          </p>
          
          {/* Week Three */}
          <div className="absolute flex h-[43.351px] items-center justify-center left-[18.4px] top-[540.5px] w-[155.232px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "19" } as React.CSSProperties}>
            <div className="flex-none rotate-2">
              <p className="font-icebox-magnet leading-[normal] not-italic relative text-[#fff9e8] text-[32px] whitespace-nowrap">WEEK THREE</p>
            </div>
          </div>
          <div className="absolute flex h-[54.662px] items-center justify-center left-[19.31px] top-[578.67px] w-[250.454px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "19" } as React.CSSProperties}>
            <div className="flex-none rotate-2">
              <p className="font-hobby-text font-normal leading-[normal] relative text-[#fff9e8] text-[20px] w-[249px]" style={{ fontVariationSettings: "'wdth' 100" }}>
                Continue sewing the pieces together.
              </p>
            </div>
          </div>
          
          {/* Week Four */}
          <div className="absolute flex h-[42.933px] items-center justify-center left-[18.39px] top-[689.3px] w-[143.24px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "19" } as React.CSSProperties}>
            <div className="-rotate-2 flex-none">
              <p className="font-icebox-magnet leading-[normal] not-italic relative text-[#fff9e8] text-[32px] whitespace-nowrap">WEEK FOUR</p>
            </div>
          </div>
          <div className="absolute flex h-[54.697px] items-center justify-center left-[18.24px] top-[725.65px] w-[251.453px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "19" } as React.CSSProperties}>
            <div className="-rotate-2 flex-none">
              <p className="font-hobby-text font-normal leading-[normal] relative text-[#fff9e8] text-[20px] w-[250px]" style={{ fontVariationSettings: "'wdth' 100" }}>
                Finish sewing the dress and clean it up.
              </p>
            </div>
          </div>
          
          {/* Play buttons */}
          {renderButton(1, "absolute left-[319px] size-[108px] top-[239px]")}
          
          <div className="absolute flex size-[120px] items-center justify-center left-[313px] top-[677px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "19" } as React.CSSProperties}>
            {renderButton(4, "relative size-[108px]", "-rotate-6 flex-none")}
          </div>
          
          {renderButton(3, "absolute left-[319px] size-[108px] top-[535px]")}
          
          <div className="absolute flex size-[120px] items-center justify-center left-[313px] top-[381px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "19" } as React.CSSProperties}>
            {renderButton(2, "relative size-[108px]", "flex-none rotate-5")}
          </div>

          {/* Bottom Navigation */}
          <div className="absolute left-[43px] top-[852px]">
            <div className="absolute bg-[#edc33a] h-[42px] left-0 rounded-[25px] top-0 w-[57px]">
              <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_0px_7px_0px_rgba(0,0,0,0.25)]" />
            </div>
            <p className="absolute font-icebox-bold font-semibold leading-[normal] left-[25px] not-italic text-[#6e4d11] text-[24px] top-[6px] whitespace-nowrap">1</p>
          </div>

          <button type="button" onClick={() => { window.location.assign('/car-repair.html'); }} className="absolute left-[100px] top-[852px] cursor-pointer hover:opacity-80 transition-opacity">
            <div className="absolute bg-[#ffdc69] h-[42px] left-0 rounded-[25px] top-0 w-[57px]" />
            <p className="absolute font-icebox-magnet leading-[normal] left-[22px] not-italic text-[#8f6922] text-[24px] top-[6px] whitespace-nowrap">2</p>
          </button>

          <button type="button" onClick={() => { window.location.assign('hobbies.html'); }} className="absolute left-[157px] top-[852px] cursor-pointer hover:opacity-80">
            <div className="absolute bg-[#ffdc69] h-[42px] left-0 rounded-[25px] top-0 w-[116px]" />
            <p className="absolute font-icebox-magnet leading-[normal] left-[17px] not-italic text-[#8f6922] text-[24px] top-[6px] whitespace-nowrap">Hobbies</p>
          </button>

          <button type="button" onClick={() => { window.location.assign('/games.html'); }} className="absolute left-[273px] top-[852px] cursor-pointer hover:opacity-80 transition-opacity">
            <div className="absolute bg-[#ffdc69] h-[42px] left-0 rounded-[25px] top-0 w-[57px]" />
            <p className="absolute font-icebox-magnet leading-[normal] left-[22px] not-italic text-[#8f6922] text-[24px] top-[6px] whitespace-nowrap">3</p>
          </button>

          <button type="button" onClick={() => { window.location.assign('/reading.html'); }} className="absolute left-[330px] top-[852px] cursor-pointer hover:opacity-80 transition-opacity">
            <div className="absolute bg-[#ffdc69] h-[42px] left-0 rounded-[25px] top-0 w-[57px]" />
            <p className="absolute font-icebox-magnet leading-[normal] left-[22px] not-italic text-[#8f6922] text-[24px] top-[6px] whitespace-nowrap">4</p>
          </button>
        </div>
      </motion.div>

      {floodOpen ? (
        <div
          className="fixed inset-0 z-[99999] box-border flex items-center justify-center bg-[#e8bdd0] pt-[env(safe-area-inset-top,0px)] pr-[env(safe-area-inset-right,0px)] pb-[env(safe-area-inset-bottom,0px)] pl-[env(safe-area-inset-left,0px)] md:bg-gradient-to-b md:from-[#f5d8e8] md:to-[#deb6ce] md:p-6"
          aria-hidden
        >
          <div className="flex h-[min(100dvh,932px)] w-full max-w-[430px] flex-col overflow-hidden bg-[#d6648b] md:h-[min(932px,calc(100dvh-3rem))] md:rounded-[2.75rem] md:shadow-[0_25px_80px_-20px_rgba(0,0,0,0.35),0_0_0_1px_rgba(0,0,0,0.1)]">
            <div className="relative min-h-0 w-full flex-1 bg-[#d6648b]">
              <img
                src={floodBaseSrc}
                className="pointer-events-none absolute inset-0 z-[1] size-full object-cover select-none"
                alt=""
              />
              <img
                src={SEWING_FLOOD_SECOND}
                className={`pointer-events-none absolute inset-0 z-[2] size-full object-cover select-none transition-opacity ${floodOverlayIn ? 'opacity-100' : 'opacity-0'}`}
                style={{
                  transitionDuration: `${SEWING_FLOOD_BLEND_MS}ms`,
                  transitionTimingFunction: 'cubic-bezier(0.22, 0.1, 0.22, 1)',
                }}
                alt=""
                aria-hidden
              />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}