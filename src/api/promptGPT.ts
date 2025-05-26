// src/components/ChatGPTDemo.tsx
import { useState } from "react";

export const promtpGPT = () => {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  };
};

export default ChatGPTDemo;
