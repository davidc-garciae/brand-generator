export type Palette = {
  value: string;
  color: string;
  name: string;
};

export type Message = {
  role: "user" | "assistant" | "system";
  content: string | Palette[];
};

export type ChatType = {
  id: string;
  messages: Message[];
};
