//SIGN OUT METHOD
//import React
import React from 'react';
//import Redirect
import { Redirect } from 'react-router-dom';

export default ({context}) => {
    context.actions.signOut(); //use SignOut Method from context actions

    return (
        <Redirect to="/" /> //redirect to main page
    );
}
