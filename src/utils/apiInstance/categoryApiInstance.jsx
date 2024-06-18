import React from 'react'
import axios from "axios";
const categoryApiInstance = axios.create(
    {
        baseURL: `${import.meta.env.VITE_REACT_APP_API_URL}/api/categories`
    }
)

export default categoryApiInstance