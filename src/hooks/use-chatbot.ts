import { useChatStore } from "../store/chat-store";

export const useChatbot = () => {
  const chatId = useChatStore((state) => state.chatId);
  const messages = useChatStore((state) => state.messages);
  const isLoading = useChatStore((state) => state.isLoading);
  const error = useChatStore((state) => state.error);
  const sendMessageToAction = useChatStore((state) => state.sendMessage);
  const clearChat = useChatStore((state) => state.clearChat);

  const sendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;
    await sendMessageToAction(text);
  };

  return {
    chatId,
    messages,
    isLoading,
    error,
    sendMessage,
    startNewChat: clearChat,
  };
};
