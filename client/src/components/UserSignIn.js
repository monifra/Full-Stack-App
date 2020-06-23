//USER SIGN IN COMPONENT
//import React
import React, {Component}  from 'react';
//import Link
import { Link } from 'react-router-dom';

import Form from "./Form";

//DATA FOR TEST SIGN IN email: joe@smith.com password: joepassword

export default class UserSignIn extends Component {

    state = {
        emailAddress: '',
        password: '',
        errors: []
    };

    render(){

        const {
            emailAddress,
            password,
            errors,
        } = this.state;

        // const { context } = this.props;

        return(
            <div className="bounds">
                <div className="grid-33 centered signin">
                    <h1>Sign In</h1>
                        <Form
                            cancel={this.cancel}
                            errors={errors}
                            submit={this.submit}
                            submitButtonText="Sign In"
                            elements={()=>(
                                <React.Fragment>
                                    <input id="emailAddress"
                                           name="emailAddress"
                                           type="email"
                                           value={emailAddress}
                                           onChange={this.change}
                                           placeholder="Email Address"
                                    />

                                    <input id="password"
                                          name="password"
                                          type="password"
                                          value={password}
                                          onChange={this.change}
                                          placeholder="Password"
                                    />
                                </React.Fragment>
                            )}
                        />
                    <p>Don't have a user account? <Link to="/signup" >Click here</Link> to sign up!</p>
                </div>
            </div>
        )
    }
    //change method
    change = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        this.setState(() => {
            return {
                [name]: value
            };
        });
    }
    //submit user method
    submit = () => {
        const { context } = this.props;
        const { from } = this.props.location.state || { from: { pathname: '/' } };
        const { emailAddress, password } = this.state;

        context.actions
            .signIn(emailAddress, password) //sigIn Method
            .then((user) => {
                if (user === null) { //if there is no user
                    this.setState(() => {
                        return { errors: [ 'Oh no! Sign-in was unsuccessful' ] }; //show unsuccessful sign in message
                    });
                } else {
                    this.props.history.push(from); //else redirect to the page the user was on earlier on to the main page
                }
            })
            .catch((error) => {
                console.error(error);
                this.props.history.push('/error'); //if major error redirect to error page
            });
    };
    //cancel method
    cancel = () => {
        this.props.history.push('/'); //redirect to main page
    }
}
