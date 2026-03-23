import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import svgPaths from "../../imports/svg-b9ct596ajp";
import { GamesVideoOverlay } from "../components/GamesVideoOverlay";
import { motion } from 'motion/react';
import { Check } from "lucide-react";

export default function Games() {
  const navigate = useNavigate();
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [playedWeeks, setPlayedWeeks] = useState<Set<number>>(new Set());

  // Load played weeks from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('games-played-weeks');
    if (saved) {
      setPlayedWeeks(new Set(JSON.parse(saved)));
    }
  }, []);

  const handlePlayClick = (weekNumber: number) => {
    const newPlayedWeeks = new Set(playedWeeks).add(weekNumber);
    setPlayedWeeks(newPlayedWeeks);
    // Save to localStorage
    localStorage.setItem('games-played-weeks', JSON.stringify(Array.from(newPlayedWeeks)));
    setIsVideoOpen(true);
  };

  const renderButton = (weekNumber: number, buttonStyles: string, rotationStyles?: string) => {
    const isPlayed = playedWeeks.has(weekNumber);
    
    const buttonContent = (
      <button 
        className={`block cursor-pointer ${buttonStyles} shadow-[inset_-2px_7px_5px_0px_rgba(0,0,0,0.1)] rounded-full ${isPlayed ? 'bg-[#f75a5d]' : 'bg-[#ff8486]'}`}
        onClick={() => handlePlayClick(weekNumber)}
      >
        {isPlayed ? (
          <div className="absolute flex inset-0 items-center justify-center">
            <Check className="w-12 h-12 text-[#871719] stroke-[3]" />
          </div>
        ) : (
          <div className="absolute flex inset-0 items-center justify-center">
            <div className="flex-none rotate-90 size-[80px]">
              <div className="relative size-full">
                <div className="absolute bottom-1/4 left-[14%] right-[14%] top-[10%]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 57.5931 52">
                    <path d={svgPaths.p19083cc0} fill="var(--fill-0, #871719)" />
                  </svg>
                </div>
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
        className="bg-white relative w-full min-h-screen flex items-center justify-center"
      >
        <div className="relative w-[430px] h-[932px] overflow-hidden">
          <div className="absolute bg-[#ffd3d4] h-[932px] left-0 opacity-40 rounded-[54px] top-0 w-[430px]">
            <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_4px_35px_-10px_rgba(0,0,0,0.1)]" />
          </div>
          <div className="absolute bg-[#ff6e71] h-[177px] left-0 rounded-[55px] top-0 w-[430px]">
            <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_5px_15px_10px_rgba(0,0,0,0.1)]" />
          </div>
          <div className="absolute bg-[#ff8486] h-[42px] left-[43px] rounded-[25px] top-[852px] w-[344px]" />
          
          
          {/* Background cards */}
          <div className="absolute left-[-37.93px] top-[229.38px]">
            <div className="absolute flex h-[127.237px] items-center justify-center left-0 top-0 w-[327.851px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "0" } as React.CSSProperties}>
              <div className="-rotate-2 flex-none">
                <div className="bg-[#e43d3d] h-[116px] rounded-[25px] w-[324px]" style={{ boxShadow: '-4px 4px 6px rgba(0, 0, 0, 0.25)' }} />
              </div>
            </div>
            <div className="absolute flex h-[127.237px] items-center justify-center left-0 top-[296px] w-[327.851px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "0" } as React.CSSProperties}>
              <div className="flex-none rotate-2">
                <div className="bg-[#e43d3d] h-[116px] rounded-[25px] w-[324px]" style={{ boxShadow: '-4px 4px 6px rgba(0, 0, 0, 0.25)' }} />
              </div>
            </div>
            <div className="absolute flex h-[127.237px] items-center justify-center left-0 top-[444px] w-[327.851px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "0" } as React.CSSProperties}>
              <div className="-rotate-2 flex-none">
                <div className="bg-[#e43d3d] h-[116px] rounded-[25px] w-[324px]" style={{ boxShadow: '-4px 4px 6px rgba(0, 0, 0, 0.25)' }} />
              </div>
            </div>
            <div className="absolute bg-[#e43d3d] h-[116px] left-[1.93px] rounded-[25px] top-[154px] w-[324px]" style={{ boxShadow: '-4px 4px 6px rgba(0, 0, 0, 0.25)' }} />
          </div>
          
          {/* Right side cards */}
          <div className="absolute left-[313px] top-[235px]">
            <div className="absolute bg-[#ff8486] h-[116px] left-0 rounded-[25px] top-0 w-[261px]" />
            <div className="absolute bg-[#ff8486] h-[116px] left-0 rounded-[25px] top-[148px] w-[261px]" />
            <div className="absolute bg-[#ff8486] h-[116px] left-0 rounded-[25px] top-[296px] w-[261px]" />
            <div className="absolute bg-[#ff8486] h-[116px] left-0 rounded-[25px] top-[444px] w-[261px]" />
          </div>
          
          {/* Title */}
          <p className="absolute font-['Icebox_Trial:Magnet'] leading-[normal] left-[115px] not-italic text-[#871719] text-[72px] top-[70px] whitespace-nowrap">GAMES</p>
          
          {/* Week One */}
          <div className="absolute flex h-[42.374px] items-center justify-center left-[18.39px] top-[247.53px] w-[127.249px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "19" } as React.CSSProperties}>
            <div className="-rotate-2 flex-none">
              <p className="font-['Icebox_Trial:Magnet'] leading-[normal] not-italic relative text-[#ffedee] text-[32px] whitespace-nowrap">WEEK ONE</p>
            </div>
          </div>
          <div className="absolute flex h-[54.522px] items-center justify-center left-[19.24px] top-[283.74px] w-[246.456px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "19" } as React.CSSProperties}>
            <div className="-rotate-2 flex-none">
              <p className="font-['Carp_VF_Trial:Regular'] font-normal leading-[normal] relative text-[#ffedee] text-[20px] w-[245px]" style={{ fontVariationSettings: "'wdth' 100" }}>
                Make a cheat sheet guide for mahjong and practice.
              </p>
            </div>
          </div>
          
          {/* Week Two */}
          <p className="absolute font-['Icebox_Trial:Magnet'] leading-[normal] left-[19px] not-italic text-[#ffedee] text-[32px] top-[396px] whitespace-nowrap">WEEK TWO</p>
          <p className="absolute font-['Carp_VF_Trial:Regular'] font-normal leading-[normal] left-[20px] text-[#ffedee] text-[20px] top-[435px] w-[245px]" style={{ fontVariationSettings: "'wdth' 100" }}>
            Memorize the rules while playing nerds.
          </p>
          
          {/* Week Three */}
          <div className="absolute flex h-[43.351px] items-center justify-center left-[18.4px] top-[540.5px] w-[155.232px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "19" } as React.CSSProperties}>
            <div className="flex-none rotate-2">
              <p className="font-['Icebox_Trial:Magnet'] leading-[normal] not-italic relative text-[#ffedee] text-[32px] whitespace-nowrap">WEEK THREE</p>
            </div>
          </div>
          <div className="absolute flex h-[54.662px] items-center justify-center left-[19.31px] top-[578.67px] w-[250.454px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "19" } as React.CSSProperties}>
            <div className="flex-none rotate-2">
              <p className="font-['Carp_VF_Trial:Regular'] font-normal leading-[normal] relative text-[#ffedee] text-[20px] w-[249px]" style={{ fontVariationSettings: "'wdth' 100" }}>
                Practice chess and keep memorizing the rules.
              </p>
            </div>
          </div>
          
          {/* Week Four */}
          <div className="absolute flex h-[42.933px] items-center justify-center left-[18.39px] top-[689.3px] w-[143.24px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "19" } as React.CSSProperties}>
            <div className="-rotate-2 flex-none">
              <p className="font-['Icebox_Trial:Magnet'] leading-[normal] not-italic relative text-[#ffedee] text-[32px] whitespace-nowrap">WEEK FOUR</p>
            </div>
          </div>
          <div className="absolute flex h-[54.697px] items-center justify-center left-[18.24px] top-[725.65px] w-[251.453px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "19" } as React.CSSProperties}>
            <div className="-rotate-2 flex-none">
              <p className="font-['Carp_VF_Trial:Regular'] font-normal leading-[normal] relative text-[#ffedee] text-[20px] w-[250px]" style={{ fontVariationSettings: "'wdth' 100" }}>
                Play mahjong and try not to use the cheat sheet.
              </p>
            </div>
          </div>
          
          {/* Play buttons */}
          {renderButton(1, "absolute left-[329px] size-[80px] top-[253px]")}
          
          <div className="absolute flex items-center justify-center left-[325.04px] size-[87.924px] top-[693.04px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "19" } as React.CSSProperties}>
            {renderButton(4, "relative size-[80px]", "-rotate-6 flex-none")}
          </div>
          
          {renderButton(3, "absolute left-[329px] size-[80px] top-[549px]")}
          
          <div className="absolute flex items-center justify-center left-[325.67px] size-[86.668px] top-[397.67px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "19" } as React.CSSProperties}>
            {renderButton(2, "relative size-[80px]", "flex-none rotate-5")}
          </div>

          {/* Bottom Navigation */}
          <button onClick={() => navigate('/sewing')} className="absolute left-[43px] top-[852px] cursor-pointer hover:opacity-80 transition-opacity">
            <div className="absolute bg-[#ff8486] h-[42px] left-0 rounded-[25px] top-0 w-[57px]" />
            <p className="absolute font-['Icebox_Trial:Magnet'] leading-[normal] left-[25px] not-italic text-[#871719] text-[24px] top-[6px] whitespace-nowrap">1</p>
          </button>

          <button onClick={() => navigate('/car-repair')} className="absolute left-[100px] top-[852px] cursor-pointer hover:opacity-80 transition-opacity">
            <div className="absolute bg-[#ff8486] h-[42px] left-0 rounded-[25px] top-0 w-[57px]" />
            <p className="absolute font-['Icebox_Trial:Magnet'] leading-[normal] left-[22px] not-italic text-[#871719] text-[24px] top-[6px] whitespace-nowrap">2</p>
          </button>

          <button onClick={() => navigate('/')} className="absolute left-[157px] top-[852px] cursor-pointer hover:opacity-80">
            <div className="absolute bg-[#ff8486] h-[42px] left-0 rounded-[25px] top-0 w-[116px]" />
            <p className="absolute font-['Icebox_Trial:Magnet'] leading-[normal] left-[17px] not-italic text-[#871719] text-[24px] top-[6px] whitespace-nowrap">Hobbies</p>
          </button>

          <div className="absolute left-[273px] top-[852px]">
            <div className="absolute bg-[#f75a5d] h-[42px] left-0 rounded-[25px] top-0 w-[57px]">
              <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_0px_7px_0px_rgba(0,0,0,0.25)]" />
            </div>
            <p className="absolute font-['Icebox_Trial:Bold'] leading-[normal] left-[22px] not-italic text-[#871719] text-[24px] top-[6px] whitespace-nowrap">3</p>
          </div>

          <button onClick={() => navigate('/reading')} className="absolute left-[330px] top-[852px] cursor-pointer hover:opacity-80 transition-opacity">
            <div className="absolute bg-[#ff8486] h-[42px] left-0 rounded-[25px] top-0 w-[57px]" />
            <p className="absolute font-['Icebox_Trial:Magnet'] leading-[normal] left-[22px] not-italic text-[#871719] text-[24px] top-[6px] whitespace-nowrap">4</p>
          </button>
        </div>
      </motion.div>
      {isVideoOpen && <GamesVideoOverlay isOpen={isVideoOpen} onClose={() => setIsVideoOpen(false)} />}
    </>
  );
}