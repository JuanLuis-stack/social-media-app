// Overlay.tsx

import type React from "react";

type OverlayProps = {
  closerFunction: () => void;
  children: React.ReactNode;
};

function Overlay({ closerFunction, children }: OverlayProps): React.ReactNode {
  function handleCloseOverLay(event: React.MouseEvent<HTMLDivElement>) {
    if (event.target === event.currentTarget) {
      closerFunction();
    }
  }

  return (
    <div
      id="overlay"
      className="inset-0 bg-[#1129] flex justify-center items-center fixed backdrop-blur-xxs z-10 overlay w-full overflow-hidden animate-[fadeIn-500ms-ease-out]"
      onClick={handleCloseOverLay}
    >
      {children}
    </div>
  );
}

export default Overlay;
