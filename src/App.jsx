import "./App.css";
import Header from "./components/Header";
import TimerManager from "./components/TimerManager";
import Quotes from "./components/Quotes";

function App() {
  return (
    <div className="app-container">
      <header>
        <Header />
      </header>
      <main>
        <TimerManager />
      </main>
      <footer>
        <Quotes />
      </footer>
    </div>
  );
}

export default App;
