export type Tasks = {
  id: string;
  title: string;
  done: boolean;
};

export type Filter = "all" | "todo" | "done";
