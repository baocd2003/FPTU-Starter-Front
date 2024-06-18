import React from 'react'
import axios from "axios";
const interactionApiInstance = axios.create(
    {
        baseURL: `${import.meta.env.VITE_REACT_APP_API_URL}/api/interactions`
    }
)

export default interactionApiInstance