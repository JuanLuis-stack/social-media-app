import React, { createContext, useContext } from "react";
import { UseColumnNavigation } from "./ColumnNavigationContext";
import { useLocation, useNavigate } from "react-router-dom";
import type { ColumnId } from "../Schemas/ColumnSchema";

type ColumnContextType = {
  columnId: ColumnId;
  openProfile: (user_name: string) => void;
  openPostDetail: (user_name: string, postId: number) => void;
  shouldUseColumnNavigation: boolean;
};

const ColumnContext = createContext<ColumnContextType | null>(null);

export function Column({
  children,
  id,
}: {
  children: React.ReactNode;
  id: ColumnId;
}) {
  const { addHistory, columns } = UseColumnNavigation();
  const navigate = useNavigate();
  const location = useLocation();

  const isMainRoute = location.pathname === "/";
  const shouldUseColumnNavigation = isMainRoute && columns.length >= 2;

  function openProfile(user_name: string) {
    if (!shouldUseColumnNavigation) {
      navigate(`/profile/${user_name}`);
      return;
    }

    addHistory({
      column_id: id,
      type: "profile",
      data: { user_name: user_name },
    });
  }
  function openPostDetail(user_name: string, postId: number) {
    if (!shouldUseColumnNavigation) {
      navigate(`/${user_name}/posts/${postId}`);
      return;
    }

    addHistory({
      column_id: id,
      type: "post",
      data: { post_id: postId },
    });
  }

  return (
    <ColumnContext.Provider
      value={{
        columnId: id,
        openProfile,
        openPostDetail,
        shouldUseColumnNavigation,
      }}
    >
      {children}
    </ColumnContext.Provider>
  );
}

export function UseColumn() {
  const context = useContext(ColumnContext);

  if (!context) {
    throw new Error("useColumn must be used inside a Column");
  }

  return context;
}
