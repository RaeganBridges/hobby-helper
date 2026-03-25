import { Outlet, useLocation } from 'react-router';
import { AnimatePresence } from 'motion/react';

/**
 * Mobile-first: on desktop, show the app in a centered ~phone-width frame
 * so the UI matches the mobile design.
 */
export default function RootLayout() {
  const location = useLocation();

  return (
    <div className="min-h-dvh w-full flex justify-center items-center bg-[#e8bdd0] md:bg-gradient-to-b md:from-[#f5d8e8] md:to-[#deb6ce] md:py-6 md:px-4">
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
