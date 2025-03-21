import Header from "./components/Header";
import HiitTimer from "./components/HiitTimer";
import Pomodoro from "./components/Pomodoro";
import Quotes from "./components/Quotes";
import "./App.css";

function App() {
  return (
    <div className="app-container">
      <header>
        <Header />
        <h1>Argestan</h1>
      </header>
      <main>
        <section className="timers">
          <HiitTimer />
          <Pomodoro />
        </section>
        <section className="quotes">
          <Quotes />
        </section>
      </main>
    </div>
  );
}

export default App;
