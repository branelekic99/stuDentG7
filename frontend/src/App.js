import {BrowserRouter as Router,Route,Switch} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NavBar from "./pages/Nav";
import Gallery from "./pages/Gallery";
import Schedule from "./pages/Schedule";
import News from "./pages/News";
import Appointments from "./pages/Appointments";
import PrivateRoute from "./permissions/PirvateRoute";
import Requests from "./pages/Requests";

import 'antd/dist/antd.css';
import './App.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";


function App() {

  return (
 <>
    <Router>
        <NavBar />
        <Switch>
            <PrivateRoute path={"/"} exact component={Home}/>
            <Route path={"/login"}  component={Login}/>
            <PrivateRoute path={"/news"}  component={News}/>
            <PrivateRoute path={"/gallery"}  component={Gallery}/>
            <PrivateRoute path={"/schedule"}  component={Schedule}/>
            <PrivateRoute path={"/appointment"}  component={Appointments}/>
            <PrivateRoute path={"/requests"}  component={Requests}/>

        </Switch>
    </Router>
 </>
  );
}

export default App;
