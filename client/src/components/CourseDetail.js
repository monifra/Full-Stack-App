//CLASS FOR DETAILS OF COURSE

//import React
import React, {Component}  from 'react';
//import Link
import { Link } from 'react-router-dom';
//import React Markdown to style lists
import ReactMarkdown from 'react-markdown';

export default class CourseDetail extends Component {

    state = {
        course: '',
        author: [],
        authUser: [],
    };
    //early version of fetching this functionality is moved to data.js file
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
            .getCourse(this.props.match.params.id)//get course detail data using its id and getCourse method
            .then( course => {
                if (course) {
                    this.setState({
                        course,
                        author: course.User, //set user
                        authUser: context.authenticatedUser //set who is authenticated
                    });
                }
            })
            .catch( err => { // handle rejected promises
                console.log(err);
                this.props.history.push('/error'); // push to history stack
            });
    }

   render(){
       const {
           course,
           author,
       } = this.state;

       return(
           <div>
               <div className="actions--bar">
                   <div className="bounds">
                       <div className="grid-100">
                           {/*Elements moved to AddButtons Method*/}
                           {/*<span>*/}
                                   {/*<Link*/}
                                   {/*    className="button"*/}
                                   {/*    to={`/courses/${courseId}/update`}*/}
                                   {/*>*/}
                                   {/*    Update Course*/}
                                   {/*</Link>*/}
                                   {/*<button*/}
                                   {/*    className="button"*/}
                                   {/*    onClick={() => this.delete()}*/}
                                   {/*>*/}
                                   {/*    Delete Course*/}
                                   {/*</button>*/}
                               {/*</span>*/}

                           {this.AddButtons()}
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
                           <ReactMarkdown>{course.description}</ReactMarkdown>
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
                                       <ReactMarkdown>{course.materialsNeeded}</ReactMarkdown>
                                   </ul>
                               </li>
                           </ul>
                       </div>
                   </div>
               </div>
           </div>
       );
   }

   //Method add buttons for updating and removing when a user that gets courses detail page is also a course owner

    AddButtons = () => {

      const courseId = this.props.match.params.id;
      const {authUser, author} = this.state;
      // console.log(author.id);

      if (authUser){ //if there is any authenticated user
          if(author.id === authUser.id){ //and a course author is the same as authenticated user show update and delete button
              return(
                  <span>
                      <Link className="button" to={`/courses/${courseId}/update`}>Update Course</Link>
                      <button className="button" onClick={() => this.delete()}>Delete Course </button>
                  </span>
              );
          }
      }
    };

   // Method for deleting course

   delete = () => {
       const { context } = this.props;
       //console.log(authUser);

       const {
            authUser
       } = this.state;

       const emailAddress = authUser.emailAddress;
       const password = authUser.password;
       const userId = authUser.id;
       console.log(userId);
       const courseId = this.props.match.params.id;
       //console.log(emailAddress);
       //console.log(password);

       context.data
           .deleteCourse(courseId, emailAddress, password) //delete course using deleteCourse Method from Dada.js file
           .then( errors => { //if errors add them to state
               if (errors.length) {
                   this.setState({ errors });
               } else {
                   console.log("Course deleted");
                   this.props.history.push('/courses'); //redirect to main page
               }
           })
           .catch((err) => {
               console.log(err);
               this.props.history.push('/error'); //throw error page
           });
   }

};
