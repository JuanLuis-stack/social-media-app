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
            placeholder="¿Qué hay de nuevo?"
          />
        </div>
        <button className="border-[1.3px] border-black-100 p-1.5 rounded-md cursor-pointer hover:opacity-50 duration-200">
          Publicar
        </button>
      </div>
    </>
  );
}

export default SubmitterPostCard;
