import "./App.css";
import ChatbotUI from "./components/chatbot";
import { Preview } from "./components/preview";

function App() {
  return (
    <main className="flex font-inter">
      <ChatbotUI />
      <Preview />
    </main>
  );
}

export default App;
