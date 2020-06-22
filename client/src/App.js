//import React
import React, {Component} from 'react';
//import React Router elements
import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";
//import styles
import './App.css';


//import components
import Courses from "./components/Courses";
import CreateCourse from "./components/CreateCourse";
import CourseDetail from "./components/CourseDetail";
import UserSignIn from "./components/UserSignIn";
import UserSignUp from "./components/UserSignUp";
import UserSignOut from "./components/UserSignOut";
import UpdateCourse from "./components/UpdateCourse";
import Header from "./components/Header";

//import error related components
import Error from "./components/Error";
import NotFound from "./components/NotFound";
import Forbidden from "./components/Forbidden";

// Context (to be able to get app data without passing props)
import withContext from './Context';
// Private Route for update course route and create course route
import PrivateRoute from './PrivateRoute';

//Variables with Context
const CoursesWithContext = withContext(Courses);
const CourseDetailWithContext = withContext(CourseDetail);
const CreateCourseWithContext = withContext(CreateCourse);
const UpdateCourseWithContext = withContext(UpdateCourse);
const UserSignInWithContext = withContext(UserSignIn);
const UserSignUpWithContext = withContext(UserSignUp);
const UserSignOutWithContext = withContext(UserSignOut);
const HeaderWithContext = withContext(Header);

class App extends Component {

    render(){
        return (
            <Router>
                <div id="root">
                    <div>
                        <HeaderWithContext/>
                        <hr/>
                        <Switch>
                            <Route exact path='/' render={() => <Redirect to="/courses"/>} />
                            <Route exact path='/courses' component={CoursesWithContext} />
                            <PrivateRoute path='/courses/create' component={CreateCourseWithContext} />
                            <Route exact path='/courses/:id' component={CourseDetailWithContext} />
                            <PrivateRoute exact path='/courses/:id/update' component={UpdateCourseWithContext} />
                            <Route path='/signin' component={ UserSignInWithContext } />
                            <Route path='/signup' component={ UserSignUpWithContext } />
                            <Route path='/signout' component={ UserSignOutWithContext } />
                            <Route path='/error' component={Error} />
                            <Route path='/forbidden' component={Forbidden}/>
                            <Route path='*' component={NotFound} />
                        </Switch>
                    </div>
                </div>
            </Router>
        );
    }
}
export default App;


