//Error Component which shows when a major error happen
//import React
import React from 'react';
//import Link
import {Link} from "react-router-dom";
//when 500 internal server
export default () => (
    <React.Fragment>
        <div className="actions--bar">
            <div className="bounds">
                <div className="grid-100">
                    <Link className="button button-secondary" to="/">Return to List</Link>
                </div>
            </div>
        </div>
        <div className="bounds course--detail">
            <h1>Error</h1>
            <p>Sorry! We just encountered an unexpected error.</p>
        </div>
    </React.Fragment>
);
