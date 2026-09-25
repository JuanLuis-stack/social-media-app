import React, { createContext, useContext, useState } from "react";

type AnimationContextType = {
  animate: string | null;
  activeAnimation: (id: string) => void;
};

const AnimationContext = createContext<AnimationContextType | null>(null);

export function AnimationProvider({ children }: { children: React.ReactNode }) {
  const [animate, setAnimate] = useState<string | null>(null);

  function activeAnimation(id: string) {
    setAnimate(id);

    setTimeout(() => {
      setAnimate(null);
    }, 600);
  }

  return (
    <AnimationContext.Provider value={{ animate, activeAnimation }}>
      {children}
    </AnimationContext.Provider>
  );
}

export function UseAnimation() {
  const context = useContext(AnimationContext);

  if (!context) {
    throw new Error("animationContext have to be used on file jsx");
  }

  return context;
}
