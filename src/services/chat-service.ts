import { API_URL } from "../helpers/contants";
import type { BackendMessageResponse } from "../types";

type Palette = {
  value: string;
  color: string;
  name: string;
};

type Response = {
  response: string | Palette[];
  message: string;
};

export default class ChatService {
  static async sendNewMessage(chatId: string, message: string) {
    const response = await fetch(`${API_URL}/bot/${chatId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ value: message }),
    });
    if (!response.ok) {
      throw new Error("Error en la respuesta de la API");
    }
    const data = await response.json();
    return data as Response;
  }
  static async sendMessage(payload: {
    chatId?: string | null;
    message: string;
  }) {
    const response = await fetch(`${API_URL}/chatbot/message`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: payload.message,
        ...(payload.chatId && { chatId: payload.chatId }),
      }),
    });
    if (!response.ok) {
      throw new Error("Error en la respuesta de la API");
    }
    const data = await response.json();
    return data as BackendMessageResponse;
  }
}
