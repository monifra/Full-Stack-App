//import cookies to work with passwords
//import Cookies from 'js-cookie';
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
        const response = await this.api('/users', 'GET', null, true, { emailAddress, password });
        if (response.status === 200) {
            return response.json().then(data => data);
        }
        else if (response.status === 401) { //unauthorized
            return null;
        }
        else {
            throw new Error();
        }
    }

    //POST NEW USER TO API /users
    async createUser(user) {
        const response = await this.api('/users', 'POST', user);
        if (response.status === 201) {
            console.log('createUser is working');
            return [];
        }
        else if (response.status === 400) {
            return response.json().then(data => {
                return data.errors;
            });
        }
        else {
            throw new Error();
        }
    }

    //GET ALL COURSES FROM API /courses
    async getCourses() {
        const response = await this.api('/courses', 'GET');
        if (response.status === 200) {

            const courses = await response.json()
                .then(data => data);
            // console.log(courses);
            return courses;
        }
        else if (response.status === 400) {
            return response.json().then(data => {
                return data.errors;
            });
        }
        else {
            throw new Error();
        }
    }

    //POST NEW COURSE TO API /courses
    async createCourse(emailAddress, password, course){
        const response = await this.api('/courses', 'POST', course, true, {
            emailAddress,
            password
        });
        if (response.status === 201) {
            return [];
        } else if (response.status === 400) {
            return response.json().then(data => {
                return data.errors;
            });
        } else {
            throw new Error();
        }
    }
    // GET COURSE FROM API /courses/:id
    async getCourse(id){
        const response = await this.api(`/courses/${id}`, 'GET');
        if (response.status === 200) {
            const course = await response.json()
                .then(data => data);
            //console.log(course);
            return course;
        }
        else if (response.status === 400) {
            return response.json()
                .then(data => {
                    return data.errors;
                });
        }
        else {
            throw new Error();
        }
    }

    // PUT COURSE TO API /courses/:id/
    async updateCourse(id, course, emailAddress, password){
        const response = await this.api(`/courses/${id}`, 'PUT', course, true, {
            emailAddress,
            password,
        });
        if(response.status === 204){
            return [];
        }
        else if(response.status === 400){
            return response.json()
                .then(data => {
                    return data.errors;
                });
        } else {
            throw new Error();
        }
    }

    // DELETE COURSE TO API /courses/:id/
    async deleteCourse(id, emailAddress, password){

        //Ideas for working with password
        // const encryptedPassword = Cookies.get('password');
        // encoding password with atob()
        // const password = atob(JSON.parse(encryptedPassword));

        const response = await this.api(`/courses/${id}`, 'DELETE', null, true, {
            emailAddress,
            password,
        });
        if(response.status === 204){
            return [];
        }
        else if(response.status === 403){
            return response.json()
                .then(data => {
                    return data.errors;
                });
        } else {
            throw new Error();
        }
    }

}
