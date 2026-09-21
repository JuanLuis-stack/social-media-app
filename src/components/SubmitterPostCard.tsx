import { UseSubmitterPost } from "../context/SubmitPostContext";

function SubmitterPostCard() {
  const { openSubmitPost } = UseSubmitterPost();

  return (
    <>
      <div
        className="hidden md:flex border-b border-white/30 pbx-3 justify-between p-4"
        onClick={() => openSubmitPost()}
      >
        <div className="flex items-center">
          <img
            src="https://marketplace.canva.com/N2Y1c/MAEbiyN2Y1c/1/tl/canva-user-profile-avatar-MAEbiyN2Y1c.png"
            alt=""
            className="h-7 mr-2 min-w-7 rounded-full items-bottom"
          />
        </div>
        <div className="flex flex-1">
          <input
            className="placeholder:text-sm focus:outline-none"
            readOnly
            placeholder="What's new?"
          />
        </div>
        <button className="border-[1.3px] border-white/25 px-4 p-1.5 font-semibold text-sm text-white rounded-xl cursor-pointer hover:opacity-50 duration-200">
          Post
        </button>
      </div>
    </>
  );
}

export default SubmitterPostCard;
