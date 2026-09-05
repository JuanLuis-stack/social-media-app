// import Overlay from "./Overlay";

import { createPortal } from "react-dom";
import Overlay from "./Overlay";

function UnfollowConfirmation({
  user_name,
  onConfirm,
  onCancel,
}: {
  user_name: string;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return createPortal(
    <Overlay closerFunction={onCancel}>
      <div className="w-66 h-50 animate-[fadeIn_400ms_ease] backdrop-blur-2xl border rounded-2xl border-[#333] border-l-white/30 border-t-white/30 relative">
        <div className="w-full flex flex-col justify-center items-center px-5 pt-5">
          <img
            src="https://marketplace.canva.com/N2Y1c/MAEbiyN2Y1c/1/tl/canva-user-profile-avatar-MAEbiyN2Y1c.png"
            alt=""
            className="h-14 mr-2 w-14 @xs:h-20 @xs:w-20 rounded-full items-bottom my-2"
          />
          <p className=" text-center text-sm">
            ¿Quieres dejar de seguir a {user_name}?
          </p>
        </div>
        <div className="w-full flex justify-between mt-4 absolute bottom-0">
          <button
            className="w-[50%] hover:opacity-60 duration-200 text-white text-sm font-bold py-4 border-t-[0.5px]  border-r-[0.5px] cursor-pointer border-white/20"
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
              e.preventDefault();
              onCancel();
            }}
          >
            Cancelar
          </button>
          <button
            className="w-[50%] hover:opacity-60 duration-200 font-bold py-4 border-t-[0.5px] cursor-pointer border-white/20 text-red-500 text-sm"
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
              e.preventDefault();
              onConfirm();
            }}
          >
            Dejar de seguir
          </button>
        </div>
      </div>
    </Overlay>,
    document.getElementById("modal-root")!,
  );
}

export default UnfollowConfirmation;
