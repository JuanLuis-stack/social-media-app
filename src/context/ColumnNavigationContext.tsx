import { createContext, useContext, useState, type ReactNode } from "react";
import type {
  Column,
  ColumnId,
  NavigationHistory,
} from "../Schemas/ColumnSchema";

type ColumnNavigationContextType = {
  columns: (Column | null)[];
  addColumn: (id: ColumnId) => void;
  removeColumn: (id: ColumnId) => void;
  addHistory: ({
    column_id,
    type,
    data,
  }: {
    column_id: ColumnId;
    type: NavigationHistory["type"];
    data: { user_name: string } | { post_id: number };
  }) => void;
  removeHistory: (column_id: ColumnId) => void;
};

const ColumnNavigationContext =
  createContext<ColumnNavigationContextType | null>(null);

export function ColumnNavigationProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [columns, setColumns] = useState<(Column | null)[]>([
    {
      id: "for_you",
      history: [null],
    },
  ]);

  console.table({ columns });

  function addColumn(id: ColumnId) {
    if (!id) return;

    setColumns((prev) => {
      if (prev.some((column) => column?.id === id)) {
        return prev;
      }

      return [...prev, { id, history: [null] }];
    });
  }

  function removeColumn(id: ColumnId) {
    setColumns((prev) => prev.filter((column) => column?.id !== id));
  }

  function addHistory({
    column_id,
    type,
    data,
  }: {
    column_id: ColumnId;
    type: NavigationHistory["type"];
    data: { user_name: string } | { post_id: number };
  }) {
    setColumns((prev) => {
      if (!prev) return prev;

      return prev.map((column) => {
        if (!column) return column;
        if (column.id !== column_id) return column;

        if (type === "profile" && "user_name" in data) {
          return {
            ...column,
            history: [
              ...column.history,
              { type: "profile", user_name: data.user_name },
            ],
          };
        }

        if (type === "post" && "post_id" in data) {
          return {
            ...column,
            history: [
              ...column.history,
              { type: "post", post_id: data.post_id },
            ],
          };
        }

        return column;
      });
    });
  }

  function removeHistory(column_id: ColumnId) {
    setColumns((prev) => {
      if (!prev) return prev;

      return prev.map((column) => {
        if (column?.id !== column_id) {
          return column;
        }

        return {
          ...column,
          history: [...column.history.slice(0, -1)],
        };
      });
    });
  }

  return (
    <ColumnNavigationContext.Provider
      value={{
        columns,
        addColumn,
        removeColumn,
        addHistory,
        removeHistory,
      }}
    >
      {children}
    </ColumnNavigationContext.Provider>
  );
}

export function UseColumnNavigation() {
  const context = useContext(ColumnNavigationContext);

  if (!context) {
    throw new Error("Something went wrong");
  }

  return context;
}
