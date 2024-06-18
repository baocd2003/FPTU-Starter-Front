import React from 'react'
import axios from "axios";
const userApiInstace = axios.create(
    {
        baseURL: `${import.meta.env.VITE_REACT_APP_API_URL}/api/Authentication`
    }
)

export default userApiInstace