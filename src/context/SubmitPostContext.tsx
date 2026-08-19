import React, { createContext, useContext, useState } from "react";

type SubmitterPostContextType = {
  isSubmitPostOpen: boolean;
  openSubmitPost: () => void;
  closeSubmitPost: () => void;
};

const SubmitterPostContext = createContext<SubmitterPostContextType | null>(
  null,
);

export function SubmitterPostProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSubmitPostOpen, setIsSubmitPostOpen] = useState(false);

  function openSubmitPost() {
    setIsSubmitPostOpen(true);
  }
  function closeSubmitPost() {
    setIsSubmitPostOpen(false);
  }

  return (
    <SubmitterPostContext.Provider
      value={{ isSubmitPostOpen, openSubmitPost, closeSubmitPost }}
    >
      {children}
    </SubmitterPostContext.Provider>
  );
}

export function UseSubmitterPost() {
  const context = useContext(SubmitterPostContext);

  if (!context) {
    throw new Error("context have to be used of element jsx");
  }

  return context;
}
