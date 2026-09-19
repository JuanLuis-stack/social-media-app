import React, { useState } from "react";
import UserProfileMiniCard from "./UserProfileMiniCard";
import { useNavigate } from "react-router-dom";
import { UseColumn } from "../context/ColumnContext";
import { UseColumnNavigation } from "../context/ColumnNavigationContext";

function UserName({ user_name }: { user_name: string }) {
  const navigate = useNavigate();
  const { shouldUseColumnNavigation, columnId } = UseColumn();
  const { addHistory } = UseColumnNavigation();

  const [isVisible, setIsVisible] = useState(false);
  return (
    <div
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
      onMouseEnter={() => setIsVisible(false)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {user_name}
      {isVisible && (
        <UserProfileMiniCard
          user_name={user_name}
          onCloseMiniProfileCard={() => setIsVisible(false)}
        ></UserProfileMiniCard>
      )}
    </div>
  );
}

export default UserName;
