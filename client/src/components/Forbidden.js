import React from 'react';
//To use when the requested course to edit or delete aren't owned by the user
export default () => (
    <div className="bounds">
        <h1>Forbidden</h1>
        <p>Oh oh! You can't access this page. It seems that you're not the owner of this course. You can only edit or delete courses that you've created.</p>
    </div>
);
