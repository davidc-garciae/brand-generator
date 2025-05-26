import { create } from "zustand";
import type { ChatType, Message } from "../types";

type ChatStore = {
  addMessage: (role: Message["role"], message: Message["content"]) => void;
  chatId: string;
  setChatId: (newChatId: string) => void;
  messages: ChatType["messages"];
  setMessages: (messages: ChatType["messages"]) => void;
};

export const useChatStore = create<ChatStore>((set) => ({
  chatId: "",
  messages: [],
  setChatId: (newChatId: string) => set({ chatId: newChatId, messages: [] }),
  addMessage: (role: Message["role"], message: Message["content"]) => {
    set((state) => ({
      messages: [...state.messages, { role, content: message }],
    }));
  },
  setMessages: (newMessages: ChatType["messages"]) =>
    set({ messages: newMessages }),
}));
