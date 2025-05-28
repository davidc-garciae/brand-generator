import { v4 as uuidv4 } from "uuid";
import { create } from "zustand";
import ChatService from "../services/chat-service";
import type { ChatMessage, ChatStore } from "../types";

const CHATBOT_LAST_ACTIVE_CHAT_ID_KEY = "chatbot_last_active_chat_id";
const CHATBOT_HISTORIES_KEY = "chatbot_histories";

type StoredHistories = Record<string, ChatMessage[]>;

const loadHistoriesFromLocalStorage = (): StoredHistories => {
  if (typeof window === "undefined") return {};
  try {
    const storedHistories = localStorage.getItem(CHATBOT_HISTORIES_KEY);
    return storedHistories ? JSON.parse(storedHistories) : {};
  } catch (error) {
    console.error("Error loading chat histories from localStorage:", error);
    return {};
  }
};

const saveHistoriesToLocalStorage = (histories: StoredHistories) => {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(CHATBOT_HISTORIES_KEY, JSON.stringify(histories));
  } catch (error) {
    console.error("Error saving chat histories to localStorage:", error);
  }
};

const loadLastActiveChatId = (): string | null => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(CHATBOT_LAST_ACTIVE_CHAT_ID_KEY);
};

const saveLastActiveChatId = (chatId: string) => {
  if (typeof window === "undefined") return;
  localStorage.setItem(CHATBOT_LAST_ACTIVE_CHAT_ID_KEY, chatId);
};

const removeLastActiveChatId = () => {
  if (typeof window === "undefined") return;
  localStorage.removeItem(CHATBOT_LAST_ACTIVE_CHAT_ID_KEY);
};

export const useChatStore = create<ChatStore>((set, get) => ({
  chatId: null,
  messages: [],
  isLoading: false,
  error: null,

  initializeChat: () => {
    const lastActiveId = loadLastActiveChatId();
    if (lastActiveId) {
      const histories = loadHistoriesFromLocalStorage();
      const activeMessages = histories[lastActiveId] || [];
      set({
        chatId: lastActiveId,
        messages: activeMessages,
        isLoading: false,
        error: null,
      });
    } else {
      set({ chatId: null, messages: [], isLoading: false, error: null });
    }
  },

  sendMessage: async (text: string) => {
    const currentUserMessage: ChatMessage = {
      id: uuidv4(),
      sender: "user",
      content: text,
      type: "text",
      timestamp: new Date().toISOString(),
    };

    set((state) => {
      const updatedMessages = [...state.messages, currentUserMessage];
      if (state.chatId) {
        const histories = loadHistoriesFromLocalStorage();
        histories[state.chatId] = updatedMessages;
        saveHistoriesToLocalStorage(histories);
      }
      return {
        messages: updatedMessages,
        isLoading: true,
        error: null,
      };
    });

    const currentChatId = get().chatId;

    try {
      const backendResponse = await ChatService.sendMessage({
        message: text,
        chatId: currentChatId,
      });

      const botMessage: ChatMessage = {
        id: uuidv4(),
        sender: "bot",
        content: backendResponse.response,
        type: backendResponse.type,
        timestamp: new Date().toISOString(),
      };

      const newChatIdFromBackend = backendResponse.chatId;

      set(() => {
        const histories = loadHistoriesFromLocalStorage();
        // const messagesForNewChatId = histories[newChatIdFromBackend] || [];
        const finalMessages = [...get().messages, botMessage];

        histories[newChatIdFromBackend] = finalMessages;

        saveHistoriesToLocalStorage(histories);
        saveLastActiveChatId(newChatIdFromBackend);

        return {
          messages: finalMessages,
          isLoading: false,
          chatId: newChatIdFromBackend,
        };
      });
    } catch (err: unknown) {
      console.error("Error sending message:", err);
      const errorMessage: ChatMessage = {
        id: uuidv4(),
        sender: "bot",
        content:
          err instanceof Error
            ? err.message
            : "Ocurrió un error al contactar al asistente.",
        type: "error",
        timestamp: new Date().toISOString(),
      };
      set((state) => {
        const updatedMessages = [...state.messages, errorMessage];
        if (state.chatId) {
          const histories = loadHistoriesFromLocalStorage();
          histories[state.chatId] = updatedMessages;
          saveHistoriesToLocalStorage(histories);
        }
        return {
          messages: updatedMessages,
          isLoading: false,
          error:
            err instanceof Error
              ? err.message
              : "Error desconocido al contactar al asistente.",
        };
      });
    }
  },

  clearChat: () => {
    removeLastActiveChatId();
    set({ chatId: null, messages: [], isLoading: false, error: null });
  },
}));

if (typeof window !== "undefined") {
  useChatStore.getState().initializeChat();
}
