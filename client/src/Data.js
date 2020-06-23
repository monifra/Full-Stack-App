//File managing data
import config from './config';

export default class Data {
    api(path, method = 'GET', body = null, requiresAuth = false, credentials = null) {
        const url = config.apiBaseUrl + path;

        const options = {
            method,
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            },
        };

        if (body !== null) {
            options.body = JSON.stringify(body);
        }

        // Check if auth is required
        if (requiresAuth) {
            const encodedCredentials = btoa(`${credentials.emailAddress}:${credentials.password}`);

            options.headers['Authorization'] = `Basic ${encodedCredentials}`;
        }


        return fetch(url, options);
    }

    //GET USER FROM API /users
    //getting data that will allow us log in into an application
    async getUser(emailAddress, password) {
        const response = await this.api('/users', 'GET', null, true, { emailAddress, password }); //get user from API
        if (response.status === 200) { //if success give data
            return response.json().then(data => data);
        }
        else if (response.status === 401) { //else if unauthorized
            return null;
        }
        else {
            throw new Error(); //else throw major error
        }
    }

    //POST NEW USER TO API /users
    async createUser(user) {
        const response = await this.api('/users', 'POST', user); //Post new user to API
        if (response.status === 201) { //if success
            //console.log('createUser is working');
            return [];
        }
        else if (response.status === 400) { //else if failure give errors from API
            return response.json().then(data => {
                return data.errors;
            });
        }
        else {
            throw new Error(); //else throw major error
        }
    }

    //GET ALL COURSES FROM API /courses
    async getCourses() {
        const response = await this.api('/courses', 'GET'); //get list of courses from API
        if (response.status === 200) { //if success

            const courses = await response.json()
                .then(data => data);
            // console.log(courses);
            return courses; //return list of courses
        }
        else if (response.status === 400) { //else if failure return errors
            return response.json().then(data => {
                return data.errors;
            });
        }
        else {
            throw new Error(); //else throw major error
        }
    }

    //POST NEW COURSE TO API /courses
    async createCourse(emailAddress, password, course){
        const response = await this.api('/courses', 'POST', course, true, { //post new course to API
            emailAddress,
            password
        });
        if (response.status === 201) { //if success
            return [];
        } else if (response.status === 400) { //else if 400 give errors from API
            return response.json().then(data => {
                return data.errors;
            });
        } else {
            throw new Error(); //else throw major error
        }
    }
    // GET COURSE FROM API /courses/:id
    async getCourse(id){
        const response = await this.api(`/courses/${id}`, 'GET'); //get details of course from API using its ID
        if (response.status === 200) { //if success
            const course = await response.json() //get course data
                .then(data => data);
            //console.log(course);
            return course;
        }
        else if (response.status === 400) { //else if 400 give errors from API
            return response.json()
                .then(data => {
                    return data.errors;
                });
        }
        else {
            throw new Error(); //else throw major error
        }
    }

    // PUT COURSE TO API /courses/:id/
    async updateCourse(id, course, emailAddress, password){
        const response = await this.api(`/courses/${id}`, 'PUT', course, true, { //update course detail to API
            emailAddress,
            password,
        });
        if(response.status === 204){ //if success
            return [];
        }
        else if(response.status === 400){ //else if 400 give errors from API
            return response.json()
                .then(data => {
                    return data.errors;
                });
        } else {
            throw new Error(); //else throw major error
        }
    }

    // DELETE COURSE TO API /courses/:id/
    async deleteCourse(id, emailAddress, password){

        const response = await this.api(`/courses/${id}`, 'DELETE', null, true, { //delete course from API
            emailAddress,
            password,
        });
        if(response.status === 204){ //if success
            return [];
        }
        else if(response.status === 403){ //else if  403 give errors from API
            return response.json()
                .then(data => {
                    return data.errors;
                });
        } else {
            throw new Error(); //else throw major error
        }
    }

}
