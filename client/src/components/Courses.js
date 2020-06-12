//import React
import React, {Component}  from 'react';
//import axios for fetching data from api
import axios from 'axios';

let data;
axios.get('http://localhost:5000/api/courses')
    .then(res => {
        console.log(res.data);
        data = res.data;
    });
