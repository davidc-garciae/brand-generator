import { useCallback, useEffect, useState } from "react";
import ChatService from "../services/chat-service";
import { useChatStore } from "../store/chat-store";

type Props = {
  chatId: string;
  initMessage?: string;
};

export const Chat = ({ chatId: propChatId, initMessage }: Props) => {
  const [newMessage, setNewMessage] = useState("");
  const {
    addMessage,
    messages,
    setChatId: setStoreChatId,
    chatId: currentStoreChatId,
  } = useChatStore();
  const [initMessageSent, setInitMessageSent] = useState(false);

  useEffect(() => {
    if (propChatId && propChatId !== currentStoreChatId) {
      setStoreChatId(propChatId);
      setInitMessageSent(false);
    }
  }, [propChatId, currentStoreChatId, setStoreChatId]);

  const sendMessageToServer = useCallback(
    async (content: string) => {
      try {
        const res = await ChatService.sendNewMessage(propChatId, content);
        if (res && typeof res.response === "string") {
          addMessage("assistant", res.response);
        } else if (res && typeof res.response === "object") {
          addMessage("assistant", res.response);
        }
      } catch (error) {
        console.log(error);
      }
    },
    [propChatId, addMessage]
  );

  useEffect(() => {
    if (initMessage && propChatId === currentStoreChatId && !initMessageSent) {
      addMessage("user", initMessage);
      sendMessageToServer(initMessage);
      setInitMessageSent(true);
    }
  }, [
    initMessage,
    propChatId,
    currentStoreChatId,
    addMessage,
    sendMessageToServer,
    initMessageSent,
  ]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedMessage = newMessage.trim();
    if (trimmedMessage === "") return;

    addMessage("user", trimmedMessage);
    sendMessageToServer(trimmedMessage);
    setNewMessage("");
  };

  if (propChatId !== currentStoreChatId) {
    return null;
  }

  return (
    <div className="max-w-2xl">
      {messages.map((message, index) => (
        <div key={`${message.role}-${index}`}>
          {typeof message.content === "string" && (
            <p>
              <strong>{message.role}:</strong> {message.content}
            </p>
          )}
          {typeof message.content === "object" && (
            <div>
              {message.content.map((palette, index) => (
                <div
                  key={`${index}-${palette.value}`}
                  className="flex gap-2 items-center"
                >
                  <p>{palette.value}</p>
                  <p style={{ backgroundColor: palette.color }}>
                    {palette.color}
                  </p>
                  <p>{palette.name}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
      <div className="flex flex-col gap-4">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            className="p-4 border-2 border-slate-300 rounded-2xl"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
          />
          <button type="submit">Enviar</button>
        </form>
      </div>
    </div>
  );
};
