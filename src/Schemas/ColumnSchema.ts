export type NavigationHistory =
  | {
      type: "profile";
      user_name: string;
    }
  | {
      type: "post";
      post_id: number;
    };

export type ColumnId = "for_you" | "activity" | "profile" | "post_detail";

export type Column = {
  id: ColumnId;
  history: (NavigationHistory | null)[];
};
