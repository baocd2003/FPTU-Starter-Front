import React from 'react'
import axios from "axios";
const projectApiInstance = axios.create(
    {
        baseURL: `${import.meta.env.VITE_REACT_APP_API_URL}/api/projects`
    }
)

export default projectApiInstance