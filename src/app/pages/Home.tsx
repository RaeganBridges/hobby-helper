import imgLogo1 from "figma:asset/89b09710aad68d4400b9fc8c7058b8276103e194.png";
import { motion } from 'motion/react';

const HOBBY_PLAY_STORAGE_KEYS = [
  "games-played-weeks-v4",
  "sewing-played-weeks-v4",
  "reading-played-weeks-v4",
  "car-repair-played-weeks-v4",
  "games-played-weeks-v3",
  "sewing-played-weeks-v3",
  "reading-played-weeks-v3",
  "car-repair-played-weeks-v3",
] as const;

function clearHobbyPlayProgress() {
  try {
    HOBBY_PLAY_STORAGE_KEYS.forEach((k) => localStorage.removeItem(k));
  } catch {
    /* ignore */
  }
}

function HobbyCard({
  title,
  description,
  onClick,
}: {
  title: string;
  description: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="block cursor-pointer w-full"
    >
      <div className="bg-[#e45b8b] h-[116px] rounded-[25px] py-3 text-left w-full hover:bg-[#d84e7e] transition-colors relative" style={{ boxShadow: '-4px 4px 6px rgba(0, 0, 0, 0.3)' }}>
        <p className="font-icebox-magnet leading-[normal] not-italic text-[32px] text-white whitespace-nowrap mb-1 absolute left-[80px] top-[12px]">
          {title}
        </p>
        <p className="font-hobby-text font-normal leading-[normal] text-[20px] text-white w-[341px] absolute left-[81px] top-[51px]" style={{ fontVariationSettings: "'wdth' 100" }}>
          {description}
        </p>
      </div>
    </button>
  );
}

export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="relative w-full h-full min-h-0 bg-white"
    >
      <div className="relative w-full max-w-[430px] mx-auto h-full min-h-[932px] overflow-hidden">
        <div className="absolute inset-0 pointer-events-none shadow-[inset_0px_0px_35px_-10px_rgba(0,0,0,0.1)]" />
        <div className="absolute bg-[#ff75a5] h-[205px] left-0 top-0 w-full rounded-t-none rounded-b-[55px]">
          <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_5px_15px_10px_rgba(0,0,0,0.1)]" />
        </div>
        
        {/* Logo — tap to restart from index and reset week play / check state */}
        <button
          type="button"
          className="absolute h-[291px] left-[27px] top-[-18px] w-[366px] cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white rounded-sm"
          aria-label="Hobby Helper — return to start and reset week play buttons"
          onClick={() => {
            clearHobbyPlayProgress();
            window.location.assign("/index.html");
          }}
        >
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgLogo1} />
        </button>

        {/* Hobby Cards */}
        <div className="absolute left-[-61px] top-[242px] w-[562.362px]">
          <div className="rotate-1 mb-6">
            <HobbyCard
              title="SEWING"
              description="Make a new dress for the Delight formal dance."
              onClick={() => { window.location.assign('/sewing.html'); }}
            />
          </div>
        </div>

        <div className="absolute left-[-61px] top-[386.86px] w-[575.611px]">
          <div className="-rotate-1 mb-6">
            <HobbyCard
              title="CAR REPAIR"
              description="Fix the door wiring, headliner, and windows in the Bronco."
              onClick={() => { window.location.assign('/car-repair.html'); }}
            />
          </div>
        </div>

        <div className="absolute left-[-61px] top-[536.86px] w-[605.932px]">
          <div className="rotate-1 mb-6">
            <HobbyCard
              title="GAMES"
              description="Practice nerds, mahjong, and chess for the next time I am home."
              onClick={() => { window.location.assign('/games.html'); }}
            />
          </div>
        </div>

        <div className="absolute left-[-61px] top-[682.86px] w-[530.722px]">
          <div className="-rotate-1">
            <button 
              onClick={() => { window.location.assign('/reading.html'); }}
              className="block cursor-pointer w-full"
            >
              <div className="bg-[#e45b8b] h-[116px] rounded-[25px] py-3 text-left w-full hover:bg-[#d84e7e] transition-colors relative" style={{ boxShadow: '-4px 4px 6px rgba(0, 0, 0, 0.3)' }}>
                <p className="font-icebox-magnet leading-[normal] not-italic text-[32px] text-white whitespace-nowrap mb-1 absolute left-[80px] top-[12px]">
                  READING
                </p>
                <p className="font-hobby-text font-normal leading-[normal] text-[20px] text-white w-[341px] absolute left-[81px] top-[51px]" style={{ fontVariationSettings: "'wdth' 100" }}>
                  <span className="font-hobby-text leading-[normal]" style={{ fontVariationSettings: "'wdth' 100" }}>Finish </span>
                  <span className="font-hobby-text-italic italic leading-[normal]" style={{ fontVariationSettings: "'wdth' 100" }}>All Quiet on the Western Front </span>
                  <span className="font-hobby-text leading-[normal]" style={{ fontVariationSettings: "'wdth' 100" }}>by Erich Maria Remarque.</span>
                </p>
              </div>
            </button>
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="absolute bg-[#ff75a5] h-[42px] left-[43px] rounded-[25px] top-[852px] w-[344px]" />
        
        <button type="button" onClick={() => { window.location.assign('/sewing.html'); }} className="absolute left-[43px] top-[852px] cursor-pointer hover:opacity-80 transition-opacity">
          <div className="absolute bg-[#ff75a5] h-[42px] left-0 rounded-[25px] top-0 w-[57px]" />
          <p className="absolute font-icebox-magnet leading-[normal] left-[25px] not-italic text-[24px] text-white top-[6px] whitespace-nowrap">1</p>
        </button>

        <button type="button" onClick={() => { window.location.assign('/car-repair.html'); }} className="absolute left-[100px] top-[852px] cursor-pointer hover:opacity-80 transition-opacity">
          <div className="absolute bg-[#ff75a5] h-[42px] left-0 rounded-[25px] top-0 w-[57px]" />
          <p className="absolute font-icebox-magnet leading-[normal] left-[22px] not-italic text-[24px] text-white top-[6px] whitespace-nowrap">2</p>
        </button>

        <button type="button" onClick={() => { window.location.assign('hobbies.html'); }} className="absolute left-[157px] top-[852px] cursor-pointer">
          <div className="absolute bg-[#e45b8b] h-[42px] left-0 rounded-[25px] top-0 w-[116px]">
            <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_0px_7px_0px_rgba(0,0,0,0.25)]" />
          </div>
          <p className="absolute font-icebox-bold font-semibold leading-[normal] left-[20px] not-italic text-[24px] text-white top-[6px] whitespace-nowrap">HOBBIES</p>
        </button>

        <button type="button" onClick={() => { window.location.assign('/games.html'); }} className="absolute left-[273px] top-[852px] cursor-pointer hover:opacity-80 transition-opacity">
          <div className="absolute bg-[#ff75a5] h-[42px] left-0 rounded-[25px] top-0 w-[57px]" />
          <p className="absolute font-icebox-magnet leading-[normal] left-[22px] not-italic text-[24px] text-white top-[6px] whitespace-nowrap">3</p>
        </button>

        <button type="button" onClick={() => { window.location.assign('/reading.html'); }} className="absolute left-[330px] top-[852px] cursor-pointer hover:opacity-80 transition-opacity">
          <div className="absolute bg-[#ff75a5] h-[42px] left-0 rounded-[25px] top-0 w-[57px]" />
          <p className="absolute font-icebox-magnet leading-[normal] left-[22px] not-italic text-[24px] text-white top-[6px] whitespace-nowrap">4</p>
        </button>
      </div>
    </motion.div>
  );
}