import "./App.css";
import ChatbotUI from "./components/chatbot";
import { Preview } from "./components/Preview";

function App() {
  return (
    <main className="flex font-inter">
      <ChatbotUI />
      <Preview />
    </main>
  );
}

export default App;
