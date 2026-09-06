// import Overlay from "./Overlay";

import { createPortal } from "react-dom";
import Overlay from "./Overlay";
import { useState } from "react";
import Spinner from "./Spinner";

function UnfollowConfirmation({
  user_name,
  onConfirm,
  onCancel,
}: {
  user_name: string;
  onConfirm: () => Promise<void>;
  onCancel: () => void;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleOnConfirm(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    try {
      setLoading(true);

      await onConfirm();

      setError(null);
    } catch (error) {
      console.log(error);
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return createPortal(
    <Overlay closerFunction={onCancel}>
      <div
        className={`w-66 ${error ? "h-55" : "h-47"} animate-[fadeIn_400ms_ease] backdrop-blur-2xl border rounded-2xl border-[#333] border-l-white/30 border-t-white/30 relative`}
      >
        <div className="w-full h-fit flex flex-col justify-center items-center px-5 pt-2">
          <img
            src="https://marketplace.canva.com/N2Y1c/MAEbiyN2Y1c/1/tl/canva-user-profile-avatar-MAEbiyN2Y1c.png"
            alt=""
            className="h-14 mr-2 w-14 @xs:h-20 @xs:w-20 rounded-full items-bottom my-2"
          />
          <p className=" text-center text-sm">
            ¿Quieres dejar de seguir a {user_name}?
          </p>
          {error && (
            <p className="text-sm text-red-500 font-bold h-10">
              Something went wrong
            </p>
          )}
        </div>
        <div className="w-full flex justify-between mt-4 absolute bottom-0">
          <button
            disabled={loading}
            className="w-[50%] hover:opacity-60 duration-200 text-white text-sm font-bold py-4 border-t-[0.5px]  border-r-[0.5px] cursor-pointer border-white/20"
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
              e.preventDefault();
              onCancel();
            }}
          >
            Cancelar
          </button>
          <button
            disabled={loading}
            className="w-[50%] hover:opacity-60 duration-200 font-bold py-4 border-t-[0.5px] cursor-pointer border-white/20 text-red-500 text-sm"
            onClick={handleOnConfirm}
          >
            {loading ? <Spinner /> : <p>Dejar de seguir</p>}
          </button>
        </div>
      </div>
    </Overlay>,
    document.getElementById("modal-root")!,
  );
}

export default UnfollowConfirmation;
