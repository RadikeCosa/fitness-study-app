import "./App.css";
import Header from "./components/Header";
import Quotes from "./components/Quotes";
import Dashboard from "./components/layouts/Dashboard";

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
