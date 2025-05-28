export interface PaletteItem {
  color: string;
  name: string;
  value: number;
}

export interface FontItem {
  key: string;
  name: string;
  type: "heading" | "body";
}

export type ChatMessageContent = string | PaletteItem[] | FontItem[];
export type ChatMessageType = "text" | "palette" | "fonts" | "error";

export interface ChatMessage {
  id: string;
  sender: "user" | "bot";
  content: ChatMessageContent;
  type: ChatMessageType;
  timestamp: string;
}

export interface BackendMessageRequest {
  message: string;
  chatId?: string | null;
}

export interface BackendMessageResponse {
  chatId: string;
  userMessage: string;
  response: ChatMessageContent;
  type: "text" | "palette" | "fonts";
  message: string;
}

export interface ChatState {
  chatId: string | null;
  messages: ChatMessage[];
  isLoading: boolean;
  error: string | null;
}

export interface ChatActions {
  initializeChat: () => void;
  sendMessage: (text: string) => Promise<void>;
  clearChat: () => void;
}

export type ChatStore = ChatState & ChatActions;
