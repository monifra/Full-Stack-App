import React, {Component} from 'react';

//import React Router elements
import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";

import logo from './logo.svg';
import './App.css';


//import components
import Courses from "./components/Courses";

class App extends Component {
    render(){
        return (
            <Router>
                <div className="App">
                    <Switch>
                    <Route path="/courses" component={Courses} />
                    </Switch>
                </div>
            </Router>
        );
    }
}
export default App;


