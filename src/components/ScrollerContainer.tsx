import type React from "react";

function ScrollerContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex-1 mt-13 md:mt-2 overflow-y-auto h-full w-full custom-scrollbar md:rounded-t-3xl md:border border-white/35">
      {children}
    </div>
  );
}

export default ScrollerContainer;
