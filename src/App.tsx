import { Route, Switch } from 'wouter'
import './App.css'
import Login from './components/auth/login'
import Register from './components/auth/register'
import ChatbotUI from './components/chatbot'
import { Preview } from './components/preview'
import Palettes from './pages/palettes'

function App() {
  return (
    <Switch>
      <Route path="/">
        <main className="font-inter flex">
          <ChatbotUI />
          <Preview />
        </main>
      </Route>

      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/palettes" component={Palettes} />

      <Route>404: No such page!</Route>
    </Switch>
  )
}

export default App
