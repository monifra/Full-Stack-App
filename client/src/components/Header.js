import React from 'react';

//header function

const Header = () => {
    return(
        <div className="header">
            <div className="bounds">
                <h1 className="header--logo">Courses</h1>
                <nav><a className="signup" href="/signup">Sign Up</a><a className="signin" href="/signin">Sign
                    In</a></nav>
            </div>
        </div>
    );
};

//export Header function
export default Header;
