import { useNavigate } from "react-router";
import imgLogo1 from "figma:asset/89b09710aad68d4400b9fc8c7058b8276103e194.png";
import { motion } from 'motion/react';

function HobbyCard({ 
  title, 
  description, 
  rotation, 
  onClick 
}: { 
  title: string; 
  description: string; 
  rotation: string;
  onClick: () => void;
}) {
  return (
    <button 
      onClick={onClick}
      className={`block cursor-pointer w-full ${rotation}`}
    >
      <div className="bg-[#e45b8b] h-[116px] rounded-[25px] py-3 text-left w-full hover:bg-[#d84e7e] transition-colors relative" style={{ boxShadow: '-4px 4px 6px rgba(0, 0, 0, 0.3)' }}>
        <p className="font-['Icebox_Trial:Magnet'] leading-[normal] not-italic text-[32px] text-white whitespace-nowrap mb-1 absolute left-[80px] top-[12px]">
          {title}
        </p>
        <p className="font-['Carp_VF_Trial:Regular'] font-normal leading-[normal] text-[20px] text-white w-[341px] absolute left-[81px] top-[51px]" style={{ fontVariationSettings: "'wdth' 100" }}>
          {description}
        </p>
      </div>
    </button>
  );
}

export default function Home() {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="relative w-full min-h-dvh bg-white"
    >
      <div className="relative w-full max-w-[430px] mx-auto min-h-[932px] h-auto md:h-[932px] overflow-hidden">
        <div className="absolute bg-[#ffcce0] min-h-[932px] h-full left-0 opacity-40 rounded-[54px] top-0 w-full">
          <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_0px_35px_-10px_rgba(0,0,0,0.1)]" />
        </div>
        <div className="absolute bg-[#ff75a5] h-[205px] left-0 rounded-[55px] top-0 w-full">
          <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_5px_15px_10px_rgba(0,0,0,0.1)]" />
        </div>
        
        {/* Logo */}
        <div className="absolute h-[291px] left-[27px] top-[-18px] w-[366px]">
          <img alt="Hobby Helper Logo" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgLogo1} />
        </div>

        {/* Hobby Cards */}
        <div className="absolute left-[-61px] top-[242px] w-[562.362px]">
          <div className="rotate-1 mb-6">
            <HobbyCard 
              title="SEWING"
              description="Make a new dress for the Delight formal dance."
              rotation=""
              onClick={() => navigate('/sewing')}
            />
          </div>
        </div>

        <div className="absolute left-[-61px] top-[386.86px] w-[575.611px]">
          <div className="-rotate-1 mb-6">
            <HobbyCard 
              title="CAR REPAIR"
              description="Fix the door wiring, headliner, and windows in the Bronco."
              rotation=""
              onClick={() => navigate('/car-repair')}
            />
          </div>
        </div>

        <div className="absolute left-[-61px] top-[536.86px] w-[605.932px]">
          <div className="rotate-1 mb-6">
            <HobbyCard 
              title="GAMES"
              description="Practice nerds, mahjong, and chess for the next time I am home."
              rotation=""
              onClick={() => navigate('/games')}
            />
          </div>
        </div>

        <div className="absolute left-[-61px] top-[682.86px] w-[530.722px]">
          <div className="-rotate-1">
            <button 
              onClick={() => navigate('/reading')}
              className="block cursor-pointer w-full"
            >
              <div className="bg-[#e45b8b] h-[116px] rounded-[25px] py-3 text-left w-full hover:bg-[#d84e7e] transition-colors relative" style={{ boxShadow: '-4px 4px 6px rgba(0, 0, 0, 0.3)' }}>
                <p className="font-['Icebox_Trial:Magnet'] leading-[normal] not-italic text-[32px] text-white whitespace-nowrap mb-1 absolute left-[80px] top-[12px]">
                  READING
                </p>
                <p className="font-['Carp_VF_Trial:Regular'] font-normal leading-[normal] text-[20px] text-white w-[341px] absolute left-[81px] top-[51px]" style={{ fontVariationSettings: "'wdth' 100" }}>
                  <span className="font-['Carp_VF_Trial:Regular'] leading-[normal]" style={{ fontVariationSettings: "'wdth' 100" }}>Finish </span>
                  <span className="font-['Carp_VF_Trial:Italic'] italic leading-[normal]" style={{ fontVariationSettings: "'wdth' 100" }}>All Quiet on the Western Front </span>
                  <span className="font-['Carp_VF_Trial:Regular'] leading-[normal]" style={{ fontVariationSettings: "'wdth' 100" }}>by Erich Maria Remarque.</span>
                </p>
              </div>
            </button>
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="absolute bg-[#ff75a5] h-[42px] left-[43px] rounded-[25px] top-[852px] w-[344px]" />
        
        <button onClick={() => navigate('/sewing')} className="absolute left-[43px] top-[852px] cursor-pointer hover:opacity-80 transition-opacity">
          <div className="absolute bg-[#ff75a5] h-[42px] left-0 rounded-[25px] top-0 w-[57px]" />
          <p className="absolute font-['Icebox_Trial:Magnet'] leading-[normal] left-[25px] not-italic text-[24px] text-white top-[6px] whitespace-nowrap">1</p>
        </button>

        <button onClick={() => navigate('/car-repair')} className="absolute left-[100px] top-[852px] cursor-pointer hover:opacity-80 transition-opacity">
          <div className="absolute bg-[#ff75a5] h-[42px] left-0 rounded-[25px] top-0 w-[57px]" />
          <p className="absolute font-['Icebox_Trial:Magnet'] leading-[normal] left-[22px] not-italic text-[24px] text-white top-[6px] whitespace-nowrap">2</p>
        </button>

        <button onClick={() => navigate('/')} className="absolute left-[157px] top-[852px] cursor-pointer">
          <div className="absolute bg-[#e45b8b] h-[42px] left-0 rounded-[25px] top-0 w-[116px]">
            <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_0px_7px_0px_rgba(0,0,0,0.25)]" />
          </div>
          <p className="absolute font-['Icebox_Trial:Bold'] leading-[normal] left-[20px] not-italic text-[24px] text-white top-[6px] whitespace-nowrap">HOBBIES</p>
        </button>

        <button onClick={() => navigate('/games')} className="absolute left-[273px] top-[852px] cursor-pointer hover:opacity-80 transition-opacity">
          <div className="absolute bg-[#ff75a5] h-[42px] left-0 rounded-[25px] top-0 w-[57px]" />
          <p className="absolute font-['Icebox_Trial:Magnet'] leading-[normal] left-[22px] not-italic text-[24px] text-white top-[6px] whitespace-nowrap">3</p>
        </button>

        <button onClick={() => navigate('/reading')} className="absolute left-[330px] top-[852px] cursor-pointer hover:opacity-80 transition-opacity">
          <div className="absolute bg-[#ff75a5] h-[42px] left-0 rounded-[25px] top-0 w-[57px]" />
          <p className="absolute font-['Icebox_Trial:Magnet'] leading-[normal] left-[22px] not-italic text-[24px] text-white top-[6px] whitespace-nowrap">4</p>
        </button>
      </div>
    </motion.div>
  );
}