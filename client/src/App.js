import React, {Component} from 'react';

//import React Router elements
import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import './App.css';


//import components
import Courses from "./components/Courses";
import CreateCourse from "./components/CreateCourse";
import CourseDetail from "./components/CourseDetail";

import Header from "./components/Header";

// Context (to be able to get app data without passing props)
import withContext from './Context';

const CoursesWithContext = withContext(Courses);
const CourseDetailWithContext = withContext(CourseDetail);

class App extends Component {

    render(){
        return (
            <Router>
                <div id="root">
                    <div>
                        <Header/>
                        <hr/>
                        <Switch>
                            <Route exact path="/" render={() => <Redirect to="/courses"/>} />
                            <Route exact path="/courses" component={CoursesWithContext} />
                            <Route path="/courses/create" component={CreateCourse} />
                            <Route path="/courses/:id" component={CourseDetailWithContext} />
                        </Switch>
                    </div>
                </div>
            </Router>
        );
    }
}
export default App;


