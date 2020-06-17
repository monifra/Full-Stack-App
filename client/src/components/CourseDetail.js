//import React
import React, {Component}  from 'react';
import { Link } from 'react-router-dom';

export default class CourseDetail extends Component {

    state = {
        course: '',
        author: [],
    };

    //  axiosFunction = async() => {
    //     const location = window.location.href.substr((window.location.href.lastIndexOf('/')+1));
    //     //console.log(location);
    //     await axios.get(`http://localhost:5000/api/courses/${location}`)
    //         .then(res => {
    //             this.setState({courseDetail: res.data});
    //             //console.log(this.state.courseDetail);
    //         })
    //         .catch(error=> { //error while fetching data
    //             console.log('Error fetching and parsing data', error);
    //         });
    // };

    componentDidMount() {
        // this.axiosFunction(this.props.routeMatch.params.id);
        const { context } = this.props;

        context.data
            .getCourse(this.props.match.params.id)
            .then( course => {
                if (course) {
                    this.setState({
                        course,
                        author: course.User,
                    });
                }
            })
            .catch( err => { // handle rejected promises
                console.log(err);
                // this.props.history.push('/error'); // push to history stack
            });
    }


    // no styles in needed materials or description
    // Link to delete work doesn't work because I don't have delete component figure out
    // Error handler to do

   render(){
       const {
           course,
           author,
       } = this.state;

       const courseId = this.props.match.params.id;

       return(
           <div>
               <div className="actions--bar">
                   <div className="bounds">
                       <div className="grid-100">
                           <span>
                               <Link className="button" to={`/courses/${courseId}/update`}>Update Course</Link>
                               <Link className="button" to="/">Delete Course</Link>
                           </span>
                           <Link className="button button-secondary" to="/">Return to List</Link>
                        </div>
                    </div>
               </div>
               <div className="bounds course--detail">
                   <div className="grid-66">
                       <div className="course--header">
                           <h4 className="course--label">Course</h4>
                           <h3 className="course--title">{course.title}</h3>
                           <p>By {author.firstName + " " + author.lastName}</p>
                       </div>
                       <div className="course--description">
                           <p>{course.description}</p>
                       </div>
                   </div>
                   <div className="grid-25 grid-right">
                       <div className="course--stats">
                           <ul className="course--stats--list">
                               <li className="course--stats--list--item">
                                   <h4>Estimated Time</h4>
                                   <h3>{course.estimatedTime}</h3>
                               </li>
                               <li className="course--stats--list--item">
                                   <h4>Materials Needed</h4>
                                   <ul>
                                       {course.materialsNeeded}
                                   </ul>
                               </li>
                           </ul>
                       </div>
                   </div>
               </div>
           </div>
       );
   }
};
