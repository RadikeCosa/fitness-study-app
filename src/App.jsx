import "./App.css";
import Header from "./components/Header";
import Quotes from "./components/Quotes";
import Dashboard from "./components/Dashboard"; // Nuevo nombre

function App() {
  return (
    <div className="app-container">
      <header>
        <Header />
      </header>
      <main>
        <Dashboard />
      </main>
      <footer>
        <Quotes />
      </footer>
    </div>
  );
}

export default App;
