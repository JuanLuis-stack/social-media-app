import React, { useCallback, useEffect, useRef, useState } from "react";
import UserProfileMiniCard from "./UserProfileMiniCard";
import { useNavigate } from "react-router-dom";
import { UseColumn } from "../context/ColumnContext";
import { UseColumnNavigation } from "../context/ColumnNavigationContext";

type CardPlacement = "below" | "above";

function UserName({ user_name }: { user_name: string }) {
  const navigate = useNavigate();
  const { shouldUseColumnNavigation, columnId } = UseColumn();
  const { addHistory } = UseColumnNavigation();

  const userNameRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [cardPlacement, setCardPlacement] = useState<CardPlacement>("below");

  const updateCardPlacement = useCallback(() => {
    const userNameElement = userNameRef.current;

    if (!userNameElement) return;

    const { bottom } = userNameElement.getBoundingClientRect();

    const avaliableSpaceBelow = window.innerHeight - bottom;
    const miniCardMaximunHeight = 220;
    const gap = 8;

    setCardPlacement(
      avaliableSpaceBelow > miniCardMaximunHeight + gap ? "below" : "above",
    );
  }, []);

  function openMiniCard() {
    setIsVisible(true);
    updateCardPlacement();
  }

  useEffect(() => {
    if (!isVisible) return;

    window.addEventListener("resive", updateCardPlacement);
    window.addEventListener("scroll", updateCardPlacement, true);

    return () => {
      window.addEventListener("resive", updateCardPlacement);
      window.addEventListener("scroll", updateCardPlacement, true);
    };
  }, [isVisible, updateCardPlacement]);

  return (
    <div
      ref={userNameRef}
      onClick={(e: React.MouseEvent<HTMLParagraphElement>) => {
        e.stopPropagation();
        if (!shouldUseColumnNavigation) {
          navigate(`/profile/${user_name}`);
        } else {
          addHistory({
            column_id: columnId,
            type: "profile",
            data: { user_name: user_name },
          });
        }
      }}
      className="font-semibold text-white hover:underline relative"
      onMouseEnter={openMiniCard}
      onMouseLeave={() => setIsVisible(false)}
    >
      {user_name}
      {isVisible && (
        <UserProfileMiniCard
          user_name={user_name}
          cardPlacement={cardPlacement}
          onCloseMiniProfileCard={() => setIsVisible(false)}
        ></UserProfileMiniCard>
      )}
    </div>
  );
}

export default UserName;
