import React from 'react';
import {Link} from "react-router-dom";

export default (props) => {

    const {courseId} = props;

    return(
        <React.fragment>
            <Link
                className="button"
                to={`/courses/${courseId}/update`}
            >
                Update Course
            </Link>
            <button
                className="button"
                onClick={() => this.delete()}
            >Delete Course
            </button>
        </React.fragment>
    )
};

