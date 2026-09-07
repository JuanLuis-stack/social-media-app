import { useState } from "react";
import { Link } from "react-router-dom";
import UserProfileMiniCard from "./UserProfileMiniCard";

function UserName({ user_name }: { user_name: string }) {
  const [isVisible, setIsVisible] = useState(false);
  return (
    <Link
      to={`/profile/${user_name}`}
      className="font-semibold text-white hover:underline relative"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {user_name}
      {isVisible && (
        <UserProfileMiniCard
          user_name={user_name}
          onCloseMiniProfileCard={() => setIsVisible(false)}
        ></UserProfileMiniCard>
      )}
    </Link>
  );
}

export default UserName;
