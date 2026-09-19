import { useNavigate } from "react-router-dom";
import { UseColumn } from "../context/ColumnContext";
import { UseColumnNavigation } from "../context/ColumnNavigationContext";

function GoBackArrow({ name }: { name: string }) {
  const { columnId, shouldUseColumnNavigation } = UseColumn();
  const { removeHistory } = UseColumnNavigation();
  const navigate = useNavigate();

  return (
    <div className="h-[13%] flex items-center pl-7">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="currentColor"
        viewBox="0 0 24 24"
        className="cursor-pointer"
        onClick={() => {
          if (!shouldUseColumnNavigation) {
            if (window.history.length > 1) {
              navigate(-1);
            } else {
              navigate("/");
            }
          } else {
            removeHistory(columnId);
          }
        }}
      >
        <path d="M9 13h7v-2H9V7l-6 5 6 5z"></path>
        <path d="M19 3h-7v2h7v14h-7v2h7c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2"></path>
      </svg>
      <p className="font-semibold text-xl text-white pl-3">{name}</p>
    </div>
  );
}

export default GoBackArrow;
