import "./App.css";
import Header from "./components/Header";
import Quotes from "./components/Quotes";
import MainSection from "./components/MainSection";
function App() {
  return (
    <div className="app-container">
      <header>
        <Header />
      </header>
      <MainSection />
      <footer>
        <Quotes />
      </footer>
    </div>
  );
}

export default App;
