import type { User } from "../Schemas/userSchema";

function UserProfileHeader({ user }: Pick<User, "user">) {
  return (
    <div className="w-full h-auto p-4 px-7">
      <div className="flex justify-between items-center p-3">
        <div>
          <h1 className="font-semibold pb-1">{user.name}</h1>
          <p>{user.user_name ?? ""}</p>
        </div>
        <div className="flex items-center">
          <img
            src="https://marketplace.canva.com/N2Y1c/MAEbiyN2Y1c/1/tl/canva-user-profile-avatar-MAEbiyN2Y1c.png"
            alt=""
            className="h-20 mr-2 w-20 rounded-full items-bottom"
          />
        </div>
      </div>
      <div className="w-full">
        {user.presentation}
        <p className=" text-white text-sm">
          Presentacion: Lorem ipsum, dolor sit amet consectetur adipisicing
          elit. Molestiae, cupiditate iusto, dolorum quam mollitia ullam
          voluptatibus in et omnis perferendis placeat animi fuga illum error
          natus aliquam dignissimos eius numquam.
        </p>
      </div>
      <div>
        <div>
          <p className="pt-6">24 mill seguidores</p>
        </div>
      </div>
    </div>
  );
}

export default UserProfileHeader;
