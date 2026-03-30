import { Outlet, useLocation } from 'react-router';
import { AnimatePresence } from 'motion/react';

/** Desktop-only gradient behind the phone frame; keyed to route (see static HTML pages). */
function desktopBackdropClass(pathname: string): string {
  const p = pathname.replace(/\/$/, '') || '/';
  if (p === '/sewing' || p.startsWith('/sewing/')) {
    return 'md:bg-gradient-to-b md:from-[#fff8e8] md:to-[#f0dfa0]';
  }
  if (p === '/car-repair' || p.startsWith('/car-repair')) {
    return 'md:bg-gradient-to-b md:from-[#e8f0ff] md:to-[#b8cef0]';
  }
  if (p === '/games' || p.startsWith('/games')) {
    return 'md:bg-gradient-to-b md:from-[#ffeeef] md:to-[#f0b8bc]';
  }
  if (p === '/reading' || p.startsWith('/reading')) {
    return 'md:bg-gradient-to-b md:from-[#e6f8e8] md:to-[#b8e3bf]';
  }
  if (p === '/hobbies' || p.startsWith('/hobbies')) {
    return 'md:bg-gradient-to-b md:from-[#ffd8ec] md:to-[#f0a8cc]';
  }
  /* Home (hobby hub) + splash / unknown */
  return 'md:bg-gradient-to-b md:from-[#ffd8ec] md:to-[#f0a8cc]';
}

/**
 * Mobile-first: on desktop, show the app in a centered ~phone-width frame
 * so the UI matches the mobile design.
 */
export default function RootLayout() {
  const location = useLocation();
  const backdrop = desktopBackdropClass(location.pathname);

  return (
    <div className={`min-h-dvh w-full flex justify-center items-center bg-[#e8bdd0] ${backdrop} md:py-6 md:px-4`}>
      <div
        className="relative w-full max-w-[430px] h-[min(100dvh,932px)] shrink-0 md:h-[min(932px,calc(100dvh-3rem))] md:rounded-[2.75rem] md:shadow-[0_25px_80px_-20px_rgba(0,0,0,0.35)] md:ring-1 md:ring-black/10 bg-white overflow-x-hidden overflow-y-auto"
        data-app-frame
      >
        <AnimatePresence mode="wait">
          <div key={location.pathname} className="h-full min-h-0 w-full">
            <Outlet />
          </div>
        </AnimatePresence>
      </div>
    </div>
  );
}
