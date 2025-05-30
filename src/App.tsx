import "./App.css";
import Login from "./components/auth/login";
import Register from "./components/auth/register";
import ChatbotUI from "./components/chatbot";
import { Preview } from "./components/Preview";
import { useAuth } from "./hooks/use-auth";

function App() {
  const pathname = window.location.pathname;
  const { user } = useAuth();
  console.log({ user }); //Testing current user

  if (pathname === "/register") {
    return <Register />;
  }

  if (pathname === "/login") {
    return <Login />;
  }

  return (
    <main className="flex font-inter">
      <ChatbotUI />;
      <Preview />
    </main>
  );
}

export default App;
