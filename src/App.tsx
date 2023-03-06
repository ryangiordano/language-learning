import "./App.css";
import {
  BrowserRouter as Router,
  Routes as Switch,
  Route,
  Navigate,
} from "react-router-dom";
import ComposePage from "./pages/ComposePage";
import CompositionsPage from "./pages/CompositionsPage";
import CompositionPage from "./pages/CompositionPage";
import Navbar from "./nav/Navbar";

function App() {
  return (
    <Router>
      <Navbar />
      <br />
      <div className="App">
        <section>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Switch>
              <Route path="/compose" element={<ComposePage />} />
              <Route path="/compositions" element={<CompositionsPage />} />
              <Route path="/composition/:key" element={<CompositionPage />} />
              <Route path={"*"} element={<Navigate to="/compose" />} />
            </Switch>
          </div>
          <br />
          <div style={{ display: "flex", flexDirection: "column" }}></div>
        </section>
      </div>
    </Router>
  );
}

export default App;
