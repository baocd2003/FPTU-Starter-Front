import React from 'react'
import axios from "axios";
const interactionApiInstance =  axios.create(
    {
        baseURL : "https://localhost:7235/api/interactions"
    }
)

export default interactionApiInstance