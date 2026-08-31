import type { User } from "../Schemas/userSchema";

type UserProfileHeader = { user?: User | null };

function UserProfileHeader({ user }: UserProfileHeader) {
  if (!user) return null;

  return (
    <div className="@container w-full h-full">
      <div className="flex justify-between items-center pb-3">
        <div>
          <p className="font-semibold text-xl @xs:text-4xl @xs:text-white">
            {user.name}
          </p>
          <p className="font-normal text-white">{user.user_name ?? ""}</p>
        </div>
        <div className="flex items-center">
          <img
            src="https://marketplace.canva.com/N2Y1c/MAEbiyN2Y1c/1/tl/canva-user-profile-avatar-MAEbiyN2Y1c.png"
            alt=""
            className="h-16 mr-2 w-16 @xs:h-20 @xs:w-20 rounded-full items-bottom"
          />
        </div>
      </div>
      <div className="w-full">
        <p className="font-normal text-white text-sm truncate @xs:whitespace-normal @xs:pb-3">
          {user.presentation}
        </p>
      </div>
      <div>
        <div>
          <p className="font-normal text-gray-400 text-sm">
            24 mill seguidores
          </p>
        </div>
      </div>
    </div>
  );
}

export default UserProfileHeader;
