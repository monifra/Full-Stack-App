//USER SIGN UP COMPONENT
//import React
import React, {Component}  from 'react';
//import Link
import { Link } from 'react-router-dom';
//import Form component to manage form
import Form from "./Form";

export default class UserSignUp extends Component {

    state = {
        firstName: '',
        lastName: '',
        emailAddress: '',
        password: '',
        confirmPassword: '',
        errors: [],
    };

    render(){

        const {
            firstName,
            lastName,
            emailAddress,
            password,
            confirmPassword,
            errors,
        } = this.state;

        return(
            <div className="bounds">
                <div className="grid-33 centered signin">
                    <h1>Sign Up</h1>
                    <div>
                        <Form
                            cancel={this.cancel}
                            errors={errors}
                            submit={this.submit}
                            submitButtonText="Sign Up"
                            elements={() => (
                                <React.Fragment>
                                    <input
                                        id="firstName"
                                        name="firstName"
                                        type="text"
                                        value={firstName}
                                        onChange={this.change}
                                        placeholder="First Name" />
                                    <input
                                        id="lastName"
                                        name="lastName"
                                        type="text"
                                        value={lastName}
                                        onChange={this.change}
                                        placeholder="Last Name" />
                                    <input
                                        id="emailAddress"
                                        name="emailAddress"
                                        type="email"
                                        value={emailAddress}
                                        onChange={this.change}
                                        placeholder="Email Address" />
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        value={password}
                                        onChange={this.change}
                                        placeholder="Password" />
                                    <input
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        type="password"
                                        value={confirmPassword}
                                        onChange={this.change}
                                        placeholder="Confirm Password" />
                                </React.Fragment>
                            )}
                        />
                    </div>
                    <p>Already have a user account? <Link to="/signin">Click here</Link> to sign in!</p>
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
    };
    //submit new user method
    submit = () => {
        const { context } = this.props;
        const {
            firstName,
            lastName,
            emailAddress,
            password,
            confirmPassword,
        } = this.state;

        //PLACE FOR ERROR HANDLER IF FOR CONFIRMING PASSWORD
        // Create user variable and user if the passwords match
        if(password === confirmPassword){
        const user = {
            firstName,
            lastName,
            emailAddress,
            password,
        };

        context.data
            .createUser(user) //create new user with CreateUser method from data.js file
            .then( errors => { //if errors set errors state
                if (errors.length) {
                    this.setState({ errors });
                } else { //else sign in and console log information
                    console.log(`${firstName} is successfully signed up and authenticated!`);
                    context.actions.signIn(emailAddress, password)
                        .then(() => {
                            this.props.history.push('/courses'); //redirect to main page
                        });
                }
            })
            .catch((err) => {
                console.log(err);
                    this.props.history.push('/error'); //if main error redirect to error page
            });
        //ELSE STATEMENT FOR CONFIRMING PASSWORD
        } else { //if password doesn't match set password error
            //Temporary error console.log
            console.log('Passwords must be the same');
            this.setState(() => {
                return { errors: [ 'Passwords must be the same' ] };
            });
        }
    };
    //cancel method
    cancel = () => {
        this.props.history.push('/'); //redirect to main page
    }

}
