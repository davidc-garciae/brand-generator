import type { ChatType } from "../types";

const CHAT_KEY = "chat_history";

export class ChatLocalStorage {
  static saveToLocal(chat: ChatType[]) {
    localStorage.setItem(CHAT_KEY, JSON.stringify(chat));
  }

  static getFromLocal() {
    const chat = localStorage.getItem(CHAT_KEY);
    return chat ? JSON.parse(chat) : [];
  }

  static deleteFromLocal() {
    localStorage.removeItem(CHAT_KEY);
  }
}
