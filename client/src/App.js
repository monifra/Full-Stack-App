import React, {Component} from 'react';

//import React Router elements
import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";

import logo from './logo.svg';
import './App.css';


//import components
import Courses from "./components/Courses";
import CourseDetail from "./components/CourseDetail";

class App extends Component {

    render(){
        return (
            <Router>
                <div className="App">
                    <Switch>
                        <Route exact path="/" render={() => <Redirect to="/courses"/>} />
                        <Route exact path="/courses" component={Courses} />
                        <Route path="/courses/:id" render={({match}) => (
                            <CourseDetail
                                routeMatch={match}
                            />
                            )} />
                    </Switch>
                </div>
            </Router>
        );
    }
}
export default App;


