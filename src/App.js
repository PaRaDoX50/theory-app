import logo from './logo.svg';
import './App.css';
import TheoryList from './components/theory/theoryList'
import EditTheory from "./components/theory/editTheory";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <TheoryList />
        </Route>
        <Route path="/editTheory">
          <EditTheory />
        </Route>

      </Switch>
    </Router>

  );
}

export default App;
