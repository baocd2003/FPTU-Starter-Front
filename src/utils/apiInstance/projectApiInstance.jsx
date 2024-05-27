import React from 'react'
import axios from "axios";
const projectApiInstance =  axios.create(
    {
        baseURL : "https://localhost:7235/api/projects"
    }
)

export default projectApiInstance