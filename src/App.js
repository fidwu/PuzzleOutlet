import './App.css';
import './App.scss';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from './pages/Home';
import Product from './pages/Product';
import Cart from './pages/Cart';
import Header from './components/Navbar';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route
            exact
            path="/"
            component={Home}
          />
          <Route
            exact 
            path="/cart"
            component={Cart}
          />
          <Route
            path="/:id"
            component={Product}
          /> 
        </Switch>
      </Router>
    </div>
  );
}

export default App;
